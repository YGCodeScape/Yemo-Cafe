'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, Flashlight } from 'lucide-react'

type Props = {
  onClose: () => void
  onScanSuccess: (table: string) => void
  onScanFail: () => void
}

/**
 * Screen 2: Full Screen Active Camera Scanner
 * Displays camera viewfinder with animated laser line, flashlight toggle,
 * status indicator, and instant demo simulation triggers.
 */
export default function ScanCameraView({
  onClose,
  onScanSuccess,
  onScanFail,
}: Props) {

  return (
    <motion.div
      key="screen-camera"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#160E08] text-white flex flex-col justify-between"
    >
      {/* Top Navigation */}
      <div className="pt-6 px-5 flex items-center justify-between z-20">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="text-center">
          <h2
            className="text-[20px] font-bold tracking-tight text-white"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Scan
          </h2>
          <p className="text-[11px] text-white/70">Find your table</p>
        </div>

        <div className="w-10" />
      </div>

      {/* Central Camera Viewfinder with Realistic Table Image & Laser */}
      <div className="relative flex-1 flex items-center justify-center px-6">
        <div className="relative w-full max-w-[320px] aspect-[1/1] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
          <Image
            src="/scan/table-qr-stand.jpg"
            alt="QR Camera View"
            fill
            className="object-cover brightness-[0.75] contrast-[1.05]"
          />
          {/* Viewfinder Frame with Golden Glowing Corners */}
          <div className="absolute inset-4 rounded-2xl flex items-center justify-center">
            {/* Glowing corners */}
            <span className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <span className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <span className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <span className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-white rounded-br-lg" />

            {/* Animated Sweeping Laser Line */}
            <motion.div
              animate={{ y: [-110, 110, -110] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#FFB76B] to-transparent shadow-[0_0_15px_4px_rgba(255,183,107,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls: Flashlight & Status */}
      <div className="pb-10 pt-4 px-6 text-center z-20 space-y-4">

        {/* Status Text */}
        <div className="flex items-center justify-center gap-2 text-white/80 text-[13px] font-medium">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-3.5 h-3.5 border-2 border-[#D4956A] border-t-transparent rounded-full"
          />
          <span>Looking for QR code...</span>
        </div>

        {/* Quick Demo Simulation Buttons */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={() => onScanSuccess('Table 12')}
            className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold backdrop-blur-md border border-white/25 active:scale-95 transition-all"
          >
            ✓ Simulate Table 12
          </button>
          <button
            onClick={onScanFail}
            className="px-3.5 py-1.5 rounded-full bg-red-500/25 hover:bg-red-500/35 text-red-200 text-[11px] font-semibold backdrop-blur-md border border-red-400/30 active:scale-95 transition-all"
          >
            ✕ Simulate Unknown QR
          </button>
        </div>
      </div>
    </motion.div>
  )
}
