'use client'

import { useState, useEffect } from 'react'
import { syncService } from '@/lib/sync'

export default function SyncStatus() {
  const [pendingCount, setPendingCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!syncService) return

    // Update pending count
    const updateStatus = () => {
      if (syncService) {
        setPendingCount(syncService.getPendingCount())
      }
      setIsSyncing(false)
    }

    // Initial update
    updateStatus()

    // Check every 10 seconds
    const interval = setInterval(updateStatus, 10000)

    // Check on focus
    const handleFocus = () => {
      if (navigator.onLine && syncService) {
        syncService.processQueue()
        updateStatus()
      }
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const handleManualSync = async () => {
    if (!navigator.onLine) {
      alert('You need to be online to sync')
      return
    }

    if (!syncService) return

    setIsSyncing(true)
    await syncService.processQueue()
    setLastSynced(new Date())
    setIsSyncing(false)
    if (syncService) {
      setPendingCount(syncService.getPendingCount())
    }
  }

  if (!mounted || (pendingCount === 0 && !lastSynced)) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-[#143b28]/90 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-[#1f5a3d]/50">
        <div className="flex items-center gap-2">
          {isSyncing ? (
            <>
              <span className="text-xs animate-pulse">🔄</span>
              <span className="text-xs">Syncing...</span>
            </>
          ) : pendingCount > 0 ? (
            <>
              <span className="text-xs">📤</span>
              <span className="text-xs">
                {pendingCount} pending {pendingCount === 1 ? 'change' : 'changes'}
              </span>
              <button
                onClick={handleManualSync}
                className="ml-2 text-xs text-[#d4af37] hover:underline"
                disabled={!navigator.onLine}
              >
                Sync now
              </button>
            </>
          ) : lastSynced ? (
            <>
              <span className="text-xs">✅</span>
              <span className="text-xs">
                Synced {lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
