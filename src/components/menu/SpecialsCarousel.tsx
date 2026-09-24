'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Coffee, Flame, Star, Plus } from 'lucide-react'
import type { SpecialItem } from '@/data/menuData'

type Props = {
  items: SpecialItem[]
  onAdd?: (id: string) => void
}

/**
 * 3D Perspective Specials Carousel
 *
 * Center item is large and front-facing.
 * Left/right items are partially visible, scaled down and rotated.
 * Supports swipe (touch) and arrow button navigation.
 * Info card floats below the carousel with offer badge, rating, price, add-to-cart.
 */
export default function SpecialsCarousel({ items, onAdd }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStart = useRef(0)

  const total = items.length
  const prevIdx = (current - 1 + total) % total
  const nextIdx = (current + 1) % total
  const item = items[current]

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent(i => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent(i => (i + 1) % total)
  }, [total])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (delta > 44) goNext()
    if (delta < -44) goPrev()
  }

  return (
    <div className=" mt-8 mb-8">
      {/* ── Section header ── */}
      <div className="flex items-end justify-between px-5 mb-3">
        <div>
          <h2
            className="text-[24px] font-semibold text-[#2C1A0E] leading-tight"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            {"Today's Specials"}
          </h2>
          <p className="text-[12px] text-[#A89080] mt-0.5">Fresh sips, better days ✨</p>
        </div>
      </div>

      {/* ── 3D Carousel stage ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 268 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Warm gradient background */}
        <div
          className="absolute inset-0"
        />

        {/* Left side item */}
        <div
          className="absolute top-0 bottom-0 left-0 flex items-center justify-center cursor-pointer"
          style={{ width: '36%' }}
          onClick={goPrev}
        >
          <div
            className="relative w-full"
            style={{
              height: 200,
              transform: 'perspective(500px) rotateY(30deg) scale(0.7) translateX(12%)',
              opacity: 0.5,
              transformOrigin: 'right center',
            }}
          >
            <Image
              src={items[prevIdx].image}
              alt={items[prevIdx].name}
              fill
              className="object-contain drop-shadow-md"
              sizes="36vw"
            />
          </div>
        </div>

        {/* Right side item */}
        <div
          className="absolute top-0 bottom-0 right-0 flex items-center justify-center cursor-pointer"
          style={{ width: '36%' }}
          onClick={goNext}
        >
          <div
            className="relative w-full"
            style={{
              height: 200,
              transform: 'perspective(500px) rotateY(-30deg) scale(0.7) translateX(-12%)',
              opacity: 0.5,
              transformOrigin: 'left center',
            }}
          >
            <Image
              src={items[nextIdx].image}
              alt={items[nextIdx].name}
              fill
              className="object-contain drop-shadow-md"
              sizes="36vw"
            />
          </div>
        </div>

        {/* Center item (animated) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ x: direction > 0 ? '55%' : '-55%', opacity: 0, scale: 0.85 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: direction < 0 ? '55%' : '-55%', opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="relative z-10"
              style={{ width: '58%', height: 250 }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover drop-shadow-2xl"
                sizes="58vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <ChevronLeft size={16} className="text-[#6B3F2A]" strokeWidth={2.5} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
        >
          <ChevronRight size={16} className="text-[#6B3F2A]" strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Info card (overlaps carousel bottom) ── */}
      <div className="mx-4 relative z-20">
        <div className="relative bg-white rounded-[22px] px-4 pb-4 pt-2 shadow-lg border border-[#EDE8E3]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Offer badge */}
              {item.offer > 0 && (
                <span className="inline-block bg-[#D4956A] text-white text-[9px] font-bold px-3 py-2 mb-2 rounded-full uppercase tracking-wide">
                  {item.offer}% OFF
                </span>
              )}

              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[18px] font-bold text-[#2C1A0E] leading-tight mb-1"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#A89080] mb-3">{item.desc}</p>

                  {/* Meta row: temp · rating · price */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      {item.temp === 'hot' ? (
                        <Flame size={11} className="text-[#D4956A]" />
                      ) : (
                        <Coffee size={11} className="text-[#A89080]" />
                      )}
                      <span className="text-[10px] text-[#A89080] font-medium capitalize">
                        {item.temp}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={11} className="text-[#D4956A] fill-[#D4956A]" />
                      <span className="text-[10px] text-[#A89080] font-medium">{item.rating}</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 ml-auto">
                      <span className="text-[17px] font-bold text-[#2C1A0E]">
                        &#x20b9;{item.price}
                      </span>
                      <span className="text-[11px] text-[#A89080] line-through">
                        &#x20b9;{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  onClick={() => onAdd?.(item.id)}
                  className="w-11 h-11 bg-[#2C1A0E] rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0 mt-auto"
                  aria-label={'Add ' + item.name + ' to cart'}
                >
                  <Plus size={18} className="text-[#FDFAF6]" strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className="rounded-full bg-[#6B3F2A]"
            animate={{ width: i === current ? 18 : 7, height: 7, opacity: i === current ? 1 : 0.28 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            aria-label={'Go to special ' + (i + 1)}
          />
        ))}
      </div>
    </div>
  )
}
