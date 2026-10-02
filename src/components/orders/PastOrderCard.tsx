'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Coffee, RotateCcw, Receipt, ChevronRight } from 'lucide-react'
import { Order, useOrderStore } from '@/store/useOrderStore'
import { useCartStore } from '@/store/useCartStore'

interface PastOrderCardProps {
  order: Order
}

export default function PastOrderCard({ order }: PastOrderCardProps) {
  const openPastDetail = useOrderStore(state => state.openPastDetail)
  const addItem = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  const showToast = useCartStore(state => state.showToast)

  const totalItemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleOrderAgain = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Re-add items to cart
    order.items.forEach(item => {
      addItem(
        {
          id: item.productId,
          name: item.name,
          desc: '',
          price: item.price,
          image: item.image,
        },
        item.size || 'Standard',
        item.extras || [],
        item.quantity
      )
    })
    showToast(
      'Items added to cart',
      order.items[0]?.image || '/products/cappuccino.jpg',
      `${totalItemsCount} items from ${order.orderNumber}`
    )
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EFE7DE] shadow-xs hover:border-[#D4956A]/40 transition-all cursor-pointer"
      onClick={() => openPastDetail(order.id)}
    >
      {/* Top row: Order ID, Table, Status, Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-[#2C1A0E]">
            {order.orderNumber}
          </span>
          <span className="text-[11px] font-semibold text-[#8C7362] px-2 py-0.5 rounded-md bg-[#FAF4ED] border border-[#EADCCF]">
            {order.tableNumber}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
            order.status === 'served'
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : 'bg-stone-50 text-stone-700 border-stone-200'
          }`}>
            {order.status === 'served' ? 'Served' : 'Completed'}
          </span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="text-[11px] text-[#A08878] mb-3">
        {order.placedAt}
      </div>

      {/* Thumbnails + Item Summary */}
      <div className="flex items-center justify-between mb-4 bg-[#FAF6F0] p-3 rounded-2xl border border-[#EDE2D4]">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Thumbnails row */}
          <div className="flex -space-x-2 shrink-0">
            {order.items.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="relative w-9 h-9 rounded-xl border-2 border-white overflow-hidden bg-[#EAE2D8] shadow-xs"
                style={{ zIndex: 10 - idx }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Names list */}
          <div className="truncate">
            <p className="text-[12px] font-bold text-[#2C1A0E] truncate">
              {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
            </p>
            <p className="text-[11px] text-[#8C7362]">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} · Total ₹{order.total}
            </p>
          </div>
        </div>

        {/* Rating preview */}
        {order.rating && (
          <div className="shrink-0 flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-[#E8DFC8]">
            <Coffee size={12} className="text-[#C87D55] fill-[#C87D55]" />
            <span className="text-[11px] font-bold text-[#2C1A0E]">
              {order.rating}.0
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons: Primary (View Details) & Secondary (Order Again) */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation()
            openPastDetail(order.id)
          }}
          className="flex-1 bg-[#F5EDE4] hover:bg-[#EAE0D5] text-[#2C1A0E] py-2.5 px-3 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <Receipt size={14} className="text-[#8C5E3C]" />
          <span>View Details</span>
        </button>

        <button
          onClick={handleOrderAgain}
          className="flex-1 bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-2.5 px-3 rounded-full text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
        >
          <RotateCcw size={13} />
          <span>Order Again</span>
        </button>
      </div>
    </motion.div>
  )
}
