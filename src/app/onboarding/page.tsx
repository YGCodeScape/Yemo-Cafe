'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'

/* ─── Slide data ─── */
const SLIDES = [
  {
    step: '01 / 03',
    title: 'The Best Coffee\nin Town',
    body: 'Rich aroma. Smooth taste.\nCrafted with love, just for you.',
    mascot: '/onboarding-screens-1.png',
    alt: 'yemo mascot holding a latte',
  },
  {
    step: '02 / 03',
    title: 'Tasty Food Made\nfor Real Moments',
    body: 'From fresh bites to cozy meals,\nwe serve happiness on every plate.',
    mascot: '/onboarding-screens-2.png',
    alt: 'yemo mascot juggling cups',
  },
  {
    step: '03 / 03',
    title: 'Good Food.\nBetter Days.',
    body: 'Great coffee, tasty food\nand a space to just be you.',
    mascot: '/onboarding-screens-3.png',
    alt: 'yemo mascot cheering',
  },
]

/* ─── Framer Motion variants ─── */
const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? '60%' : '-60%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: (d: number) => ({
    x: d < 0 ? '60%' : '-60%',
    opacity: 0,
    transition: { duration: 0.16 },
  }),
}

/* ════════════════════════════════════
   Main page
════════════════════════════════════ */
export default function OnboardingPage() {
  const router = useRouter()
  /* Start at splash immediately — no blocking null render */
  const [phase, setPhase] = useState<'splash' | number>('splash')
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(0)

  /* Check localStorage without blocking render */
  useEffect(() => {
    try {
      if (localStorage.getItem('yemo-onboarded') === 'true') {
        // router.replace('/auth/login')
      }
    } catch {
      /* localStorage blocked (private/incognito) — proceed normally */
    }
  }, [router])

  /* Auto-advance splash → slide 0 after 3s */
  useEffect(() => {
    if (phase !== 'splash') return
    const t = setTimeout(() => {
      setDirection(1)
      setPhase(0)
    }, 3000)
    return () => clearTimeout(t)
  }, [phase])

  /* Finish onboarding → login */
  const finish = useCallback(() => {
    try { localStorage.setItem('yemo-onboarded', 'true') } catch { /* ignore */ }
    router.push('/auth/login')
  }, [router])

  /* Next slide or finish */
  const goNext = useCallback(() => {
    if (typeof phase !== 'number') return
    if (phase < SLIDES.length - 1) {
      setDirection(1)
      setPhase(phase + 1)
    } else {
      finish()
    }
  }, [phase, finish])

  /* Previous slide */
  const goPrev = useCallback(() => {
    if (typeof phase !== 'number') return
    if (phase > 0) {
      setDirection(-1)
      setPhase(phase - 1)
    } else {
      /* On slide 0, go back to splash */
      setDirection(-1)
      setPhase('splash')
    }
  }, [phase])

  /* Swipe handlers */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) goNext()
    if (delta < -50) goPrev()
  }

  /* ── Splash ── */
  if (phase === 'splash') {
    return <SplashScreen onProceed={() => { setDirection(1); setPhase(0) }} />
  }

  const idx = phase as number
  const slide = SLIDES[idx]

  return (
    <div
      className="relative flex flex-col justify-between bg-[#FDFAF6] overflow-hidden"
      style={{ minHeight: '100dvh' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slide Full-Screen Animated Layer ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={idx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute left-0 bottom-0 w-full h-full flex flex-col justify-between"
          >
            {/* Mascot image taking full width and height of the screen */}
            <div className="absolute bottom-0 left-0 w-full h-[80%] pointer-events-none">
              <Image
                src={slide.mascot}
                alt={slide.alt}
                fill
                sizes="(max-width: 430px) 100vw, 430px"
                className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none drop-shadow-md"
                priority
              />
            </div>

            {/* Text block */}
            <div className="relative z-10 px-6 pt-20 pb-5 pointer-events-none">
              <h1
                className="text-[38px] font-bold leading-[1.12] text-[#2C1A0E] mb-4 whitespace-pre-line"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {slide.title}
              </h1>
              <p className="text-[18px] leading-relaxed text-[#A89080] whitespace-pre-line">
                {slide.body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Header ── */}
      <div className="relative z-20 shrink-0 flex items-center justify-between px-6 pt-8 pb-2 pointer-events-auto">
        <span
          className="text-[11px] font-semibold tracking-[0.2em] text-[#A89080] uppercase"
          style={{ fontFamily: '"DM Mono", monospace' }}
        >
          {slide.step}
        </span>
        <button
          onClick={finish}
          className="text-[13px] font-semibold text-[#A89080] active:text-[#6B3F2A] transition-colors px-1 py-1"
        >
          Skip
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1 pointer-events-none" />

      {/* ── Footer: back · dots · next ── */}
      <div className="relative z-20 shrink-0 flex items-center justify-between px-5 py-6 bg-transparent pointer-events-auto">

        {/* Back button */}
        <motion.button
          onClick={goPrev}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-[#F2EAE1] border border-[#E2DDD8] rounded-full flex items-center justify-center"
        >
          <ChevronLeft size={20} className="text-[#6B3F2A]" strokeWidth={2.5} />
        </motion.button>

        {/* Dot progress */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              className="h-2 rounded-full bg-[#6B3F2A]"
              animate={{
                width: i === idx ? 22 : 8,
                opacity: i === idx ? 1 : 0.28,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          ))}
        </div>

        {/* Next / get-started button */}
        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.9 }}
          className="w-[58px] h-[58px] bg-[#6B3F2A] rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowRight size={22} className="text-[#FDFAF6]" strokeWidth={2.5} />
        </motion.button>

      </div>
    </div>
  )
}

/* ════════════════════════════════════
   Splash screen
════════════════════════════════════ */
function SplashScreen({ onProceed }: { onProceed?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={onProceed}
      className="relative flex flex-col items-center justify-between overflow-hidden w-full cursor-pointer select-none"
      style={{
        minHeight: '100dvh',
      }}
    >
      {/* Full-screen background image using Image and absolute class */}
      <Image
        src="/onboarding-screen0.png"
        alt="yemo splash background"
        fill
        priority
        sizes="(max-width: 430px) 100vw, 430px"
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
      />

      {/* Logo */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.55 }}
        className="relative z-10 flex flex-col items-center pt-8 gap-1"
      >
        <Image
          src="/icons/yemo-abstract-logo.png"
          alt="yemo logo"
          width={70}
          height={70}
          className="drop-shadow-sm"
          priority
        />
        <h1
          className="text-[46px] font-medium text-[#6B3F2A] leading-none tracking-wide"
          style={{ fontFamily: '"Lily Script One", system-ui' }}
        >
          yemo
        </h1>
        <p className="mt-2 text-[10px] font-semibold text-[#A89080] tracking-[0.38em] uppercase">
          Café · Food · Good Vibes
        </p>
      </motion.div>

      {/* Tagline + pulsing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="relative z-10 flex flex-col items-center gap-4 pb-14"
      >
        <p
          className="italic text-[#A89080] text-[15px]"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Brewing something good...
        </p>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#6B3F2A]"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.2, 0.7] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
