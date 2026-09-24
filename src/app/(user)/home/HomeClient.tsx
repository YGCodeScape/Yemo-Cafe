'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'

import SplashScreen from '@/components/ui/SplashScreen'
import HomeBanner, { getGreeting } from '@/components/layout/HomeBanner'
import FilterTabs, { type FilterTab } from '@/components/menu/FilterTabs'
import SpecialsCarousel from '@/components/menu/SpecialsCarousel'
import ProductCard from '@/components/menu/ProductCard'

import { SPECIALS, POPULAR_DRINKS } from '@/data/menuData'

type Props = {
  profile: { name: string; email: string } | null
}

export default function HomeClient({ profile }: Props) {
  const firstName = profile?.name.split(' ')[0] ?? 'there'
  const greeting = getGreeting()

  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState<FilterTab>('beverages')

  const handleAddToCart = (id: string) => {
    // TODO: wire up Zustand cart store
    console.log('Add to cart:', id)
  }

  return (
    <>
      {/* ── Splash overlay on every visit ── */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen duration={1500} onDone={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* ── Page ── */}
      <div className="flex flex-col bg-[#FDFAF6] pb-28" style={{ minHeight: '100dvh' }}>

        {/* 1. Banner carousel */}
        <div className="">
          <HomeBanner greeting={greeting} userName={firstName} />
        </div>

        {/* 2. Filter tabs */}
        <FilterTabs
          active={activeTab}
          onChange={setActiveTab}
          onFilter={() => {/* open filter sheet */}}
          className="px-4 mb-5"
        />

        {/* 3. Today's Specials — 3D carousel */}
        <SpecialsCarousel items={SPECIALS} onAdd={handleAddToCart} />

        {/* 4. Popular Drinks */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Popular Drinks
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A]">
              See all →
            </Link>
          </div>

          {/* Horizontal scrollable row */}
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
            {POPULAR_DRINKS.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                variant="scroll"
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
