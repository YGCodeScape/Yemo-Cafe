'use client'

import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  QrCode, 
  Coffee, 
  Tag, 
  Gift, 
  Headphones, 
  Crown, 
  Star,
  Sparkles
} from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface DigitalClubCardViewProps {
  onBack: () => void
}

export default function DigitalClubCardView({ onBack }: DigitalClubCardViewProps) {
  const profile = useProfileStore((state) => state.profile)
  const setQrPassOpen = useProfileStore((state) => state.setQrPassOpen)

  const benefits = [
    {
      icon: Coffee,
      title: 'Earn Yemo Beans on every order',
      desc: '1 bean for every ₹10 spent in-café or online',
    },
    {
      icon: Tag,
      title: 'Exclusive member-only offers',
      desc: 'Secret seasonal drinks and combo discounts',
    },
    {
      icon: Gift,
      title: 'Birthday special treat',
      desc: 'Free handcrafted beverage on your birthday',
    },
    {
      icon: Headphones,
      title: 'Priority counter support',
      desc: 'Dedicated assistance and prompt barista service',
    },
  ]

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
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Digital Yemo Club Card
        </h1>
      </div>

      {/* Hero Gold Member Card */}
      <div
        className="relative overflow-hidden rounded-[28px] p-5 sm:p-6 shadow-xl border border-[#D8B48B] text-[#2C1A0E] mb-5 select-none"
        style={{
          background: 'linear-gradient(135deg, #DEB892 0%, #E8C8A6 40%, #F5DEC6 80%, #DFBA94 100%)',
        }}
      >
        {/* Subtle Watermark & Botanical Graphics */}
        <div className="absolute -right-4 -bottom-4 w-40 h-40 opacity-15 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 30 100 50 100 100 C70 100 50 70 50 0 Z" />
            <path d="M50 0 C30 30 0 50 0 100 C30 100 50 70 50 0 Z" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Top row: Brand & Crown */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              <span
                className="text-[20px] font-black tracking-wider text-[#3B1F0E]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                yemo
              </span>
              <span className="text-[11px] font-bold text-[#69442C] tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/40">
                Gold Member
              </span>
            </div>
            <Crown size={22} className="text-[#8C5E3C] fill-[#8C5E3C]/30" />
          </div>

          {/* Member Name and ID + QR preview */}
          <div className="flex items-end justify-between">
            <div>
              <h2
                className="text-[22px] font-bold text-[#2C1A0E] tracking-tight leading-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {profile.name}
              </h2>
              <p className="text-[12px] font-semibold text-[#6E4E37] tracking-wider mt-0.5">
                {profile.memberId}
              </p>

              {/* Beans Pill */}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2C1A0E] text-[#FBEEDC] flex items-center justify-center shadow-xs">
                  <Star size={14} className="fill-[#FFC83B] text-[#FFC83B]" />
                </div>
                <div>
                  <div className="text-[20px] font-black text-[#2C1A0E] leading-none">
                    {profile.beans}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#6E4E37] tracking-wider">
                    Yemo Beans
                  </div>
                </div>
              </div>
            </div>

            {/* Scannable Mini QR */}
            <div
              onClick={() => setQrPassOpen(true)}
              className="bg-white p-2 rounded-2xl border-2 border-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
              title="Tap to enlarge QR Pass"
            >
              <div className="w-16 h-16 bg-[#2C1A0E] rounded-xl flex flex-col items-center justify-center text-white p-1">
                <QrCode size={36} className="text-white" />
                <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5">
                  Scan Pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show QR Pass Button */}
      <button
        onClick={() => setQrPassOpen(true)}
        className="w-full bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3.5 px-4 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2C1A0E]/15 active:scale-[0.98] transition-all mb-6"
      >
        <QrCode size={18} />
        <span>Show QR Pass</span>
      </button>

      {/* Your Membership Benefits */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs mb-6">
        <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#9E8777] mb-3">
          Your Membership Benefits
        </h3>

        <div className="space-y-3.5">
          {benefits.map((b, idx) => {
            const Icon = b.icon
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF3EC] border border-[#ECDCCF] flex items-center justify-center text-[#8C4A28] shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#2C1A0E]">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-[#7A6251] leading-relaxed mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Decorative Warm Note */}
      <div className="text-center py-2 text-[#A08878]">
        <p
          className="text-[14px] font-medium italic"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          More Beans, More Good Days ♡
        </p>
      </div>
    </motion.div>
  )
}
