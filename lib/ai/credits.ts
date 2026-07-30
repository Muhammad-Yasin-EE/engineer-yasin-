import { createClient } from '@/lib/supabase/server'

export type AICreditCheckResult = 
  | { allowed: true; isPremium: boolean; creditsRemaining: number }
  | { allowed: false; reason: 'not_logged_in' | 'no_credits' | 'plan_expired' }

export async function checkAndDeductAICredits(): Promise<AICreditCheckResult> {
  const supabase = await createClient()
  
  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { allowed: false, reason: 'not_logged_in' }
  }

  // 2. Fetch the user's profile to check credits and premium status
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('ai_credits, premium_plan, premium_expiry')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    console.error("Error fetching profile for credits:", error)
    return { allowed: false, reason: 'no_credits' } // Safe fallback
  }

  // 3. Check if they have an active premium plan
  const isPremium = profile.premium_plan !== 'free'
  
  if (isPremium) {
    // Check expiry
    if (profile.premium_expiry) {
      const expiryDate = new Date(profile.premium_expiry)
      const now = new Date()
      if (now > expiryDate) {
        // Plan has expired, fallback to checking credits or deny
        // Let's just deny and force them to renew
        return { allowed: false, reason: 'plan_expired' }
      }
    }
    // Premium is active, allow unlimited access
    return { allowed: true, isPremium: true, creditsRemaining: profile.ai_credits || 0 }
  }

  // 4. If not premium, check if they have free credits
  const credits = profile.ai_credits || 0
  if (credits > 0) {
    // Deduct 1 credit
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ ai_credits: credits - 1 })
      .eq('id', user.id)

    if (updateError) {
      console.error("Error deducting AI credit:", updateError)
    }

    return { allowed: true, isPremium: false, creditsRemaining: credits - 1 }
  }

  // 5. Out of credits
  return { allowed: false, reason: 'no_credits' }
}
