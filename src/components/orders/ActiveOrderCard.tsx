'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Clock, 
  ChefHat, 
  Navigation, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Coffee,
  Check
} from 'lucide-react'
import { Order, OrderStatus, ORDER_STATUS_STEPS, useOrderStore } from '@/store/useOrderStore'

interface ActiveOrderCardProps {
  order: Order
}

export default function ActiveOrderCard({ order }: ActiveOrderCardProps) {
  const openLiveTracker = useOrderStore(state => state.openLiveTracker)
  const setOrderStatus = useOrderStore(state => state.setOrderStatus)

  // Step indices
  const stepKeys: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'on_the_way', 'served']
  const currentIndex = stepKeys.indexOf(order.status)
  const progressPercent = currentIndex >= 0 
    ? Math.min(100, Math.round(((currentIndex + 1) / stepKeys.length) * 100))
    : 100

  // Status-specific badges & accents
  const getStatusBadge = () => {
    switch (order.status) {
      case 'placed':
        return {
          icon: Clock,
          label: 'Order Placed',
          desc: 'Waiting for barista acceptance',
          color: 'text-amber-900',
          eta: 'Est. 12–15 mins'
        }
      case 'confirmed':
        return {
          icon: Sparkles,
          label: 'Confirmed',
          desc: 'Barista accepted your order',
          color: 'text-blue-900',
          eta: 'Est. 10–12 mins'
        }
      case 'preparing':
        return {
          icon: ChefHat,
          label: 'Preparing',
          desc: 'Kitchen is handcrafting your items',
          color: 'text-[#8C4A28]',
          eta: order.estimatedTime || '8–10 mins'
        }
      case 'on_the_way':
        return {
          icon: Navigation,
          label: 'On the Way',
          desc: 'Staff is heading to your table',
          color: 'text-emerald-900',
          eta: 'Arriving in 1–2 mins'
        }
      case 'served':
        return {
          icon: Coffee,
          label: 'Served',
          desc: 'Delivered fresh to your table',
          color: 'text-purple-900',
          eta: 'Delivered fresh'
        }
      case 'completed':
        return {
          icon: CheckCircle2,
          label: 'Completed',
          desc: 'Session closed',
          color: 'text-stone-700',
          eta: 'Closed'
        }
    }
  }

  const badgeInfo = getStatusBadge()
  const StatusIcon = badgeInfo.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EFE7DE] shadow-md shadow-[#2C1A0E]/5 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#F4E3D7]/50 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

      {/* Header bar: Live indicator + Order ID + Table */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase">
            Live Order
          </span>
        </div>
        <div className="text-[12px] font-semibold text-[#7A6251]">
          <span className="font-bold text-[#2C1A0E]">{order.tableNumber}</span>
          <span className="mx-1.5 opacity-50">·</span>
          <span>{order.orderNumber}</span>
        </div>
      </div>

      {/* Main Status Display */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${badgeInfo.color}`}>
            <StatusIcon size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold text-[#2C1A0E]">
                {badgeInfo.label}
              </h3>
            </div>
            <p className="text-[12px] text-[#7A6251]">
              {badgeInfo.desc}
            </p>
          </div>
        </div>

        {/* ETA pill */}
        <div className="bg-[#FAF6F0] border border-[#EADCCF] rounded-full px-3 py-1 flex items-center gap-1.5 shrink-0">
          <Clock size={12} className="text-[#C87D55]" />
          <span className="text-[11px] font-bold text-[#2C1A0E]">
            {badgeInfo.eta}
          </span>
        </div>
      </div>

      {/* 5-Step Visual Progress Bar */}
      <div className="mb-4 relative z-10">
        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          {stepKeys.map((stepKey, idx) => {
            const isCompleted = idx < currentIndex
            const isCurrent = idx === currentIndex
            return (
              <div
                key={stepKey}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-[#2C1A0E]' 
                    : isCurrent 
                      ? 'bg-[#C87D55] animate-pulse' 
                      : 'bg-[#EAE2D8]'
                }`}
              />
            )
          })}
        </div>
        <div className="flex justify-between text-[10px] text-[#9E8777] font-medium px-0.5">
          <span>Placed</span>
          <span>Kitchen</span>
          <span>Brewing</span>
          <span>On the way</span>
          <span>Served</span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="bg-[#FAF6F0] rounded-2xl p-3 mb-3.5 border border-[#EDE2D4] relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Thumbnails */}
          <div className="flex -space-x-2 shrink-0">
            {order.items.slice(0, 3).map((item, idx) => (
              <div 
                key={item.id} 
                className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-[#EAE2D8]"
                style={{ zIndex: 10 - idx }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {/* Item text */}
          <div className="truncate">
            <p className="text-[12px] font-bold text-[#2C1A0E] truncate">
              {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
            </p>
            <p className="text-[11px] text-[#8C7362]">
              {order.items.reduce((sum, i) => sum + i.quantity, 0)} items · Total ₹{order.total}
            </p>
          </div>
        </div>

        <button
          onClick={() => openLiveTracker(order.id)}
          className="shrink-0 ml-2 bg-[#2C1A0E] hover:bg-[#1E110A] text-white px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
        >
          <span>Track</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Interactive Dev State Switcher (for testing all 6 order states) */}
      <div className="pt-2 border-t border-[#F0E6DA] mt-2 relative z-10">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#A08878]">
            🛠️ Preview State (Testing):
          </span>
          <span className="text-[10px] text-[#C87D55] font-semibold">
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
          {(['placed', 'confirmed', 'preparing', 'on_the_way', 'served', 'completed'] as OrderStatus[]).map(st => (
            <button
              key={st}
              onClick={() => setOrderStatus(order.id, st)}
              className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 transition-all ${
                order.status === st
                  ? 'bg-[#2C1A0E] text-white shadow-xs'
                  : 'bg-[#F2ECE4] text-[#6E5442] hover:bg-[#EAE2D7]'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
