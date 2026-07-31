'use server'

import { AIRouter } from '@/lib/ai/router'
import { checkAndDeductAICredits } from '@/lib/ai/credits'

export async function chatWithISSBPsychologist(messageHistory: { role: 'user' | 'model', content: string }[], newMessage: string) {
  // 1. Check credits first
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    return await AIRouter.executeWithFailover(async (ai) => {
      const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' })
      
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
    })
  } catch (error: any) {
    console.error('AI Interview Error:', error)
    if (error.message && error.message.includes('503')) {
      return { error: 'The AI Psychologist is currently busy. Please wait a moment and try again.' }
    }
    return { error: error.message || 'An error occurred while connecting to the AI.' }
  }
}
