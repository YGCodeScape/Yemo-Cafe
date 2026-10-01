'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import HomeBanner, { getGreeting } from '@/components/layout/HomeBanner'
import SpecialsCarousel from '@/components/menu/SpecialsCarousel'
import ProductCard from '@/components/menu/ProductCard'
import ProductDetailModal from '@/components/menu/ProductDetailModal'
import AddToCartToast from '@/components/cart/AddToCartToast'
import MiniCartBar from '@/components/cart/MiniCartBar'
import CartDrawer from '@/components/cart/CartDrawer'

import { SPECIALS, POPULAR_DRINKS, POPULAR_FOOD, PAIRINGS } from '@/data/menuData'
import { useCartStore } from '@/store/useCartStore'
import PerfectPairings from '@/components/menu/PerfectPairings'
import YemoMoments from '@/components/home/YemoMoments'
import VisitingCardSection from '@/components/home/VisitingCardSection'

type Props = {
  profile: { name: string; email: string } | null
}

export default function HomeClient({ profile }: Props) {
  const firstName = profile?.name.split(' ')[0] ?? 'there'
  const greeting = getGreeting()

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

  return (
    <>
      {/* ── Page ── */}
      <div className="flex flex-col bg-[#FDFAF6] pb-8" style={{ minHeight: '100dvh' }}>

        {/* 1. Banner carousel */}
        <div>
          <HomeBanner greeting={greeting} userName={firstName} />
        </div>

        {/* 2. Today's Specials — 3D carousel */}
        <SpecialsCarousel items={SPECIALS} onAdd={handleAddToCart} />

        {/* 3. Popular Drinks Section */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Popular Drinks
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A] hover:underline">
              See all →
            </Link>
          </div>

          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
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

        {/* 4. Food & Bakery Section */}
        <div className="mt-2 mb-6">
          <div className="flex items-center justify-between px-5 mb-3">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Food & Bakery
            </h2>
            <Link href="/menu" className="text-[12px] font-semibold text-[#D4956A] hover:underline">
              See all →
            </Link>
          </div>

          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
            {POPULAR_FOOD.map(item => (
              <ProductCard
                key={item.id}
                item={item}
                variant="scroll"
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* 6. Perfect Pairings Section */}
        <PerfectPairings pairings={PAIRINGS} />

        {/* 7. Yemo Moments — 3D Visual Experience */}
        <YemoMoments />

        {/* 8. Visiting Card & Rewards Section */}
        <VisitingCardSection />

      </div>

      {/* ── Global Cart & Product Detail Overlays ── */}
      <ProductDetailModal />
      <AddToCartToast />
      <MiniCartBar />
      <CartDrawer />
    </>
  )
}
