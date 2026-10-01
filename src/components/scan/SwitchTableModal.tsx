'use client'

import { motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

type Props = {
  currentTable: string
  pendingTable: string
  onConfirmSwitch: () => void
  onCancel: () => void
}

/**
 * Screen 8: Switch Table Confirmation Dialog
 * Asks the user if they want to move their cart from the current table
 * to the newly scanned table.
 */
export default function SwitchTableModal({
  currentTable,
  pendingTable,
  onConfirmSwitch,
  onCancel,
}: Props) {
  return (
    <motion.div
      key="screen-switch-confirm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#FDFAF6] rounded-3xl p-6 text-center max-w-sm w-full shadow-2xl border border-[#EDE5DD]"
      >
        {/* Swap Icon in circular container */}
        <div className="w-16 h-16 rounded-full bg-[#F5EDE4] flex items-center justify-center mx-auto mb-4 border border-[#EAE0D2]">
          <RotateCcw size={28} className="text-[#8C5D3D]" />
        </div>

        {/* Title & Description */}
        <h2
          className="text-[22px] font-extrabold text-[#2C1A0E] mb-2"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Switch table?
        </h2>
        <p className="text-[13px] text-[#7A6353] leading-relaxed mb-6">
          Your current cart belongs to{' '}
          <strong className="text-[#2C1A0E]">{currentTable}</strong>. Do you want
          to switch to{' '}
          <strong className="text-[#D4956A]">{pendingTable}</strong>?
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onConfirmSwitch}
            className="w-full py-3.5 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[14px] shadow-md shadow-[#2C1A0E]/20 active:scale-98 transition-all"
          >
            Switch Table
          </button>

          <button
            onClick={onCancel}
            className="w-full py-3 rounded-full border border-[#DED4C7] bg-white text-[#5C3D2E] font-semibold text-[13.5px] hover:bg-[#F8F4EE] active:scale-98 transition-all"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
