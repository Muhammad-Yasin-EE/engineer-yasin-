'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function evaluateTATStory(story: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured in the server environment.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a military psychologist evaluating a candidate's TAT (Thematic Apperception Test) or Picture Story.
Analyze the following story written by the candidate for an armed forces initial test.
Evaluate the story based on these three metrics out of 10:
1. Leadership (Does the hero take initiative?)
2. Confidence (Is the tone decisive and positive?)
3. Positivity (Is the outcome optimistic and realistic?)

Provide your response EXACTLY as a JSON object with this structure, and NOTHING ELSE:
{
  "scores": {
    "leadership": number,
    "confidence": number,
    "positivity": number
  },
  "feedback": "A short, 2-3 sentence strict psychological feedback on what they did well and what they need to improve."
}

Candidate's Story:
"${story}"`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    
    // Clean up any markdown code blocks if the AI added them
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()
    
    return { success: true, data: JSON.parse(cleanedText) }

  } catch (error: any) {
    console.error('TAT Evaluator Error:', error)
    return { error: error.message || 'An error occurred while evaluating the story.' }
  }
}
