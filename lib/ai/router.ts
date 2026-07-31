import { GoogleGenerativeAI } from "@google/generative-ai"

// A robust AI Router that uses multiple keys to bypass rate limits
export class AIRouter {
  private static keys: string[] = []
  private static currentIndex = 0

  static initialize() {
    if (this.keys.length > 0) return

    // Collect all keys from environment variables
    const possibleKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_GTO,
      process.env.GEMINI_API_KEY_3,
      process.env.GEMINI_API_KEY_4,
      process.env.GEMINI_API_KEY_5,
    ]

    this.keys = possibleKeys.filter((key): key is string => Boolean(key))
    
    if (this.keys.length === 0) {
      console.error("No Gemini API keys found in environment variables.")
    }
  }

  // Get the next working GoogleGenerativeAI instance
  static getClient(): GoogleGenerativeAI {
    this.initialize()
    if (this.keys.length === 0) {
      throw new Error("No API keys available.")
    }
    const key = this.keys[this.currentIndex]
    return new GoogleGenerativeAI(key)
  }

  // Switch to the next key (call this when a 429 error occurs)
  static switchKey() {
    this.initialize()
    this.currentIndex = (this.currentIndex + 1) % this.keys.length
    console.log(`Switched to Gemini Key #${this.currentIndex + 1}`)
  }

  // Helper to run AI tasks with automatic failover
  static async executeWithFailover<T>(task: (ai: GoogleGenerativeAI) => Promise<T>, maxRetries = 3): Promise<T> {
    let retries = 0
    while (retries < maxRetries) {
      try {
        const ai = this.getClient()
        const result = await task(ai)
        return result
      } catch (error: any) {
        // Switch key and retry on rate limit (429), quota, or model not found (404 / 400)
        if (error?.message?.includes("429") || error?.message?.includes("quota") || error?.status === 429 || error?.message?.includes("404") || error?.status === 404 || error?.message?.includes("400")) {
          console.warn(`API Error on Key #${this.currentIndex + 1}. Switching keys...`)
          this.switchKey()
          retries++
          continue
        }
        // If it's a different error, throw it immediately
        throw error
      }
    }
    throw new Error("All API keys are currently rate-limited. Please try again in a few minutes.")
  }
}
