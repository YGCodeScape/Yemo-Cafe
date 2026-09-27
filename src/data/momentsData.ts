  export type MomentItem = {
  id: string
  type: 'video' | 'photo'
  title: string
  tag: string
  timeAgo: string
  mediaUrl?: string      // video mp4 url if type === 'video'
  posterUrl: string     // image path used as photo or video poster
  caption: string
  likes: number
}

export const YEMO_MOMENTS: MomentItem[] = [
  {
    id: 'm1',
    type: 'video',
    title: 'The Morning Rosetta',
    tag: 'Barista Craft ☕',
    timeAgo: 'Just now',
    // Using high reliability vertical video stream; gracefully falls back to poster if network is offline
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-making-a-latte-art-coffee-42998-large.mp4',
    posterUrl: '/moments/moment_barista.jpg',
    caption: 'Silky textured microfoam poured over a double espresso shot.',
    likes: 342,
  },
  {
    id: 'm2',
    type: 'photo',
    title: 'Warm from the Oven',
    tag: 'Bakery Fresh 🥐',
    timeAgo: '25m ago',
    posterUrl: '/moments/moment_bakery.jpg',
    caption: 'Flaky butter croissants & pain au chocolat baked every morning at 7 AM.',
    likes: 518,
  },
  {
    id: 'm3',
    type: 'photo',
    title: 'Sunlit Reading Nook',
    tag: 'Café Vibe 🌿',
    timeAgo: '1h ago',
    posterUrl: '/moments/moment_interior.jpg',
    caption: 'Quiet corners, warm oak tables and gentle morning sunlight.',
    likes: 420,
  },
  {
    id: 'm4',
    type: 'photo',
    title: 'Twilight Terrace Hours',
    tag: 'Evening Mood ✨',
    timeAgo: '2h ago',
    posterUrl: '/moments/moment_evening.jpg',
    caption: 'String fairy lights, cool evening breeze & warm conversations.',
    likes: 679,
  },
  {
    id: 'm5',
    type: 'photo',
    title: 'Artisan Summer Fizz',
    tag: 'Chilled Sips 🍓',
    timeAgo: '4h ago',
    posterUrl: '/moments/moment_beverage.jpg',
    caption: 'Hand-muddled strawberry mojito garnished with fresh mountain mint.',
    likes: 295,
  },
]
