'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useProfileStore, ProfileSubView } from '@/store/useProfileStore'
import ProfileMainView from './ProfileMainView'
import DigitalClubCardView from './DigitalClubCardView'
import RewardsHubView from './RewardsHubView'
import CoffeePassportView from './CoffeePassportView'
import TastePreferencesView from './TastePreferencesView'
import AccountSupportView from './AccountSupportView'
import FeedbackView from './FeedbackView'
import CafePassQrModal from './CafePassQrModal'
import EditProfileModal from './EditProfileModal'

export default function ProfileClient() {
  const activeSubView = useProfileStore((state) => state.activeSubView)
  const setActiveSubView = useProfileStore((state) => state.setActiveSubView)
  const setEditProfileOpen = useProfileStore((state) => state.setEditProfileOpen)
  const toastMessage = useProfileStore((state) => state.toastMessage)

  const renderActiveView = () => {
    switch (activeSubView) {
      case 'club_card':
        return <DigitalClubCardView onBack={() => setActiveSubView('main')} />
      case 'rewards_hub':
        return <RewardsHubView onBack={() => setActiveSubView('main')} />
      case 'coffee_passport':
        return <CoffeePassportView onBack={() => setActiveSubView('main')} />
      case 'taste_preferences':
        return <TastePreferencesView onBack={() => setActiveSubView('main')} />
      case 'account_support':
        return (
          <AccountSupportView
            onBack={() => setActiveSubView('main')}
            onOpenEditProfile={() => setEditProfileOpen(true)}
            onOpenFeedback={() => setActiveSubView('feedback')}
          />
        )
      case 'feedback':
        return <FeedbackView onBack={() => setActiveSubView('main')} />
      case 'main':
      default:
        return (
          <ProfileMainView
            onNavigateSubView={(view: ProfileSubView) => setActiveSubView(view)}
            onOpenEditProfile={() => setEditProfileOpen(true)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Active Sub-view */}
      <AnimatePresence mode="wait">
        <div key={activeSubView}>
          {renderActiveView()}
        </div>
      </AnimatePresence>

      {/* Global Modals */}
      <CafePassQrModal />
      <EditProfileModal />

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#2C1A0E] text-[#FBEEDC] text-[12px] font-bold px-4 py-2 rounded-full shadow-2xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
