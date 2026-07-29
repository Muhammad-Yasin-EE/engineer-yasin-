'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function chatWithISSBPsychologist(messageHistory: { role: 'user' | 'model', content: string }[], newMessage: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured in the server environment.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
    
    const systemPrompt = `You are an expert, highly critical, and strict ISSB (Inter Services Selection Board) Psychologist for the Pakistan Armed Forces. 
Your primary goal is to heavily scrutinize the candidate, put them under immense pressure, and constantly cross-question them based EXACTLY on their previous answers. 
If they give a generic answer, aggressively demand specific examples. If they say something contradictory, catch it and grill them on it.

Rules:
- Be exceedingly strict, intimidating, and deeply analytical.
- Constantly pick words from their previous responses and ask "Why?", "Give an example", or "That doesn't make sense, clarify."
- Ask short, piercing, rapid-fire questions to test emotional stability, confidence, and truthfulness.
- Do not be friendly or encouraging. You are testing if they break under pressure.
- Keep responses short, exactly like a rapid-fire interview (1-3 sentences max).
- If the user types "EVALUATE ME", drop the persona and provide a brutally honest psychological evaluation (out of 10) covering Confidence, Truthfulness, Emotional Stability, and Initiative.`

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: "Please act strictly according to the system prompt. " + systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I am ready to conduct the ISSB psychological interview." }] },
        ...messageHistory.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    })

    const result = await chat.sendMessage(newMessage)
    const response = await result.response
    const text = response.text()
    
    return { success: true, text }

  } catch (error: any) {
    console.error('AI Interview Error:', error)
    return { error: error.message || 'An error occurred while connecting to the AI.' }
  }
}
