require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkProfiles() {
  const { data: profiles, error } = await supabase.from('profiles').select('email, premium_plan')
  if (error) {
    console.error('Profile Error:', error)
    return
  }
  
  profiles.forEach(p => {
    console.log(`Email: ${p.email} | Premium Plan: ${p.premium_plan} | Type of Premium Plan: ${typeof p.premium_plan}`)
  })
}

checkProfiles()
