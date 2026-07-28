import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
const FILE_PATH = path.join(DATA_DIR, 'portal-content.json')

export interface PortalItem {
  id: string
  type: 'scholarship' | 'job'
  category: string // e.g., 'international' | 'national' | 'intermediate' | 'hec' | 'women' | 'germany' | 'fpsc' | 'ppsc' | 'bpsc' | 'spsc' | 'kppsc' | 'ajkpsc' | 'gbpsc'
  title: string
  organization?: string
  badgeOrFunding: string
  description?: string
  openingDate?: string
  closingDate?: string
  eligibility?: string
  applyUrl: string
  imageUrl: string
  createdAt?: string
}

export interface PortalContentStore {
  customItems: PortalItem[]
  deletedIds: string[]
}

const defaultStore: PortalContentStore = {
  customItems: [],
  deletedIds: []
}

async function getStore(): Promise<PortalContentStore> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const data = await fs.readFile(FILE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    // If file doesn't exist, initialize default store
    await fs.writeFile(FILE_PATH, JSON.stringify(defaultStore, null, 2), 'utf8')
    return defaultStore
  }
}

async function saveStore(store: PortalContentStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(FILE_PATH, JSON.stringify(store, null, 2), 'utf8')
}

export async function GET() {
  try {
    const store = await getStore()
    return NextResponse.json(store)
  } catch (error: any) {
    console.error('Portal Get Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch portal data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const item: PortalItem = await request.json()
    if (!item.title || !item.type || !item.category) {
      return NextResponse.json({ error: 'Missing required fields: title, type, category' }, { status: 400 })
    }

    const store = await getStore()
    const newItem: PortalItem = {
      ...item,
      id: item.id || `portal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    }

    store.customItems.unshift(newItem)
    await saveStore(store)

    return NextResponse.json({ success: true, item: newItem, store })
  } catch (error: any) {
    console.error('Portal Post Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    const store = await getStore()

    // Remove from customItems if it exists there
    store.customItems = store.customItems.filter(i => i.id !== id)

    // Add to deletedIds so default static items also disappear if deleted
    if (!store.deletedIds.includes(id)) {
      store.deletedIds.push(id)
    }

    await saveStore(store)
    return NextResponse.json({ success: true, deletedId: id, store })
  } catch (error: any) {
    console.error('Portal Delete Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to delete item' }, { status: 500 })
  }
}
