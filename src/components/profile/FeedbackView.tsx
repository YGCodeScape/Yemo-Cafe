'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Coffee, Send, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface FeedbackViewProps {
  onBack: () => void
}

export default function FeedbackView({ onBack }: FeedbackViewProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const showToast = useProfileStore((state) => state.showToast)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Thank you! Your feedback warms our cups ☕')
    setTimeout(() => {
      onBack()
    }, 2000)
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
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
          aria-label="Back to profile"
        >
          <ArrowLeft size={18} />
        </button>
        <h1
          className="text-[19px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          How was your Yemo experience?
        </h1>
      </div>

      <div className="space-y-4">
        {/* Main Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE2D5] shadow-xs text-center">
          <p className="text-[13px] text-[#7A6251] max-w-xs mx-auto mb-4">
            Your feedback helps us brew better coffee and create warmer moments.
          </p>

          {/* 5 Coffee Cup Interactive Rating Icons */}
          <div className="flex items-center justify-center gap-3 my-4">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= rating
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="group flex flex-col items-center gap-1 active:scale-90 transition-all p-1"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                      isFilled
                        ? 'bg-[#2C1A0E] text-[#E8C5A5] shadow-md shadow-[#2C1A0E]/15 scale-105'
                        : 'bg-[#F5ECE3] text-[#A89485] hover:bg-[#EFE2D6]'
                    }`}
                  >
                    <Coffee
                      size={22}
                      className={`transition-colors ${isFilled ? 'fill-[#E8C5A5]' : ''}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#7A6251]">
                    {star}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-4">
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved (or what we can do better)..."
              className="w-full bg-[#FAF5EE] border border-[#EBDCCF] rounded-2xl p-3.5 text-[13px] text-[#2C1A0E] placeholder-[#A08878] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 resize-none"
            />

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3.5 rounded-full text-[14px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-75"
            >
              {submitted ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Feedback Submitted!</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Google Review Shortcut Card */}
        <a
          href="https://maps.google.com/?q=Yemo+Cafe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-3xl p-4.5 border border-[#EDE2D5] shadow-xs flex items-center justify-between hover:border-[#D4956A] transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5EE] border border-[#ECDCCF] flex items-center justify-center text-[#4285F4] text-[18px] font-black shrink-0">
              G
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[#2C1A0E]">
                Or leave a Google Review
              </h4>
              <p className="text-[11px] text-[#8C7362]">
                Help us grow with your honest review
              </p>
            </div>
          </div>
          <ExternalLink size={16} className="text-[#A08878] group-hover:text-[#8C4A28] transition-colors" />
        </a>

        {/* Decorative Quote Card */}
        <div className="bg-gradient-to-br from-[#FAF3EC] to-[#F5ECE3] rounded-3xl p-5 border border-[#ECDCCF] text-center">
          <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden shadow-xs border border-white">
            <Image
              src="/orders/served.jpg"
              alt="Yemo Latte"
              fill
              className="object-cover"
            />
          </div>
          <p
            className="text-[15px] font-bold text-[#2C1A0E]"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Good Food • Good Vibes • Great Moments
          </p>
          <span className="text-[11px] text-[#8C5E3C] font-semibold mt-1 block">
            See you soon at Yemo ♡
          </span>
        </div>
      </div>
    </motion.div>
  )
}
