'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check, Sparkles, Milk, Flame, Snowflake, Candy, Leaf } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface TastePreferencesViewProps {
  onBack: () => void
}

export default function TastePreferencesView({ onBack }: TastePreferencesViewProps) {
  const taste = useProfileStore((state) => state.taste)
  const updateTaste = useProfileStore((state) => state.updateTaste)
  const toggleDietary = useProfileStore((state) => state.toggleDietary)
  const showToast = useProfileStore((state) => state.showToast)

  const milks = ['Oat Milk', 'Almond', 'Whole'] as const
  const temps = ['Hot', 'Iced'] as const
  const sweetLevels = ['Regular', 'Less Sweet', 'No Sugar'] as const
  const dietaryOptions = ['Vegetarian', 'Vegan'] as const

  const handleSelectMilk = (m: typeof milks[number]) => {
    updateTaste({ defaultMilk: m })
    showToast(`Default milk set to ${m}`)
  }

  const handleSelectTemp = (t: typeof temps[number]) => {
    updateTaste({ servingTemp: t })
    showToast(`Default temp set to ${t}`)
  }

  const handleSelectSweetness = (s: typeof sweetLevels[number]) => {
    updateTaste({ sweetness: s })
    showToast(`Sweetness preference set to ${s}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FDFAF6] pb-28 pt-4 px-4 max-w-md mx-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
          aria-label="Back to profile"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[19px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Taste &amp; Ordering Preferences
        </h1>
      </div>

      <div className="space-y-4">
        {/* 1. Default Milk Preference */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Milk size={16} className="text-[#C87D55]" />
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Default Milk Preference
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {milks.map((m) => {
              const selected = taste.defaultMilk === m
              return (
                <button
                  key={m}
                  onClick={() => handleSelectMilk(m)}
                  className={`py-2.5 px-4 rounded-full text-[13px] font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    selected
                      ? 'bg-[#2C1A0E] text-white shadow-xs'
                      : 'bg-[#FAF4ED] text-[#6E4E37] border border-[#EBDCCF]'
                  }`}
                >
                  {selected && <Check size={14} className="stroke-[3]" />}
                  <span>{m}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Serving Temperature */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-[#C87D55]" />
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Serving Temperature
            </h3>
          </div>

          <div className="flex gap-2">
            {temps.map((t) => {
              const selected = taste.servingTemp === t
              return (
                <button
                  key={t}
                  onClick={() => handleSelectTemp(t)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-[13px] font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    selected
                      ? 'bg-[#2C1A0E] text-white shadow-xs'
                      : 'bg-[#FAF4ED] text-[#6E4E37] border border-[#EBDCCF]'
                  }`}
                >
                  {t === 'Hot' ? <Flame size={15} /> : <Snowflake size={15} />}
                  <span>{t}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Sweetness Level */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Candy size={16} className="text-[#C87D55]" />
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Sweetness Level
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {sweetLevels.map((s) => {
              const selected = taste.sweetness === s
              return (
                <button
                  key={s}
                  onClick={() => handleSelectSweetness(s)}
                  className={`py-2.5 px-4 rounded-full text-[13px] font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    selected
                      ? 'bg-[#2C1A0E] text-white shadow-xs'
                      : 'bg-[#FAF4ED] text-[#6E4E37] border border-[#EBDCCF]'
                  }`}
                >
                  {selected && <Check size={14} className="stroke-[3]" />}
                  <span>{s}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Dietary Preferences */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={16} className="text-emerald-700" />
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Dietary Preferences
            </h3>
          </div>

          <div className="flex gap-2">
            {dietaryOptions.map((d) => {
              const selected = taste.dietary.includes(d)
              return (
                <button
                  key={d}
                  onClick={() => toggleDietary(d)}
                  className={`flex-1 py-2.5 px-4 rounded-full text-[13px] font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    selected
                      ? 'bg-[#EBF7EE] text-emerald-900 border border-emerald-300 shadow-xs'
                      : 'bg-[#FAF4ED] text-[#6E4E37] border border-[#EBDCCF]'
                  }`}
                >
                  <Leaf size={14} className={selected ? 'text-emerald-700' : 'text-[#8C7362]'} />
                  <span>{d}</span>
                  {selected && <Check size={13} className="text-emerald-700 stroke-[3]" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Note */}
      <div className="text-center py-6 text-[#8C7362]">
        <div className="inline-flex items-center gap-1 text-[12px] font-semibold">
          <span>♡</span>
          <span>These preferences help us brew your cup just the way you love it!</span>
        </div>
      </div>
    </motion.div>
  )
}
