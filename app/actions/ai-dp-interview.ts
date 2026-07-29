'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function chatWithDpInterview(
  messageHistory: { role: 'user' | 'model', content: string }[], 
  newMessage: string, 
  pifData: any,
  questionCount: number
) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: 'GEMINI_API_KEY is not configured in the server environment.' }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    // Extract PIF data to a readable string for the prompt
    const pifString = JSON.stringify(pifData, null, 2)

    let systemPrompt = `You are the Deputy President (DP) of ISSB, conducting a high-pressure, strict psychological interview for a candidate aiming to join the Armed Forces.
    
Candidate's Bio-Data (PIF) Form:
${pifString}

Interview Rules:
1. You must cross-question the candidate aggressively based on their PIF data. (e.g. if their father has a low income but they study in an expensive school, ask why. If they listed a specific hobby, test their deep knowledge on it).
2. Keep your questions very short and direct (1-3 sentences max).
3. Do NOT provide feedback or chatty filler. ONLY output the next question. 
4. You are currently on question ${questionCount} out of 15.
`

    if (questionCount >= 15) {
      systemPrompt += `
CRITICAL INSTRUCTION: This is the END of the interview. Do NOT ask another question. 
Instead, drop the persona and output a final evaluation in EXACTLY this JSON format (no markdown tags):
{
  "evaluation": "Pass" or "Fail",
  "score": a number from 1 to 10,
  "confidence": "brief comment on confidence",
  "truthfulness": "brief comment on truthfulness",
  "logic": "brief comment on logical consistency",
  "finalRemarks": "One concluding sentence."
}`
    }

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Understood. I will strictly act as the Deputy President and keep questions short based on the PIF." }] },
        ...messageHistory.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: questionCount >= 15 ? 300 : 150, // Save tokens
        temperature: 0.4,
      },
    })

    const result = await chat.sendMessage(newMessage)
    const response = await result.response
    let text = response.text().trim()
    
    // If it's the final question, we need to parse JSON
    let evaluationData = null;
    if (questionCount >= 15) {
      try {
         // clean markdown if the AI hallucinated it despite instructions
         text = text.replace(/```json/g, '').replace(/```/g, '').trim()
         evaluationData = JSON.parse(text)
         text = "INTERVIEW_COMPLETE"
      } catch (e) {
         console.error("Failed to parse evaluation JSON", text)
         text = "INTERVIEW_COMPLETE_ERROR"
      }
    }

    return { success: true, text, evaluationData }

  } catch (error: any) {
    console.error('DP AI Interview Error:', error)
    return { error: error.message || 'An error occurred while connecting to the AI.' }
  }
}
