'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_BANNERS = ['/banners/banner-1.jpg', '/banners/banner-2.jpg', '/banners/banner-3.jpg']

type Props = {
  greeting: string
  userName: string
  banners?: string[]
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning ☀️'
  if (h < 17) return 'Good Afternoon 🌤️'
  return 'Good Evening ✨'
}

/**
 * Full-bleed top banner carousel with:
 * - Auto-advancing every 4s
 * - yemo logo (top-left) + time-based greeting + user name (top-right)
 * - "Order Now" CTA at bottom center
 * - Dot progress indicators
 */
export default function HomeBanner({ greeting, userName, banners = DEFAULT_BANNERS }: Props) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (banners.length <= 1) return
    const t = setInterval(() => {
      setDir(1)
      setIndex(i => (i + 1) % banners.length)
    }, 4200)
    return () => clearInterval(t)
  }, [banners.length])

  return (
    <div className="relative mb-4 overflow-hidden shadow-lg" style={{ height: 260, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 }}>
      {/* ── Sliding banner images ── */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ x: dir > 0 ? '100%' : '-100%', opacity: 0.7 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: dir > 0 ? '-30%' : '30%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        >
          <Image
            src={banners[index]}
            alt="yemo cafe banner"
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 430px) 100vw, 430px"
          />
          {/* Gradient scrim for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.38) 0%, transparent 45%, transparent 55%, rgba(0,0,0,0.42) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Top overlay: logo (left) + greeting (right) ── */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 pt-6 pb-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)',
        }}
      >
        {/* yemo wordmark */}
        <div>
          <h1
            className="text-[32px] font-bold text-white leading-none tracking-tight"
            style={{
              fontFamily: '"Lily Script One", system-ui',
              textShadow: '0 1px 8px rgba(0,0,0,0.35)',
            }}
          >
            yemo
          </h1>
        </div>

        {/* Greeting */}
        <div className="text-right">
          <p className="text-[14px] text-white/85 font-bold">{greeting}</p>
          <p
            className="text-[15px] font-bold text-white"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}
          >
            {userName}
          </p>
        </div>
      </div>

      {/* ── Bottom: Order CTA ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-4">
        <Link
          href="/menu"
          className="bg-white/92 text-[#6B3F2A] text-[12px] font-bold px-7 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          Order Now →
        </Link>
      </div>

      {/* ── Dot indicators (bottom-right) ── */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 right-7 z-10 flex gap-1 items-center">
          {banners.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-white"
              animate={{ width: i === index ? 14 : 6, height: 6, opacity: i === index ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { getGreeting }
