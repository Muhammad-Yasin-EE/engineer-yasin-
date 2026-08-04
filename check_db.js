require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkProfiles() {
  const { data: users, error: authError } = await supabase.auth.admin.listUsers()
  if (authError) {
    console.error('Auth Error:', authError)
    return
  }

  const { data: profiles, error } = await supabase.from('profiles').select('*')
  if (error) {
    console.error('Profile Error:', error)
    return
  }
  
  users.users.forEach(u => {
    const p = profiles.find(p => p.id === u.id)
    console.log(`Email: ${u.email} | Credits: ${p?.ai_credits} | Admin: ${p?.is_admin} | Premium: ${p?.premium_plan}`)
  })
}

checkProfiles()
