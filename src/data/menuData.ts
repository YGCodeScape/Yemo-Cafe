// ─────────────────────────────────────────────────────────────────────────────
// yemo° Menu Mock Data
// Replace with real Supabase queries once the menu_items table is populated.
// ─────────────────────────────────────────────────────────────────────────────

export type SpecialItem = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice: number
  offer: number
  rating: number
  reviewsCount?: string
  tag?: string
  temp: 'hot' | 'cold' | 'room'
  features?: string[]
  image: string
}

export type DrinkItem = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice: number
  offer?: number
  rating?: number
  reviewsCount?: string
  tag?: string
  temp?: 'hot' | 'cold' | 'room'
  features?: string[]
  image: string
  category: 'coffee' | 'mocktail' | 'shake' | 'frappe' | 'tea' | 'food'
}

/** Carousel specials — illustrated transparent-bg product images */
export const SPECIALS: SpecialItem[] = [
  {
    id: 's1',
    name: 'Iced Caramel Latte',
    desc: 'Chilled espresso, caramel, fresh milk.',
    price: 249,
    originalPrice: 310,
    offer: 20,
    rating: 4.8,
    reviewsCount: '2.4k reviews',
    tag: 'Popular 🌟',
    temp: 'cold',
    features: ['❄️ Chilled Cold', '🥛 Contains Milk', '🍯 Caramel Drizzle'],
    image: '/specials/iced-caramel-latte.png',
  },
  {
    id: 's2',
    name: 'Matcha Green Latte',
    desc: 'Premium matcha, oat milk, light sweetness.',
    price: 229,
    originalPrice: 280,
    offer: 18,
    rating: 4.7,
    reviewsCount: '1.9k reviews',
    tag: 'Chef Special ✨',
    temp: 'cold',
    features: ['🌿 Organic Matcha', '🌾 Oat Milk', '✨ Anti-oxidant'],
    image: '/specials/matcha-latte.png',
  },
  {
    id: 's3',
    name: 'Berry Blast Mojito',
    desc: 'Mixed berries, fresh mint, sparkling soda.',
    price: 199,
    originalPrice: 249,
    offer: 20,
    rating: 4.9,
    reviewsCount: '3.1k reviews',
    tag: 'Refreshing 🍃',
    temp: 'cold',
    features: ['🍓 Real Berries', '🍃 Fresh Mint', '✨ Sparkling Soda'],
    image: '/specials/berry-mojito.png',
  },
]

/** Popular drinks — card illustrations with warm backgrounds */
export const POPULAR_DRINKS: DrinkItem[] = [
  {
    id: 'd1',
    name: 'Iced Caramel Latte',
    desc: 'Creamy. Nutty. Irresistible.',
    price: 249,
    originalPrice: 310,
    offer: 20,
    rating: 4.8,
    reviewsCount: '2.4k reviews',
    tag: 'Popular 🌟',
    temp: 'cold',
    features: ['❄️ Cold Brew', '🥛 Creamy Milk', '🍯 Rich Caramel'],
    image: '/products/caramel-latte.jpg',
    category: 'coffee',
  },
  {
    id: 'd2',
    name: 'Berry Blast Mojito',
    desc: 'Fresh. Fruity. Refreshing.',
    price: 199,
    originalPrice: 280,
    offer: 15,
    rating: 4.9,
    reviewsCount: '3.1k reviews',
    tag: 'Trending 🔥',
    temp: 'cold',
    features: ['🍓 Berry Fusion', '🍃 Fresh Mint', '🧊 Extra Chilled'],
    image: '/products/berry-mojito.jpg',
    category: 'mocktail',
  },
  {
    id: 'd3',
    name: 'Cold Brew',
    desc: 'Bold. Pure. Fresh.',
    price: 179,
    originalPrice: 210,
    rating: 4.6,
    reviewsCount: '1.2k reviews',
    tag: 'Bestseller 🏆',
    temp: 'cold',
    features: ['☕ 18hr Steeped', '🌿 100% Arabica', '⚡ High Caffeine'],
    image: '/products/cold-brew.jpg',
    category: 'coffee',
  },
  {
    id: 'd4',
    name: 'Cappuccino',
    desc: 'Smooth. Rich. Classic.',
    price: 199,
    originalPrice: 240,
    rating: 4.8,
    reviewsCount: '2.8k reviews',
    tag: 'Classic ☕',
    temp: 'hot',
    features: ['☕ Hot Espresso', '🥛 Steamed Foam', '🍫 Cocoa Dusting'],
    image: '/products/cappuccino.jpg',
    category: 'coffee',
  },
]

/** Food & Bakery items */
export const POPULAR_FOOD: DrinkItem[] = [
  {
    id: 'f1',
    name: 'Butter Croissant',
    desc: 'Golden. Flaky. Freshly Baked.',
    price: 149,
    originalPrice: 180,
    offer: 15,
    rating: 4.9,
    reviewsCount: '1.5k reviews',
    tag: 'Bestseller 🥐',
    temp: 'room',
    features: ['🥐 Freshly Baked', '🧈 French Butter', '✨ Warm & Flaky'],
    image: '/products/croissant.jpg',
    category: 'food',
  },
  {
    id: 'f2',
    name: 'Paneer Tikka Sandwich',
    desc: 'Smoky. Cheesy. Grilled.',
    price: 199,
    originalPrice: 240,
    offer: 17,
    rating: 4.8,
    reviewsCount: '2.1k reviews',
    tag: 'Hot Pick 🔥',
    temp: 'hot',
    features: ['🥪 Whole Wheat', '🧀 Melted Cheese', '🌶️ Smoky Tikka'],
    image: '/products/sandwich.jpg',
    category: 'food',
  },
  {
    id: 'f3',
    name: 'Chocolate Lava Doughnut',
    desc: 'Rich. Decadent. Glazed.',
    price: 159,
    originalPrice: 190,
    rating: 4.9,
    reviewsCount: '3.4k reviews',
    tag: 'Chef Special 🍩',
    temp: 'room',
    features: ['🍫 Dark Chocolate', '✨ Gooey Center', '🍩 Soft Dough'],
    image: '/products/doughnut.jpg',
    category: 'food',
  },
]

/** Sub-filter pills shown when Beverages filter is active */
export const BEVERAGE_FILTERS = ['All', 'Coffee', 'Mocktails', 'Shakes', 'Frappes', 'Tea'] as const
export type BeverageFilter = (typeof BEVERAGE_FILTERS)[number]

