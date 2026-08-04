import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// A pure public client that does NOT read cookies.
// Use this in Server Components (like the Homepage) when you only need to fetch public data
// and want Next.js to statically generate (SSG) the page for blazing fast performance.
export const createPublicClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key'
  )
}
