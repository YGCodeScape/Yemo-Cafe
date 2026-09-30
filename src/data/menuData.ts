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

export type PairingItem = {
  id: string
  label: string        // e.g. '⭐ Café Favourite'
  labelColor: string   // Tailwind/inline color for the pill
  reason: string       // Short mood line, e.g. 'Morning favourite'
  tagline: string      // Longer persuasive line
  drink: { id: string; name: string; emoji: string; image: string; price: number }
  food: { id: string; name: string; emoji: string; image: string; price: number }
  comboPrice: number   // Final bundled combo price (e.g. 329)
  originalPrice?: number // Pre-discount total price (e.g. 398)
  discountPercentage?: number // Discount % (e.g. 20)
  saveAmount?: number  // Direct savings in Rs (e.g. 69)
  saveTag?: string     // Custom badge text like 'Save up to 20%'
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

/** Perfect Pairings — curated combos that feel like café recommendations */
export const PAIRINGS: PairingItem[] = [
  {
    id: 'p1',
    label: '⭐ Café Favourite',
    labelColor: '#D4956A',
    reason: 'Morning favourite',
    tagline: `Sweet + buttery — a café regular's go-to.`,
    drink: {
      id: 's1',
      name: 'Iced Caramel Latte',
      emoji: '☕',
      image: '/specials/iced-caramel-latte.png',
      price: 249,
    },
    food: {
      id: 'f1',
      name: 'Butter Croissant',
      emoji: '🥐',
      image: '/products/croissant.jpg',
      price: 149,
    },
    comboPrice: 329,
    originalPrice: 398,
    discountPercentage: 20,
    saveAmount: 69,
    saveTag: 'Save up to 20%',
  },
  {
    id: 'p2',
    label: '❤️ Most Loved',
    labelColor: '#E8637A',
    reason: 'The crowd pleaser',
    tagline: 'Bold brew meets smoky comfort — an unbeatable duo.',
    drink: {
      id: 'd3',
      name: 'Cold Brew',
      emoji: '☕',
      image: '/products/cold-brew.jpg',
      price: 179,
    },
    food: {
      id: 'f2',
      name: 'Paneer Tikka Sandwich',
      emoji: '🥪',
      image: '/products/sandwich.jpg',
      price: 199,
    },
    comboPrice: 299,
    originalPrice: 378,
    discountPercentage: 20,
    saveAmount: 79,
    saveTag: 'Save up to 20%',
  },
  {
    id: 'p3',
    label: '☀️ Morning Pick',
    labelColor: '#F0A500',
    reason: 'Rise and shine',
    tagline: 'A bright start — light, fresh, and energising.',
    drink: {
      id: 's2',
      name: 'Matcha Green Latte',
      emoji: '🍵',
      image: '/specials/matcha-latte.png',
      price: 229,
    },
    food: {
      id: 'f1',
      name: 'Butter Croissant',
      emoji: '🥐',
      image: '/products/croissant.jpg',
      price: 149,
    },
    comboPrice: 299,
    originalPrice: 378,
    discountPercentage: 20,
    saveAmount: 79,
    saveTag: 'Save up to 20%',
  },
  {
    id: 'p4',
    label: '🍫 For Sweet Cravings',
    labelColor: '#7B4F2F',
    reason: 'Indulge a little',
    tagline: 'Fruity fizz + chocolate decadence pure bliss.',
    drink: {
      id: 's3',
      name: 'Berry Blast Mojito',
      emoji: '🍓',
      image: '/specials/berry-mojito.png',
      price: 199,
    },
    food: {
      id: 'f3',
      name: 'Choco Lava Doughnut',
      emoji: '🍩',
      image: '/products/doughnut.jpg',
      price: 159,
    },
    comboPrice: 289,
    originalPrice: 358,
    discountPercentage: 20,
    saveAmount: 69,
    saveTag: 'Save up to 20%',
  },
  {
    id: 'p5',
    label: '🌙 Evening Pair',
    labelColor: '#4F5FA0',
    reason: 'Wind down right',
    tagline: 'A warm classic to end your day the right way.',
    drink: {
      id: 'd4',
      name: 'Cappuccino',
      emoji: '☕',
      image: '/products/cappuccino.jpg',
      price: 199,
    },
    food: {
      id: 'f3',
      name: 'Choco Lava Doughnut',
      emoji: '🍩',
      image: '/products/doughnut.jpg',
      price: 159,
    },
    comboPrice: 289,
    originalPrice: 358,
    discountPercentage: 20,
    saveAmount: 69,
    saveTag: 'Save up to 20%',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Menu Page Extended Types & Dataset
// ─────────────────────────────────────────────────────────────────────────────

export type DietaryOption = 'vegetarian' | 'vegan'
export type TempOption = 'hot' | 'cold' | 'room'
export type TasteOption = 'sweet' | 'strong' | 'creamy'
export type MenuCategory = 'all' | 'coffee' | 'cold' | 'tea' | 'food' | 'bakery' | 'desserts'
export type SubCategory = 'signature' | 'hot' | 'cold' | 'specialty' | 'classic' | 'sweet'

export type MenuItem = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice?: number
  offer?: number
  rating?: number
  reviewsCount?: string
  tag?: string
  temp: TempOption
  dietary: DietaryOption
  taste: TasteOption[]
  tasteNotes: string // e.g. "Creamy • Sweet • Cold"
  image: string
  category: MenuCategory
  subCategory?: SubCategory
  features?: string[]
}

export type RecentOrder = {
  id: string
  name: string
  price: number
  image: string
  desc: string
  menuItem: MenuItem
}

export const MENU_ITEMS: MenuItem[] = [
  // ── Signature Coffee ──
  {
    id: 'm-mocha',
    name: 'Iced Chocolate Mocha',
    desc: 'Rich dark espresso melted with Belgian chocolate and cold foam.',
    price: 220,
    originalPrice: 260,
    offer: 15,
    rating: 4.9,
    reviewsCount: '2.1k reviews',
    tag: '⭐ Best Seller',
    temp: 'cold',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Creamy • Sweet • Cold',
    image: '/products/mocha.jpg',
    category: 'coffee',
    subCategory: 'signature',
    features: ['🍫 Belgian Chocolate', '☕ Double Espresso', '🧊 Cold Foam'],
  },
  {
    id: 'd1',
    name: 'Iced Caramel Latte',
    desc: 'Chilled espresso, golden caramel swirl, and velvety milk.',
    price: 249,
    originalPrice: 310,
    offer: 20,
    rating: 4.8,
    reviewsCount: '2.4k reviews',
    tag: '⭐ Best Seller',
    temp: 'cold',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Creamy • Sweet • Cold',
    image: '/products/caramel-latte.jpg',
    category: 'coffee',
    subCategory: 'signature',
    features: ['❄️ Cold Brew', '🥛 Creamy Milk', '🍯 Rich Caramel'],
  },
  {
    id: 'm-vanilla-latte',
    name: 'Iced Vanilla Latte',
    desc: 'Espresso poured over house-made vanilla bean syrup & fresh milk.',
    price: 239,
    originalPrice: 280,
    offer: 14,
    rating: 4.8,
    reviewsCount: '1.6k reviews',
    tag: 'Popular',
    temp: 'cold',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Sweet • Creamy • Cold',
    image: '/products/vanilla-latte.jpg',
    category: 'coffee',
    subCategory: 'signature',
    features: ['✨ Madagascar Vanilla', '🥛 Fresh Milk', '☕ Smooth Espresso'],
  },

  // ── Hot Coffee ──
  {
    id: 'm-americano',
    name: 'Caffe Americano',
    desc: 'Bold double espresso shot topped with steaming hot water.',
    price: 160,
    originalPrice: 190,
    rating: 4.7,
    reviewsCount: '980 reviews',
    tag: 'Classic',
    temp: 'hot',
    dietary: 'vegan',
    taste: ['strong'],
    tasteNotes: 'Bold • Strong • Hot',
    image: '/products/americano.jpg',
    category: 'coffee',
    subCategory: 'hot',
    features: ['☕ 100% Arabica', '🔥 Steaming Hot', '⚡ High Caffeine'],
  },
  {
    id: 'd4',
    name: 'Classic Cappuccino',
    desc: 'Equal parts dark espresso, steamed milk, and velvety foam.',
    price: 199,
    originalPrice: 240,
    rating: 4.8,
    reviewsCount: '2.8k reviews',
    tag: 'Classic',
    temp: 'hot',
    dietary: 'vegetarian',
    taste: ['strong', 'creamy'],
    tasteNotes: 'Rich • Creamy • Hot',
    image: '/products/cappuccino.jpg',
    category: 'coffee',
    subCategory: 'hot',
    features: ['☕ Hot Espresso', '🥛 Steamed Foam', '🍫 Cocoa Dusting'],
  },

  // ── Cold Coffee ──
  {
    id: 'd3',
    name: 'Nitro Cold Brew',
    desc: '18-hour slow steep, naturally sweet, smooth and bold.',
    price: 179,
    originalPrice: 210,
    rating: 4.6,
    reviewsCount: '1.2k reviews',
    tag: 'Bestseller',
    temp: 'cold',
    dietary: 'vegan',
    taste: ['strong'],
    tasteNotes: 'Bold • Strong • Cold',
    image: '/products/cold-brew.jpg',
    category: 'coffee',
    subCategory: 'cold',
    features: ['☕ 18hr Steeped', '🌿 100% Arabica', '⚡ High Caffeine'],
  },

  // ── Cold / Refreshers ──
  {
    id: 'd2',
    name: 'Berry Blast Mojito',
    desc: 'Muddled fresh berries, mint leaves, lime and bubbly sparkling soda.',
    price: 199,
    originalPrice: 249,
    offer: 20,
    rating: 4.9,
    reviewsCount: '3.1k reviews',
    tag: 'Trending 🔥',
    temp: 'cold',
    dietary: 'vegan',
    taste: ['sweet'],
    tasteNotes: 'Fruity • Sweet • Cold',
    image: '/products/berry-mojito.jpg',
    category: 'cold',
    subCategory: 'cold',
    features: ['🍓 Real Berries', '🍃 Fresh Mint', '✨ Sparkling Soda'],
  },

  // ── Tea ──
  {
    id: 's2',
    name: 'Matcha Green Latte',
    desc: 'Ceremonial grade Japanese matcha whisked with warm oat milk.',
    price: 229,
    originalPrice: 280,
    offer: 18,
    rating: 4.7,
    reviewsCount: '1.9k reviews',
    tag: 'Chef Special ✨',
    temp: 'cold',
    dietary: 'vegan',
    taste: ['creamy', 'sweet'],
    tasteNotes: 'Creamy • Earthy • Cold',
    image: '/specials/matcha-latte.png',
    category: 'tea',
    subCategory: 'signature',
    features: ['🌿 Organic Matcha', '🌾 Oat Milk', '✨ Anti-oxidant'],
  },

  // ── Food ──
  {
    id: 'f2',
    name: 'Paneer Tikka Sandwich',
    desc: 'Smoky grilled paneer slices, mint chutney, melted cheese in sourdough.',
    price: 199,
    originalPrice: 240,
    offer: 17,
    rating: 4.8,
    reviewsCount: '2.1k reviews',
    tag: 'Hot Pick 🔥',
    temp: 'hot',
    dietary: 'vegetarian',
    taste: ['strong'],
    tasteNotes: 'Savory • Warm • Cheesy',
    image: '/products/sandwich.jpg',
    category: 'food',
    subCategory: 'hot',
    features: ['🥪 Whole Wheat', '🧀 Melted Cheese', '🌶️ Smoky Tikka'],
  },

  // ── Bakery ──
  {
    id: 'f1',
    name: 'French Butter Croissant',
    desc: 'Golden flaky layers with pure French butter, baked fresh every morning.',
    price: 149,
    originalPrice: 180,
    offer: 15,
    rating: 4.9,
    reviewsCount: '1.5k reviews',
    tag: 'Bestseller 🥐',
    temp: 'room',
    dietary: 'vegetarian',
    taste: ['creamy'],
    tasteNotes: 'Flaky • Buttery • Warm',
    image: '/products/croissant.jpg',
    category: 'bakery',
    subCategory: 'classic',
    features: ['🥐 Freshly Baked', '🧈 French Butter', '✨ Warm & Flaky'],
  },
  {
    id: 'm-choco-croissant',
    name: 'Chocolate Croissant',
    desc: 'Crisp pastry layered with melted Belgian chocolate & dusted sugar.',
    price: 189,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: '2.3k reviews',
    tag: 'Favourite 🍫',
    temp: 'room',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Flaky • Sweet • Decadent',
    image: '/products/choco-croissant.jpg',
    category: 'bakery',
    subCategory: 'classic',
    features: ['🍫 Belgian Chocolate', '🥐 Flaky Crust', '✨ Oven Warmed'],
  },

  // ── Desserts ──
  {
    id: 'm-cheesecake',
    name: 'Basque Burnt Cheesecake',
    desc: 'Caramelized rustic burnt crust with an ultra velvety molten center.',
    price: 249,
    originalPrice: 290,
    rating: 4.9,
    reviewsCount: '1.8k reviews',
    tag: 'Must Try 🍰',
    temp: 'cold',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Rich • Creamy • Sweet',
    image: '/products/cheesecake.jpg',
    category: 'desserts',
    subCategory: 'sweet',
    features: ['🧀 Cream Cheese', '🍮 Molten Center', '🔥 Burnt Top Crust'],
  },
  {
    id: 'f3',
    name: 'Chocolate Lava Doughnut',
    desc: 'Glazed brioche doughnut stuffed with warm dark chocolate ganache.',
    price: 159,
    originalPrice: 190,
    rating: 4.9,
    reviewsCount: '3.4k reviews',
    tag: 'Chef Special 🍩',
    temp: 'room',
    dietary: 'vegetarian',
    taste: ['sweet', 'creamy'],
    tasteNotes: 'Sweet • Creamy • Warm',
    image: '/products/doughnut.jpg',
    category: 'desserts',
    subCategory: 'sweet',
    features: ['🍫 Dark Chocolate', '✨ Gooey Center', '🍩 Soft Dough'],
  },
]

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: 'ro-1',
    name: 'Iced Caramel Latte',
    price: 249,
    image: '/products/caramel-latte.jpg',
    desc: 'Chilled espresso, caramel',
    menuItem: MENU_ITEMS.find(m => m.id === 'd1') || MENU_ITEMS[1],
  },
  {
    id: 'ro-2',
    name: 'Chocolate Croissant',
    price: 189,
    image: '/products/choco-croissant.jpg',
    desc: 'Flaky pastry, Belgian chocolate',
    menuItem: MENU_ITEMS.find(m => m.id === 'm-choco-croissant') || MENU_ITEMS[9],
  },
]

