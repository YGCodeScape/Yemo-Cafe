'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

export default function AddToCartToast() {
  const toast = useCartStore(state => state.toast)
  const hideToast = useCartStore(state => state.hideToast)

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-[#1C120C]/95 text-white pl-4 pr-3 py-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md max-w-[340px]"
        >
          {/* Check icon badge */}
          <div className="w-8 h-8 rounded-full bg-[#D4956A] flex items-center justify-center shrink-0 shadow-md">
            <Check size={18} className="text-white" strokeWidth={3} />
          </div>

          {/* Text Info */}
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[13px] font-bold leading-tight">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-[11px] text-white/75 truncate mt-0.5">{toast.subtitle}</p>
            )}
          </div>

          {/* Product Thumbnail */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/20">
            <Image
              src={toast.image}
              alt="Product thumbnail"
              fill
              className="object-cover"
            />
          </div>

          {/* Dismiss button */}
          <button
            onClick={hideToast}
            className="text-white/50 hover:text-white p-1 focus:outline-none"
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
