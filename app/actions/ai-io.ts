'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_GTO || process.env.GEMINI_API_KEY || '')

export async function evaluateIOPlan(obstacleOrder: string) {
  if (!process.env.GEMINI_API_KEY_GTO && !process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' })
    
    const prompt = `You are a strict GTO evaluating an Individual Obstacles (IO) route plan at ISSB.
The candidate has 3 minutes to tackle 10 obstacles worth 55 marks.
Candidate's planned sequence: "${obstacleOrder}"

Evaluate this sequence for stamina pacing and point-maximization efficiency.
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
    console.error('IO AI Error:', error)
    return { error: 'Failed to evaluate IO plan. Please try again.' }
  }
}