export const CATEGORY_TABS: { id: MenuCategory; label: string; icon?: string }[] = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'cold', label: 'Cold', icon: '🧊' },
  { id: 'tea', label: 'Tea', icon: '🍵' },
  { id: 'food', label: 'Food', icon: '🥪' },
  { id: 'bakery', label: 'Bakery', icon: '🥐' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
]

export const CATEGORY_HEADERS: Record<
  MenuCategory,
  {
    title: string
    subtitle: string
    subSections?: { title: string; subCategory: SubCategory }[]
  }
> = {
  all: {
    title: 'Explore All',
    subtitle: 'From bold espresso to silky lattes and fresh bakes.',
  },
  coffee: {
    title: 'Coffee',
    subtitle: 'From bold espresso to silky lattes.',
    subSections: [
      { title: 'Signature Coffee', subCategory: 'signature' },
      { title: 'Hot Coffee', subCategory: 'hot' },
      { title: 'Cold Coffee', subCategory: 'cold' },
    ],
  },
  cold: {
    title: 'Cold Brews & Refreshers',
    subtitle: 'Slow steeped brews, iced teas, and sparking coolers.',
  },
  tea: {
    title: 'Teas & Matcha',
    subtitle: 'Ceremonial matcha, artisan herbal brews, and comforting warmth.',
  },
  food: {
    title: 'Food & Savouries',
    subtitle: 'Toasted gourmet sandwiches, warm bowls, and savory delights.',
  },
  bakery: {
    title: 'Fresh Bakery',
    subtitle: 'Flaky French butter croissants and fresh oven-baked goods.',
  },
  desserts: {
    title: 'Sweet Delights',
    subtitle: 'Gourmet Basque cheesecakes, lava doughnuts, and sweet treats.',
  },
}

