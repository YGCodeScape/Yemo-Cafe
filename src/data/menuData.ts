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
  temp: 'hot' | 'cold' | 'room'
  image: string
}

export type DrinkItem = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice: number
  offer?: number
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
    temp: 'cold',
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
    temp: 'cold',
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
    temp: 'cold',
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
    image: '/products/berry-mojito.jpg',
    category: 'mocktail',
  },
  {
    id: 'd3',
    name: 'Cold Brew',
    desc: 'Bold. Pure. Fresh.',
    price: 179,
    originalPrice: 210,
    image: '/products/cold-brew.jpg',
    category: 'coffee',
  },
  {
    id: 'd4',
    name: 'Cappuccino',
    desc: 'Smooth. Rich. Classic.',
    price: 199,
    originalPrice: 240,
    image: '/products/cappuccino.jpg',
    category: 'coffee',
  },
]

/** Sub-filter pills shown when Beverages tab is active */
export const BEVERAGE_FILTERS = ['All', 'Coffee', 'Mocktails', 'Shakes', 'Frappes', 'Tea'] as const
export type BeverageFilter = (typeof BEVERAGE_FILTERS)[number]
