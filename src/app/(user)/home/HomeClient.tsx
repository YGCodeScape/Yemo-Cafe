'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import SplashScreen from '@/components/ui/SplashScreen'
import HomeBanner, { getGreeting } from '@/components/layout/HomeBanner'
import FilterTabs, { type FilterTab, type SubFilter } from '@/components/menu/FilterTabs'
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
  const [subFilter, setSubFilter] = useState<SubFilter>('all')

  const handleAddToCart = (id: string) => {
    // TODO: wire up Zustand cart store
    console.log('Add to cart:', id)
  }

  // Filter items based on activeTab & subFilter
  const filteredItems = POPULAR_DRINKS.filter(item => {
    if (activeTab === 'food') return false
    if (subFilter === 'all') return true
    if (subFilter === 'coffee') return item.category === 'coffee'
    if (subFilter === 'mojitos') return item.name.toLowerCase().includes('mojito') || item.category === 'mocktail'
    if (subFilter === 'mocktails') return item.category === 'mocktail'
    if (subFilter === 'teas') return item.category === 'tea'
    return true
  })

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
        <div>
          <HomeBanner greeting={greeting} userName={firstName} />
        </div>

        {/* 2. Today's Specials — 3D carousel */}
        <SpecialsCarousel items={SPECIALS} onAdd={handleAddToCart} />

        {/* 3. Filter tabs */}
        <FilterTabs
          active={activeTab}
          onChange={tab => {
            setActiveTab(tab)
            if (tab === 'food') setSubFilter('all')
          }}
          subFilter={subFilter}
          onSubFilterChange={setSubFilter}
          className="mx-4 mb-5"
        />

        {/* 4. Filtered Items Section */}
        <div className="mt-2">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E] capitalize"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              {activeTab === 'food'
                ? 'Food & Bakery'
                : subFilter !== 'all'
                ? `${subFilter}`
                : 'Popular Drinks'}
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A]">
              See all →
            </Link>
          </div>

          {/* Active Items vs Empty States */}
          {activeTab === 'food' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 px-4 mx-4 bg-[#F7F1EB] rounded-3xl border border-[#E8DFC8]/60 text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-full bg-[#EAE0D5] flex items-center justify-center text-3xl mb-3 shadow-inner">
                🥐
              </div>
              <h3 className="text-[16px] font-bold text-[#2C1A0E]">Food Items Coming Soon!</h3>
              <p className="text-[13px] text-[#8C7362] max-w-[260px] mt-1 leading-relaxed">
                We're baking fresh croissants, artisanal sandwiches & warm pastries for you. Check back soon!
              </p>
            </motion.div>
          ) : filteredItems.length > 0 ? (
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
              {filteredItems.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  variant="scroll"
                  onAdd={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-10 px-4 mx-4 bg-[#F7F1EB] rounded-3xl border border-[#E8DFC8]/60 text-center shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-[#EAE0D5] flex items-center justify-center text-2xl mb-2">
                ☕
              </div>
              <h3 className="text-[15px] font-bold text-[#2C1A0E]">No items in "{subFilter}"</h3>
              <p className="text-[12px] text-[#8C7362] mt-0.5 mb-3">Try choosing another category</p>
              <button
                onClick={() => setSubFilter('all')}
                className="text-[12px] font-bold text-[#2C1A0E] bg-[#EAE0D5] px-4 py-1.5 rounded-full border border-[#D8C7B5] active:scale-95 transition-transform"
              >
                Show All Drinks
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </>
  )
}
