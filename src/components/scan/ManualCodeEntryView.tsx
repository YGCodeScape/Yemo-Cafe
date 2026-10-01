'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowRight, Lightbulb } from 'lucide-react'

type Props = {
  onCodeSubmit: (code: string) => void
  onBack: () => void
}

/**
 * Screen 7: Enter Table Code Manually
 * Provides 3 auto-advancing input slots, continue CTA,
 * and a helpful location hint card.
 */
export default function ManualCodeEntryView({ onCodeSubmit, onBack }: Props) {
  const [codeDigits, setCodeDigits] = useState(['T', '1', '2'])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleSubmit = () => {
    const fullCode = codeDigits.join('').trim().toUpperCase()
    if (fullCode) {
      onCodeSubmit(fullCode)
    }
  }

  return (
    <motion.div
      key="screen-manual-code"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
      className="flex-1 flex flex-col max-w-md mx-auto w-full px-6 pt-6 pb-2"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#4A3222] active:scale-90 transition-transform"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="w-9" />
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2
          className="text-[26px] font-extrabold text-[#2C1A0E] mb-1.5"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Enter Table Code
        </h2>
        <p className="text-[13px] text-[#7A6353]">
          Usually found beside the QR code.
        </p>
      </div>

      {/* 3 Character Slots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {codeDigits.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const val = e.target.value.toUpperCase()
              const updated = [...codeDigits]
              updated[idx] = val
              setCodeDigits(updated)

              // Auto move focus to next input
              if (val && idx < 2) {
                inputRefs[idx + 1].current?.focus()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !codeDigits[idx] && idx > 0) {
                inputRefs[idx - 1].current?.focus()
              }
            }}
            className="w-16 h-18 text-center text-[26px] font-bold text-[#2C1A0E] bg-white border-2 border-[#D9CEBF] focus:border-[#D4956A] focus:ring-2 focus:ring-[#D4956A]/20 rounded-2xl shadow-sm outline-none transition-all uppercase"
          />
        ))}
      </div>

      {/* Continue Button */}
      <div className="mb-6">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[14.5px] shadow-lg shadow-[#2C1A0E]/20 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Helper Info Card at Bottom */}
      <div className="bg-[#FAF2E8] border border-[#E8DFC8] rounded-2xl p-4 flex items-start gap-3 mt-6">
        <div className="w-8 h-8 rounded-full bg-[#F0E4D2] flex items-center justify-center text-[#D4956A] shrink-0 mt-0.5">
          <Lightbulb size={18} />
        </div>
        <div>
          <p className="text-[12.5px] font-bold text-[#2C1A0E] mb-0.5">
            Where to find it?
          </p>
          <p className="text-[11.5px] text-[#7A6353] leading-relaxed">
            Look for the table number printed directly next to the QR code stand.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
