'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, UtensilsCrossed, ScanLine, ClipboardList, User } from 'lucide-react'

const NAV = [
  { href: '/home',    icon: Home,            label: 'Home'    },
  { href: '/menu',    icon: UtensilsCrossed, label: 'Menu'    },
  { href: '/scan',    icon: ScanLine,        label: 'Scan'    },
  { href: '/orders',  icon: ClipboardList,   label: 'Orders'  },
  { href: '/profile', icon: User,            label: 'Profile' },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-dvh bg-[#FDFAF6] relative">
      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-[88px]">
        {children}
      </main>

      {/* Floating Nav */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-[#1C1008]/95 backdrop-blur-xl rounded-[32px] px-2 py-1.5 border border-white/[0.07] shadow-2xl">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href} aria-label={label}>
                <div className="relative w-12 h-12 rounded-full flex items-center justify-center group">
                  {/* Active inner circle */}
                  <div
                    className={`absolute inset-[6px] rounded-full transition-all duration-300 ease-out ${
                      active
                        ? 'bg-[#D4956A] scale-100 opacity-100'
                        : 'bg-[#D4956A] scale-0 opacity-0 group-active:scale-75 group-active:opacity-60'
                    }`}
                  />
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.5 : 1.8}
                    className={`relative z-10 transition-colors duration-200 ${
                      active ? 'text-[#1C1008]' : 'text-white/50 group-hover:text-white/80'
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
