'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import SplashScreen from '@/components/ui/SplashScreen'
import HomeBanner, { getGreeting } from '@/components/layout/HomeBanner'
import FilterTabs, { type SubFilter } from '@/components/menu/FilterTabs'
import SpecialsCarousel from '@/components/menu/SpecialsCarousel'
import ProductCard from '@/components/menu/ProductCard'
import ProductDetailModal from '@/components/menu/ProductDetailModal'
import AddToCartToast from '@/components/cart/AddToCartToast'
import MiniCartBar from '@/components/cart/MiniCartBar'
import CartDrawer from '@/components/cart/CartDrawer'

import { SPECIALS, POPULAR_DRINKS, POPULAR_FOOD, PAIRINGS } from '@/data/menuData'
import { useCartStore } from '@/store/useCartStore'
import PerfectPairings from '@/components/menu/PerfectPairings'

type Props = {
  profile: { name: string; email: string } | null
}

export default function HomeClient({ profile }: Props) {
  const firstName = profile?.name.split(' ')[0] ?? 'there'
  const greeting = getGreeting()

  const [showSplash, setShowSplash] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [subFilter, setSubFilter] = useState<SubFilter>('all')

  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = (id: string) => {
    const item =
      POPULAR_DRINKS.find(d => d.id === id) ||
      POPULAR_FOOD.find(f => f.id === id) ||
      SPECIALS.find(s => s.id === id)

    if (item) {
      addItem(
        {
          ...item,
          temp: (item as any).temp ?? 'cold',
        },
        '200 ml',
        []
      )
    }
  }

  // Filter Drinks based on searchQuery & subFilter
  const filteredDrinks = POPULAR_DRINKS.filter(item => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (subFilter === 'all') return true
    if (subFilter === 'coffee') return item.category === 'coffee'
    if (subFilter === 'mojitos') return item.name.toLowerCase().includes('mojito') || item.category === 'mocktail'
    if (subFilter === 'mocktails') return item.category === 'mocktail'
    if (subFilter === 'teas') return item.category === 'tea'
    return true
  })

  // Filter Food based on searchQuery
  const filteredFood = POPULAR_FOOD.filter(item => {
    return (
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
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

        {/* 3. Search Bar + Sub-Filter Dropdown (Sticky Pinned Top) */}
        <div className="sticky top-0 z-30 bg-[#FDFAF6]/95 backdrop-blur-md py-2.5 mb-3 border-b border-[#E8DFC8]/50 shadow-xs transition-all">
          <FilterTabs
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            subFilter={subFilter}
            onSubFilterChange={setSubFilter}
            className="mx-4"
          />
        </div>

        {/* 4. Popular Drinks Section */}
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E] capitalize"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              {subFilter !== 'all' ? `${subFilter}` : 'Popular Drinks'}
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A]">
              See all →
            </Link>
          </div>

          {filteredDrinks.length > 0 ? (
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
              {filteredDrinks.map(item => (
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
              className="flex flex-col items-center justify-center py-8 px-4 mx-4 bg-[#F7F1EB] rounded-3xl border border-[#E8DFC8]/60 text-center shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#EAE0D5] flex items-center justify-center text-xl mb-2">
                ☕
              </div>
              <h3 className="text-[14px] font-bold text-[#2C1A0E]">
                {searchQuery ? `No drinks matching "${searchQuery}"` : `No items in "${subFilter}"`}
              </h3>
              <p className="text-[11px] text-[#8C7362] mt-0.5 mb-2">Try searching or clearing filters</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSubFilter('all')
                }}
                className="text-[11px] font-bold text-[#2C1A0E] bg-[#EAE0D5] px-3.5 py-1 rounded-full border border-[#D8C7B5] active:scale-95 transition-transform"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* 5. Food & Bakery Section */}
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Food & Bakery
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A]">
              See all →
            </Link>
          </div>

          {filteredFood.length > 0 ? (
            <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
              {filteredFood.map(item => (
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
              className="flex flex-col items-center justify-center py-8 px-4 mx-4 bg-[#F7F1EB] rounded-3xl border border-[#E8DFC8]/60 text-center shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#EAE0D5] flex items-center justify-center text-xl mb-2">
                🥐
              </div>
              <h3 className="text-[14px] font-bold text-[#2C1A0E]">
                No bakery items matching "{searchQuery}"
              </h3>
            </motion.div>
          )}
        </div>

        {/* 6. Perfect Pairings Section */}
        <PerfectPairings pairings={PAIRINGS} />

      </div>

      {/* ── Global Cart & Product Detail Overlays ── */}
      <ProductDetailModal />
      <AddToCartToast />
      <MiniCartBar />
      <CartDrawer />
    </>
  )
}
