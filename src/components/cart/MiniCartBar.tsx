'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

export default function MiniCartBar() {
  const items = useCartStore(state => state.items)
  const openCart = useCartStore(state => state.openCart)
  const isCartOpen = useCartStore(state => state.isCartOpen)
  const selectedProduct = useCartStore(state => state.selectedProduct)

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Don't show if cart is empty or if product detail modal or full cart drawer is open
  if (items.length === 0 || isCartOpen || selectedProduct) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="fixed bottom-20 inset-x-4 z-40 max-w-[400px] mx-auto"
      >
        <div className="flex items-center justify-between bg-[#1C120C]/95 text-white p-3.5 pl-4 rounded-full shadow-2xl border border-white/10 backdrop-blur-md">
          {/* Left info */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-[#D4956A] flex items-center justify-center shrink-0 shadow-sm">
              <ShoppingBag size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#2C1A0E] text-[10px] font-bold flex items-center justify-center shadow-sm">
                {totalQuantity}
              </span>
            </div>
            <div>
              <p className="text-[11px] text-white/70 font-medium">
                {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} Added
              </p>
              <p className="text-[15px] font-bold text-white leading-none">
                &#x20b9;{totalPrice}
              </p>
            </div>
          </div>

          {/* Right CTA */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-[#D4956A] hover:bg-[#c3845b] text-white text-[13px] font-bold px-4 py-2.5 rounded-full shadow-md active:scale-95 transition-all"
          >
            <span>Continue</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
