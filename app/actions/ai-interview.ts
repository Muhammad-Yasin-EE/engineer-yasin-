'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function chatWithISSBPsychologist(messageHistory: { role: 'user' | 'model', content: string }[], newMessage: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured in the server environment.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const systemPrompt = `You are an expert ISSB (Inter Services Selection Board) Psychologist for the Pakistan Armed Forces (Army, Navy, PAF). 
Your goal is to cross-question candidates based on their responses to test their Officer Like Qualities (OLQs) such as:
1. Confidence & Expression
2. Social Adaptability & Emotional Stability
3. Sense of Responsibility
4. Initiative & Leadership
5. Courage & Determination

Rules:
- Be strict, highly professional, and sometimes put the candidate under pressure to see if they break.
- Ask short, direct, and piercing questions. (e.g. "Why did you get low marks in F.Sc?", "If you are not selected, what is your backup plan?")
- Do not break character. 
- You are conducting a Virtual Interview. Keep your responses under 3-4 sentences.
- If the user says "EVALUATE ME", provide a detailed psychological breakdown of their OLQs and give them a score out of 10.`

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
