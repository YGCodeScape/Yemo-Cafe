'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ClipboardList, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react'
import { useOrderStore } from '@/store/useOrderStore'
import ActiveOrderCard from './ActiveOrderCard'
import PastOrderCard from './PastOrderCard'
import LiveOrderTrackerModal from './LiveOrderTrackerModal'
import PastOrderDetailModal from './PastOrderDetailModal'
import OrdersEmptyState from './OrdersEmptyState'

type TabType = 'all' | 'active' | 'past'

export default function OrdersClient() {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [showDemoTools, setShowDemoTools] = useState<boolean>(false)

  const orders = useOrderStore(state => state.orders)
  const activeTrackerModalId = useOrderStore(state => state.activeTrackerModalId)
  const pastDetailModalId = useOrderStore(state => state.pastDetailModalId)
  const closeLiveTracker = useOrderStore(state => state.closeLiveTracker)
  const closePastDetail = useOrderStore(state => state.closePastDetail)
  const resetToMockOrders = useOrderStore(state => state.resetToMockOrders)
  const clearAllOrders = useOrderStore(state => state.clearAllOrders)

  // Active orders are any order not 'completed' (or we consider 'placed', 'confirmed', 'preparing', 'on_the_way', 'served')
  const activeOrders = orders.filter(o => o.status !== 'completed')
  const pastOrders = orders.filter(o => o.status === 'completed' || o.status === 'served')

  // Find targeted order for modals
  const activeModalOrder = orders.find(o => o.id === activeTrackerModalId)
  const pastModalOrder = orders.find(o => o.id === pastDetailModalId)

  // Empty state check
  if (orders.length === 0) {
    return (
      <div className="h-auto bg-[#FDFAF6] pt-6 pb-28 px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between max-w-md mx-auto mb-4">
          <div>
            <h1
              className="text-[28px] font-bold text-[#2C1A0E] tracking-tight leading-none"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Orders
            </h1>
            <p className="text-[13px] text-[#8C7362] mt-1">
              Live tracker &amp; your café history
            </p>
          </div>
          <button
            onClick={resetToMockOrders}
            className="flex items-center gap-1.5 text-[11px] font-bold text-[#8C4A28] bg-[#F7EBE1] hover:bg-[#EFE2D5] px-3 py-1.5 rounded-full border border-[#E8D4C5] transition-all"
            title="Restore sample orders for testing"
          >
            <RotateCcw size={12} />
            <span>Load Demo Orders</span>
          </button>
        </div>

        <OrdersEmptyState />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6] pt-5 pb-32 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1
            className="text-[28px] font-bold text-[#2C1A0E] tracking-tight leading-none"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Orders
          </h1>
          <p className="text-[13px] text-[#8C7362] mt-1">
            Live tracker &amp; café history
          </p>
        </div>

        {/* Demo Tools Button */}
        <button
          onClick={() => setShowDemoTools(!showDemoTools)}
          className="flex items-center gap-1.5 text-[11px] font-bold text-[#7A6251] bg-white border border-[#E8DFD5] px-3 py-1.5 rounded-full shadow-xs hover:bg-[#F9F5F0] transition-all"
        >
          <SlidersHorizontal size={12} className="text-[#C87D55]" />
          <span>Demo Controls</span>
          <ChevronDown size={12} className={`transition-transform ${showDemoTools ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Demo Controls Dropdown */}
      <AnimatePresence>
        {showDemoTools && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-3 border border-[#EBDCCF] mb-4 shadow-sm space-y-2 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#2C1A0E]">
                Test Mode Controls:
              </span>
              <span className="text-[10px] text-[#9E8777]">
                {orders.length} order{orders.length === 1 ? '' : 's'} stored
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={resetToMockOrders}
                className="flex-1 bg-[#F5EDE4] hover:bg-[#EAE0D5] text-[#2C1A0E] py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw size={12} />
                <span>Reset Demo Orders</span>
              </button>
              <button
                onClick={clearAllOrders}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Trash2 size={12} />
                <span>Clear (Empty State)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Segmented Filter Tabs */}
      <div className="flex bg-[#EFE8DF] p-1 rounded-2xl mb-5">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all ${
            activeTab === 'all'
              ? 'bg-white text-[#2C1A0E] shadow-xs'
              : 'text-[#8C7362] hover:text-[#2C1A0E]'
          }`}
        >
          All ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all ${
            activeTab === 'active'
              ? 'bg-white text-[#2C1A0E] shadow-xs'
              : 'text-[#8C7362] hover:text-[#2C1A0E]'
          }`}
        >
          Active ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 text-[12px] font-bold rounded-xl transition-all ${
            activeTab === 'past'
              ? 'bg-white text-[#2C1A0E] shadow-xs'
              : 'text-[#8C7362] hover:text-[#2C1A0E]'
          }`}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Active Orders (Top Priority - Live Tracker) */}
        {(activeTab === 'all' || activeTab === 'active') && activeOrders.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
                  Active Order ({activeOrders.length})
                </h2>
              </div>
              <span className="text-[11px] text-[#C87D55] font-semibold">
                Live Kitchen Status
              </span>
            </div>

            <div className="space-y-3">
              {activeOrders.map(order => (
                <ActiveOrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Past Orders History */}
        {(activeTab === 'all' || activeTab === 'past') && pastOrders.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
                Past Orders ({pastOrders.length})
              </h2>
              <span className="text-[11px] text-[#8C7362]">
                Tap for receipt breakdown
              </span>
            </div>

            <div className="space-y-3">
              {pastOrders.map(order => (
                <PastOrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {/* Filter Tab Empty State */}
        {activeTab === 'active' && activeOrders.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#EFE7DE] shadow-xs my-6">
            <div className="w-12 h-12 bg-[#F7ECE4] text-[#C87D55] rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardList size={22} />
            </div>
            <h3 className="text-[16px] font-bold text-[#2C1A0E] mb-1">
              No active orders right now
            </h3>
            <p className="text-[12px] text-[#7A6251]">
              Orders you place will appear here with live preparation tracking.
            </p>
          </div>
        )}

        {activeTab === 'past' && pastOrders.length === 0 && (
          <div className="bg-white rounded-3xl p-8 text-center border border-[#EFE7DE] shadow-xs my-6">
            <div className="w-12 h-12 bg-[#F7ECE4] text-[#C87D55] rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardList size={22} />
            </div>
            <h3 className="text-[16px] font-bold text-[#2C1A0E] mb-1">
              No past orders yet
            </h3>
            <p className="text-[12px] text-[#7A6251]">
              Your finished order history and receipts will be stored here.
            </p>
          </div>
        )}
      </div>

      {/* Live Order Tracker Modal */}
      <AnimatePresence>
        {activeTrackerModalId && activeModalOrder && (
          <LiveOrderTrackerModal
            order={activeModalOrder}
            onClose={closeLiveTracker}
          />
        )}
      </AnimatePresence>

      {/* Past Order Detail / Receipt Modal */}
      <AnimatePresence>
        {pastDetailModalId && pastModalOrder && (
          <PastOrderDetailModal
            order={pastModalOrder}
            onClose={closePastDetail}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
