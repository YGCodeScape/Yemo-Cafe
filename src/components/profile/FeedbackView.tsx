'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'
import FeedbackForm, { FeedbackFormData } from '@/components/ui/FeedbackForm'

interface FeedbackViewProps {
  onBack: () => void
}

export default function FeedbackView({ onBack }: FeedbackViewProps) {
  const showToast = useProfileStore((state) => state.showToast)

  const handleFeedbackSubmit = (data: FeedbackFormData) => {
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
          className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all cursor-pointer"
          aria-label="Back to profile"
        >
          <ArrowLeft size={18} />
        </button>
        <h1
          className="text-[19px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          How was your Yemo experience?
        </h1>
      </div>

      <div className="space-y-4">
        {/* Reusable Feedback Form UI Component */}
        <FeedbackForm
          subtitle="Your feedback helps us brew better coffee and create warmer moments."
          tags={[
            'Artisan Coffee ☕',
            'Warm Ambience ✨',
            'Friendly Staff 💛',
            'Fast Service ⚡',
            'Cozy Seating 🛋️'
          ]}
          commentPlaceholder="Tell us what you loved (or what we can do better)..."
          commentRows={4}
          submitButtonText="Submit Feedback"
          submittedButtonText="Feedback Submitted!"
          onSubmit={handleFeedbackSubmit}
        />

        {/* Google Review Shortcut Card */}
        <a
          href="https://maps.google.com/?q=Yemo+Cafe"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-3xl p-4.5 border border-[#EDE2D5] shadow-xs flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF5EE] border border-[#ECDCCF] flex items-center justify-center text-[#4285F4] text-[18px] font-black shrink-0">
                 <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
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
          <ExternalLink size={16} className="text-[#A08878] transition-colors" />
        </a>

        {/* Decorative Quote Card */}
        <div className=" flex flex-col items-center gap-2 text-center">
           <div>
             <p className="text-[14px] font-bold text-[#2C1A0E]"
               style={{ fontFamily: '"Playfair Display", Georgia, serif' }} >
                Good Food • Good Vibes • Great Moments
             </p>
          </div>
          <div className="relative w-60 h-60 overflow-hidden">
            <Image
              src="/mascot-assets/mascot-seeYouSoon.png"
              alt="Yemo Latte"
              fill
              className="object-cover"
            />
           </div>
        </div>
      </div>
    </motion.div>
  )
}