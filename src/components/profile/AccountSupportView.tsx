'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  User, 
  Receipt, 
  Wifi, 
  MessageCircle, 
  Phone, 
  Gift, 
  ChevronRight, 
  LogOut, 
  Copy, 
  Check,
  Star
} from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

interface AccountSupportViewProps {
  onBack: () => void
  onOpenEditProfile: () => void
  onOpenFeedback: () => void
}

export default function AccountSupportView({
  onBack,
  onOpenEditProfile,
  onOpenFeedback,
}: AccountSupportViewProps) {
  const profile = useProfileStore((state) => state.profile)
  const showToast = useProfileStore((state) => state.showToast)

  const copyWifiPassword = () => {
    navigator.clipboard?.writeText('yemo@cafe123')
    showToast('Wi-Fi password copied: yemo@cafe123')
  }

  const handleLogout = () => {
    showToast('Logged out of demo session')
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
          Account &amp; Café Support
        </h1>
      </div>

      <div className="space-y-4">
        {/* 1. Personal Information Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#C87D55]" />
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
                Personal Information
              </h3>
            </div>
            <button
              onClick={onOpenEditProfile}
              className="text-[12px] font-bold text-[#8C4A28] hover:underline flex items-center gap-0.5"
            >
              <span>Edit</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-1.5 text-[13px]">
            <div className="flex justify-between py-1 border-b border-[#FAF5EE]">
              <span className="text-[#A08878]">Name</span>
              <span className="font-bold text-[#2C1A0E]">{profile.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#FAF5EE]">
              <span className="text-[#A08878]">Phone</span>
              <span className="font-semibold text-[#2C1A0E]">{profile.phone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#A08878]">Email</span>
              <span className="font-semibold text-[#2C1A0E]">{profile.email}</span>
            </div>
          </div>

          {/* Birthday Perk */}
          <div className="mt-3.5 pt-3 border-t border-[#F2ECE5] flex items-center justify-between bg-[#FAF5EE] p-3 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <Gift size={18} className="text-[#C87D55]" />
              <div>
                <h4 className="text-[12px] font-bold text-[#2C1A0E]">
                  Birthday Perk ({profile.birthday})
                </h4>
                <p className="text-[11px] text-[#8C7362]">
                  Get a free handcrafted drink on your birthday!
                </p>
              </div>
            </div>
            <ChevronRight size={14} className="text-[#A08878]" />
          </div>
        </div>

        {/* 2. Café Support & Shortcuts List */}
        <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs divide-y divide-[#F2ECE5]">
          {/* Order Receipts */}
          <Link
            href="/orders"
            className="py-3 flex items-center justify-between text-[#2C1A0E] hover:text-[#8C4A28] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8C4A28]">
                <Receipt size={18} />
              </div>
              <div>
                <span className="text-[13px] font-bold block">
                  Order Receipts &amp; Invoices
                </span>
                <span className="text-[11px] text-[#A08878]">
                  View detailed bill history
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#8C4A28]">View all →</span>
          </Link>

          {/* Wi-Fi Password with Copy */}
          <div
            onClick={copyWifiPassword}
            className="py-3 flex items-center justify-between text-[#2C1A0E] cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8C4A28]">
                <Wifi size={18} />
              </div>
              <div>
                <span className="text-[13px] font-bold block">
                  Café Wi-Fi Password
                </span>
                <span className="text-[11px] font-semibold text-[#C87D55] font-mono">
                  yemo@cafe123
                </span>
              </div>
            </div>
            <button className="text-[11px] font-bold text-[#8C4A28] px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#EBDCCF] flex items-center gap-1 group-active:scale-90 transition-all">
              <Copy size={11} />
              <span>Copy</span>
            </button>
          </div>

          {/* Café Concierge (WhatsApp) */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 flex items-center justify-between text-[#2C1A0E] hover:text-[#8C4A28] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EBF7EE] flex items-center justify-center text-emerald-700">
                <MessageCircle size={18} />
              </div>
              <div>
                <span className="text-[13px] font-bold block">
                  Café Concierge
                </span>
                <span className="text-[11px] text-[#A08878]">
                  Chat with baristas on WhatsApp
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#A08878]" />
          </a>

          {/* Call Us */}
          <a
            href="tel:+91"
            className="py-3 flex items-center justify-between text-[#2C1A0E] hover:text-[#8C4A28] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#8C4A28]">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[13px] font-bold block">Call Counter</span>
                <span className="text-[11px] text-[#A08878]">+91 90828802412</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#A08878]" />
          </a>

          {/* Feedback & Review shortcut */}
          <div
            onClick={onOpenFeedback}
            className="py-3 flex items-center justify-between text-[#2C1A0E] cursor-pointer hover:text-[#8C4A28] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] flex items-center justify-center text-[#C87D55]">
                <Star size={18} />
              </div>
              <div>
                <span className="text-[13px] font-bold block">
                  Rate Yemo Experience
                </span>
                <span className="text-[11px] text-[#A08878]">
                  Share feedback &amp; Google review
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#A08878]" />
          </div>
        </div>

        {/* 3. Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3.5 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  )
}
