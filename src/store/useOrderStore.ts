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

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: '#YMO-1042',
    tableNumber: 'Table 07',
    status: 'preparing',
    placedAt: 'Today, 04:32 PM',
    estimatedTime: '8–10 mins',
    items: [
      {
        id: 'ord-item-1',
        productId: 'iced-caramel-latte',
        name: 'Iced Caramel Latte',
        price: 280,
        image: '/products/caramel-latte.jpg',
        size: 'Medium (350ml)',
        quantity: 1,
        extras: [{ name: 'Oat Milk', price: 40 }]
      },
      {
        id: 'ord-item-2',
        productId: 'choco-croissant',
        name: 'Chocolate Croissant',
        price: 220,
        image: '/products/croissant.jpg',
        size: 'Regular',
        quantity: 1,
      }
    ],
    subtotal: 500,
    tax: 25,
    total: 525,
  },
  {
    id: 'ord-1041',
    orderNumber: '#YMO-1041',
    tableNumber: 'Table 07',
    status: 'completed',
    placedAt: 'Today, 02:15 PM',
    items: [
      {
        id: 'ord-item-3',
        productId: 'cappuccino',
        name: 'Artisan Cappuccino',
        price: 220,
        image: '/products/cappuccino.jpg',
        size: 'Medium (300ml)',
        quantity: 2,
      },
      {
        id: 'ord-item-4',
        productId: 'cheesecake',
        name: 'New York Cheesecake',
        price: 280,
        image: '/products/cheesecake.jpg',
        size: 'Slice',
        quantity: 1,
      }
    ],
    subtotal: 720,
    tax: 36,
    total: 756,
    rating: 5,
  },
  {
    id: 'ord-1039',
    orderNumber: '#YMO-1039',
    tableNumber: 'Table 04',
    status: 'completed',
    placedAt: 'Yesterday, 06:40 PM',
    items: [
      {
        id: 'ord-item-5',
        productId: 'vanilla-latte',
        name: 'Vanilla Bean Latte',
        price: 260,
        image: '/products/vanilla-latte.jpg',
        size: 'Regular (250ml)',
        quantity: 1,
      },
      {
        id: 'ord-item-6',
        productId: 'choco-croissant',
        name: 'Almond Croissant',
        price: 240,
        image: '/products/croissant.jpg',
        size: 'Regular',
        quantity: 1,
      }
    ],
    subtotal: 500,
    tax: 25,
    total: 525,
    rating: 4,
  }
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
  resetToMockOrders: () => void
  clearAllOrders: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_MOCK_ORDERS,
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
        const nextOrderNum = Math.floor(1043 + Math.random() * 900)
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
          tableNumber: tableNumber || 'Table 07',
          status: 'placed',
          placedAt,
          estimatedTime: '10–12 mins',
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

        return orderId
      },

      resetToMockOrders: () => {
        set({ orders: INITIAL_MOCK_ORDERS })
      },

      clearAllOrders: () => {
        set({ orders: [], activeTrackerModalId: null, pastDetailModalId: null })
      }
    }),
    {
      name: 'yemo_orders_store',
      partialize: (state) => ({ orders: state.orders })
    }
  )
)
