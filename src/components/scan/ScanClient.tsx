'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'

// Dedicated Sub-Components for each screen
import ScanLandingView from '@/components/scan/ScanLandingView'
import ScanCameraView from '@/components/scan/ScanCameraView'
import CameraPermissionModal from '@/components/scan/CameraPermissionModal'
import ScanSuccessView from '@/components/scan/ScanSuccessView'
import TableAlreadyActiveView from '@/components/scan/TableAlreadyActiveView'
import ScanFailedView from '@/components/scan/ScanFailedView'
import SwitchTableModal from '@/components/scan/SwitchTableModal'

export type ScanView =
  | 'landing'         // Screen 1: Scan your table
  | 'camera'          // Screen 2: Full screen scanner
  | 'permission'      // Screen 3: Allow camera access
  | 'success'         // Screen 4: Table confirmed
  | 'already_active'  // Screen 5: Already ordering from table
  | 'failed'          // Screen 6: Unrecognized QR
  | 'switch_confirm'  // Screen 7: Switch table confirmation

/**
 * ScanClient Orchestrator
 * Manages table session state and seamlessly renders the dedicated screen views.
 */
export default function ScanClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const needTableParam = searchParams.get('needTable') === 'true'

  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)
  const tableNumber = useCartStore((state) => state.tableNumber)
  const isTableConfirmed = useCartStore((state) => state.isTableConfirmed)
  const setTableNumber = useCartStore((state) => state.setTableNumber)
  const setTableConfirmed = useCartStore((state) => state.setTableConfirmed)
  const setScannerActive = useCartStore((state) => state.setScannerActive)

  // Current view state (if table is already confirmed, default to active table screen)
  const [view, setView] = useState<ScanView>(() => {
    return isTableConfirmed && tableNumber ? 'already_active' : 'landing'
  })

  // Pending table candidate for the switch confirmation dialog
  const [pendingTable, setPendingTable] = useState('Table 08')

  // Auto-hide bottom navigation when full-screen scanner or modals are active
  useEffect(() => {
    const isFullscreen =
      view === 'camera' ||
      view === 'permission' ||
      view === 'failed' ||
      view === 'switch_confirm' ||
      view === 'success'
    setScannerActive(isFullscreen)

    return () => {
      setScannerActive(false)
    }
  }, [view, setScannerActive])

  // Handlers
  const handleOpenScanner = () => {
    setView('camera')
  }

  const handleAllowCamera = () => {
    setView('camera')
  }

  const handleScanSuccess = (detectedTable: string) => {
    if (isTableConfirmed && tableNumber && tableNumber !== detectedTable) {
      setPendingTable(detectedTable)
      setView('switch_confirm')
    } else {
      setTableNumber(detectedTable)
      setTableConfirmed(true)
      setView('success')
    }
  }

  const handleScanFail = () => {
    setView('failed')
  }

  const handleResetSession = () => {
    setTableConfirmed(false)
    setTableNumber('')
    setView('landing')
  }

  const handleConfirmSwitch = () => {
    setTableNumber(pendingTable)
    setTableConfirmed(true)
    setView('success')
  }

  const handleStartOrdering = () => {
    if (items.length > 0) {
      router.push('/menu')
      setTimeout(() => {
        openCart()
      }, 300)
    } else {
      router.push('/menu')
    }
  }

  return (
    <div className="h-auto bg-[#FDFAF6] text-[#2C1A0E] flex flex-col justify-between relative overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {/* Screen 1: Landing Page */}
        {view === 'landing' && (
          <ScanLandingView
            onOpenScanner={handleOpenScanner}
            needTableNotice={needTableParam && !isTableConfirmed}
          />
        )}

        {/* Screen 3: Camera Permission Modal */}
        {view === 'permission' && (
          <CameraPermissionModal
            onAllowCamera={handleAllowCamera}
            onClose={() => setView('landing')}
          />
        )}

        {/* Screen 2: Active Camera Scanner */}
        {view === 'camera' && (
          <ScanCameraView
            onClose={() => setView('landing')}
            onScanSuccess={handleScanSuccess}
            onScanFail={handleScanFail}
          />
        )}

        {/* Screen 4: Scan Success */}
        {view === 'success' && (
          <ScanSuccessView
            tableNumber={tableNumber || 'Table 01'}
            hasCartItems={items.length > 0}
            onStartOrdering={handleStartOrdering}
            onChangeTable={() => setView('camera')}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 5: Table Already In Use */}
        {view === 'already_active' && (
          <TableAlreadyActiveView
            tableNumber={tableNumber || 'Table 01'}
            onContinueOrdering={() => router.push('/menu')}
            onScanAnotherTable={() => {
              const randomNum = Math.floor(Math.random() * 12) + 1
              setPendingTable(`Table ${randomNum < 10 ? '0' + randomNum : randomNum}`)
              setView('switch_confirm')
            }}
            onResetSession={handleResetSession}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 6: Scan Failed */}
        {view === 'failed' && (
          <ScanFailedView
            onTryAgain={() => setView('camera')}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 7: Switch Table Confirmation Dialog */}
        {view === 'switch_confirm' && (
          <SwitchTableModal
            currentTable={tableNumber || 'Table 01'}
            pendingTable={pendingTable}
            onConfirmSwitch={handleConfirmSwitch}
            onCancel={() => setView(isTableConfirmed ? 'already_active' : 'landing')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
