'use client'

import { useState, useEffect } from 'react'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    // Set initial state
    const onlineStatus = navigator.onLine
    setIsOnline(onlineStatus)
    
    if (!onlineStatus) {
      setShowOffline(true)
    }

    // Update state when connectivity changes
    const handleOnline = () => {
      setIsOnline(true)
      setShowOffline(false)
      
      // Show reconnected message briefly
      setShowReconnected(true)
      setTimeout(() => {
        setShowReconnected(false)
      }, 3000)
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      setShowOffline(true)
      
      // Auto-hide offline message after 5 seconds
      setTimeout(() => {
        setShowOffline(false)
      }, 5000)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <>
      {/* Offline Indicator */}
      {showOffline && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className="bg-yellow-600/90 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-yellow-500/50">
            <div className="flex items-center gap-2">
              <span className="text-xs">📡</span>
              <span className="text-xs font-medium">Offline mode</span>
              <button
                onClick={() => setShowOffline(false)}
                className="ml-2 text-xs opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reconnected Indicator */}
      {showReconnected && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-600/90 text-white px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-emerald-500/50">
            <div className="flex items-center gap-2">
              <span className="text-xs">✅</span>
              <span className="text-xs font-medium">Back online</span>
              <button
                onClick={() => setShowReconnected(false)}
                className="ml-2 text-xs opacity-70 hover:opacity-100"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
