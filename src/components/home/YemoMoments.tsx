'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { YEMO_MOMENTS, type MomentItem } from '@/data/momentsData'
import { useCartStore } from '@/store/useCartStore'

export default function YemoMoments() {
  const [current, setCurrent] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [expandedMoment, setExpandedMoment] = useState<MomentItem | null>(null)
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  const setStoryOpen = useCartStore(state => state.setStoryOpen)

  // Hide bottom navigation whenever story modal is open
  useEffect(() => {
    setStoryOpen(Boolean(expandedMoment))
    return () => setStoryOpen(false)
  }, [expandedMoment, setStoryOpen])

  const total = YEMO_MOMENTS.length

  const goNext = () => setCurrent(i => (i + 1) % total)
  const goPrev = () => setCurrent(i => (i - 1 + total) % total)

  // Whenever user slides to a new frame, reset mute to true and play to true so the new frame autoplays muted
  useEffect(() => {
    setIsMuted(true)
    setIsPlaying(true)
  }, [current])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(m => !m)
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(p => !p)
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] ?? YEMO_MOMENTS.find(m => m.id === id)?.likes ?? 0) + (liked[id] ? -1 : 1),
    }))
  }

  // Calculate relative index for 3D stack placement
  const getRelativePosition = (index: number) => {
    let diff = index - current
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  return (
    <section className="mt-8 mb-10 overflow-hidden">
      {/* ── Section Header ── */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h2
            className="text-[22px] font-bold text-[#2C1A0E] tracking-tight"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Yemo Moments
          </h2>
          <span className="w-2 h-2 rounded-full bg-[#D4956A] animate-pulse" />
        </div>
        <p className="text-[12px] text-[#A89080] font-medium leading-snug">
          See what's brewing, happening &amp; waiting for you.
        </p>
      </div>

      {/* ── 3D Card Stage ── */}
      <div className="relative w-full h-[400px] flex items-center justify-center select-none touch-pan-y">
        <div className="relative w-full h-full max-w-[420px] mx-auto flex items-center justify-center">
          {YEMO_MOMENTS.map((moment, index) => {
            const relPos = getRelativePosition(index)
            const isCenter = relPos === 0
            const isVisible = Math.abs(relPos) <= 2

            if (!isVisible) return null

            return (
              <MomentCard
                key={moment.id}
                moment={moment}
                relPos={relPos}
                isCenter={isCenter}
                isMuted={isMuted}
                isPlaying={isPlaying}
                liked={!!liked[moment.id]}
                likeCount={likes[moment.id] ?? moment.likes}
                isModalOpen={Boolean(expandedMoment)}
                onSwipeLeft={goNext}
                onSwipeRight={goPrev}
                onClickSide={() => (relPos < 0 ? goPrev() : goNext())}
                onToggleMute={toggleMute}
                onTogglePlay={togglePlay}
                onLike={e => handleLike(moment.id, e)}
                onExpand={() => setExpandedMoment(moment)}
              />
            )
          })}
        </div>
      </div>

      {/* ── Centered Dots Pagination ── */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {YEMO_MOMENTS.map((_, i) => {
          const isActive = i === current
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full focus:outline-none"
              style={{
                width: isActive ? 22 : 8,
                height: 8,
                backgroundColor: isActive ? '#2C1A0E' : '#D8CFCA',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          )
        })}
      </div>

      {/* ── Fullscreen Story Viewer Modal ── */}
      <AnimatePresence>
        {expandedMoment && (
          <StoryModal
            moment={expandedMoment}
            onClose={() => setExpandedMoment(null)}
            onNext={() => {
              const curIdx = YEMO_MOMENTS.findIndex(m => m.id === expandedMoment.id)
              setExpandedMoment(YEMO_MOMENTS[(curIdx + 1) % total])
            }}
            onPrev={() => {
              const curIdx = YEMO_MOMENTS.findIndex(m => m.id === expandedMoment.id)
              setExpandedMoment(YEMO_MOMENTS[(curIdx - 1 + total) % total])
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Individual Moment Card (3D Perspective Deck)
───────────────────────────────────────────────────────────────────────────── */

type CardProps = {
  moment: MomentItem
  relPos: number
  isCenter: boolean
  isMuted: boolean
  isPlaying: boolean
  liked: boolean
  likeCount: number
  isModalOpen: boolean
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onClickSide: () => void
  onToggleMute: (e: React.MouseEvent) => void
  onTogglePlay: (e: React.MouseEvent) => void
  onLike: (e: React.MouseEvent) => void
  onExpand: () => void
}

function MomentCard({
  moment,
  relPos,
  isCenter,
  isMuted,
  isPlaying,
  liked,
  likeCount,
  isModalOpen,
  onSwipeLeft,
  onSwipeRight,
  onClickSide,
  onToggleMute,
  onTogglePlay,
  onLike,
  onExpand,
}: CardProps) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const dragX = useMotionValue(0)
  const rotate = useTransform(dragX, [-150, 0, 150], [-8, 0, 8])

  // Strictly control video playback: ONLY center card plays, background cards STOP and MUTE immediately
  useEffect(() => {
    const video = localVideoRef.current
    if (!video || moment.type !== 'video') return

    if (isCenter && !isModalOpen) {
      video.muted = isMuted
      if (isPlaying) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {})
        }
      } else {
        video.pause()
      }
    } else {
      // Background card or modal open: Stop immediately and silence
      video.pause()
      video.muted = true
      video.currentTime = 0
    }
  }, [isCenter, isPlaying, isMuted, isModalOpen, moment.type])

  useEffect(() => {
    return () => {
      if (localVideoRef.current) {
        localVideoRef.current.pause()
      }
    }
  }, [])

  // Compute 3D deck properties based on distance from center
  const getDeckStyles = () => {
    if (relPos === 0) {
      return {
        x: 0,
        scaleX: 1,
        scaleY: 1,
        zIndex: 30,
        opacity: 1,
        dimOverlay: 0,
      }
    }
    if (relPos === -1) {
      return {
        x: '-26%',
        scaleX: 0.80,
        scaleY: 0.87,
        zIndex: 20,
        opacity: 0.95,
        dimOverlay: 0.38,
      }
    }
    if (relPos === 1) {
      return {
        x: '26%',
        scaleX: 0.80,
        scaleY: 0.87,
        zIndex: 20,
        opacity: 0.95,
        dimOverlay: 0.38,
      }
    }
    if (relPos === -2) {
      return {
        x: '-45%',
        scaleX: 0.68,
        scaleY: 0.76,
        zIndex: 10,
        opacity: 0.8,
        dimOverlay: 0.58,
      }
    }
    if (relPos === 2) {
      return {
        x: '45%',
        scaleX: 0.68,
        scaleY: 0.76,
        zIndex: 10,
        opacity: 0.8,
        dimOverlay: 0.58,
      }
    }
    return { x: 0, scaleX: 0.5, scaleY: 0.6, zIndex: 0, opacity: 0, dimOverlay: 0.7 }
  }

  const { x, scaleX, scaleY, zIndex, opacity, dimOverlay } = getDeckStyles()

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 40
    const velocityThreshold = 200
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipeLeft()
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipeRight()
    }
  }

  return (
    <motion.div
      drag={isCenter ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      style={{
        zIndex,
        rotate: isCenter ? rotate : 0,
        x: isCenter ? undefined : x,
      }}
      animate={{
        x: isCenter ? 0 : x,
        scaleX,
        scaleY,
        opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onClick={!isCenter ? onClickSide : undefined}
      className={`absolute w-[240px] sm:w-[260px] h-[370px] rounded-[28px] overflow-hidden cursor-pointer shadow-xl ${
        isCenter ? 'cursor-grab active:cursor-grabbing ring-1 ring-white/20' : 'cursor-pointer'
      }`}
    >
      {/* ── Background Media ── */}
      <div className="absolute inset-0 bg-[#1E110A] overflow-hidden">
        {moment.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={localVideoRef}
              src={moment.mediaUrl}
              poster={moment.posterUrl}
              autoPlay={isCenter && !isModalOpen}
              muted={!isCenter || isMuted || isModalOpen}
              loop
              playsInline
              preload={isCenter ? 'auto' : 'none'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          /* Ken Burns slow cinematic breathing zoom for photos */
          <motion.div
            className="relative w-full h-full"
            animate={
              isCenter
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src={moment.posterUrl}
              alt='moment_post'
              fill
              className="object-cover"
              sizes="(max-width: 430px) 260px, 300px"
              priority={isCenter}
            />
          </motion.div>
        )}

        {/* ── Subtle Vignette & Gradient Overlays ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

        {/* ── Side Card Dimmer (darkens flanking cards in stack) ── */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: `rgba(0, 0, 0, ${dimOverlay})` }}
        />
      </div>

      {/* ── Top Floating Action (Expand) ── */}
      {isCenter && (
        <div className="absolute top-0 right-0 p-3.5 z-10">
          <button
            onClick={e => {
              e.stopPropagation()
              onExpand()
            }}
            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/15 active:scale-90 transition-transform shadow-sm"
            aria-label="Expand story"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      )}

      {/* ── Bottom Content Info & Interactive Actions ── */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end text-white">
        {/* Caption only (title & tag removed as requested) */}
        <p className="text-[12px] text-white/95 line-clamp-2 leading-snug mb-3 drop-shadow-sm font-medium">
          {moment.caption}
        </p>

        {/* Action Controls Row */}
        {isCenter && (
          <div className="flex items-center justify-between pt-2 border-t border-white/15">
            {/* Video / Photo Controls */}
            <div className="flex items-center gap-2">
              {moment.type === 'video' ? (
                <>
                  <button
                    onClick={onTogglePlay}
                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                  </button>
                  <button
                    onClick={onToggleMute}
                    className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                </>
              ) : (
                <span className="text-[10px] text-white/80 font-medium">
                  {moment.timeAgo}
                </span>
              )}
            </div>

            {/* Like Counter */}
            <button
              onClick={onLike}
              className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 active:scale-90 transition-transform"
            >
              <Heart
                size={12}
                className={liked ? 'text-[#E8637A] fill-[#E8637A]' : 'text-white'}
              />
              <span className="text-[10px] font-bold">{likeCount}</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   Story Modal (Fullscreen Immersive Viewer)
───────────────────────────────────────────────────────────────────────────── */

function StoryModal({
  moment,
  onClose,
  onNext,
  onPrev,
}: {
  moment: MomentItem
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  const [modalMuted, setModalMuted] = useState(false)
  const [modalPlaying, setModalPlaying] = useState(true)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.play().catch(() => {})
      } else {
        modalVideoRef.current.pause()
      }
    }
  }, [modalPlaying])

  // Prevent background scrolling
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-0 sm:p-4 backdrop-blur-xl"
    >
      <div className="relative w-full h-full sm:max-w-[430px] sm:h-[92vh] sm:rounded-[36px] overflow-hidden bg-black flex flex-col justify-between">
        {/* Media */}
        <div className="absolute inset-0">
          {moment.type === 'video' ? (
            <video
              ref={modalVideoRef}
              src={moment.mediaUrl}
              poster={moment.posterUrl}
              autoPlay
              muted={modalMuted}
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={moment.posterUrl}
              alt="Yemo Moment"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Top Header — Clean close icon & mute icon for video only (z-30 so it's always above navigation tap zones) */}
        <div className="relative z-30 p-5 pt-8 sm:pt-5 flex items-center justify-end gap-2.5 text-white pointer-events-auto">
          {moment.type === 'video' && (
            <button
              onClick={e => {
                e.stopPropagation()
                setModalMuted(m => !m)
              }}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg cursor-pointer"
              aria-label={modalMuted ? 'Unmute' : 'Mute'}
            >
              {modalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          <button
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg cursor-pointer"
            aria-label="Close story"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tap areas for Prev / Next story (top-24 to bottom-6 to prevent overlapping the header buttons) */}
        <div className="absolute top-24 bottom-6 inset-x-0 flex z-20 pointer-events-auto">
          <div
            onClick={onPrev}
            className="w-1/3 h-full cursor-pointer flex items-center justify-start pl-3 group"
          >
            <ChevronLeft size={28} className="text-white/40 group-hover:text-white transition-colors drop-shadow-md" />
          </div>
          <div
            onClick={() => setModalPlaying(p => !p)}
            className="w-1/3 h-full cursor-pointer"
          />
          <div
            onClick={onNext}
            className="w-1/3 h-full cursor-pointer flex items-center justify-end pr-3 group"
          >
            <ChevronRight size={28} className="text-white/40 group-hover:text-white transition-colors drop-shadow-md" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
