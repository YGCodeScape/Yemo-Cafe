import { Metadata } from 'next'
import ProfileClient from '@/components/profile/ProfileClient'

export const metadata: Metadata = {
  title: 'Profile & Rewards | Yemo Café',
  description: 'Your Yemo Club digital loyalty card, Yemo Beans rewards, and café preferences.',
}

export default function ProfilePage() {
  return <ProfileClient />
}
