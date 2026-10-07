'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  Check, 
  CheckCircle2, 
  Share2,
  HeartHandshake
} from 'lucide-react'
import { Order, OrderStatus, ORDER_STATUS_STEPS, useOrderStore } from '@/store/useOrderStore'
import FeedbackForm, { FeedbackFormData } from '@/components/ui/FeedbackForm'

interface LiveOrderTrackerModalProps {
  order: Order
  onClose: () => void
}

export default function LiveOrderTrackerModal({ order, onClose }: LiveOrderTrackerModalProps) {
  const setOrderStatus = useOrderStore(state => state.setOrderStatus)
  const setOrderRating = useOrderStore(state => state.setOrderRating)

  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(Boolean(order.feedbackNote || order.rating))
  const [showToast, setShowToast] = useState<string | null>(null)

  const stepKeys: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'on_the_way', 'served']
  const currentStepIndex = order.status === 'completed' ? 4 : Math.max(0, stepKeys.indexOf(order.status))

  const handleOrderFeedbackSubmit = (data: FeedbackFormData) => {
    const feedbackNote = [data.tag, data.comment].filter(Boolean).join(' — ') || data.tag || 'Great experience'
    setOrderRating(order.id, data.rating, feedbackNote)
    setFeedbackSubmitted(true)
    setShowToast('Thank you! Your feedback warms our hearts ☕')
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleMarkCompleted = () => {
    setOrderStatus(order.id, 'completed')
    setShowToast('Order marked as completed! Added to past history ✓')
    setTimeout(() => {
      onClose()
    }, 1200)
  }

  // Visual Assets & Text for each state
  const getStatePresentation = () => {
    switch (order.status) {
      case 'placed':
        return {
          image: '/mascot-assets/mascot-completed.png',
          title: 'Order Placed!',
          subtitle: 'We have received your order and sent it to the café kitchen.',
          statusBadge: 'Waiting for Barista',
          accentColor: 'text-amber-800'
        }
      case 'confirmed':
        return {
          image: '/mascot-assets/mascot-cheers.png',
          title: 'Barista Accepted!',
          subtitle: 'Your ticket is on the counter. Preparation starting shortly.',
          statusBadge: 'Kitchen Confirmed',
          accentColor: 'text-blue-800'
        }
      case 'preparing':
        return {
          image: '/mascot-assets/mascot-preparing.png',
          title: 'Brewing & Handcrafting',
          subtitle: 'Our baristas are steaming milk and brewing fresh espresso.',
          statusBadge: 'In the Kitchen · 8-10 mins',
          accentColor: 'text-[#8C4A28]'
        }
      case 'on_the_way':
        return {
          image: '/mascot-assets/mascot-on-the-way.png',
          title: 'On the Way to Your Table!',
          subtitle: `Staff is bringing your fresh tray directly to ${order.tableNumber}.`,
          statusBadge: `Staff heading to ${order.tableNumber}`,
          accentColor: 'text-emerald-800'
        }
      case 'served':
        return {
          image: '/mascot-assets/mascot-served.png',
          title: 'Served Fresh! Enjoy ☕',
          subtitle: `Delivered right to ${order.tableNumber}. Please take a sip and enjoy the moment.`,
          statusBadge: `Delivered to ${order.tableNumber}`,
          accentColor: 'text-purple-800'
        }
      case 'completed':
        return {
          image: '/mascot-assets/mascot-completed.png',
          title: 'Order Completed ✓',
          subtitle: `Hope you enjoyed your experience at ${order.tableNumber}! Your order is archived in past history.`,
          statusBadge: `Archived in History`,
          accentColor: 'text-stone-800'
        }
    }
  }

  const presentation = getStatePresentation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs overscroll-contain">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-[430px] h-full sm:h-[94vh] bg-[#FDFAF6] sm:rounded-t-[36px] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#FDFAF6]/90 backdrop-blur-md px-4 py-3.5 border-b border-[#EFE7DE] flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
            aria-label="Back to orders"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="text-center">
            <h1
              className="text-[17px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Order Tracking
            </h1>
            <p className="text-[11px] text-[#8C7362] font-medium">
              {order.tableNumber} · {order.orderNumber}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setShowToast('Table link copied!')
                setTimeout(() => setShowToast(null), 2000)
              }}
              className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#7A6251] shadow-xs active:scale-95"
              aria-label="Share"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar pb-24">
          
          {/* Unified Hero + Compact Step Tracker Card */}
          <motion.div
            key={order.status}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-gradient-to-b from-[#2C1A0E] to-[#1E110A] text-white rounded-[32px] p-5 sm:p-6 shadow-xl shadow-[#2C1A0E]/15 border border-white/[0.08] text-center relative overflow-hidden"
          >
            {/* Subtle Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C87D55]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Central Graphic */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-[24px] overflow-hidden shadow-2xl border-4 border-white mb-6 bg-[#F5EDE4]">
              <Image
                src={presentation.image}
                alt={presentation.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* State Title */}
            <h2
              className="text-[22px] sm:text-[24px] font-bold text-white mb-1.5 tracking-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {presentation.title}
            </h2>

            {/* State Description */}
            <p className="text-[13px] text-[#D8C7B8] max-w-xs mx-auto leading-relaxed mb-6 font-normal">
              {presentation.subtitle}
            </p>

            {/* Live Tracker Steps or Served "Mark as Completed" CTA */}
            {order.status === 'served' ? (
              <div className="pt-2 pb-1 space-y-2.5">
                <p className="text-[12px] text-[#D8C7B8] font-medium flex items-center justify-center gap-1.5">
                  <span>Did you complete your order?</span>
                </p>
                <button
                  onClick={handleMarkCompleted}
                  className="w-full bg-[#C87D55] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-[12px]"
                >
                  <CheckCircle2 size={18} />
                  <span>Mark as Completed</span>
                </button>
              </div>
            ) : order.status === 'completed' ? (
              <div className="pt-2 pb-1">
                <div className="w-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-[13px]">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Order Completed · Moved to Past Orders</span>
                </div>
              </div>
            ) : (
              /* Live Tracker: Number-only Horizontal Step Circles (1..5) */
              <div className="relative pt-1 pb-1">
                {/* Background Track Line */}
                <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[3px] bg-white/15 rounded-full" />

                {/* Active Filled Progress Line */}
                <div
                  className="absolute top-1/2 left-6 -translate-y-1/2 h-[3px] bg-[#C87D55] rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(0, (currentStepIndex / 4) * 100))}%`,
                    maxWidth: 'calc(100% - 48px)',
                  }}
                />

                {/* 5 Step Number Circles */}
                <div className="relative z-10 flex items-center justify-between px-1">
                  {[1, 2, 3, 4, 5].map(stepNum => {
                    const idx = stepNum - 1
                    const isPassed = idx < currentStepIndex
                    const isCurrent = idx === currentStepIndex

                    return (
                      <div
                        key={stepNum}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[13px] sm:text-[14px] font-bold transition-all duration-300 ${
                          isPassed
                            ? 'bg-[#C87D55] text-white shadow-md'
                            : isCurrent
                              ? 'bg-white text-[#2C1A0E] ring-4 ring-[#C87D55]/40 shadow-lg scale-110 font-extrabold'
                              : 'bg-[#3A281E] text-white/40 border border-white/10'
                        }`}
                      >
                        {isPassed ? (
                          <Check size={16} className="stroke-[3]" />
                        ) : (
                          <span>{stepNum}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Feedback Section (Appears when order is Served or Completed - Mockup Screen 4) */}
          {(order.status === 'served' || order.status === 'completed') && (
            <FeedbackForm
              badgeText="Your Feedback Matters"
              title="How was your Yemo experience?"
              subtitle={`Rate your visit for ${order.tableNumber} (${order.orderNumber})`}
              initialRating={order.rating || 5}
              initialTag={order.feedbackNote || 'Loved the coffee! ☕'}
              tags={[
                'Loved the coffee! ☕',
                'Super fast service ⚡',
                'Cozy vibe ✨',
                'Warm & flaky pastry 🥐',
                'Friendly barista 💛'
              ]}
              showCommentInput={true}
              commentPlaceholder="Add any order notes or compliments (optional)..."
              commentRows={2}
              submitButtonText="Share Feedback"
              submittedButtonText="Feedback Sent ✓"
              submitIcon={<HeartHandshake size={16} />}
              isSubmitted={feedbackSubmitted}
              onSubmit={handleOrderFeedbackSubmit}
            />
          )}

          {/* Order Items Breakdown */}
          <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#9E8777]">
                Order Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
              <span className="text-[12px] font-semibold text-[#8C7362]">
                {order.placedAt}
              </span>
            </div>

            <div className="divide-y divide-[#F2ECE5]">
              {order.items.map(item => (
                <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#F2ECE5] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#2C1A0E]">
                        {item.quantity}x {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7362]">
                        {item.size || 'Standard'}
                        {item.extras && item.extras.length > 0 && ` · +${item.extras.map(e => e.name).join(', ')}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#2C1A0E]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="pt-3 border-t border-[#EDE2D5] space-y-1.5 text-[12px]">
              <div className="flex justify-between text-[#8C7362]">
                <span>Item Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-[#8C7362]">
                <span>Café Tax &amp; Service (5%)</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="flex justify-between font-bold text-[14px] text-[#2C1A0E] pt-1 border-t border-[#F2ECE5]">
                <span>Total Amount</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Bottom Dev Switcher Bar (For testing all screens smoothly) */}
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-t border-[#EFE7DE] shadow-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A08878]">
              🛠️ Switch State for Testing:
            </span>
            <span className="text-[10px] font-bold text-[#C87D55]">
              Current: {order.status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(['placed', 'confirmed', 'preparing', 'on_the_way', 'served', 'completed'] as OrderStatus[]).map(st => (
              <button
                key={st}
                onClick={() => setOrderStatus(order.id, st)}
                className={`text-[11px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 transition-all ${
                  order.status === st
                    ? 'bg-[#2C1A0E] text-white shadow-xs'
                    : 'bg-[#F2ECE4] text-[#6E5442]'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Toast alert */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A0E] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-xl"
            >
              {showToast}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
