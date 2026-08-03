'use server'

import { checkAndDeductAICredits } from '@/lib/ai/credits'

/**
 * Deducts an AI credit when a user starts an interactive test.
 * This should be called from the client component on the "Start Test" button.
 */
export async function deductCreditForTest() {
  const result = await checkAndDeductAICredits('start')
  return result
}
