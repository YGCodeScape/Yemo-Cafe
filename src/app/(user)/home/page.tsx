import { cookies } from 'next/headers'
import HomeClient from './HomeClient'

export default async function HomePage() {
  let profile = null
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('yemo_session')
    if (sessionCookie?.value) {
      const parsed = JSON.parse(decodeURIComponent(sessionCookie.value))
      profile = {
        name: parsed.name || 'there',
        email: parsed.email || '',
      }
    }
  } catch {
    profile = null
  }
  return <HomeClient profile={profile} />
}
