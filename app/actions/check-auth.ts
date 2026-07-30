'use server'

import { createClient } from '@/lib/supabase/server'

export async function checkIsAuthenticated() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return !!user
}
