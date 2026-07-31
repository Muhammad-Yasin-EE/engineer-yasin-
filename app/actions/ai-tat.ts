'use server'

import { AIRouter } from '@/lib/ai/router'
import { checkAndDeductAICredits } from '@/lib/ai/credits'

export async function evaluateTATStory(story: string, imageNumber: number) {
  // 1. Check credits first
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to evaluate tests.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    return await AIRouter.executeWithFailover(async (ai) => {
      const model = ai.getGenerativeModel({ model: 'gemini-pro' })
      
      const prompt = `You are an expert Psychologist at ISSB (Inter Services Selection Board).
A candidate was shown "TAT Scene ${imageNumber}" for 30 seconds and given 3.5 minutes to write a story.
The candidate wrote the following story:

"${story}"

Evaluate this story strictly based on standard TAT criteria:
1. Did they identify a clear protagonist (Hero)?
2. What led up to the event, what is happening, and what is the outcome?
3. Is the tone optimistic, constructive, and action-oriented?
4. What Officer Like Qualities (OLQs) are projected? (e.g., Initiative, Problem Solving, Courage, Social Adaptability).

Return a JSON object EXACTLY in this format, with NO markdown formatting around it (no \`\`\`json):
{
  "verdict": "Pass" or "Fail" or "Borderline",
  "score": a number from 1 to 10,
  "heroAnalysis": "Short sentence about the protagonist.",
  "plotAnalysis": "Short sentence about the situation and outcome.",
  "olqs": ["quality1", "quality2", "quality3"],
  "feedback": "One sentence of constructive feedback."
}`

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.2,
          
        }
      })
      
      const response = await result.response
      const text = response.text()
      
      try {
        const data = JSON.parse(text)
        return { success: true, data }
      } catch (e) {
        console.error("Failed to parse JSON", text)
        return { error: 'Failed to parse AI response. Please try again.' }
      }
    })
  } catch (error: any) {
    console.error('TAT AI Error:', error)
    if (error.message && error.message.includes('503')) {
      return { error: 'The AI Psychologist is currently busy. Please wait a moment and try again.' }
    }
    return { error: 'Failed to evaluate TAT story. Please try again.' }
  }
}
