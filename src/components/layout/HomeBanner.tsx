'use client'

import { useState, useEffect, useRef } from 'react'
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 1,
  }),
}

export default function HomeBanner({ greeting, userName, banners = DEFAULT_BANNERS }: Props) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (banners.length <= 1) return
    timerRef.current = setInterval(() => {
      setDir(1)
      setIndex(i => (i + 1) % banners.length)
    }, 4200)
  }

  useEffect(() => {
    startAutoSlide()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [banners.length])

  const goToSlide = (newIndex: number) => {
    if (newIndex === index) return
    setDir(newIndex > index ? 1 : -1)
    setIndex(newIndex)
    startAutoSlide()
  }

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 40
    if (info.offset.x < -swipeThreshold) {
      setDir(1)
      setIndex((index + 1) % banners.length)
      startAutoSlide()
    } else if (info.offset.x > swipeThreshold) {
      setDir(-1)
      setIndex((index - 1 + banners.length) % banners.length)
      startAutoSlide()
    }
  }

  return (
    <div
      className="relative mb-4 overflow-hidden shadow-xl bg-[#1C0E07] select-none"
      style={{ height: 260 }}
    >
      {/* ── Seamless Sliding banner images ── */}
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 260, damping: 30 },
            opacity: { duration: 0.15 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <Image
            src={banners[index]}
            alt="yemo cafe banner"
            fill
            className="object-cover pointer-events-none"
            priority={index === 0}
            sizes="(max-width: 430px) 100vw, 430px"
          />
          {/* Gradient scrim for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 40%, transparent 55%, rgba(0,0,0,0.5) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Top overlay: logo (left) + greeting (right) ── */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 pt-6 pb-6 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)',
        }}
      >
        {/* yemo wordmark */}
        <div className="pointer-events-auto">
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
        <div className="text-right pointer-events-auto">
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
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center pointer-events-auto">
        <Link
          href="/menu"
          className="bg-white/92 text-[#6B3F2A] text-[12px] font-bold px-7 py-2.5 rounded-full shadow-lg active:scale-95 transition-all duration-200 hover:bg-white hover:shadow-xl"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          Order Now →
        </Link>
      </div>

      {/* ── Clickable Dot indicators (bottom-right) ── */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 right-6 z-20 flex gap-1.5 items-center pointer-events-auto">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="p-1 focus:outline-none"
            >
              <motion.div
                className="rounded-full bg-white"
                animate={{
                  width: i === index ? 16 : 6,
                  height: 6,
                  opacity: i === index ? 1 : 0.45,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { getGreeting }
