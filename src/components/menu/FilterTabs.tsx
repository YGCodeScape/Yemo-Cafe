'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, SlidersHorizontal, Check, ChevronDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type SubFilter = 'all' | 'coffee' | 'mojitos' | 'mocktails' | 'teas'

export const SUB_FILTERS: { id: SubFilter; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'mojitos', label: 'Mojitos', icon: '🍃' },
  { id: 'mocktails', label: 'Mocktails', icon: '🍹' },
  { id: 'teas', label: 'Teas', icon: '🍵' },
]

type Props = {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  subFilter?: SubFilter
  onSubFilterChange?: (sub: SubFilter) => void
  className?: string
}

/**
 * Top Search Bar + SubFilter Dropdown
 * Sticky pinned search input allowing seamless search while scrolling food/drink cards.
 */
export default function FilterTabs({
  searchQuery = '',
  onSearchChange,
  subFilter = 'all',
  onSubFilterChange,
  className = '',
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 justify-between">
        {/* Search Bar Input Container */}
        <div
          className={`flex items-center px-3.5 py-2.5 rounded-full border transition-all duration-200 flex-1 gap-2.5 ${
            isFocused || searchQuery
              ? 'bg-white border-[#2C1A0E] shadow-md ring-2 ring-[#2C1A0E]/10'
              : 'bg-[#F0E6DC] border-[#E2DDD8]/80 shadow-inner'
          }`}
        >
          <Search
            size={16}
            className={`shrink-0 transition-colors ${
              isFocused || searchQuery ? 'text-[#2C1A0E]' : 'text-[#8C7362]'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder="Search drinks, food & bakery..."
            className="bg-transparent border-none outline-none text-[13px] text-[#2C1A0E] placeholder:text-[#A89080] font-medium w-full"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange?.('')}
              className="text-[#8C7362] hover:text-[#2C1A0E] p-0.5 shrink-0"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Dropdown Icon Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(v => !v)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border transition-all duration-200 active:scale-95 ${
              subFilter !== 'all' || dropdownOpen
                ? 'bg-[#2C1A0E] text-white border-[#2C1A0E] shadow-md'
                : 'bg-[#F2EAE1] text-[#6B3F2A] border-[#E2DDD8] hover:bg-[#EAE0D5]'
            }`}
            aria-label="Filter sub-categories"
          >
            <SlidersHorizontal size={16} />
            {subFilter !== 'all' && (
              <span className="text-[11px] font-bold capitalize max-w-[60px] truncate">
                {subFilter}
              </span>
            )}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />

            {/* Active Dot Indicator */}
            {subFilter !== 'all' && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4956A] rounded-full border-2 border-[#FDFAF6]" />
            )}
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 4 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full z-50 mt-1 w-44 bg-[#FDFAF6] border border-[#E8DFC8] rounded-2xl shadow-xl p-1.5 overflow-hidden"
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#A89080] uppercase tracking-wider border-b border-[#F0E6DC] mb-1">
                  Filter Category
                </div>
                {SUB_FILTERS.map(sub => {
                  const isSelected = subFilter === sub.id
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSubFilterChange?.(sub.id)
                        setDropdownOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                        isSelected
                          ? 'bg-[#2C1A0E] text-[#FDFAF6] font-semibold'
                          : 'text-[#4A3222] hover:bg-[#F2EAE1]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </span>
                      {isSelected && <Check size={14} className="text-[#D4956A]" />}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Selected sub-filter active pill indicator */}
      {subFilter !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2.5 px-1"
        >
          <span className="text-[11px] text-[#8C7362] font-medium">Filter:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAE0D5] text-[#2C1A0E] border border-[#D8C7B5]">
            {SUB_FILTERS.find(s => s.id === subFilter)?.icon}{' '}
            {SUB_FILTERS.find(s => s.id === subFilter)?.label}
            <button
              onClick={() => onSubFilterChange?.('all')}
              className="ml-1 text-[#8C7362] hover:text-[#2C1A0E] font-bold"
            >
              ✕
            </button>
          </span>
        </motion.div>
      )}
    </div>
  )
}
