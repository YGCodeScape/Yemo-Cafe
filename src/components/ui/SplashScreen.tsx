'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  /** Milliseconds before onDone fires. Default: 2000 */
  duration?: number
  /** Called when the timer expires — parent decides what to do next */
  onDone?: () => void
}

export default function SplashScreen({ duration = 10000, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), duration)
    return () => clearTimeout(t)
  }, [duration, onDone])

  return (
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[999] flex flex-col items-center overflow-hidden"
      style={{
        backgroundImage: 'url("/onboarding-screen0.png")',
        backgroundPosition:'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Logo block */}
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center pt-14 gap-1"
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
          className="text-[46px] font-bold text-[#6B3F2A] leading-none tracking-wide"
          style={{ fontFamily: '"Lily Script One", system-ui' }}
        >
          yemo°
        </h1>
        <p className="mt-2 text-[10px] font-semibold text-[#A89080] tracking-[0.38em] uppercase">
          Café · Food · Good Vibes
        </p>
      </motion.div>

      {/* Tagline + animated dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-[0%] z-10 flex flex-col items-center gap-4 pb-14"
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
