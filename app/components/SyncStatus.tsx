'use client'

import { useState, useEffect } from 'react'
import { syncService } from '@/lib/sync'

export default function SyncStatus() {
  const [pendingCount, setPendingCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (!syncService) return

    const updateStatus = () => {
      if (syncService) {
        const count = syncService.getPendingCount()
        setPendingCount(count)
      }
      setIsSyncing(false)
    }

    // Initial update
    updateStatus()

    // Update every 10 seconds
    const interval = setInterval(updateStatus, 10000)

    return () => {
      clearInterval(interval)
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
    setIsSyncing(false)
    
    // Update count after sync
    if (syncService) {
      setPendingCount(syncService.getPendingCount())
    }
  }

  // Don't show anything if no pending syncs
  if (!mounted || pendingCount === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 animate-fade-in">
      <div className="bg-gradient-to-r from-[#143b28] to-[#1f5a3d] text-white px-3 py-2 rounded-lg shadow-lg border border-[#d4af37]/30">
        <div className="flex items-center gap-2">
          {isSyncing ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-xs">Syncing to server...</span>
            </>
          ) : (
            <>
              <span className="text-xs">📡</span>
              <span className="text-xs">
                {pendingCount} change{pendingCount !== 1 ? 's' : ''} pending
              </span>
              <button
                onClick={handleManualSync}
                className="ml-2 text-xs text-[#d4af37] hover:underline"
                disabled={!navigator.onLine}
              >
                Sync now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
