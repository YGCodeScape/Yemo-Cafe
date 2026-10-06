'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Coffee, Star, Sparkles, Check, ChevronRight } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface RewardsHubViewProps {
  onBack: () => void
}

export default function RewardsHubView({ onBack }: RewardsHubViewProps) {
  const profile = useProfileStore((state) => state.profile)
  const vouchers = useProfileStore((state) => state.vouchers)
  const redeemVoucher = useProfileStore((state) => state.redeemVoucher)
  const setQrPassOpen = useProfileStore((state) => state.setQrPassOpen)

  const progressPercent = Math.min(100, Math.round((profile.beans / profile.milestoneTarget) * 100))
  const beansNeeded = Math.max(0, profile.milestoneTarget - profile.beans)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FDFAF6] pb-28 pt-4 px-4 max-w-md mx-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-4">
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
          Yemo Rewards Hub
        </h1>
      </div>

      {/* Top Balance Banner */}
      <div className="relative text-white rounded-3xl p-5 shadow-lg overflow-hidden mb-5">
        {/* Blurry Background Image */}
        <Image
          src="/banners/bestsellers-banner.jpg"
          alt="Bestsellers background"
          fill
          className="object-cover scale-110 blur-[2px]"
          priority
        />
        {/* Transparent dark overlay for crisp text readability */}
        <div className="absolute inset-0 bg-[#2011084f] backdrop-blur-[0.5x]" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#FBEEDC] shadow-xs">
              <Coffee size={24} />
            </div>
            <div>
              <div className="text-[26px] font-black text-white leading-none drop-shadow-sm">
                {profile.beans}
              </div>
              <div className="text-[12px] font-bold text-[#E8DFD5] mt-0.5 drop-shadow-xs">
                Yemo Beans Available
              </div>
            </div>
          </div>

          <button
            onClick={() => setQrPassOpen(true)}
            className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full shadow-md active:scale-95 transition-all flex items-center gap-1"
          >
            <span>Scan Pass</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Milestone Progress Section */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs mb-5">
        <div className="flex items-baseline justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[18px] font-extrabold text-[#2C1A0E]">
              {profile.beans}
            </span>
            <span className="text-[14px] text-[#A08878] font-bold">
              / {profile.milestoneTarget}
            </span>
          </div>
          <span className="text-[12px] font-semibold text-[#8C4A28]">
            {beansNeeded > 0 ? `${beansNeeded} beans to your free drink` : 'Free drink ready! 🎉'}
          </span>
        </div>

        {/* Linear Progress Track */}
        <div className="w-full h-2.5 bg-[#F2ECE5] rounded-full overflow-hidden mb-4 p-0.5 border border-[#E8DFD5]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#DEB892] via-[#C87D55] to-[#8C4A28] rounded-full"
          />
        </div>

        {/* Tier Badges Row */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#F2ECE5] text-center">
          <div className="flex flex-col items-center">
            <span className="text-[16px] mb-0.5">🥉</span>
            <span className="text-[11px] font-bold text-[#8C7362]">Bronze</span>
            <span className="text-[9px] text-[#A89485]">0–99</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[16px] mb-0.5">🥈</span>
            <span className="text-[11px] font-bold text-[#8C7362]">Silver</span>
            <span className="text-[9px] text-[#A89485]">100–199</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[16px] mb-0.5">👑</span>
            <span className="text-[11px] font-bold text-[#C87D55]">Gold</span>
            <span className="text-[9px] text-[#C87D55] font-semibold">200+</span>
          </div>
        </div>
      </div>

      {/* Redeemable Café Vouchers */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs mb-5">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#9E8777]">
            Redeemable Café Vouchers
          </h3>
          <span className="text-[11px] text-[#C87D55] font-semibold">
            Scan at counter
          </span>
        </div>

        <div className="divide-y divide-[#F2ECE5]">
          {vouchers.map((voucher) => {
            const canAfford = profile.beans >= voucher.points
            return (
              <div key={voucher.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#F2ECE5] shrink-0 border border-[#E8DFD5]">
                    <Image
                      src={voucher.image}
                      alt={voucher.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#2C1A0E] leading-tight" 
                       style={{fontFamily: '"Playfair Display", Georgia, serif'}}>
                      {voucher.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} className="text-[#C87D55] fill-[#C87D55]" />
                      <span className="text-[11px] font-bold text-[#8C4A28]">
                        {voucher.points} pts
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => redeemVoucher(voucher.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 shadow-xs shrink-0 ${
                    canAfford
                      ? 'bg-[#2C1A0E] hover:bg-[#1E110A] text-white'
                      : 'bg-[#F2ECE5] text-[#A89485] cursor-not-allowed opacity-70'
                  }`}
                  disabled={!canAfford}
                >
                  Redeem
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Motivational Footer Card */}
      <div className="bg-gradient-to-r from-[#FAF3EC] to-[#F5ECE3] rounded-2xl p-4 border border-[#ECDCCF] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#EADCCF] flex items-center justify-center text-[#8C4A28] shrink-0">
          <Sparkles size={18} />
        </div>
        <p className="text-[12px] font-medium text-[#7A6251] leading-snug">
          &ldquo;Collect more beans on every cup, unlock bigger handcrafted treats!&rdquo; ♡
        </p>
      </div>
    </motion.div>
  )
}
