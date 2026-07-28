import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const customPrefix = (formData.get('prefix') as string) || 'portal'

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize and create a unique filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase()
    const timestamp = Date.now()
    const filename = `${customPrefix}-${timestamp}-${originalName}`

    // Ensure target directory exists
    const uploadDir = path.join(process.cwd(), 'public/images/uploads')
    await fs.mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    // Return relative public image URL
    const imageUrl = `/images/uploads/${filename}`

    return NextResponse.json({ success: true, url: imageUrl, filename })
  } catch (error: any) {
    console.error('Image Upload Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to save image file' }, { status: 500 })
  }
}
