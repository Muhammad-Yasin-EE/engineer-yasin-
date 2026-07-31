import { NextResponse } from 'next/server'
export async function GET() {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_GTO, process.env.GEMINI_API_KEY_3].filter(Boolean);
  if (!keys.length) return NextResponse.json({ error: 'No keys found' })
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + keys[0])
    const data = await res.json()
    return NextResponse.json({ 
      available_models: data.models?.map((m: any) => ({name: m.name, supportedMethods: m.supportedGenerationMethods})) || data, 
      key_prefix: keys[0].substring(0, 5) + '...' 
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message })
  }
}
