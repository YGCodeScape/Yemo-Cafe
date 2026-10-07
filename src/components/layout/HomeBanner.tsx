'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ChevronDown, Clock, Navigation } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

const DEFAULT_BANNERS = [
  '/assets/cafe_storefront.jpg',
  '/banners/banner-1.jpg',
  '/banners/banner-2.jpg',
  '/banners/banner-3.jpg',
]

type Props = {
  greeting: string
  userName: string
  banners?: string[]
  avatarUrl?: string
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

export default function HomeBanner({
  greeting,
  userName,
  banners = DEFAULT_BANNERS,
  avatarUrl,
}: Props) {
  const profileAvatar = useProfileStore((state) => state.profile.avatar)
  const displayAvatar = avatarUrl || profileAvatar || '/mascot-assets/mascot-welcome.png'
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [isCafeDropdownOpen, setIsCafeDropdownOpen] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (banners.length <= 1) return
    timerRef.current = setInterval(() => {
      setDir(1)
      setIndex(i => (i + 1) % banners.length)
    }, 4500)
  }

  useEffect(() => {
    startAutoSlide()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [banners.length])

  // Close cafe dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCafeDropdownOpen(false)
      }
    }
    if (isCafeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCafeDropdownOpen])

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

  const scrollToVisitingCard = () => {
    setIsCafeDropdownOpen(false)
    const el = document.getElementById('visiting-card')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full flex flex-col">
      {/* ── 1. Top Navigation Bar (Wordmark + Tagline, Café selector, Greeting + Profile) ── */}
      <header className="px-4 pt-4 pb-3 flex items-center justify-between select-none">
        {/* Left: Wordmark with coffee sprout + Tagline */}
        <div className="flex flex-col">
          <Link href="/home" className="relative inline-flex items-center group">
            <span
              className="text-[32px] font-bold text-[#2A140A] leading-none tracking-tight"
              style={{ fontFamily: '"Lily Script One", system-ui' }}
            >
              yemo
            </span>
          </Link>

          <p
            className="text-[11px] font-semibold text-[#735342] tracking-tight mt-0.5"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Good Food • Good Vibes
          </p>
        </div>


        {/* Right: Greeting + User Name + Rounded Profile Icon */}
        <div className="flex items-center gap-2">
          <div className="text-right flex flex-col items-end justify-center">
            <span className="text-[10px] sm:text-[11px] font-medium text-[#8C6D58] leading-tight">
              {greeting}
            </span>
            <span className="text-[13px] sm:text-[14px] font-bold text-[#2A140A] leading-tight truncate max-w-[80px] sm:max-w-[110px]">
              {userName}
            </span>
          </div>

          <Link
            href="/profile"
            aria-label="View Profile"
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-[#DFD4C5] shrink-0 active:scale-95 transition-transform hover:ring-[#CDB8A0]"
          >
            <Image
              src={displayAvatar}
              alt={userName || 'User Profile'}
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </Link>
        </div>
      </header>

      {/* ── 2. Scrolling Banner Carousel with Rounded Borders ── */}
      <div className="px-4 mb-4">
        <div
          className="relative overflow-hidden rounded-[26px] sm:rounded-[28px] shadow-md shadow-[#2A140A]/8 bg-[#1C0E07] select-none"
          style={{ height: 200 }}
        >
          {/* Seamless Sliding banner images */}
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
            </motion.div>
          </AnimatePresence>

          {/* Clickable Dot indicators (bottom-right) */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 right-3.5 z-20 flex gap-1.5 items-center pointer-events-auto bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="p-0.5 focus:outline-none"
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
      </div>
    </div>
  )
}

export { getGreeting }
