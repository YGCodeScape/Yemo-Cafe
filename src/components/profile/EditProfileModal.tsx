'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

export default function EditProfileModal() {
  const isEditProfileOpen = useProfileStore((state) => state.isEditProfileOpen)
  const setEditProfileOpen = useProfileStore((state) => state.setEditProfileOpen)
  const profile = useProfileStore((state) => state.profile)
  const updateProfile = useProfileStore((state) => state.updateProfile)
  const showToast = useProfileStore((state) => state.showToast)

  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [email, setEmail] = useState(profile.email)
  const [birthday, setBirthday] = useState(profile.birthday)

  if (!isEditProfileOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, phone, email, birthday })
    showToast('Profile updated successfully!')
    setEditProfileOpen(false)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setEditProfileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-[420px] bg-[#FDFAF6] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-[#EBDCCF] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DE] mb-4">
            <h2
              className="text-[18px] font-bold text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Edit Profile
            </h2>
            <button
              onClick={() => setEditProfileOpen(false)}
              className="w-8 h-8 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] active:scale-90"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A08878] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white border border-[#EBDCCF] rounded-xl px-3.5 py-2.5 text-[13px] text-[#2C1A0E] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 font-medium"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A08878] block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-white border border-[#EBDCCF] rounded-xl px-3.5 py-2.5 text-[13px] text-[#2C1A0E] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 font-medium"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A08878] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-[#EBDCCF] rounded-xl px-3.5 py-2.5 text-[13px] text-[#2C1A0E] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 font-medium"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#A08878] block mb-1">
                Birthday (for Free Birthday Drink perk)
              </label>
              <input
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="e.g. 14 August"
                className="w-full bg-white border border-[#EBDCCF] rounded-xl px-3.5 py-2.5 text-[13px] text-[#2C1A0E] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#2C1A0E] hover:bg-[#1E110A] text-white py-3 rounded-full text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all"
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
