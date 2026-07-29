'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function evaluateGTOPlan(plan: string, objective: string, constraints: string[]) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured in the server environment.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are an expert military Group Testing Officer (GTO) evaluating a candidate's strategy for a Command Task obstacle.
Task Objective: ${objective}
Rules/Constraints:
${constraints.map(c => '- ' + c).join('\n')}

Candidate's Plan:
${plan}

Evaluate their plan based on:
1. Did they follow all the constraints?
2. Is the plan logical, safe, and practical?
3. Did they demonstrate good leadership and resource utilization?

Provide a strict, professional feedback summary (2-3 paragraphs maximum). Do NOT be overly nice. Highlight any flaws.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    return { success: true, data: { feedback: text } }
  } catch (error: any) {
    console.error('AI GTO Error:', error)
    return { error: error.message || 'An error occurred while evaluating the plan.' }
  }
}
