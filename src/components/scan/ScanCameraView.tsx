'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, QrCode, Sparkles } from 'lucide-react'

type Props = {
  onClose: () => void
  onScanSuccess: (table: string) => void
  onScanFail?: () => void
}

/**
 * Screen 2: Active Camera Scanner
 * Shows camera viewfinder with animated laser line.
 * Automatically scans and assigns a random table from Table 1 to Table 12
 * without test/demo controls.
 */
export default function ScanCameraView({
  onClose,
  onScanSuccess,
}: Props) {
  const [isScanning, setIsScanning] = useState(true)

  const handleScanAction = () => {
    setIsScanning(false)
    const randomNum = Math.floor(Math.random() * 12) + 1
    const assignedTable = `Table ${randomNum < 10 ? '0' + randomNum : randomNum}`
    onScanSuccess(assignedTable)
  }

  // Realistic auto-scan detection after ~1.6 seconds of viewfinder alignment
  useEffect(() => {
    const timer = setTimeout(() => {
      handleScanAction()
    }, 1600)

    return () => clearTimeout(timer)
  }, [])

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
            Scan Table
          </h2>
          <p className="text-[11px] text-white/70">Align QR within frame</p>
        </div>

        <div className="w-10" />
      </div>

      {/* Central Camera Viewfinder with Realistic Table Image & Sweeping Laser */}
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
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-[#FFB76B] to-transparent shadow-[0_0_15px_4px_rgba(255,183,107,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls: Scanning Status & Immediate Trigger */}
      <div className="pb-12 pt-4 px-6 text-center z-20 space-y-4 max-w-sm mx-auto w-full">
        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-white/80 text-[13px] font-medium">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-[#D4956A] border-t-transparent rounded-full"
          />
          <span>Scanning table QR code...</span>
        </div>

        {/* Instant Scan Button */}
        <button
          onClick={handleScanAction}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4956A] to-[#B36840] text-white font-bold text-[14px] shadow-lg shadow-[#D4956A]/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <QrCode size={18} />
          <span>Tap to Scan Now</span>
        </button>
      </div>
    </motion.div>
  )
}
