'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function OrdersEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center text-center px-6 py-12 max-w-md mx-auto"
    >
      {/* Mascot Illustration */}
      <div className="relative w-56 h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6 bg-[#F5EDE4]">
        <Image
          src="/assets/onboarding-mascot-3.png "
          alt="Your table is waiting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Heading & Subtitle */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAD8C7]/50 border border-[#D4956A]/20 text-[#8C5E3C] text-[11px] font-bold tracking-wide uppercase mb-3">
        <Sparkles size={12} className="text-[#C87D55]" />
        <span>Fresh Café Experience</span>
      </div>

      <h2
        className="text-[26px] font-bold text-[#2C1A0E] tracking-tight leading-tight mb-2"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        Your table is<br />waiting for you.
      </h2>

      <p className="text-[14px] text-[#7A6251] max-w-xs mb-8 leading-relaxed">
        You haven&apos;t placed an order yet. Treat yourself to our freshly ground coffees, artisan teas, and oven-warm pastries.
      </p>

      {/* CTA Button */}
      <Link
        href="/menu"
        className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3.5 px-6 rounded-full font-bold text-[14px] shadow-lg shadow-[#2C1A0E]/15 active:scale-[0.98] transition-all"
      >
        <span>Explore Menu</span>
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  )
}
