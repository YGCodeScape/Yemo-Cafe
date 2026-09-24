'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Plus } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

export type CardItem = {
  id: string
  name: string
  desc: string
  price: number
  originalPrice?: number
  offer?: number
  image: string
  rating?: number
  category?: string
  temp?: 'hot' | 'cold' | 'room'
}

type Props = {
  item: CardItem
  onAdd?: (id: string) => void
  /** 'scroll' = fixed-width card for horizontal lists; 'grid' = full-width for 2-col grids */
  variant?: 'scroll' | 'grid'
}

/**
 * Reusable product card — used in Popular Drinks (home) and Menu page grid.
 * Two variants: 'scroll' (fixed 148px width) and 'grid' (full-width, 2-col).
 * Clicking card opens full screen ProductDetailModal; clicking '+' adds item directly.
 */
export default function ProductCard({ item, onAdd, variant = 'scroll' }: Props) {
  const [fav, setFav] = useState(false)
  const isGrid = variant === 'grid'

  const openProductDetail = useCartStore(state => state.openProductDetail)
  const addItem = useCartStore(state => state.addItem)

  const handleCardClick = () => {
    openProductDetail(item)
  }

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onAdd) {
      onAdd(item.id)
    } else {
      addItem(item, '200 ml', [])
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className={
        'bg-[#FDFAF6] rounded-[20px] overflow-hidden border border-[#EDE8E3] shadow-sm cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98] ' +
        (isGrid ? 'w-full' : 'shrink-0 w-[148px]')
      }
    >
      {/* ── Image ── */}
      <div className="relative bg-[#F5EDE4]" style={{ aspectRatio: '4/3' }}>
        {item.offer && (
          <span className="absolute top-2 left-2 z-10 bg-[#D4956A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {item.offer}% OFF
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFav(!fav)
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white/85 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
          aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart
            size={13}
            className={fav ? 'text-[#D4956A] fill-[#D4956A]' : 'text-[#A89080]'}
          />
        </button>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={isGrid ? '(max-width: 430px) 48vw, 200px' : '148px'}
          className="object-cover"
        />
      </div>

      {/* ── Info ── */}
      <div className="p-3">
        <p className="text-[13px] font-bold text-[#2C1A0E] leading-tight mb-0.5 line-clamp-1"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
          {item.name}
        </p>
        <p className="text-[10px] text-[#A89080] mb-2.5 line-clamp-1">{item.desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[14px] font-bold text-[#2C1A0E]">
              &#x20b9;{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-[10px] text-[#A89080] line-through">
                &#x20b9;{item.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handlePlusClick}
            className="w-7 h-7 bg-[#D4956A] hover:bg-[#b87d55] rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
            aria-label={'Add ' + item.name + ' to cart'}
          >
            <Plus size={14} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
