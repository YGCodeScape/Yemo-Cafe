'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { QrCode, Keyboard } from 'lucide-react'

type Props = {
  onOpenScanner: () => void
  onEnterCodeManually: () => void
}

/**
 * Screen 1: Scan Landing Page
 * Displays barista mascot header, viewfinder preview card,
 * manual table code trigger, and "How it works" 3-step guide.
 */
export default function ScanLandingView({
  onOpenScanner,
  onEnterCodeManually,
}: Props) {
  return (
    <motion.div
      key="screen-landing"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-5 pt-5 pb-24"
    >

      {/* Title & Subtitle */}
      <div className="mb-5">
        <h1
          className="text-[28px] font-extrabold text-[#2C1A0E] leading-tight mb-1.5"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Scan your table
        </h1>
        <p className="text-[13.5px] text-[#7A6353] leading-relaxed max-w-[280px]">
          Point your camera at the QR code on your table to start ordering.
        </p>
      </div>

      {/* Central Viewfinder Preview Card */}
      <div onClick={onOpenScanner}
        className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md cursor-pointer border border-[#E8DFC8] group active:scale-[0.985] transition-all bg-[#2C1A0E]"
      >
        {/* Warm café table background */}
        <Image
          src="/scan/table-qr-stand.jpg"
          alt="Scan Table Preview"
          fill
          className="object-cover brightness-[0.8] contrast-[0.95] group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

        {/* Viewfinder Corner Brackets & QR Icon */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-44 h-44 rounded-2xl border-2 border-white/60 flex flex-col items-center justify-center backdrop-blur-[1px] shadow-lg">
            {/* Glowing corners */}
            <span className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <span className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <span className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-white rounded-br-lg" />

            {/* QR Symbol */}
            <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center text-white mb-2 shadow-inner">
              <QrCode size={30} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-black/40 px-2.5 py-0.5 rounded-full">
              Tap to scan
            </span>
          </div>
        </div>

        {/* Bottom hint badge */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white/90 text-[11.5px] font-medium px-3.5 py-1 rounded-full shadow-sm border border-white/10">
            <span className="text-[#F5C7A0]">ⓘ</span>
            <span>Align QR code within frame</span>
          </div>
        </div>
      </div>

      {/* Enter Table Code Manually Button */}
      <div className="mt-4 mb-4">
        <button
          onClick={onEnterCodeManually}
          className="w-full py-3.5 px-4 rounded-full border border-[#D9CEBF] bg-white hover:bg-[#FAF4ED] text-[#4A3222] font-semibold text-[13.5px] shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Keyboard size={16} className="text-[#8C6D58]" />
          <span>Enter table code manually</span>
        </button>
      </div>

      {/* "How it works" Card */}
      <div className="bg-[#F6EFE6]/80 rounded-2xl p-4 border mb-6 border-[#EAE0D2]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-bold text-[#3D2314] tracking-wide">
            How it works
          </span>
          <span className="text-[11px] text-[#A89080]">3 easy steps</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#D4956A] text-white text-[12px] font-bold flex items-center justify-center mb-1.5 shadow-sm">
              1
            </div>
            <span className="text-[11.5px] font-bold text-[#3D2314]">
              Scan QR
            </span>
            <span className="text-[9.5px] text-[#8C6D58] leading-tight mt-0.5">
              Find on table
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#E4D7C8] text-[#4A3222] text-[12px] font-bold flex items-center justify-center mb-1.5">
              2
            </div>
            <span className="text-[11.5px] font-bold text-[#3D2314]">
              Confirm Table
            </span>
            <span className="text-[9.5px] text-[#8C6D58] leading-tight mt-0.5">
              Lock session
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-[#E4D7C8] text-[#4A3222] text-[12px] font-bold flex items-center justify-center mb-1.5">
              3
            </div>
            <span className="text-[11.5px] font-bold text-[#3D2314]">
              Start Ordering
            </span>
            <span className="text-[9.5px] text-[#8C6D58] leading-tight mt-0.5">
              Direct to kitchen
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
