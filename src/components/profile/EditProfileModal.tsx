'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Camera, Upload, RotateCcw } from 'lucide-react'
import { useProfileStore } from '@/store/useProfileStore'

const DEFAULT_AVATAR = '/mascot-assets/mascot-welcome.png'

export default function EditProfileModal() {
  const isEditProfileOpen = useProfileStore((state) => state.isEditProfileOpen)
  const setEditProfileOpen = useProfileStore((state) => state.setEditProfileOpen)
  const profile = useProfileStore((state) => state.profile)
  const updateProfile = useProfileStore((state) => state.updateProfile)
  const showToast = useProfileStore((state) => state.showToast)

  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.phone)
  const [email, setEmail] = useState(profile.email)
  const [dob, setDob] = useState(profile.dob || profile.birthday)
  const [avatar, setAvatar] = useState(profile.avatar || DEFAULT_AVATAR)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Sync form state when modal opens
  useEffect(() => {
    if (isEditProfileOpen) {
      setName(profile.name)
      setPhone(profile.phone)
      setEmail(profile.email)
      setDob(profile.dob || profile.birthday)
      setAvatar(profile.avatar || DEFAULT_AVATAR)
    }
  }, [isEditProfileOpen, profile])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isEditProfileOpen) return

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.touchAction = prevBodyTouchAction
    }
  }, [isEditProfileOpen])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showToast('Please choose an image under 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result)
        showToast('Photo selected! Save changes to apply.')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleResetToMascot = () => {
    setAvatar(DEFAULT_AVATAR)
    showToast('Reset to default Yemo mascot!')
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      name,
      phone,
      email,
      birthday: dob,
      dob,
      avatar: avatar || DEFAULT_AVATAR,
    })
    showToast('Profile updated successfully!')
    setEditProfileOpen(false)
  }

  return (
    <AnimatePresence>
      {isEditProfileOpen && (
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
            className="relative w-full max-w-[420px] max-h-[92vh] overflow-y-auto no-scrollbar bg-[#FDFAF6] rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl border border-[#EBDCCF] z-10"
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
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E8DFD5] flex items-center justify-center text-[#2C1A0E] active:scale-90 cursor-pointer"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Profile Image Edit Section */}
              <div className="flex flex-col items-center justify-center pb-1">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#D8B48B] via-[#EBDCCF] to-[#2C1A0E] shadow-sm">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FAF5EE] border-2 border-white">
                      <Image
                        src={avatar || DEFAULT_AVATAR}
                        alt={name || 'Profile Avatar'}
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority
                        onError={() => setAvatar(DEFAULT_AVATAR)}
                      />
                    </div>
                  </div>

                  {/* Camera Badge Icon (Click to open file picker) */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2C1A0E] text-white flex items-center justify-center shadow-md border-2 border-white active:scale-90 transition-transform cursor-pointer hover:bg-[#1E110A]"
                    title="Change profile picture"
                    aria-label="Upload profile image"
                  >
                    <Camera size={13} />
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Quick Avatar Actions */}
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-[#8C5E3C] bg-[#FAF5EE] hover:bg-[#F2ECE3] border border-[#EBDCCF] px-3 py-1 rounded-full transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload size={11} />
                    <span>Change Photo</span>
                  </button>

                  {avatar !== DEFAULT_AVATAR && (
                    <button
                      type="button"
                      onClick={handleResetToMascot}
                      className="text-[11px] font-semibold text-[#A08878] hover:text-[#C87D55] bg-white border border-[#EBDCCF] px-2.5 py-1 rounded-full transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                      title="Use default Yemo mascot"
                    >
                      <RotateCcw size={11} />
                      <span>Use Mascot</span>
                    </button>
                  )}
                </div>
              </div>

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
                  Date of Birth (DOB)
                </label>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="e.g. 14 August 1998"
                  className="w-full bg-white border border-[#EBDCCF] rounded-xl px-3.5 py-2.5 text-[13px] text-[#2C1A0E] focus:outline-none focus:ring-2 focus:ring-[#C87D55]/30 font-medium"
                />
                <span className="text-[10px] text-[#A08878] mt-1 block">
                  Used for your annual Birthday Perk free drink 🎂
                </span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#2C1A0E] text-white py-3 rounded-full text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

