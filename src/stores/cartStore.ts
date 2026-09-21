import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, MenuItem } from '@/types'

type CartStore = {
  items: CartItem[]
  tableId: string | null
  tableNumber: number | null
  addItem: (item: MenuItem, customizations?: CartItem['customizations']) => void
  removeItem: (menuItemId: string) => void
  updateQty: (menuItemId: string, qty: number) => void
  clearCart: () => void
  setTable: (id: string, number: number) => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      tableId: null,
      tableNumber: null,

      addItem: (menuItem, customizations = {}) => {
        set((state) => {
          const existing = state.items.find(i => i.menuItem.id === menuItem.id)
          if (existing) {
            return {
              items: state.items.map(i =>
                i.menuItem.id === menuItem.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return { items: [...state.items, { menuItem, quantity: 1, customizations }] }
        })
      },

      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter(i => i.menuItem.id !== menuItemId),
        })),

      updateQty: (menuItemId, qty) =>
        set((state) => ({
          items: qty <= 0
            ? state.items.filter(i => i.menuItem.id !== menuItemId)
            : state.items.map(i =>
                i.menuItem.id === menuItemId ? { ...i, quantity: qty } : i
              ),
        })),

      clearCart: () => set({ items: [] }),

      setTable: (id, number) => set({ tableId: id, tableNumber: number }),

      total: () => get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'yemo-cart' }
  )
)
