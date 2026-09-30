'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCcw } from 'lucide-react'

export type FilterState = {
  dietary: 'all' | 'vegetarian' | 'vegan'
  temperature: 'all' | 'hot' | 'cold'
  taste: 'all' | 'sweet' | 'strong' | 'creamy'
  price: 'all' | 'under200' | '200to350' | '350plus'
}

type Props = {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onApply: (filters: FilterState) => void
  totalCount: number
}

import { useState, useEffect } from 'react'

export default function MenuFilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onApply,
  totalCount,
}: Props) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters)
    }
  }, [isOpen, filters])

  const handleReset = () => {
    const defaultState: FilterState = {
      dietary: 'all',
      temperature: 'all',
      taste: 'all',
      price: 'all',
    }
    setLocalFilters(defaultState)
  }

  const handleApply = () => {
    onApply(localFilters)
    onClose()
  }

  const isAnyActive =
    localFilters.dietary !== 'all' ||
    localFilters.temperature !== 'all' ||
    localFilters.taste !== 'all' ||
    localFilters.price !== 'all'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-[440px] bg-[#FAF7F2] rounded-t-[28px] p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Top Grab Handle */}
            <div className="w-12 h-1 bg-[#D9D1C7] rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EDE6DD]">
              <div className="flex items-center gap-2">
                <h3
                  className="text-[20px] font-bold text-[#2C1A0E]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Filter
                </h3>
                {isAnyActive && (
                  <span className="w-2 h-2 rounded-full bg-[#D4956A]" />
                )}
              </div>

              <div className="flex items-center gap-3">
                {isAnyActive && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-[12px] font-medium text-[#8C6D58] hover:text-[#D4956A] transition-colors"
                  >
                    <RotateCcw size={12} />
                    Reset
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center text-[#5C3D2E] hover:bg-[#E4DCCE] transition-colors"
                  aria-label="Close filters"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="py-5 space-y-6">
              {/* Dietary */}
              <div>
                <p className="text-[13px] font-bold text-[#4A3222] mb-2.5 uppercase tracking-wider text-[11px]">
                  Dietary
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'vegetarian', label: 'Vegetarian', icon: '🌱' },
                    { id: 'vegan', label: 'Vegan', icon: '🌿' },
                  ].map((opt) => {
                    const isSelected = localFilters.dietary === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            dietary: prev.dietary === opt.id ? 'all' : (opt.id as any),
                          }))
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                          isSelected
                            ? 'bg-[#3D2314] text-white shadow-sm'
                            : 'bg-white border border-[#E5DDD2] text-[#5C3D2E] hover:border-[#D4956A]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-white bg-white/20'
                              : 'border-[#BCAFA3]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Temperature */}
              <div>
                <p className="text-[13px] font-bold text-[#4A3222] mb-2.5 uppercase tracking-wider text-[11px]">
                  Temperature
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'hot', label: 'Hot', icon: '🔥' },
                    { id: 'cold', label: 'Cold', icon: '❄️' },
                  ].map((opt) => {
                    const isSelected = localFilters.temperature === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            temperature: prev.temperature === opt.id ? 'all' : (opt.id as any),
                          }))
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                          isSelected
                            ? 'bg-[#3D2314] text-white shadow-sm'
                            : 'bg-white border border-[#E5DDD2] text-[#5C3D2E] hover:border-[#D4956A]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-white bg-white/20'
                              : 'border-[#BCAFA3]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Taste */}
              <div>
                <p className="text-[13px] font-bold text-[#4A3222] mb-2.5 uppercase tracking-wider text-[11px]">
                  Taste
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'sweet', label: 'Sweet', icon: '🍯' },
                    { id: 'strong', label: 'Strong', icon: '⚡' },
                    { id: 'creamy', label: 'Creamy', icon: '🥛' },
                  ].map((opt) => {
                    const isSelected = localFilters.taste === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            taste: prev.taste === opt.id ? 'all' : (opt.id as any),
                          }))
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                          isSelected
                            ? 'bg-[#3D2314] text-white shadow-sm'
                            : 'bg-white border border-[#E5DDD2] text-[#5C3D2E] hover:border-[#D4956A]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-white bg-white/20'
                              : 'border-[#BCAFA3]'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-[13px] font-bold text-[#4A3222] mb-2.5 uppercase tracking-wider text-[11px]">
                  Price
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'under200', symbol: '₹', label: 'Under 200' },
                    { id: '200to350', symbol: '₹₹', label: '200–350' },
                    { id: '350plus', symbol: '₹₹₹', label: '350+' },
                  ].map((opt) => {
                    const isSelected = localFilters.price === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setLocalFilters((prev) => ({
                            ...prev,
                            price: prev.price === opt.id ? 'all' : (opt.id as any),
                          }))
                        }
                        className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#3D2314] text-white border-[#3D2314] shadow-sm'
                            : 'bg-white border-[#E5DDD2] text-[#5C3D2E] hover:border-[#D4956A]'
                        }`}
                      >
                        <span className="text-[13px] font-bold mb-0.5">{opt.symbol}</span>
                        <span className="text-[11px] font-medium leading-none">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2 pb-1">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 px-6 rounded-full bg-[#D4956A] hover:bg-[#c28459] text-white font-bold text-[14px] shadow-md shadow-[#D4956A]/20 active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
