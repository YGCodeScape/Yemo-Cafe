'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Coffee, Armchair, Heart, Sparkles } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface CoffeePassportViewProps {
  onBack: () => void
}

export default function CoffeePassportView({ onBack }: CoffeePassportViewProps) {
  const stats = useProfileStore((state) => state.stats)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FDFAF6] pb-28 pt-4 px-4 max-w-md mx-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
          aria-label="Back to profile"
        >
          <ArrowLeft size={18} />
        </button>
        <h1
          className="text-[19px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Café Habits &amp; Coffee Passport
        </h1>
      </div>

      {/* 3 Large Stat Highlight Cards */}
      <div className="space-y-3 mb-6">
        {/* Coffees enjoyed */}
        <div className="bg-white rounded-3xl p-4.5 border border-[#EDE2D5] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F7ECE4] border border-[#ECDCCF] flex items-center justify-center text-[#8C4A28] shrink-0">
            <Coffee size={28} />
          </div>
          <div>
            <div className="text-[28px] font-black text-[#2C1A0E] leading-none">
              {stats.coffeesBrewed}
            </div>
            <div className="text-[13px] font-semibold text-[#8C7362] mt-0.5">
              Coffees enjoyed at Yemo
            </div>
          </div>
        </div>

        {/* Favorite Table */}
        <div className="bg-white rounded-3xl p-4.5 border border-[#EDE2D5] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F7ECE4] border border-[#ECDCCF] flex items-center justify-center text-[#8C4A28] shrink-0">
            <Armchair size={28} />
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A08878]">
              Favorite Table
            </div>
            <div className="text-[22px] font-black text-[#2C1A0E] mt-0.5 leading-tight">
              {stats.favTable}
            </div>
          </div>
        </div>

        {/* Top Pick */}
        <div className="bg-white rounded-3xl p-4.5 border border-[#EDE2D5] shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F7ECE4] border border-[#ECDCCF] flex items-center justify-center text-[#8C4A28] shrink-0">
            <Heart size={28} className="fill-[#8C4A28]/20" />
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#A08878]">
              Top Pick Beverage
            </div>
            <div className="text-[22px] font-black text-[#2C1A0E] mt-0.5 leading-tight">
              {stats.topPick}
            </div>
          </div>
        </div>
      </div>

      {/* Your Coffee Journey Stamp Sheet */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs mb-6">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#9E8777]">
            Your Coffee Journey
          </h3>
          <span className="text-[12px] font-bold text-[#8C4A28]">
            {stats.coffeesBrewed} / {stats.targetCoffees} cups
          </span>
        </div>

        {/* 20 Coffee Cup Grid */}
        <div className="grid grid-cols-5 gap-2.5 my-3">
          {Array.from({ length: stats.targetCoffees }).map((_, idx) => {
            const isFilled = idx < stats.coffeesBrewed
            return (
              <div
                key={idx}
                className={`h-11 rounded-2xl flex items-center justify-center transition-all ${
                  isFilled
                    ? 'bg-[#2C1A0E] text-[#E8C5A5] shadow-xs'
                    : 'bg-[#FAF4ED] text-[#D4C3B5] border border-[#EDE2D4]'
                }`}
              >
                <Coffee size={18} className={isFilled ? 'fill-[#E8C5A5]' : ''} />
              </div>
            )
          })}
        </div>

        <p className="text-[11px] text-[#8C7362] text-center mt-2 font-medium">
          6 more coffees to earn your Master Brewer badge! 🏅
        </p>
      </div>

      {/* Inspirational Quote Card */}
      <div className="bg-gradient-to-br from-[#FAF3EC] via-[#F5ECE3] to-[#EFE2D5] rounded-3xl p-6 border border-[#ECDCCF] text-center shadow-xs">
        <div className="w-10 h-10 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#8C4A28] mx-auto mb-3">
          <Sparkles size={18} />
        </div>
        <p
          className="text-[17px] font-bold text-[#2C1A0E] leading-snug"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          &ldquo;Good coffee creates great moments.&rdquo;
        </p>
        <span className="text-[11px] font-semibold text-[#8C5E3C] mt-2 block tracking-wider uppercase">
          ♡ Yemo Café Community
        </span>
      </div>
    </motion.div>
  )
}
