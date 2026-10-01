'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, Check, ArrowRight } from 'lucide-react'

type Props = {
  tableNumber: string
  onStartOrdering: () => void
  onChangeTable: () => void
  onBack: () => void
}

/**
 * Screen 4: Scan Success View
 * Displays table illustration with wreath, checkmark badge,
 * table location confirmation, and CTAs (Start Ordering & Change table).
 */
export default function ScanSuccessView({
  tableNumber,
  onStartOrdering,
  onChangeTable,
  onBack,
}: Props) {
  return (
    <motion.div
      key="screen-success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
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
        <div>
          <h3
            className="text-[18px] font-bold text-[#2C1A0E]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Scan
          </h3>
          <p className="text-[11px] text-[#8F7868]">Find your table</p>
        </div>
        <div className="w-9" />
      </div>

      {/* Illustration: Wooden Café Table with Leaves & Checkmark Badge */}
      <div className="my-auto py-4">
        <div className="relative w-56 h-56 mx-auto mb-4">
          <Image
            src="/scan/table-illustration.jpg"
            alt="Table Confirmed"
            fill
            className="object-contain"
          />

          {/* Floating Checkmark Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="absolute top-4 right-10 w-9 h-9 rounded-full bg-[#2C1A0E] text-white flex items-center justify-center shadow-lg border-2 border-white"
          >
            <Check size={18} strokeWidth={3} />
          </motion.div>
        </div>

        {/* Table Name & Location */}
        <h2
          className="text-[30px] font-extrabold text-[#2C1A0E] mb-1"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {tableNumber || 'Table 12'}
        </h2>
        <p className="text-[12.5px] font-semibold text-[#8C6D58] mb-5 tracking-wide">
          Yemo Café - Ground Floor
        </p>

        {/* Reassuring Note */}
        <div className="bg-[#FAF2E8] border border-[#E9DFD0] rounded-2xl p-3.5 max-w-[280px] mx-auto shadow-sm">
          <p className="text-[14px] font-bold text-[#2C1A0E] mb-0.5">
            You're all set!
          </p>
          <p className="text-[12px] text-[#7A6353]">
            Start adding your favourites to your table order.
          </p>
        </div>
      </div>

      {/* 2 CTAs: Start Ordering and Change Table */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onStartOrdering}
          className="w-full py-4 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[15px] shadow-lg shadow-[#2C1A0E]/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Start Ordering</span>
          <ArrowRight size={17} />
        </button>

        <button
          onClick={onChangeTable}
          className="w-full py-3.5 rounded-full border border-[#D9CEBF] bg-white text-[#5C3D2E] font-semibold text-[13.5px] hover:bg-[#FAF4ED] active:scale-98 transition-all"
        >
          Change table
        </button>
      </div>
    </motion.div>
  )
}
