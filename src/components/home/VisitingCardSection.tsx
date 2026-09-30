'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Gift,
  MapPin,
  Clock,
  Phone,
  PhoneCall,
  Navigation,
  ChevronRight,
  Armchair,
  Wifi,
  Car,
  PawPrint,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { CAFE_INFO_DATA, type Amenity } from '@/data/cafeInfoData'

const ICON_MAP = {
  Armchair: Armchair,
  Wifi: Wifi,
  Car: Car,
  PawPrint: PawPrint,
}

export default function VisitingCardSection() {
  const { rewards, cafe, status, contact, amenitiesSection, sweetNote } = CAFE_INFO_DATA

  return (
    <section className="px-4 mt-2 mb-10 space-y-4">
      {/* ── 1. Rewards Teaser Card ── */}
      <Link href={rewards.link} className="block group select-none">
        <motion.div
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative overflow-hidden rounded-[26px] p-4 sm:p-5 shadow-lg border border-[#ECD1BA] transition-shadow duration-300 hover:shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #DEB892 0%, #E8C8A6 45%, #F4DEC6 100%)',
          }}
        >
          {/* Decorative background latte art cup graphic */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full overflow-hidden opacity-35 pointer-events-none transition-transform duration-500 group-hover:scale-105">
            <Image
              src={rewards.image}
              alt="Latte Cup"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Left: Gift Icon + Title & Subtitle */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-[18px] bg-white/40 backdrop-blur-md flex items-center justify-center text-[#4A2612] shadow-sm border border-white/60 shrink-0">
                <Gift size={24} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h3
                  className="text-[17px] sm:text-[18px] font-bold text-[#3B1F0E] leading-tight"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {rewards.title}
                </h3>
                <p className="text-[11px] text-[#69442C] font-medium leading-tight mt-0.5 line-clamp-1 sm:line-clamp-none">
                  {rewards.subtitle}
                </p>
              </div>
            </div>

            {/* Right: Points Pill, Progress & View Link */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3B1F0E] mb-1.5 group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ChevronRight size={13} strokeWidth={3} />
              </div>

              {/* Points badge */}
              <div className="bg-[#3B1F0E] text-[#FBEEDC] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm mb-1.5">
                <span className="text-[#FFC83B] text-[12px]">★</span>
                <span>{rewards.points}</span>
                <span className="text-[9px] text-white/80 font-normal">points</span>
              </div>

              {/* Progress bar */}
              <div className="w-[100px] h-1.5 bg-[#C99D75] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3B1F0E] rounded-full"
                  style={{ width: `${rewards.progressPercent}%` }}
                />
              </div>
              <span className="text-[9px] font-semibold text-[#553018] mt-1">
                {rewards.pointsToFreeDrink} points to your free drink
              </span>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* ── 2. Visit Us Card ── */}
      <div className="bg-white rounded-[30px] p-5 shadow-[0_6px_28px_rgba(44,26,14,0.06)] border border-[#F0E6DC] relative overflow-hidden">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F5EDE4] text-[#4A2A18] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={18} strokeWidth={2.4} />
            </div>
            <div>
              <h2
                className="text-[22px] font-bold text-[#2C1A0E] leading-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Visit Us
              </h2>
              <p className="text-[12px] text-[#8C7362] font-medium leading-tight mt-0.5">
                Your favourite café, right here.
              </p>
            </div>
          </div>
        </div>

          {/* Address & Map Preview */}
        <div className="flex gap-3 items-stretch mb-4">
          {/* Café Name & Address */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3
              className="text-[17px] font-bold text-[#2C1A0E] leading-snug mb-1"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              {cafe.name}
            </h3>
            <p className="text-[11px] text-[#6B5547] leading-relaxed flex items-start gap-1">
              <MapPin size={13} className="shrink-0 text-[#D4956A] mt-0.5" />
              <span>{cafe.address}</span>
            </p>
          </div>

          {/* Interactive Google Map preview thumbnail */}
          <a
            href={cafe.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open location in Google Maps"
            className="relative w-[95px] h-[100px] sm:w-[105px] sm:h-[110px] rounded-[20px] overflow-hidden shrink-0 border border-[#EDE3D8] group shadow-2xs block"
            style={{
              background: 'linear-gradient(135deg, #EBF3E8 0%, #E3EBE4 50%, #DCE8DE 100%)',
            }}
          >
            {/* Stylized simulated street lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="35" x2="100" y2="45" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="30" y1="0" x2="45" y2="100" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="70" y1="0" x2="80" y2="100" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="0" y1="75" x2="100" y2="80" stroke="#FFFFFF" strokeWidth="6" />
              <rect x="52" y="10" width="35" height="24" rx="4" fill="#CDE5D0" opacity="0.7" />
            </svg>

            {/* Center Café Map Marker Pin */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#3B1F0E] text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
                <span className="text-[13px]">☕</span>
              </div>
            </div>

            {/* Google Watermark */}
            <div className="absolute bottom-1.5 left-2 text-[9px] font-bold text-gray-500 tracking-tighter">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>

            {/* Expand / Directions corner button */}
            <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#3B1F0E]">
              <ExternalLink size={10} strokeWidth={2.5} />
            </div>
          </a>
        </div>

        {/* ── Status & Timings (2 Columns) ── */}
        <div className="flex flex-col gap-2.5 mb-3.5">
          {/* Left: Open Now Status */}
          <div className="bg-[#FAF6F2] rounded-[18px] p-3 border border-[#EFE8DF] flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1E7E34]">
              <span className="w-2 h-2 rounded-full bg-[#28A745] animate-pulse" />
              <span>{status.statusText}</span>
            </div>
            <p className="text-[11px] text-[#785E4E] font-medium mt-1">
              {status.closingInfo}
            </p>
          </div>

          {/* Right: Timings */}
          <div className="bg-[#FAF6F2] rounded-[18px] p-3 border border-[#EFE8DF] flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3B2213] mb-1">
                <Clock size={13} className="text-[#D4956A]" />
                <span>Timings</span>
              </div>
              <div className="space-y-0.5">
                {status.timings.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px] text-[#553E31] font-semibold gap-1">
                    <span className="text-[#8C7362] font-normal">{t.days}</span>
                    <span>{t.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact Action Chips ── */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">

          {/* Direct Call Button */}
          <a
            href={contact.phone}
            className="bg-[#FAF6F2] hover:bg-[#F3ECE2] border border-[#EFE8DF] rounded-full px-4 py-2.5 flex items-center gap-1.5 text-[11px] font-bold text-[#2C1A0E] active:scale-95 transition-all shadow-2xs"
          >
            <PhoneCall size={13} className="text-[#D4956A]" />
            <span>Call</span>
            <ChevronRight size={13} className="text-[#8C7362]" />
          </a>

          {/* Directions Button */}
          <a
            href={cafe.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FAF6F2] hover:bg-[#F3ECE2] border border-[#EFE8DF] rounded-full px-4 py-2.5 flex items-center gap-1.5 text-[11px] font-bold text-[#2C1A0E] active:scale-95 transition-all shadow-2xs"
          >
            <Navigation size={13} className="text-[#D4956A]" />
            <span>Directions</span>
          </a>
        </div>

        {/* ── Our Café Amenities ── */}
        <div className="pt-2 border-t border-[#F2ECE5]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#FAF3EC] text-[#4A2612] flex items-center justify-center">
              <Sparkles size={13} className="text-[#D4956A]" />
            </div>
            <div>
              <h4
                className="text-[16px] font-bold text-[#2C1A0E] leading-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {amenitiesSection.title}
              </h4>
              <p className="text-[11px] text-[#8C7362] font-medium leading-tight">
                {amenitiesSection.subtitle}
              </p>
            </div>
          </div>

          {/* 4 Amenity Mini Chips in a grid */}
          <div className="grid grid-cols-4 gap-2">
            {amenitiesSection.amenities.map(amenity => {
              const IconComponent = ICON_MAP[amenity.icon]
              return (
                <div
                  key={amenity.id}
                  className="bg-[#FAF6F2] rounded-[18px] p-2.5 flex flex-col items-center justify-center text-center gap-1.5 border border-[#EFE8DF] shadow-2xs"
                >
                  <div className="text-[#5C3620] mb-0.5">
                    <IconComponent size={20} strokeWidth={1.9} />
                  </div>
                  <span className="text-[10px] text-[#4A2D1B] font-semibold leading-tight line-clamp-2">
                    {amenity.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Bottom Sweet Note ── */}
        <div className="relative mt-8 pt-4 pb-2 flex items-center justify-end overflow-hidden">
          {/* Handwritten aesthetic sweet note */}
          <div className="relative z-10 pr-2">
            <p
              className="text-[20px] text-[#694228] italic font-medium transform -rotate-3 select-none"
              style={{
                fontFamily: '"Caveat", "Brush Script MT", "Playfair Display", cursive',
              }}
            >
              {sweetNote.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
