'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, UtensilsCrossed, ScanLine, ClipboardList, User } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

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
  const isProductDetailOpen = useCartStore(state => Boolean(state.selectedProduct))
  const isCartOpen = useCartStore(state => state.isCartOpen)
  const shouldHideBottomNav = isProductDetailOpen || isCartOpen

  useEffect(() => {
    setActiveHref(pathname)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-dvh bg-[#FDFAF6] relative">
      {/* Page content */}
      <main className={`flex-1 pb-[96px] ${shouldHideBottomNav ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {children}
      </main>

      {/* Floating Nav - Hidden when Product Detail Modal or Cart Drawer is open */}
      <AnimatePresence>
        {!shouldHideBottomNav && (
          <motion.nav
            key="bottom-floating-nav"
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-5 left-1/2 z-50 pointer-events-auto"
          >
            <div className="relative flex items-end gap-1.5 bg-[#1C1008]/95 backdrop-blur-xl rounded-full px-4 pb-2.5 h-[68px] shadow-2xl border border-white/[0.06]">
          {NAV.map(({ href, icon: Icon, label, isCta }) => {
            const active = activeHref === href || (href !== '#' && activeHref.startsWith(href + '/'))
            return (
              <Link
                key={label}
                href={href}
                aria-label={label}
                onClick={() => setActiveHref(href)}
                className="focus:outline-none select-none relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={`flex flex-col items-center justify-end group ${
                    isCta ? 'w-[64px]' : 'w-[54px]'
                  }`}
                >
                  {/* Icon Container with smooth animated active background */}
                  <div
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isCta
                        ? 'w-[54px] h-[54px] rounded-full -translate-y-1.5 bg-[#1C1008] border border-[#D4956A]/60 shadow-[0_4px_16px_rgba(0,0,0,0.45)]'
                        : 'w-11 h-9 rounded-full'
                    }`}
                  >
                    {/* Resting highlighted CTA badge for Scan when inactive */}
                    {isCta && !active && (
                      <div className="absolute inset-0 rounded-full bg-[#D4956A]/15" />
                    )}

                    {/* Smooth sliding active background pill */}
                    {active && (
                      <motion.div
                        layoutId="navActivePill"
                        className={`absolute inset-0 rounded-full bg-[#D4956A] ${
                          isCta
                            ? 'shadow-[0_0_20px_rgba(212,149,106,0.65)]'
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
                      size={isCta ? 24 : 20}
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
                    className={`text-[11px] tracking-tight leading-none transition-colors duration-200 ${
                      isCta ? 'mt-0.5' : 'mt-1'
                    } ${
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
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

