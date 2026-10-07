'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Sparkles, Send, CheckCircle2, HeartHandshake } from 'lucide-react'

export interface FeedbackFormData {
  rating: number
  tag?: string
  comment?: string
}

export interface FeedbackFormProps {
  /** Optional badge text displayed at top of card */
  badgeText?: string
  /** Custom badge icon, defaults to Sparkles */
  badgeIcon?: React.ReactNode
  /** Card title */
  title?: string
  /** Subtitle or introductory message */
  subtitle?: string
  /** Initial rating (1-5), defaults to 5 */
  initialRating?: number
  /** Initial selected tag */
  initialTag?: string
  /** Initial comment text */
  initialComment?: string
  /** Preset tags for quick selection */
  tags?: string[]
  /** Whether to render the comment textarea (default true) */
  showCommentInput?: boolean
  /** Placeholder for the textarea */
  commentPlaceholder?: string
  /** Number of textarea rows (default 3) */
  commentRows?: number
  /** Text on the submit button */
  submitButtonText?: string
  /** Text on the button after successful submission */
  submittedButtonText?: string
  /** Custom submit button icon */
  submitIcon?: React.ReactNode
  /** Custom submitted button icon */
  submittedIcon?: React.ReactNode
  /** External submission state control */
  isSubmitted?: boolean
  /** Callback triggered when user submits feedback */
  onSubmit?: (data: FeedbackFormData) => void | Promise<void>
  /** Additional container CSS class names */
  className?: string
  /** Show friendly mood label under rating cups (default true) */
  showMoodLabel?: boolean
  /** Whether to wrap the container in a motion.div entrance (default true) */
  animate?: boolean
}

const RATING_MOODS = [
  'Could be better ☕',
  'Fair & Decent ☕',
  'Good & Warm ☕',
  'Great Experience ✨',
  'Loved It! ☕💛'
]

export default function FeedbackForm({
  badgeText,
  badgeIcon,
  title,
  subtitle,
  initialRating = 5,
  initialTag = '',
  initialComment = '',
  tags = [],
  showCommentInput = true,
  commentPlaceholder = 'Tell us what you loved (or what we can do better)...',
  commentRows = 3,
  submitButtonText = 'Submit Feedback',
  submittedButtonText = 'Feedback Submitted!',
  submitIcon,
  submittedIcon,
  isSubmitted: externalIsSubmitted,
  onSubmit,
  className = '',
  showMoodLabel = true,
  animate = true,
}: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(initialRating)
  const [selectedTag, setSelectedTag] = useState<string>(initialTag)
  const [comment, setComment] = useState<string>(initialComment)
  const [internalSubmitted, setInternalSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const isSubmitted = externalIsSubmitted !== undefined ? externalIsSubmitted : internalSubmitted

  const handleTagClick = (tag: string) => {
    if (isSubmitted) return
    setSelectedTag((prev) => (prev === tag ? '' : tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit?.({
        rating,
        tag: selectedTag || undefined,
        comment: comment.trim() || undefined,
      })
      setInternalSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const ContainerComponent = animate ? motion.div : 'div'
  const containerMotionProps = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {}

  return (
    <ContainerComponent
      {...containerMotionProps}
      className={`bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE2D5] shadow-xs text-center relative overflow-hidden ${className}`}
    >
      {/* Optional Badge */}
      {badgeText && (
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C87D55] uppercase tracking-wider bg-[#F9EFE6] px-3.5 py-1 rounded-full mb-2 border border-[#F2DECE]">
          {badgeIcon || <Sparkles size={12} />}
          <span>{badgeText}</span>
        </div>
      )}

      {/* Title */}
      {title && (
        <h3
          className="text-[18px] sm:text-[19px] font-bold text-[#2C1A0E] mb-1"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {title}
        </h3>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-[12.5px] text-[#7A6251] max-w-xs mx-auto mb-3.5 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* 5 Coffee Cup Interactive Rating Icons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= rating
          return (
            <button
              key={star}
              type="button"
              disabled={isSubmitted}
              onClick={() => setRating(star)}
              className="group flex flex-col items-center gap-1 active:scale-90 transition-all p-1 focus:outline-none disabled:cursor-default"
              aria-label={`Rate ${star} out of 5 cups`}
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isFilled
                    ? 'bg-[#2C1A0E] text-[#E8C5A5] shadow-md shadow-[#2C1A0E]/15 scale-105'
                    : 'bg-[#F5ECE3] text-[#A89485] '
                }`}
              >
                <Coffee
                  size={22}
                  className={`transition-colors duration-200 ${
                    isFilled ? 'fill-[#E8C5A5]' : ''
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-bold transition-colors ${
                  isFilled ? 'text-[#2C1A0E]' : 'text-[#A08878]'
                }`}
              >
                {star}
              </span>
            </button>
          )
        })}
      </div>

      {/* Rating Mood Label */}
      {showMoodLabel && (
        <div className="h-5 flex items-center justify-center mb-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={rating}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="text-[11px] font-semibold text-[#8C5E3C] bg-[#FAF3EC] px-2.5 py-0.5 rounded-full border border-[#ECDCCF]"
            >
              {RATING_MOODS[rating - 1] || `${rating} Cups`}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* Preset Quick Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center mb-3.5">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag
            return (
              <button
                key={tag}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleTagClick(tag)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all duration-150 active:scale-95 disabled:cursor-default ${
                  isSelected
                    ? 'bg-[#2C1A0E] text-[#FDF9F5] shadow-xs scale-102'
                    : 'bg-[#FAF4ED] text-[#7A6251] border border-[#EBDCCF]'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      )}

      {/* Form with Comment Textarea & Submit Button */}
      <form onSubmit={handleSubmit} className="space-y-3 mt-1">
        {showCommentInput && (
          <div className="text-left">
            <textarea
              rows={commentRows}
              value={comment}
              disabled={isSubmitted}
              onChange={(e) => setComment(e.target.value)}
              placeholder={commentPlaceholder}
              className="w-full bg-[#FAF5EE] border border-[#EBDCCF] rounded-2xl p-3.5 text-[13px] text-[#2C1A0E] placeholder-[#A08878] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 focus:border-[#C87D55] resize-none transition-all disabled:opacity-75"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitted || isSubmitting}
          className={`w-full py-3.5 rounded-full text-[13.5px] font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
            isSubmitted
              ? 'bg-[#2C1A0E]/90 text-white cursor-default'
              : 'bg-[#2C1A0E] text-white active:scale-98 cursor-pointer'
          } disabled:opacity-85`}
        >
          {isSubmitted ? (
            <>
              {submittedIcon || <CheckCircle2 size={16} className="text-emerald-400" />}
              <span>{submittedButtonText}</span>
            </>
          ) : (
            <>
              {submitIcon || <Send size={15} />}
              <span>{isSubmitting ? 'Submitting...' : submitButtonText}</span>
            </>
          )}
        </button>
      </form>
    </ContainerComponent>
  )
}

export { FeedbackForm as FeedbackCard }
