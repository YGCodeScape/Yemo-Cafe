'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, QrCode, RefreshCw } from 'lucide-react'

type Props = {
  onTryAgain: () => void
  onEnterTableCode: () => void
  onBack: () => void
}

/**
 * Screen 6: Scan Failed View (Unrecognized QR)
 * Displays error graphic with exclamation badge and CTAs
 * (Try Again and Enter Table Code).
 */
export default function ScanFailedView({
  onTryAgain,
  onEnterTableCode,
  onBack,
}: Props) {
  return (
    <motion.div
      key="screen-failed"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-6 pt-6 pb-12 text-center"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#4A3222] active:scale-90 transition-transform"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <h3
          className="text-[18px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Scan
        </h3>
        <div className="w-9" />
      </div>

      {/* Error Graphic: QR with Warning Badge */}
      <div className="my-6 py-4">
        <div className="relative w-28 h-28 rounded-full bg-[#FCECE9] flex items-center justify-center mx-auto mb-5 border border-[#F5D5CF]">
          <QrCode size={48} className="text-[#8C5D3D]" />
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#D93829] text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-white">
            !
          </div>
        </div>

        <h2
          className="text-[22px] font-extrabold text-[#2C1A0E] leading-snug mb-2 max-w-[270px] mx-auto"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Hmm... we couldn't recognize that QR
        </h2>
        <p className="text-[13px] text-[#7A6353] leading-relaxed max-w-[260px] mx-auto">
          Make sure you're scanning the QR code provided by Yemo.
        </p>
      </div>

      {/* CTAs: Try Again & Enter Table Code */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onTryAgain}
          className="w-full py-4 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[14.5px] shadow-lg shadow-[#2C1A0E]/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>

        <button
          onClick={onEnterTableCode}
          className="w-full py-3.5 rounded-full border border-[#D9CEBF] bg-white text-[#5C3D2E] font-semibold text-[13.5px] hover:bg-[#FAF4ED] active:scale-98 transition-all"
        >
          Enter Table Code
        </button>
      </div>
    </motion.div>
  )
}
