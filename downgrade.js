require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function downgrade() {
  const { error } = await supabase
    .from('profiles')
    .update({ 
      premium_plan: 'free', 
      ai_credits: 7, 
      is_admin: false 
    })
    .eq('email', 'yasinbalochofficial@gmail.com')
    
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Successfully downgraded yasinbalochofficial to free user.')
  }
}

downgrade()
