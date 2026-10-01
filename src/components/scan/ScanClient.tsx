'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/useCartStore'

// Dedicated Sub-Components for each screen
import ScanLandingView from '@/components/scan/ScanLandingView'
import ScanCameraView from '@/components/scan/ScanCameraView'
import CameraPermissionModal from '@/components/scan/CameraPermissionModal'
import ScanSuccessView from '@/components/scan/ScanSuccessView'
import TableAlreadyActiveView from '@/components/scan/TableAlreadyActiveView'
import ScanFailedView from '@/components/scan/ScanFailedView'
import ManualCodeEntryView from '@/components/scan/ManualCodeEntryView'
import SwitchTableModal from '@/components/scan/SwitchTableModal'

export type ScanView =
  | 'landing'         // Screen 1: Scan your table
  | 'camera'          // Screen 2: Full screen scanner
  | 'permission'      // Screen 3: Allow camera access
  | 'success'         // Screen 4: Table confirmed
  | 'already_active'  // Screen 5: Already ordering from table
  | 'failed'          // Screen 6: Unrecognized QR
  | 'manual_code'     // Screen 7: Enter table code
  | 'switch_confirm'  // Screen 8: Switch table confirmation

/**
 * ScanClient Orchestrator
 * Manages table session state and seamlessly renders the dedicated screen views.
 */
export default function ScanClient() {
  const router = useRouter()

  const tableNumber = useCartStore((state) => state.tableNumber)
  const isTableConfirmed = useCartStore((state) => state.isTableConfirmed)
  const setTableNumber = useCartStore((state) => state.setTableNumber)
  const setTableConfirmed = useCartStore((state) => state.setTableConfirmed)
  const setScannerActive = useCartStore((state) => state.setScannerActive)

  // Current view state (if table is already confirmed, default to active table screen)
  const [view, setView] = useState<ScanView>(() => {
    return isTableConfirmed ? 'already_active' : 'landing'
  })

  // Pending table candidate for the switch confirmation dialog
  const [pendingTable, setPendingTable] = useState('Table 8')

  // Auto-hide bottom navigation when full-screen scanner or modals are active
  useEffect(() => {
    const isFullscreen =
      view === 'camera' ||
      view === 'permission' ||
      view === 'manual_code' ||
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
    setView('permission')
  }

  const handleAllowCamera = () => {
    setView('camera')
  }

  const handleScanSuccess = (detectedTable: string = 'Table 12') => {
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

  const handleManualCodeSubmit = (rawCode: string) => {
    let formatted = rawCode
    if (rawCode.startsWith('T') && rawCode.length > 1) {
      formatted = `Table ${rawCode.slice(1)}`
    } else if (!isNaN(Number(rawCode))) {
      formatted = `Table ${rawCode}`
    } else {
      formatted = `Table ${rawCode}`
    }

    if (isTableConfirmed && tableNumber && tableNumber !== formatted) {
      setPendingTable(formatted)
      setView('switch_confirm')
    } else {
      setTableNumber(formatted)
      setTableConfirmed(true)
      setView('success')
    }
  }

  const handleResetSession = () => {
    setTableConfirmed(false)
    setTableNumber('Table 12')
    setView('landing')
  }

  const handleConfirmSwitch = () => {
    setTableNumber(pendingTable)
    setTableConfirmed(true)
    setView('success')
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6] text-[#2C1A0E] flex flex-col justify-between relative overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {/* Screen 1: Landing Page */}
        {view === 'landing' && (
          <ScanLandingView
            onOpenScanner={handleOpenScanner}
            onEnterCodeManually={() => setView('manual_code')}
          />
        )}

        {/* Screen 3: Camera Permission Modal */}
        {view === 'permission' && (
          <CameraPermissionModal
            onAllowCamera={handleAllowCamera}
            onClose={() => setView('landing')}
            onEnterCodeManually={() => setView('manual_code')}
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
            tableNumber={tableNumber || 'Table 12'}
            onStartOrdering={() => router.push('/menu')}
            onChangeTable={() => setView('camera')}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 5: Table Already In Use */}
        {view === 'already_active' && (
          <TableAlreadyActiveView
            tableNumber={tableNumber || 'Table 12'}
            onContinueOrdering={() => router.push('/menu')}
            onScanAnotherTable={() => {
              setPendingTable('Table 8')
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
            onEnterTableCode={() => setView('manual_code')}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 7: Enter Table Code Manually */}
        {view === 'manual_code' && (
          <ManualCodeEntryView
            onCodeSubmit={handleManualCodeSubmit}
            onBack={() => setView('landing')}
          />
        )}

        {/* Screen 8: Switch Table Confirmation Dialog */}
        {view === 'switch_confirm' && (
          <SwitchTableModal
            currentTable={tableNumber || 'Table 12'}
            pendingTable={pendingTable}
            onConfirmSwitch={handleConfirmSwitch}
            onCancel={() => setView(isTableConfirmed ? 'already_active' : 'landing')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
