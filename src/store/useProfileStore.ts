import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  name: string
  phone: string
  email: string
  avatar: string
  tier: string
  memberId: string
  beans: number
  milestoneTarget: number
  memberSince: string
  birthday: string
  bio: string
}

export interface TastePreferences {
  defaultMilk: 'Oat Milk' | 'Almond' | 'Whole'
  servingTemp: 'Hot' | 'Iced'
  sweetness: 'Regular' | 'Less Sweet' | 'No Sugar'
  dietary: string[]
}

export interface CoffeeStats {
  coffeesBrewed: number
  targetCoffees: number
  favTable: string
  topPick: string
}

export interface RewardVoucher {
  id: string
  title: string
  points: number
  image: string
  category: string
  isRedeemed?: boolean
}

export type ProfileSubView = 
  | 'main'
  | 'club_card'
  | 'rewards_hub'
  | 'coffee_passport'
  | 'taste_preferences'
  | 'account_support'
  | 'feedback'

export const INITIAL_VOUCHERS: RewardVoucher[] = [
  {
    id: 'vouch-1',
    title: 'Free Handcrafted Coffee',
    points: 200,
    image: '/products/cappuccino.jpg',
    category: 'Coffee',
  },
  {
    id: 'vouch-2',
    title: '₹100 Off on Bakery Combo',
    points: 150,
    image: '/products/croissant.jpg',
    category: 'Bakery',
  },
  {
    id: 'vouch-3',
    title: 'Free Oat Milk / Syrup Upgrade',
    points: 50,
    image: '/products/vanilla-latte.jpg',
    category: 'Upgrade',
  },
  {
    id: 'vouch-4',
    title: 'Complimentary Cookie Treat',
    points: 80,
    image: '/products/cheesecake.jpg',
    category: 'Bakery',
  }
]

interface ProfileState {
  profile: UserProfile
  taste: TastePreferences
  stats: CoffeeStats
  vouchers: RewardVoucher[]
  activeSubView: ProfileSubView
  isQrPassOpen: boolean
  isEditProfileOpen: boolean
  toastMessage: string | null

  // Actions
  setActiveSubView: (view: ProfileSubView) => void
  setQrPassOpen: (open: boolean) => void
  setEditProfileOpen: (open: boolean) => void
  updateProfile: (data: Partial<UserProfile>) => void
  updateTaste: (data: Partial<TastePreferences>) => void
  toggleDietary: (tag: string) => void
  redeemVoucher: (id: string) => boolean
  showToast: (msg: string) => void
  hideToast: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Ananya Sharma',
        phone: '+91 9082882412',
        email: 'ananya@gmail.com',
        avatar: '/assets/user-avatar.jpg',
        tier: 'Gold Member',
        memberId: '#YMO-VIP-88',
        beans: 120,
        milestoneTarget: 200,
        memberSince: 'March 2024',
        birthday: '14 August',
        bio: 'Good food, better days ☕',
      },
      taste: {
        defaultMilk: 'Oat Milk',
        servingTemp: 'Hot',
        sweetness: 'Regular',
        dietary: ['Vegetarian'],
      },
      stats: {
        coffeesBrewed: 14,
        targetCoffees: 20,
        favTable: 'Table 07',
        topPick: 'Iced Latte',
      },
      vouchers: INITIAL_VOUCHERS,
      activeSubView: 'main',
      isQrPassOpen: false,
      isEditProfileOpen: false,
      toastMessage: null,

      setActiveSubView: (view: ProfileSubView) => set({ activeSubView: view }),
      setQrPassOpen: (open: boolean) => set({ isQrPassOpen: open }),
      setEditProfileOpen: (open: boolean) => set({ isEditProfileOpen: open }),

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      updateTaste: (data) =>
        set((state) => ({
          taste: { ...state.taste, ...data },
        })),

      toggleDietary: (tag) =>
        set((state) => {
          const current = state.taste.dietary
          const exists = current.includes(tag)
          const updated = exists
            ? current.filter((t) => t !== tag)
            : [...current, tag]
          return { taste: { ...state.taste, dietary: updated } }
        }),

      redeemVoucher: (id) => {
        const voucher = get().vouchers.find((v) => v.id === id)
        if (!voucher) return false
        if (get().profile.beans < voucher.points) {
          get().showToast(`Need ${voucher.points - get().profile.beans} more beans to redeem!`)
          return false
        }

        set((state) => ({
          profile: {
            ...state.profile,
            beans: state.profile.beans - voucher.points,
          },
          vouchers: state.vouchers.map((v) =>
            v.id === id ? { ...v, isRedeemed: true } : v
          ),
          isQrPassOpen: true,
        }))
        get().showToast(`Redeemed ${voucher.title}! Show QR at counter.`)
        return true
      },

      showToast: (msg) => {
        set({ toastMessage: msg })
        setTimeout(() => {
          if (get().toastMessage === msg) {
            set({ toastMessage: null })
          }
        }, 2800)
      },

      hideToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'yemo_profile_store',
      partialize: (state) => ({
        profile: state.profile,
        taste: state.taste,
        stats: state.stats,
      }),
    }
  )
)
