'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Star } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

export default function CafePassQrModal() {
  const isQrPassOpen = useProfileStore((state) => state.isQrPassOpen)
  const setQrPassOpen = useProfileStore((state) => state.setQrPassOpen)
  const profile = useProfileStore((state) => state.profile)

  if (!isQrPassOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQrPassOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[340px] bg-[#FAF5EE] rounded-[32px] p-6 shadow-2xl border border-[#EBDCCF] text-center z-10 overflow-hidden"
        >
          {/* Subtle Botanical corner flourishes */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C87D55]/15 via-transparent to-transparent pointer-events-none rounded-tr-[32px]" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#DEB892]/20 via-transparent to-transparent pointer-events-none rounded-bl-[32px]" />

          {/* Close button */}
          <button
            onClick={() => setQrPassOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 border border-[#E5D7CA] flex items-center justify-center text-[#553825] hover:bg-white active:scale-90 transition-all shadow-xs"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Header Title */}
          <div className="mb-2">
            <h2
              className="text-[19px] font-bold text-[#2C1A0E] tracking-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Your Café Pass
            </h2>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span
                className="text-[15px] font-black text-[#8C4A28] tracking-wider uppercase"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                yemo
              </span>
              <span className="text-[10px] text-[#A89280] font-medium">· Good Food • Good Vibes</span>
            </div>
          </div>

          {/* Center QR Code Container */}
          <div className="relative w-52 h-52 mx-auto my-4 bg-white p-3.5 rounded-[26px] shadow-md border-2 border-[#8C4A28]/20 flex items-center justify-center">
            {/* High fidelity SVG QR Code Pattern */}
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner 1 */}
              <rect x="10" y="10" width="40" height="40" rx="8" stroke="#2C1A0E" strokeWidth="8" fill="none" />
              <rect x="22" y="22" width="16" height="16" rx="4" fill="#8C4A28" />
              {/* Corner 2 */}
              <rect x="110" y="10" width="40" height="40" rx="8" stroke="#2C1A0E" strokeWidth="8" fill="none" />
              <rect x="122" y="22" width="16" height="16" rx="4" fill="#8C4A28" />
              {/* Corner 3 */}
              <rect x="10" y="110" width="40" height="40" rx="8" stroke="#2C1A0E" strokeWidth="8" fill="none" />
              <rect x="22" y="122" width="16" height="16" rx="4" fill="#8C4A28" />

              {/* Data Blocks */}
              <rect x="60" y="14" width="8" height="8" rx="2" fill="#2C1A0E" />
              <rect x="76" y="14" width="8" height="16" rx="2" fill="#2C1A0E" />
              <rect x="92" y="14" width="8" height="8" rx="2" fill="#8C4A28" />
              <rect x="60" y="30" width="16" height="8" rx="2" fill="#2C1A0E" />
              <rect x="84" y="30" width="16" height="16" rx="2" fill="#2C1A0E" />

              <rect x="14" y="60" width="8" height="16" rx="2" fill="#2C1A0E" />
              <rect x="30" y="60" width="16" height="8" rx="2" fill="#8C4A28" />
              <rect x="14" y="84" width="24" height="8" rx="2" fill="#2C1A0E" />
              <rect x="26" y="96" width="12" height="6" rx="1.5" fill="#2C1A0E" />

              <rect x="118" y="60" width="16" height="8" rx="2" fill="#2C1A0E" />
              <rect x="142" y="60" width="8" height="16" rx="2" fill="#8C4A28" />
              <rect x="118" y="76" width="8" height="16" rx="2" fill="#2C1A0E" />
              <rect x="134" y="84" width="16" height="18" rx="2" fill="#2C1A0E" />

              <rect x="60" y="118" width="16" height="8" rx="2" fill="#2C1A0E" />
              <rect x="84" y="118" width="16" height="16" rx="2" fill="#8C4A28" />
              <rect x="60" y="134" width="8" height="16" rx="2" fill="#2C1A0E" />
              <rect x="76" y="142" width="24" height="8" rx="2" fill="#2C1A0E" />
              <rect x="110" y="118" width="8" height="24" rx="2" fill="#2C1A0E" />
              <rect x="126" y="126" width="24" height="8" rx="2" fill="#8C4A28" />
              <rect x="134" y="142" width="16" height="8" rx="2" fill="#2C1A0E" />

              {/* Central Badge */}
              <circle cx="80" cy="80" r="19" fill="#FAF5EE" stroke="#8C4A28" strokeWidth="2.5" />
              <text
                x="80"
                y="83"
                textAnchor="middle"
                fontSize="8"
                fontWeight="900"
                fill="#2C1A0E"
                fontFamily="Georgia, serif"
              >
                YEMO
              </text>
            </svg>
          </div>

          {/* User Details */}
          <h3 className="text-[17px] font-bold text-[#2C1A0E] tracking-tight">
            {profile.name}
          </h3>
          <p className="text-[12px] font-semibold text-[#8C6D58] mt-0.5">
            {profile.memberId}
          </p>

          {/* Live Beans Balance */}
          <div className="inline-flex items-center gap-1.5 bg-[#F0E4D5] px-3.5 py-1.5 rounded-full border border-[#DFCEBD] mt-3">
            <Star size={13} className="text-[#C87D55] fill-[#C87D55]" />
            <span className="text-[13px] font-extrabold text-[#2C1A0E]">
              {profile.beans}
            </span>
            <span className="text-[12px] font-bold text-[#8C4A28]">
              Yemo Beans
            </span>
          </div>

          {/* Instructions */}
          <p className="text-[11px] text-[#8C7362] leading-relaxed max-w-[240px] mx-auto mt-3">
            Scan this QR at the counter to redeem rewards or earn beans on every order.
          </p>

          <button
            onClick={() => setQrPassOpen(false)}
            className="w-full mt-4 bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-2.5 rounded-full text-[13px] font-bold active:scale-[0.98] transition-all"
          >
            Done
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
