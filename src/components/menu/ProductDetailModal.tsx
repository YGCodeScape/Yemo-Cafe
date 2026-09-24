'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Heart, Star } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

const SIZES = [
  { label: '200 ml', priceOffset: 0 },
  { label: '300 ml', priceOffset: 30 },
  { label: '400 ml', priceOffset: 60 },
]

export default function ProductDetailModal() {
  const product = useCartStore(state => state.selectedProduct)
  const closeProductDetail = useCartStore(state => state.closeProductDetail)
  const addItem = useCartStore(state => state.addItem)

  const [selectedSize, setSelectedSize] = useState('200 ml')
  const [fav, setFav] = useState(false)

  // Reset selection when product changes
  useEffect(() => {
    setSelectedSize('200 ml')
    setFav(false)
  }, [product?.id])

  if (!product) return null

  // Calculate size price adjustment
  const sizeObj = SIZES.find(s => s.label === selectedSize) ?? SIZES[0]
  const totalPrice = product.price + sizeObj.priceOffset

  const handleAddToCart = () => {
    addItem(
      {
        ...product,
        price: product.price + sizeObj.priceOffset,
      },
      selectedSize
    )
    closeProductDetail()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-[#FDFAF6] overflow-y-auto"
        style={{ minHeight: '100dvh' }}
      >
        {/* ── Top Floating Action Nav ── */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-5 pt-7">
          <button
            onClick={closeProductDetail}
            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label="Go back"
          >
            <ChevronLeft size={22} className="text-[#2C1A0E]" />
          </button>
          <button
            onClick={() => setFav(!fav)}
            className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label="Toggle favourite"
          >
            <Heart
              size={19}
              className={fav ? 'text-[#D4956A] fill-[#D4956A]' : 'text-[#2C1A0E]'}
            />
          </button>
        </div>

        {/* ── Top Hero Product Banner ── */}
        <div className="relative w-full bg-gradient-to-b from-[#E7D6C4] via-[#F4ECE2] to-[#FDFAF6] pt-16 pb-6 flex flex-col items-center justify-center overflow-hidden min-h-[340px]">
          {/* Discount Tag */}
          {product.offer && (
            <div className="absolute right-6 bottom-10 z-20 bg-[#D4956A] text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-lg">
              {product.offer}% OFF
            </div>
          )}

          {/* Decorative artistic background strokes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-72 h-72 rounded-full border-2 border-dashed border-[#6B3F2A]" />
          </div>

          {/* Big Hero Image */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="relative w-64 h-64 z-10"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* ── Bottom Content Info Sheet ── */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 bg-white rounded-t-[36px] px-6 pt-7 pb-28 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] border-t border-[#F0E6DC] -mt-6 z-20 flex flex-col"
        >
          {/* Title & Description */}
          <h1
            className="text-[26px] font-bold text-[#2C1A0E] leading-tight mb-1"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {product.name}
          </h1>
          <p className="text-[14px] text-[#8C7362] mb-3 leading-snug">{product.desc}</p>

          {/* Rating & Tag row */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center gap-1 bg-[#F5EDE4] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#2C1A0E]">
              <Star size={12} className="text-[#D4956A] fill-[#D4956A]" />
              <span>{product.rating ?? 4.8}</span>
              <span className="text-[#8C7362] font-normal">(2.4k reviews)</span>
            </div>
            <span className="bg-[#FFF4EC] text-[#D4956A] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#FAD6C2]/60">
              Popular 🌟
            </span>
          </div>

          {/* Price display */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-[26px] font-bold text-[#2C1A0E]">
              &#x20b9;{totalPrice}
            </span>
            {product.originalPrice && (
              <span className="text-[15px] text-[#A89080] line-through">
                &#x20b9;{product.originalPrice + sizeObj.priceOffset}
              </span>
            )}
          </div>

          {/* Feature Chips */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="bg-[#F2EAE1] text-[#6B3F2A] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              {product.temp === 'hot' ? '☕ Hot' : '❄️ Cold'}
            </span>
            <span className="bg-[#F2EAE1] text-[#6B3F2A] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              🥛 Contains Milk
            </span>
            <span className="bg-[#F2EAE1] text-[#6B3F2A] text-[12px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              🌡️ Medium
            </span>
          </div>

          {/* Choose Size Section */}
          <div className="mb-6">
            <h3 className="text-[14px] font-bold text-[#2C1A0E] mb-3">Choose Size</h3>
            <div className="flex items-center gap-3">
              {SIZES.map(s => {
                const isSelected = selectedSize === s.label
                return (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s.label)}
                    className={`relative flex-1 py-3 rounded-full text-[13px] font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#2C1A0E] text-white shadow-md'
                        : 'bg-[#F5EDE4] text-[#6B3F2A] hover:bg-[#EAE0D5]'
                    }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sticky Bottom Add to Cart CTA */}
          <div className="fixed bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#F0E6DC] z-40 max-w-[430px] mx-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#2C1A0E] hover:bg-[#1E110A] text-white text-[15px] font-bold py-4 rounded-full shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Add to Cart</span>
              <span>•</span>
              <span>&#x20b9;{totalPrice}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
