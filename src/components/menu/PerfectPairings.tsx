'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Plus } from 'lucide-react'
import type { PairingItem } from '@/data/menuData'
import { useCartStore } from '@/store/useCartStore'
import { SPECIALS, POPULAR_DRINKS, POPULAR_FOOD } from '@/data/menuData'

type Props = {
  pairings: PairingItem[]
}

function findProduct(id: string) {
  return (
    POPULAR_DRINKS.find(d => d.id === id) ??
    POPULAR_FOOD.find(f => f.id === id) ??
    (SPECIALS.find(s => s.id === id) as any)
  )
}

export default function PerfectPairings({ pairings }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore(state => state.addItem)
  const openProductDetail = useCartStore(state => state.openProductDetail)

  const handleAddCombo = (pairing: PairingItem) => {
    const drink = findProduct(pairing.drink.id)
    const food = findProduct(pairing.food.id)
    if (drink) addItem({ ...drink, category: (drink as any).category ?? 'special', temp: drink.temp ?? 'cold' }, '200 ml', [])
    if (food) addItem({ ...food, category: (food as any).category ?? 'food', temp: food.temp ?? 'room' }, '1 piece', [])
  }

  const handleOpenDrink = (pairing: PairingItem) => {
    const drink = findProduct(pairing.drink.id)
    if (drink) openProductDetail({ ...drink, category: (drink as any).category ?? 'special', temp: drink.temp ?? 'cold' })
  }

  const handleOpenFood = (pairing: PairingItem) => {
    const food = findProduct(pairing.food.id)
    if (food) openProductDetail({ ...food, category: (food as any).category ?? 'food', temp: food.temp ?? 'room' })
  }

  return (
    <section className="mt-6 mb-8">
      {/* Section header */}
      <div className="px-5 mb-1">
        <h2
          className="text-[18px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Perfect Pairings ✨
        </h2>
        <p className="text-[12px] text-[#A89080] mt-0.5 leading-snug">
          Not sure what to order? Try what café regulars love.
        </p>
      </div>

      {/* Horizontal scroll row */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-4 overflow-x-auto no-scrollbar pt-3 pb-2"
      >
        {pairings.map((pairing, idx) => (
          <PairingCard
            key={pairing.id}
            pairing={pairing}
            index={idx}
            onAddCombo={() => handleAddCombo(pairing)}
            onOpenDrink={() => handleOpenDrink(pairing)}
            onOpenFood={() => handleOpenFood(pairing)}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── Individual Pairing Card ─────────────────────────────────────────────── */

function PairingCard({
  pairing,
  index,
  onAddCombo,
  onOpenDrink,
  onOpenFood,
}: {
  pairing: PairingItem
  index: number
  onAddCombo: () => void
  onOpenDrink: () => void
  onOpenFood: () => void
}) {
  const comboPrice = pairing.drink.price + pairing.food.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 280, damping: 26 }}
      className="shrink-0 w-[300px] rounded-[22px] bg-white border border-[#EDE8E3] shadow-md overflow-hidden flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(44,26,14,0.08)' }}
    >
      {/* ── Personality label pill + reason line ── */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between gap-2">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${pairing.labelColor}18`, color: pairing.labelColor }}
        >
          {pairing.label}
        </span>
        <span className="text-[10px] text-[#A89080] font-medium shrink-0">
          {pairing.reason}
        </span>
      </div>

      {/* ── Two product thumbnails ── */}
      <div className="flex items-end justify-center gap-3 px-4 py-2 relative">
        {/* Drink image */}
        <button
          onClick={onOpenDrink}
          className="relative flex flex-col items-center gap-1 group active:scale-95 transition-transform"
        >
          <div
            className="relative w-[96px] h-[96px] rounded-[16px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#F4ECE2,#EAD9C8)' }}
          >
            <Image
              src={pairing.drink.image}
              alt={pairing.drink.name}
              fill
              className={
                pairing.drink.image.endsWith('.png')
                  ? 'object-contain p-2 drop-shadow-lg'
                  : 'object-cover'
              }
              sizes="96px"
            />
          </div>
          <span className="text-[10px] text-[#6B3F2A] font-semibold text-center leading-tight max-w-[90px]">
            {pairing.drink.emoji} {pairing.drink.name}
          </span>
          <span className="text-[11px] font-bold text-[#2C1A0E]">₹{pairing.drink.price}</span>
        </button>

        {/* Plus connector */}
        <div className="mb-10 shrink-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg,#2C1A0E,#6B3F2A)' }}
          >
            <Plus size={12} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Food image */}
        <button
          onClick={onOpenFood}
          className="relative flex flex-col items-center gap-1 group active:scale-95 transition-transform"
        >
          <div
            className="relative w-[96px] h-[96px] rounded-[16px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#F4ECE2,#EAD9C8)' }}
          >
            <Image
              src={pairing.food.image}
              alt={pairing.food.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <span className="text-[10px] text-[#6B3F2A] font-semibold text-center leading-tight max-w-[90px]">
            {pairing.food.emoji} {pairing.food.name}
          </span>
          <span className="text-[11px] font-bold text-[#2C1A0E]">₹{pairing.food.price}</span>
        </button>
      </div>

      {/* ── Divider ── */}
      <div className="mx-4 border-t border-[#F0E6DC]" />

      {/* ── Tagline + Add combo CTA ── */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-[11px] text-[#8C7362] leading-snug flex-1">
          {pairing.tagline}
        </p>
        <button
          onClick={onAddCombo}
          className="shrink-0 flex items-center gap-1.5 bg-[#2C1A0E] text-white text-[11px] font-bold px-3 py-2 rounded-full shadow-md active:scale-95 transition-transform"
          aria-label={`Add ${pairing.drink.name} + ${pairing.food.name} combo to cart`}
        >
          <ShoppingBag size={12} strokeWidth={2.5} />
          <span>₹{comboPrice}</span>
        </button>
      </div>
    </motion.div>
  )
}
