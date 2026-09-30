'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Plus, Minus } from 'lucide-react'
import { useCartStore, Product } from '@/store/useCartStore'
import { MenuItem } from '@/data/menuData'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  item: MenuItem
}

export default function MenuProductCard({ item }: Props) {
  const [fav, setFav] = useState(false)

  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const openProductDetail = useCartStore((state) => state.openProductDetail)

  // Find all cart items for this product
  const matchingCartItems = items.filter((ci) => ci.productId === item.id)
  const totalQty = matchingCartItems.reduce((acc, ci) => acc + ci.quantity, 0)
  const primaryCartItem = matchingCartItems[0]

  const handleCardClick = () => {
    // Map MenuItem to Product
    const product: Product = {
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      originalPrice: item.originalPrice,
      offer: item.offer,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      tag: item.tag,
      features: item.features,
      image: item.image,
      category: item.category,
      temp: item.temp,
    }
    openProductDetail(product)
  }

  const handleAddDefault = (e: React.MouseEvent) => {
    e.stopPropagation()
    const product: Product = {
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      originalPrice: item.originalPrice,
      offer: item.offer,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      tag: item.tag,
      features: item.features,
      image: item.image,
      category: item.category,
      temp: item.temp,
    }
    addItem(product, 'Regular', [])
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (primaryCartItem) {
      updateQuantity(primaryCartItem.id, 1)
    } else {
      handleAddDefault(e)
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (primaryCartItem) {
      updateQuantity(primaryCartItem.id, -1)
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-[#FDFAF6] rounded-[22px] overflow-hidden border border-[#ECE5DD] shadow-[0_2px_8px_rgba(44,26,14,0.04)] hover:shadow-md transition-all active:scale-[0.985] cursor-pointer flex flex-col justify-between"
    >
      {/* ── Image & Badges ── */}
      <div className="relative bg-[#F4EDE4] w-full" style={{ aspectRatio: '4/3' }}>
        {/* Tag badge (e.g. ⭐ Best Seller) */}
        {item.tag && (
          <span className="absolute top-2 left-2 z-10 bg-[#3D2314] text-[#FDFBF7] text-[9.5px] font-semibold px-2 py-0.5 rounded-full tracking-wide shadow-sm">
            {item.tag}
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFav(!fav)
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart
            size={13}
            className={fav ? 'text-[#E8637A] fill-[#E8637A]' : 'text-[#9C8271]'}
          />
        </button>

        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 480px) 50vw, 240px"
          className="object-cover"
        />
      </div>

      {/* ── Product Info ── */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <p
            className="text-[14px] font-bold text-[#2C1A0E] leading-snug line-clamp-1 mb-0.5"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {item.name}
          </p>

          {/* Taste Notes (e.g., Creamy • Sweet • Cold) */}
          <p className="text-[10px] font-medium text-[#8F7868] mb-2 line-clamp-1 tracking-tight">
            {item.tasteNotes}
          </p>
        </div>

        {/* ── Price & Progressive Interactive Button ── */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-bold text-[#2C1A0E]">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-[10.5px] text-[#A89080] line-through font-normal">
                ₹{item.originalPrice}
              </span>
            )}
          </div>

          {/* Progressive Button */}
          <div onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} mode="wait">
              {totalQty === 0 ? (
                <motion.button
                  key="add-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleAddDefault}
                  className="w-7 h-7 bg-[#D4956A] hover:bg-[#c28459] rounded-full flex items-center justify-center text-white shadow-sm shadow-[#D4956A]/30 active:scale-90 transition-transform"
                  aria-label={`Add ${item.name} to order`}
                >
                  <Plus size={15} strokeWidth={2.6} />
                </motion.button>
              ) : (
                <motion.div
                  key="stepper-btn"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center bg-[#3D2314] text-white rounded-full p-0.5 shadow-sm"
                >
                  <button
                    onClick={handleDecrement}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-transform"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} strokeWidth={2.4} />
                  </button>
                  <span className="text-[12px] font-bold px-1.5 min-w-[16px] text-center text-[#FDFAF6]">
                    {totalQty}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-transform"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} strokeWidth={2.4} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
