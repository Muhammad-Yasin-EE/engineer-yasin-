'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_GTO || process.env.GEMINI_API_KEY || '')

export async function evaluateGPEPlan(scenario: string, priorities: string, plan: string) {
  if (!process.env.GEMINI_API_KEY_GTO && !process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a strict GTO evaluating a Group Planning Exercise (GPE/MOP) at ISSB.
Scenario Narrative: "${scenario}"
Candidate's Priorities: "${priorities}"
Candidate's Action Plan: "${plan}"

Evaluate this tactical plan based on the 4-step military crisis prioritization (Life > Security > Property > Routine).
Return a JSON object EXACTLY in this format, with NO markdown formatting (no \`\`\`json):
{
  "verdict": "Pass" or "Fail",
  "score": a number from 1 to 10,
  "pros": ["short strength 1", "short strength 2"],
  "cons": ["short flaw 1", "short flaw 2"],
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
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()
    
    const data = JSON.parse(text)
    return { success: true, data }

  } catch (error: any) {
    console.error('GPE AI Error:', error)
    return { error: 'Failed to evaluate GPE plan. Please try again.' }
  }
}
