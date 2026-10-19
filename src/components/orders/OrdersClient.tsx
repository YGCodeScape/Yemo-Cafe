'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import { useOrderStore } from '@/store/useOrderStore'
import ActiveOrderCard from './ActiveOrderCard'
import PastOrderCard from './PastOrderCard'
import LiveOrderTrackerModal from './LiveOrderTrackerModal'
import PastOrderDetailModal from './PastOrderDetailModal'
import OrdersEmptyState from './OrdersEmptyState'

type TabType = 'all' | 'active' | 'past'

export default function OrdersClient() {
  const [activeTab, setActiveTab] = useState<TabType>('all')

  const orders = useOrderStore((state) => state.orders)
  const activeTrackerModalId = useOrderStore((state) => state.activeTrackerModalId)
  const pastDetailModalId = useOrderStore((state) => state.pastDetailModalId)
  const closeLiveTracker = useOrderStore((state) => state.closeLiveTracker)
  const closePastDetail = useOrderStore((state) => state.closePastDetail)

  // Active orders are any order not 'completed' (placed, confirmed, preparing, on_the_way, served)
  const activeOrders = orders.filter((o) => o.status !== 'completed')
  const pastOrders = orders.filter((o) => o.status === 'completed')

  // Find targeted order for modals
  const activeModalOrder = orders.find((o) => o.id === activeTrackerModalId)
  const pastModalOrder = orders.find((o) => o.id === pastDetailModalId)

  // Empty state check
  if (orders.length === 0) {
    return (
      <div className="h-auto bg-[#FDFAF6] pt-6 pb-28 px-4">
        {/* Top Header */}
        <div className="max-w-md mx-auto mb-4">
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

        <OrdersEmptyState />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6] pt-5 pb-32 px-4 max-w-md mx-auto">
      {/* Top Header */}
      <div className="mb-4">
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
              {activeOrders.map((order) => (
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
              {pastOrders.map((order) => (
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
