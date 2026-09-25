import { create } from 'zustand'

export type ExtraOption = {
  name: string
  price: number
}

export type CartItem = {
  id: string
  productId: string
  name: string
  price: number
  basePrice: number
  originalPrice?: number
  image: string
  size: string
  temp?: string
  extras: ExtraOption[]
  quantity: number
}

export type Product = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice?: number
  offer?: number
  rating?: number
  reviewsCount?: string
  tag?: string
  features?: string[]
  image: string
  category?: string
  temp?: 'hot' | 'cold' | 'room'
}

export type ToastInfo = {
  title: string
  subtitle?: string
  image: string
}

type CartState = {
  items: CartItem[]
  tableNumber: string
  selectedProduct: Product | null
  toast: ToastInfo | null
  isCartOpen: boolean

  // Actions
  openProductDetail: (product: Product) => void
  closeProductDetail: () => void
  addItem: (product: Product, size: string, extras?: ExtraOption[], quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  showToast: (title: string, image: string, subtitle?: string) => void
  hideToast: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  tableNumber: 'Table No. 1',
  selectedProduct: null,
  toast: null,
  isCartOpen: false,

  openProductDetail: (product) => set({ selectedProduct: product }),
  closeProductDetail: () => set({ selectedProduct: null }),

  addItem: (product, size, extras = [], quantity = 1) => {
    const extrasPrice = extras.reduce((acc, e) => acc + e.price, 0)
    const unitPrice = product.price + extrasPrice
    const extrasKey = extras.map(e => e.name).sort().join(',')
    const uniqueId = `${product.id}-${size}-${extrasKey}`

    const existingIndex = get().items.findIndex(item => item.id === uniqueId)

    if (existingIndex > -1) {
      const updatedItems = [...get().items]
      updatedItems[existingIndex].quantity += quantity
      set({ items: updatedItems })
    } else {
      const newItem: CartItem = {
        id: uniqueId,
        productId: product.id,
        name: product.name,
        price: unitPrice,
        basePrice: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size,
        temp: product.temp ?? 'cold',
        extras,
        quantity,
      }
      set({ items: [...get().items, newItem] })
    }

    // Trigger notification toast
    get().showToast('Added to Cart!', product.image, `${product.name} (${size})`)
  },

  removeItem: (id) => set({ items: get().items.filter(item => item.id !== id) }),

  updateQuantity: (id, delta) => {
    const items = get().items
      .map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      })
      .filter(Boolean) as CartItem[]

    set({ items })
  },

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  showToast: (title, image, subtitle) => {
    set({ toast: { title, image, subtitle } })
    setTimeout(() => {
      // Auto dismiss after 2.8s
      if (get().toast?.title === title) {
        set({ toast: null })
      }
    }, 2800)
  },

  hideToast: () => set({ toast: null }),
}))
