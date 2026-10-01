'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ArrowRight } from 'lucide-react'

type Props = {
  tableNumber: string
  onContinueOrdering: () => void
  onScanAnotherTable: () => void
  onResetSession: () => void
  onBack: () => void
}

/**
 * Screen 5: Table Already Active View (Returning User)
 * Shows the user their active table session with Continue Ordering
 * and Scan Another Table options.
 */
export default function TableAlreadyActiveView({
  tableNumber,
  onContinueOrdering,
  onScanAnotherTable,
  onResetSession,
  onBack,
}: Props) {
  // Extract number for circle badge if available (e.g. "Table 12" -> "12")
  const tableBadge = tableNumber.replace(/\D/g, '') || '12'

  return (
    <motion.div
      key="screen-already-active"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-6 pt-6 pb-24 text-center"
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
        <button
          onClick={onResetSession}
          className="text-[11px] text-[#A89080] hover:text-[#5C3D2E] underline"
          title="Reset demo session"
        >
          Reset
        </button>
      </div>

      {/* Table Graphic with Table Badge */}
      <div className="my-auto py-4">
        <div className="relative w-52 h-52 mx-auto mb-3">
          <Image
            src="/scan/table-illustration.jpg"
            alt="Active Table"
            fill
            className="object-contain"
          />
          {/* Badge on table */}
          <div className="absolute top-6 right-10 w-9 h-9 rounded-full bg-[#D4956A] text-white font-bold text-[13px] flex items-center justify-center shadow-md border-2 border-white">
            {tableBadge}
          </div>
        </div>

        <h2
          className="text-[23px] font-extrabold text-[#2C1A0E] leading-snug mb-1"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          You're already ordering from {tableNumber || 'Table 12'}
        </h2>
        <p className="text-[13px] text-[#7A6353]">
          Your current table is active.
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onContinueOrdering}
          className="w-full py-4 rounded-full bg-[#2C1A0E] hover:bg-[#1C1008] text-white font-bold text-[15px] shadow-lg shadow-[#2C1A0E]/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Continue Ordering</span>
          <ArrowRight size={17} />
        </button>

        <button
          onClick={onScanAnotherTable}
          className="w-full py-3.5 rounded-full border border-[#D9CEBF] bg-white text-[#5C3D2E] font-semibold text-[13.5px] hover:bg-[#FAF4ED] active:scale-98 transition-all"
        >
          Scan Another Table
        </button>
      </div>
    </motion.div>
  )
}
