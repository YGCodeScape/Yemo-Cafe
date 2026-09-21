'use client'
import Link from 'next/link'
import { ScanLine, Bell } from 'lucide-react'

type Props = { profile: { name: string; email: string } | null }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeClient({ profile }: Props) {
  const name = profile?.name.split(' ')[0] ?? 'Guest'

  return (
    <div className='flex flex-col min-h-dvh bg-[#FDFAF6]'>
      {/* Top Bar */}
      <div className='flex justify-between items-center px-5 pt-12 pb-4'>
        <div>
          <p className='text-xs text-[#A89080] font-medium'>{getGreeting()} ☀️</p>
          <h1 className='font-display text-[22px] font-bold text-[#2C1A0E] leading-tight'>
            Hey, {name}
          </h1>
        </div>
        <div className='flex items-center gap-2.5'>
          <button className='w-9 h-9 bg-[#F2EAE1] rounded-xl flex items-center justify-center border border-[#E2DDD8]'>
            <Bell size={16} className='text-[#A89080]' />
          </button>
          <div className='w-9 h-9 rounded-full bg-gradient-to-br from-[#D4956A] to-[#6B3F2A] flex items-center justify-center text-[#FDFAF6] text-sm font-bold'>
            {name[0].toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className='mx-4 mb-4'>
        <div className='relative bg-gradient-to-br from-[#5a3420] to-[#2C1A0E] rounded-[20px] p-5 overflow-hidden min-h-[120px]'>
          {/* Decorative circles */}
          <div className='absolute w-32 h-32 rounded-full bg-[#D4956A]/15 -top-8 -right-6' />
          <div className='absolute w-20 h-20 rounded-full bg-[#D4956A]/08 bottom-0 right-16' />
          {/* Content */}
          <span className='inline-block text-[9px] font-semibold text-[#D4956A] bg-[#D4956A]/20 px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider'>
            ⭐ Today&apos;s Special
          </span>
          <h2 className='font-display text-[20px] font-bold text-[#FDFAF6] leading-tight mb-2'>
            Signature<br />Caramel Latte
          </h2>
          <p className='text-[10px] text-white/50 mb-4'>Limited qty · Only today</p>
          <div className='flex items-center gap-3'>
            <span className='font-mono text-[18px] font-semibold text-[#D4956A]'>₹180</span>
            <Link href='/menu'
              className='bg-[#D4956A] text-[#2C1A0E] text-[10px] font-bold px-4 py-2 rounded-full active:scale-95 transition-transform'>
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className='flex gap-2.5 px-4 pb-4 overflow-x-auto no-scrollbar'>
        {['☕ All','Hot Coffee','🧊 Cold','🥐 Food','✨ Special'].map((c, i) => (
          <Link key={c} href='/menu'
            className={shrink-0 px-3.5 py-2 rounded-full text-[10px] font-semibold border transition-colors
              }>
            {c}
          </Link>
        ))}
      </div>

      {/* Popular Section */}
      <div className='flex justify-between items-center px-5 pb-3'>
        <h2 className='font-display text-[16px] font-bold text-[#2C1A0E]'>Popular Now</h2>
        <Link href='/menu' className='text-[10px] text-[#D4956A] font-semibold'>See all →</Link>
      </div>

      {/* Product Cards */}
      <div className='flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar'>
        {[
          { name:'Signature Latte', tag:'Best Seller', price:'₹180', emoji:'☕' },
          { name:'Cold Brew',       tag:'Fan Fav',     price:'₹200', emoji:'🧊' },
          { name:'Cappuccino',      tag:'Classic',     price:'₹150', emoji:'☕' },
        ].map(item => (
          <Link key={item.name} href='/menu'
            className='shrink-0 w-[140px] bg-[#F5F0EB] rounded-[18px] p-3 border border-[#E2DDD8] active:scale-95 transition-transform'>
            <div className='h-[90px] bg-gradient-to-br from-[#f5ede4] to-[#eeddd0] rounded-[12px] flex items-center justify-center text-4xl mb-3'>
              {item.emoji}
            </div>
            <span className='inline-block text-[9px] font-semibold text-[#6B3F2A] bg-[#6B3F2A]/10 px-2 py-0.5 rounded-full mb-2'>
              {item.tag}
            </span>
            <p className='text-[12px] font-bold text-[#2C1A0E] mb-1'>{item.name}</p>
            <div className='flex justify-between items-center'>
              <span className='font-mono text-[13px] font-semibold text-[#D4956A]'>{item.price}</span>
              <div className='w-6 h-6 bg-[#6B3F2A] rounded-[7px] flex items-center justify-center text-[#FDFAF6] text-[16px] leading-none font-light'>+</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Scan CTA */}
      <div className='mx-4 mb-4'>
        <Link href='/scan'
          className='flex items-center justify-between bg-[#2C1A0E] rounded-[18px] p-4 active:scale-95 transition-transform'>
          <div>
            <p className='text-[12px] font-bold text-[#FDFAF6] mb-0.5'>📡 Scan Table QR</p>
            <p className='text-[10px] text-white/40'>Point camera at your table code</p>
          </div>
          <div className='w-11 h-11 bg-gradient-to-br from-[#D4956A] to-[#b8754f] rounded-[13px] flex items-center justify-center text-2xl shrink-0'>
            ⊡
          </div>
        </Link>
      </div>

      {/* Promo */}
      <div className='mx-4 mb-6'>
        <div className='flex items-center gap-3 bg-gradient-to-r from-[#D4956A] to-[#b8754f] rounded-[16px] px-4 py-3.5'>
          <span className='text-2xl'>🎉</span>
          <div>
            <p className='text-[11px] font-bold text-[#2C1A0E]'>Refer a friend, get ₹50 off</p>
            <p className='text-[9px] text-[#2C1A0E]/60 mt-0.5'>Share your code: YEMO50</p>
          </div>
        </div>
      </div>
    </div>
  )
}
