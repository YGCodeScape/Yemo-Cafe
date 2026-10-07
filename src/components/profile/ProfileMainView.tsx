'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Crown, 
  Star, 
  QrCode, 
  ChevronRight, 
  Coffee, 
  Armchair, 
  Heart, 
  Milk, 
  Leaf, 
  User, 
  Receipt, 
  Wifi, 
  LogOut,
  MessageSquare,
  ArrowRight,
} from 'lucide-react'
import { useProfileStore, ProfileSubView } from '@/store/useProfileStore'

interface ProfileMainViewProps {
  onNavigateSubView: (view: ProfileSubView) => void
  onOpenEditProfile: () => void
}

export default function ProfileMainView({
  onNavigateSubView,
  onOpenEditProfile,
}: ProfileMainViewProps) {
  const profile = useProfileStore((state) => state.profile)
  const taste = useProfileStore((state) => state.taste)
  const stats = useProfileStore((state) => state.stats)
  const vouchers = useProfileStore((state) => state.vouchers)
  const setQrPassOpen = useProfileStore((state) => state.setQrPassOpen)
  const showToast = useProfileStore((state) => state.showToast)

  const progressPercent = Math.min(100, Math.round((profile.beans / profile.milestoneTarget) * 100))
  const beansNeeded = Math.max(0, profile.milestoneTarget - profile.beans)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-4"
    >

      {/* ── 1. User Info Header ── */}
      <div className="bg-white rounded-3xl p-4 border border-[#EDE2D5] shadow-xs flex items-center justify-between transition-all group" >
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onOpenEditProfile}
            className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#D8B48B] shadow-sm bg-[#F5EDE4] shrink-0 active:scale-95 transition-transform cursor-pointer"
            aria-label="Edit profile picture"
          >
            <Image
              src={profile.avatar || '/mascot-assets/mascot-welcome.png'}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[17px] font-bold text-[#2C1A0E] tracking-tight leading-tight">
                {profile.name}
              </h1>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Crown size={12} className="text-[#C87D55] fill-[#C87D55]" />
              <span className="text-[11px] font-bold text-[#C87D55]">
                {profile.tier}
              </span>
            </div>
            <p className="text-[11px] text-[#8C7362] mt-0.5">
              {profile.bio}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateSubView('account_support')}
          className="w-9 h-9 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-95 transition-all"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>

      </div>

      {/* ── 3. Digital Yemo Club Card (Screen 1 & 2 Hero) ── */}
      <div className="relative overflow-hidden rounded-[22px] p-5 shadow-lg select-none"
        style={{
          backgroundImage: "url('/assets/member-card.png')",
          backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
        }}
        onClick={() => onNavigateSubView('club_card')}
      >

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            {/* Left: Tier, Member ID, Beans */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Crown size={14} className="text-[#802221]" />
                <span className="text-[14px] font-black uppercase tracking-wider text-[#802221]">
                  Yemo Club
                </span>
              </div>

              {/* Beans Count */}
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col my-4">
                  <span className="text-[16px] font-bold text-[#2C1A0E]">
                  Yemo Beans
                </span>
                <span className="text-[24px] font-black text-[#2C1A0E] leading-none">
                  {profile.beans}
                </span>
                </div>
              </div>

              {/* Action Button */}
              <button onClick={() => onNavigateSubView('club_card')}
                className="bg-[#802221] text-white text-[11px] font-bold py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span>View Club Card</span>
              </button>
            </div>

            {/* Right: Mini Scannable QR code Box */}
            <div onClick={(e) => {
                e.stopPropagation()
                setQrPassOpen(true)
              }}
              className=" rounded-xl"
              title="Show QR Code"
            >
              <div className="w-14 h-14 bg-[#2C1A0E] rounded-lg flex flex-col items-center justify-center text-white p-1">
                <QrCode size={30} className="text-white" />
                <span className="text-[7px] font-bold uppercase tracking-tighter mt-0.5">
                  Scan Pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Yemo Rewards Hub (Teased from Home) ── */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[15px]"><Coffee size={16} className="text-[#C87D55]" /></span>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Yemo Rewards Hub
            </h2>
          </div>
          <button
            onClick={() => onNavigateSubView('rewards_hub')}
            className="text-[12px] font-bold text-[#C87D55] flex items-center gap-0.5"
          >
            <span>View all</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Milestone info */}
        <div className="flex items-baseline justify-between mb-1.5 text-[12px]">
          <div className="flex items-center gap-1 font-bold text-[#2C1A0E]">
            <Star size={13} className="text-[#C87D55] fill-[#C87D55]" />
            <span>{profile.beans} / {profile.milestoneTarget}</span>
          </div>
          <span className="text-[11px] text-[#8C4A28] font-semibold">
            {beansNeeded > 0 ? `${beansNeeded} points to your free drink` : 'Free drink ready! 🎉'}
          </span>
        </div>

        {/* Linear Track */}
        <div className="w-full h-2 bg-[#F2ECE5] rounded-full overflow-hidden mb-3 border border-[#E8DFD5]">
          <div
            className="h-full bg-gradient-to-r from-[#DEB892] via-[#C87D55] to-[#8C4A28] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 3 Tier markers */}
        <div className="flex justify-between text-center px-1 mb-4 text-[10px] font-bold text-[#8C7362]">
          <div className="flex items-center gap-1">
            <span>🥉</span>
            <span>Bronze</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🥈</span>
            <span>Silver</span>
          </div>
          <div className="flex items-center gap-1 text-[#C87D55]">
            <span>👑</span>
            <span>Gold</span>
          </div>
        </div>

        {/* Redeemable Café Vouchers (Horizontal Row) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A08878]">
              Redeemable Café Vouchers
            </span>
            <span
              onClick={() => onNavigateSubView('rewards_hub')}
              className="text-[11px] font-semibold text-[#8C7362]"
            >
              View all →
            </span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {vouchers.slice(0, 3).map((v) => (
              <div key={v.id} onClick={() => onNavigateSubView('rewards_hub')}
                className="w-28 shrink-0 bg-[#FAF5EE] rounded-2xl p-2.5 border border-[#EBDCCF] text-center transition-all"
              >
                <div className="relative w-12 h-12 mx-auto rounded-xl overflow-hidden mb-1.5 bg-[#E8DFD5]">
                  <Image src={v.image} alt={v.title} fill className="object-cover" />
                </div>
                <h4 className="text-[11px] font-bold text-[#2C1A0E] line-clamp-2 leading-tight" 
                   style={{fontFamily: '"Playfair Display", Georgia, serif'}}
                  >
                  {v.title}
                </h4>
                <span className="text-[10px] font-bold text-[#8C4A28] mt-1 block">
                  {v.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. Café Habits & Coffee Passport ── */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Coffee size={16} className="text-[#C87D55]" />
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#2C1A0E]"
               style={{fontFamily: '"Montserrat", sans-serif'}}
              >
              Café Habits &amp; Coffee Passport
            </h2>
          </div>
          <button
            onClick={() => onNavigateSubView('coffee_passport')}
            className="text-[12px] font-bold text-[#C87D55] flex items-center gap-0.5"
          >
            <span>View</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* 3 Stat Cards in a row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Coffees enjoyed */}
          <div onClick={() => onNavigateSubView('coffee_passport')}
            className="bg-[#FAF5EE] rounded-2xl p-3 text-center border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2ECE4] mx-auto flex items-center justify-center text-[#8C4A28] mb-1">
              <Coffee size={14} />
            </div>
            <div className="text-[18px] font-black text-[#2C1A0E] leading-tight">
              {stats.coffeesBrewed}
            </div>
            <div className="text-[9px] font-semibold text-[#8C7362] mt-0.5 leading-tight">
              Coffees enjoyed
            </div>
          </div>

          {/* Fav Table */}
          <div
            onClick={() => onNavigateSubView('coffee_passport')}
            className="bg-[#FAF5EE] rounded-2xl p-3 text-center border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2ECE4] mx-auto flex items-center justify-center text-[#8C4A28] mb-1">
              <Armchair size={14} />
            </div>
            <div className="text-[13px] font-bold text-[#2C1A0E] leading-tight mt-1">
              {stats.favTable}
            </div>
            <div className="text-[9px] font-semibold text-[#8C7362] mt-0.5 leading-tight">
              Fav table
            </div>
          </div>

          {/* Top Pick */}
          <div
            onClick={() => onNavigateSubView('coffee_passport')}
            className="bg-[#FAF5EE] rounded-2xl p-3 text-center border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2ECE4] mx-auto flex items-center justify-center text-[#8C4A28] mb-1">
              <Heart size={14} />
            </div>
            <div className="text-[12px] font-bold text-[#2C1A0E] truncate leading-tight mt-1">
              {stats.topPick}
            </div>
            <div className="text-[9px] font-semibold text-[#8C7362] mt-0.5 leading-tight">
              Top pick
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. Taste & Ordering Preferences ── */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Milk size={16} className="text-[#C87D55]" />
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Taste &amp; Ordering Preferences
            </h2>
          </div>
          <button
            onClick={() => onNavigateSubView('taste_preferences')}
            className="text-[12px] font-bold text-[#C87D55] flex items-center gap-0.5"
          >
            <span>View</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Selected chips row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Milk */}
          <div className="bg-[#FAF5EE] border border-[#EBDCCF] px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-[#2C1A0E]">
            <Milk size={12} className="text-[#C87D55]" />
            <span>{taste.defaultMilk}</span>
            <span className="text-[9px] text-[#A08878] font-normal">Default milk</span>
          </div>

          {/* Temperature */}
          <div className="bg-[#FAF5EE] border border-[#EBDCCF] px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-[#2C1A0E]">
            <span>{taste.servingTemp === 'Hot' ? '♨' : '❄'}</span>
            <span>{taste.servingTemp}</span>
          </div>

          {/* Dietary */}
          {taste.dietary.map((d) => (
            <div
              key={d}
              className="bg-[#EBF7EE] border border-emerald-300 px-3 py-1.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-emerald-900"
            >
              <Leaf size={11} className="text-emerald-700" />
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. Rate Yemo Experience (Dedicated 2-Grid Section) ── */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-[#C87D55] fill-[#C87D55]" />
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Rate Yemo Experience
            </h2>
          </div>
          <span className="text-[11px] text-[#A08878] font-medium">
            Your voice matters
          </span>
        </div>

        {/* 2-Grid Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Leave a Google Review */}
          <a
            href="https://maps.google.com/?q=Yemo+Cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FAF4ED] p-3 rounded-[20px] border border-[#ECDCCF] flex items-center justify-between gap-2 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-[#EDE2D5] flex items-center justify-center shrink-0">
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
              <div className="min-w-0">
                <h3 className="text-[12px] font-bold text-[#2C1A0E] leading-tight truncate">
                  Leave a Google Review
                </h3>
                <p className="text-[10px] text-[#8C7362] leading-tight mt-0.5 truncate">
                  Help us grow with your feedback
                </p>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-[#EFE3D5] text-[#6E4E37] flex items-center justify-center shrink-0  transition-all">
              <ArrowRight size={11} />
            </div>
          </a>

          {/* Card 2: Leave Feedback */}
          <div
            onClick={() => onNavigateSubView('feedback')}
            className="bg-[#FAF4ED] p-3 rounded-[20px] border border-[#ECDCCF] flex items-center justify-between gap-2 transition-all active:scale-[0.98] group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-[#EDE2D5] flex items-center justify-center shrink-0 text-[#C87D55]">
                <MessageSquare size={17} className="stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[12px] font-bold text-[#2C1A0E] leading-tight truncate">
                  Leave Feedback
                </h3>
                <p className="text-[10px] text-[#8C7362] leading-tight mt-0.5 truncate">
                  Your voice matters to us
                </p>
              </div>
            </div>

            <div className="w-6 h-6 rounded-full bg-[#EFE3D5] text-[#6E4E37] flex items-center justify-center shrink-0 transition-all">
              <ArrowRight size={11} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 8. Account & Café Support ── */}
      <div className="bg-white rounded-3xl p-5 border border-[#EDE2D5] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#C87D55]" />
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#2C1A0E]">
              Account &amp; Café Support
            </h2>
          </div>
          <button
            onClick={() => onNavigateSubView('account_support')}
            className="text-[12px] font-bold text-[#C87D55] flex items-center gap-0.5"
          >
            <span>View</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* 4 Action Pills */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div
            onClick={onOpenEditProfile}
            className="bg-[#FAF5EE] rounded-2xl p-2.5 border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white mx-auto flex items-center justify-center text-[#8C4A28] mb-1 shadow-2xs">
              <User size={14} />
            </div>
            <span className="text-[10px] font-bold text-[#2C1A0E] block leading-tight">
              Personal Info
            </span>
          </div>

          <Link
            href="/orders"
            className="bg-[#FAF5EE] rounded-2xl p-2.5 border border-[#EBDCCF] transition-all block"
          >
            <div className="w-8 h-8 rounded-full bg-white mx-auto flex items-center justify-center text-[#8C4A28] mb-1 shadow-2xs">
              <Receipt size={14} />
            </div>
            <span className="text-[10px] font-bold text-[#2C1A0E] block leading-tight">
              Receipts
            </span>
          </Link>

          <div
            onClick={() => {
              navigator.clipboard?.writeText('yemo@cafe123')
              showToast('Wi-Fi password copied: yemo@cafe123')
            }}
            className="bg-[#FAF5EE] rounded-2xl p-2.5 border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white mx-auto flex items-center justify-center text-[#8C4A28] mb-1 shadow-2xs">
              <Wifi size={14} />
            </div>
            <span className="text-[10px] font-bold text-[#2C1A0E] block leading-tight">
              Wi-Fi
            </span>
          </div>

          <div
            onClick={() => showToast('Logged out of demo session')}
            className="bg-[#FAF5EE] rounded-2xl p-2.5 border border-[#EBDCCF] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white mx-auto flex items-center justify-center text-[#8C4A28] mb-1 shadow-2xs">
              <LogOut size={14} />
            </div>
            <span className="text-[10px] font-bold text-[#2C1A0E] block leading-tight">
              Logout
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
