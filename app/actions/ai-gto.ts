'use server'

import { AIRouter } from '@/lib/ai/router'
import { checkAndDeductAICredits } from '@/lib/ai/credits'

export async function evaluateGTOPlan(plan: string, objective: string, constraints: string[]) {
  // 1. Check credits first
  const creditCheck = await checkAndDeductAICredits()
  if (!creditCheck.allowed) {
    if (creditCheck.reason === 'not_logged_in') return { error: 'Please sign in to continue.' }
    return { error: 'insufficient_credits', reason: creditCheck.reason }
  }

  try {
    return await AIRouter.executeWithFailover(async (ai) => {
      const model = ai.getGenerativeModel({ model: 'gemini-pro' })
      
      const prompt = `You are a strict GTO (Group Testing Officer) at ISSB.
A candidate has submitted an execution plan for a Command Task/Group Task.
Objective: ${objective}
Rules & Constraints: ${constraints.join(' | ')}
Candidate's Plan: "${plan}"

Evaluate this plan strictly. Return a JSON object EXACTLY in this format, with NO markdown formatting around it (no \`\`\`json):
{
  "verdict": "Pass" or "Fail",
  "score": a number from 1 to 10,
  "pros": ["one very short bullet point", "another short point"],
  "cons": ["one very short flaw", "another short flaw"],
  "feedback": "One short concluding sentence."
}
Keep pros and cons extremely short to save tokens.`

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.3,
        }
      })
      
      const response = await result.response
      let text = response.text()
      // strip markdown json fences if any
      text = text.replace(/```json/g, '').replace(/```/g, '').trim()
      
      const data = JSON.parse(text)
      
      return { success: true, data }
    })
  } catch (error: any) {
    console.error('GTO AI Error:', error)
    return { error: 'Failed to evaluate GTO plan. Please try again.' }
  }
}
