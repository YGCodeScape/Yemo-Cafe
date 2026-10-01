'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, Camera, Sparkles } from 'lucide-react'

type Props = {
  onAllowCamera: () => void
  onClose: () => void
  onEnterCodeManually: () => void
}

/**
 * Screen 3: Camera Permission Request Modal / Bottom Sheet
 * Asks user for camera access with 3 clear options:
 * 1. Allow Camera
 * 2. Not now
 * 3. Enter table code manually
 */
export default function CameraPermissionModal({
  onAllowCamera,
  onClose,
  onEnterCodeManually,
}: Props) {
  return (
    <motion.div
      key="screen-permission"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
    >
      {/* Header above card */}
      <div className="absolute top-6 left-5 flex items-center gap-3 text-white">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h3 className="text-[17px] font-bold">Scan</h3>
          <p className="text-[11px] text-white/70">Find your table</p>
        </div>
      </div>

      {/* Sheet Card */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-[#FDFAF6] rounded-t-[32px] p-6 text-center max-w-md mx-auto w-full shadow-2xl border-t border-[#EDE5DD]"
      >
        {/* Camera Icon in circle with sparkles */}
        <div className="relative w-20 h-20 rounded-full bg-[#F5EDE4] flex items-center justify-center mx-auto mb-4 border border-[#EAE0D2]">
          <Camera size={34} className="text-[#8C5D3D]" />
          <Sparkles
            size={18}
            className="absolute -top-1 -right-1 text-[#D4956A] animate-pulse"
          />
        </div>

        {/* Title & Description */}
        <h2
          className="text-[22px] font-extrabold text-[#2C1A0E] mb-2"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Allow camera access
        </h2>
        <p className="text-[13.5px] text-[#7A6353] leading-relaxed max-w-[260px] mx-auto mb-6">
          Yemo needs access to your camera to scan the QR code on your table.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onAllowCamera}
            className="w-full py-3.5 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[14.5px] shadow-md shadow-[#2C1A0E]/20 active:scale-98 transition-all"
          >
            Allow Camera
          </button>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full border border-[#DED4C7] bg-white text-[#5C3D2E] font-semibold text-[14px] hover:bg-[#F8F4EE] active:scale-98 transition-all"
          >
            Not now
          </button>

          <button
            onClick={onEnterCodeManually}
            className="pt-2 text-[12.5px] font-semibold text-[#8C6D58] hover:text-[#2C1A0E] underline tracking-tight"
          >
            Enter table code manually
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
