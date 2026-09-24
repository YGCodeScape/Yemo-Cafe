'use client'

import { SlidersHorizontal } from 'lucide-react'

export type FilterTab = 'beverages' | 'food'

type Props = {
  active: FilterTab
  onChange: (tab: FilterTab) => void
  onFilter?: () => void
  className?: string
}

/**
 * Main category toggle — Beverages / Food + filter icon.
 * Used on both the Home and Menu pages.
 */
export default function FilterTabs({ active, onChange, onFilter, className = '' }: Props) {
  return (
    <div className={'flex items-center gap-2 ' + className}>
      <button
        onClick={() => onChange('beverages')}
        className={
          'flex items-center gap-1.5 px-4 py-3 rounded-full text-[14px] font-semibold transition-all duration-200 ' +
          (active === 'beverages'
            ? 'bg-[#2C1A0E] text-[#FDFAF6] shadow-md'
            : 'bg-[#F2EAE1] text-[#A89080] border border-[#E2DDD8]')
        }
      >
        <span>☕</span>
        <span>Beverages</span>
      </button>

      <button
        onClick={() => onChange('food')}
        className={
          'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ' +
          (active === 'food'
            ? 'bg-[#2C1A0E] text-[#FDFAF6] shadow-md'
            : 'bg-[#F2EAE1] text-[#A89080] border border-[#E2DDD8]')
        }
      >
        <span>🍽️</span>
        <span>Food</span>
      </button>

      <button
        onClick={onFilter}
        className="ml-auto w-10 h-10 bg-[#F2EAE1] rounded-full flex items-center justify-center border border-[#E2DDD8] shrink-0 active:scale-90 transition-transform"
        aria-label="Open filters"
      >
        <SlidersHorizontal size={16} className="text-[#6B3F2A]" />
      </button>
    </div>
  )
}
