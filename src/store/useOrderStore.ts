import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './useCartStore'

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'on_the_way' | 'served' | 'completed'

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  size?: string
  quantity: number
  extras?: { name: string; price: number }[]
}

export interface Order {
  id: string
  orderNumber: string
  tableNumber: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: OrderStatus
  placedAt: string
  estimatedTime?: string
  rating?: number
  feedbackNote?: string
}

export const ORDER_STATUS_STEPS: { key: OrderStatus; label: string; sublabel: string; stepNumber: number }[] = [
  { key: 'placed', label: 'Order Placed', sublabel: 'Received by café kitchen', stepNumber: 1 },
  { key: 'confirmed', label: 'Order Confirmed', sublabel: 'Barista accepted your order', stepNumber: 2 },
  { key: 'preparing', label: 'Preparing', sublabel: 'Kitchen/bar is crafting your items', stepNumber: 3 },
  { key: 'on_the_way', label: 'On the Way', sublabel: 'Staff is bringing it to your table', stepNumber: 4 },
  { key: 'served', label: 'Served', sublabel: 'Delivered fresh to your table', stepNumber: 5 },
  { key: 'completed', label: 'Completed', sublabel: 'Order session finished', stepNumber: 6 },
]

interface OrderState {
  orders: Order[]
  activeTrackerModalId: string | null
  pastDetailModalId: string | null

  // Actions
  setOrderStatus: (orderId: string, status: OrderStatus) => void
  setOrderRating: (orderId: string, rating: number, note?: string) => void
  openLiveTracker: (orderId: string) => void
  closeLiveTracker: () => void
  openPastDetail: (orderId: string) => void
  closePastDetail: () => void
  createOrderFromCart: (cartItems: CartItem[], tableNumber: string) => string
  clearAllOrders: () => void
}

// Automatic live kitchen simulation schedule (in seconds)
const SIMULATION_TIMERS = new Map<string, NodeJS.Timeout[]>()

function scheduleOrderProgression(
  orderId: string,
  updateStatus: (id: string, st: OrderStatus) => void
) {
  // Clear any existing timers for this order
  const existing = SIMULATION_TIMERS.get(orderId)
  if (existing) {
    existing.forEach(clearTimeout)
  }

  const timers: NodeJS.Timeout[] = []

  // 1. Placed -> Confirmed after 8s
  timers.push(
    setTimeout(() => {
      updateStatus(orderId, 'confirmed')
    }, 8000)
  )

  // 2. Confirmed -> Preparing after 20s
  timers.push(
    setTimeout(() => {
      updateStatus(orderId, 'preparing')
    }, 20000)
  )

  // 3. Preparing -> On The Way after 40s
  timers.push(
    setTimeout(() => {
      updateStatus(orderId, 'on_the_way')
    }, 40000)
  )

  // 4. On The Way -> Served after 60s
  timers.push(
    setTimeout(() => {
      updateStatus(orderId, 'served')
    }, 60000)
  )

  SIMULATION_TIMERS.set(orderId, timers)
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      activeTrackerModalId: null,
      pastDetailModalId: null,

      setOrderStatus: (orderId: string, status: OrderStatus) => {
        set({
          orders: get().orders.map(order => 
            order.id === orderId ? { ...order, status } : order
          )
        })
      },

      setOrderRating: (orderId: string, rating: number, note?: string) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId ? { ...order, rating, feedbackNote: note || order.feedbackNote } : order
          )
        })
      },

      openLiveTracker: (orderId: string) => {
        set({ activeTrackerModalId: orderId })
      },

      closeLiveTracker: () => {
        set({ activeTrackerModalId: null })
      },

      openPastDetail: (orderId: string) => {
        set({ pastDetailModalId: orderId })
      },

      closePastDetail: () => {
        set({ pastDetailModalId: null })
      },

      createOrderFromCart: (cartItems: CartItem[], tableNumber: string) => {
        const nextOrderNum = Math.floor(1001 + Math.random() * 8999)
        const orderId = `ord-${nextOrderNum}`
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const tax = Math.round(subtotal * 0.05)
        const total = subtotal + tax

        const now = new Date()
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const placedAt = `Today, ${timeStr}`

        const newOrder: Order = {
          id: orderId,
          orderNumber: `#YMO-${nextOrderNum}`,
          tableNumber: tableNumber || 'Table 12',
          status: 'placed',
          placedAt,
          estimatedTime: '8–12 mins',
          items: cartItems.map((ci, idx) => ({
            id: `item-${orderId}-${idx}`,
            productId: ci.productId,
            name: ci.name,
            price: ci.price,
            image: ci.image || '/products/cappuccino.jpg',
            size: ci.size,
            quantity: ci.quantity,
            extras: ci.extras,
          })),
          subtotal,
          tax,
          total,
        }

        set({
          orders: [newOrder, ...get().orders],
          activeTrackerModalId: newOrder.id,
        })

        // Automatically simulate live kitchen workflow progress in the background
        scheduleOrderProgression(newOrder.id, (id, st) => {
          get().setOrderStatus(id, st)
        })

        return orderId
      },

      clearAllOrders: () => {
        // Clear simulation timers
        SIMULATION_TIMERS.forEach(timers => timers.forEach(clearTimeout))
        SIMULATION_TIMERS.clear()
        set({ orders: [], activeTrackerModalId: null, pastDetailModalId: null })
      }
    }),
    {
      name: 'yemo_orders_store',
      partialize: (state) => ({ orders: state.orders })
    }
  )
)
