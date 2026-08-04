require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function updateCredits() {
  console.log("Updating default credits...")
  
  // Update existing free users who have 5 credits to have 7 credits
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ ai_credits: 7 })
    .eq('ai_credits', 5)
    .eq('premium_plan', 'free')
    
  if (updateError) {
    console.error("Update Error:", updateError)
  } else {
    console.log("Successfully updated existing free users to 7 credits.")
  }
}

updateCredits()
