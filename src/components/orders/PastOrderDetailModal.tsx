'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  RotateCcw, 
  Download, 
  Share2, 
  CheckCircle2, 
  Coffee,
  Sparkles
} from 'lucide-react'
import { Order, useOrderStore } from '@/store/useOrderStore'
import { useCartStore } from '@/store/useCartStore'

interface PastOrderDetailModalProps {
  order: Order
  onClose: () => void
}

export default function PastOrderDetailModal({ order, onClose }: PastOrderDetailModalProps) {
  const addItem = useCartStore(state => state.addItem)
  const openCart = useCartStore(state => state.openCart)
  const showToast = useCartStore(state => state.showToast)
  const [copied, setCopied] = useState(false)

  const handleOrderAgain = () => {
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
      `Reordered from ${order.orderNumber}`
    )
    onClose()
    openCart()
  }

  const handleShareReceipt = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs overscroll-contain">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-[430px] h-full sm:h-[90vh] bg-[#FDFAF6] sm:rounded-t-[36px] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#FDFAF6]/90 backdrop-blur-md px-4 py-3.5 border-b border-[#EFE7DE] flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="text-center">
            <h1
              className="text-[17px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Order Details
            </h1>
            <p className="text-[11px] text-[#8C7362] font-medium">
              {order.tableNumber} · {order.orderNumber}
            </p>
          </div>

          <button
            onClick={handleShareReceipt}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#7A6251] shadow-xs active:scale-95"
            aria-label="Share"
          >
            <Share2 size={16} />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar pb-24">
          
          {/* Receipt Header Badge */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs text-center relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-700">
              <CheckCircle2 size={24} />
            </div>
            <h2
              className="text-[20px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Order Delivered &amp; Paid
            </h2>
            <p className="text-[12px] text-[#7A6251] mt-0.5">
              {order.placedAt} · {order.tableNumber}
            </p>

            {order.rating && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9EFE6] border border-[#E8D4C5] rounded-full text-[12px] font-bold text-[#8C4A28] mt-3">
                <Coffee size={13} className="fill-[#8C4A28]" />
                <span>You rated this order {order.rating}.0 / 5.0</span>
              </div>
            )}
          </div>

          {/* Items breakdown */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#9E8777] mb-3">
              Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            <div className="divide-y divide-[#F2ECE5]">
              {order.items.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F2ECE5] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#2C1A0E]">
                        {item.quantity}x {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7362]">
                        {item.size || 'Standard'}
                        {item.extras && item.extras.length > 0 && ` · +${item.extras.map(e => e.name).join(', ')}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#2C1A0E]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="pt-4 border-t border-[#EDE2D5] space-y-2 text-[13px]">
              <div className="flex justify-between text-[#8C7362]">
                <span>Items Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#8C7362]">
                <span>Café Tax &amp; GST (5%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-[16px] text-[#2C1A0E] pt-2 border-t border-[#F2ECE5]">
                <span>Total Paid</span>
                <span>₹{order.total}</span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-4 pt-3 border-t border-[#EDE2D5] flex items-center justify-between text-[11px] text-[#8C7362]">
              <span>Payment Mode</span>
              <span className="font-semibold text-[#2C1A0E]">UPI / In-Café (Settled)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3.5 border-t border-[#EFE7DE] shadow-lg flex gap-2.5">
          <button
            onClick={handleShareReceipt}
            className="flex-1 bg-[#F5EDE4] hover:bg-[#EAE0D5] text-[#2C1A0E] py-3 rounded-full text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <Download size={15} />
            <span>Download Bill</span>
          </button>

          <button
            onClick={handleOrderAgain}
            className="flex-1 bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3 rounded-full text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
          >
            <RotateCcw size={15} />
            <span>Order Again</span>
          </button>
        </div>

        {/* Copied Toast */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A0E] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-xl"
            >
              Receipt downloaded to device!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
