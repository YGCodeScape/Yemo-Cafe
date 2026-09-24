'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, UtensilsCrossed, ScanLine, ClipboardList, User } from 'lucide-react'

type NavItem = {
  href: string
  icon: typeof Home
  label: string
  isCta?: boolean
}

const NAV: NavItem[] = [
  { href: '/home',    icon: Home,            label: 'Home' },
  { href: '#',        icon: UtensilsCrossed, label: 'Menu' },
  { href: '/scan',    icon: ScanLine,        label: 'Scan',    isCta: true },
  { href: '/orders',  icon: ClipboardList,   label: 'Orders' },
  { href: '/profile', icon: User,            label: 'Profile' },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [activeHref, setActiveHref] = useState(pathname)

  useEffect(() => {
    setActiveHref(pathname)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-dvh bg-[#FDFAF6] relative">
      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-[96px]">
        {children}
      </main>

      {/* Floating Nav */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-end gap-1.5 bg-[#1C1008]/95 backdrop-blur-xl rounded-[28px] px-4 pt-1 pb-3 border border-white/[0.08] shadow-2xl">
          {NAV.map(({ href, icon: Icon, label, isCta }) => {
            const active = activeHref === href || (href !== '#' && activeHref.startsWith(href + '/'))
            return (
              <Link
                key={label}
                href={href}
                aria-label={label}
                onClick={() => setActiveHref(href)}
                className="focus:outline-none select-none"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={`flex flex-col items-center justify-center group ${
                    isCta ? 'w-[64px]' : 'w-[54px]'
                  }`}
                >
                  {/* Icon Container with smooth animated active background */}
                  <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isCta ? 'w-[50px] h-[50px] rounded-full' : 'w-11 h-10 rounded-full'
                    }`}
                  >
                    {/* Resting highlighted CTA badge for Scan when inactive */}
                    {isCta && !active && (
                      <div className="absolute inset-0 rounded-full bg-[#D4956A]/20 border border-[#D4956A]/40 shadow-[0_2px_8px_rgba(212,149,106,0.25)]" />
                    )}

                    {/* Smooth sliding active background pill */}
                    {active && (
                      <motion.div
                        layoutId="navActivePill"
                        className={`absolute inset-0 rounded-full bg-[#D4956A] ${
                          isCta
                            ? 'shadow-[0_0_18px_rgba(212,149,106,0.65)]'
                            : 'shadow-sm'
                        }`}
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon
                      size={isCta ? 22 : 20}
                      strokeWidth={active ? 2.5 : isCta ? 2.2 : 1.8}
                      className={`relative z-10 transition-colors duration-200 ${
                        active
                          ? 'text-[#1C1008]'
                          : isCta
                          ? 'text-[#D4956A]'
                          : 'text-white/50 group-hover:text-white/80'
                      }`}
                    />
                  </div>

                  {/* Nav label */}
                  <span
                    className={`text-[12px] mt-1 tracking-tight leading-none transition-colors duration-200 ${
                      active
                        ? 'text-[#D4956A] font-bold'
                        : isCta
                        ? 'text-[#D4956A] font-semibold'
                        : 'text-white/50 group-hover:text-white/80 font-medium'
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

