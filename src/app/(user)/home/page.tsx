import { createClient } from '@/lib/supabase/server'
import HomeClient from './HomeClient'

export default async function HomePage() {
  let profile = null
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    profile = user ? {
      name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'there',
      email: user.email ?? '',
    } : null
  } catch {
    profile = null
  }
  return <HomeClient profile={profile} />
}
