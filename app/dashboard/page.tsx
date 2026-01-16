'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setMounted(true)
    setIsOnline(navigator.onLine)
    
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Check authentication - this works offline!
    const isLoggedIn = localStorage.getItem('fnote_logged_in') === 'true'
    if (!isLoggedIn) {
      router.push('/')
    }
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('fnote_logged_in')
    router.push('/')
  }

  // We need 6 items for a 2x3 grid (2 rows × 3 columns)
  const sections = [
    { 
      title: 'Notes', 
      icon: '📝', 
      href: '/notebook',
      color: 'blue',
      gradient: 'from-blue-500/20 via-blue-600/20 to-blue-700/20',
      border: 'border-blue-500/40',
      stat: () => {
        try {
          return JSON.parse(localStorage.getItem('fnote_notes') || '[]').length
        } catch {
          return 0
        }
      }
    },
    { 
      title: 'Goals', 
      icon: '🎯', 
      href: '/goals',
      color: 'purple',
      gradient: 'from-purple-500/20 via-purple-600/20 to-purple-700/20',
      border: 'border-purple-500/40',
      stat: () => {
        try {
          return JSON.parse(localStorage.getItem('fnote_goals') || '[]').length
        } catch {
          return 0
        }
      }
    },
    { 
      title: 'Planner', 
      icon: '📅', 
      href: '/planner',
      color: 'emerald',
      gradient: 'from-emerald-500/20 via-emerald-600/20 to-emerald-700/20',
      border: 'border-emerald-500/40',
      stat: () => {
        try {
          return JSON.parse(localStorage.getItem('fnote_plans') || '[]').length
        } catch {
          return 0
        }
      }
    },
    { 
      title: 'Thoughts', 
      icon: '💭', 
      href: '/thoughts',
      color: 'amber',
      gradient: 'from-amber-500/20 via-amber-600/20 to-amber-700/20',
      border: 'border-amber-500/40',
      stat: () => {
        try {
          return JSON.parse(localStorage.getItem('fnote_thoughts') || '[]').length
        } catch {
          return 0
        }
      }
    },
    { 
      title: 'Learned Today', 
      icon: '📚', 
      href: '/learned-today',
      color: 'pink',
      gradient: 'from-pink-500/20 via-pink-600/20 to-pink-700/20',
      border: 'border-pink-500/40',
      stat: () => {
        try {
          return JSON.parse(localStorage.getItem('fnote_learned') || '[]').length
        } catch {
          return 0
        }
      }
    },
    { 
      title: 'Settings', 
      icon: '⚙️', 
      href: '#',
      color: 'gray',
      gradient: 'from-gray-500/20 via-gray-600/20 to-gray-700/20',
      border: 'border-gray-500/40',
      stat: () => 0
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f2e1f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f14] via-[#0f2e1f] to-[#0a1f14] text-white p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1f5a3d]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header - Minimal */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37]/20 to-[#1f5a3d]/20 backdrop-blur-sm border border-[#d4af37]/30 flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dashboard</h1>
              {!isOnline && (
                <p className="text-yellow-400 text-xs mt-1">🌐 Offline Mode</p>
              )}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs bg-gradient-to-r from-red-600/20 to-red-700/20 hover:from-red-600/30 hover:to-red-700/30 text-red-400 rounded-lg border border-red-500/30 transition-all"
          >
            Logout
          </button>
        </div>

        {/* TRUE 2x3 Grid - 2 rows × 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* This creates exactly 6 cells in a 2x3 layout */}
          {sections.map((section) => {
            const count = section.stat()
            const isSettings = section.title === 'Settings'
            
            return isSettings ? (
              // Settings cell (inactive for now)
              <div
                key={section.title}
                className="h-32 rounded-xl border border-dashed border-[#1f5a3d]/40 bg-gradient-to-br from-[#143b28]/40 to-[#0f2e1f]/40 backdrop-blur-sm p-5 flex flex-col items-center justify-center opacity-70"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.gradient} border ${section.border} flex items-center justify-center mb-3`}>
                  <span className="text-2xl opacity-60">{section.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 opacity-60">{section.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Coming soon</p>
              </div>
            ) : (
              // Active section cells
              <Link
                key={section.title}
                href={section.href}
                className="block"
              >
                <div className="h-32 rounded-xl border border-[#1f5a3d]/50 bg-gradient-to-br from-[#143b28]/60 to-[#0f2e1f]/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5">
                  
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.gradient} border ${section.border} flex items-center justify-center`}>
                        <span className="text-2xl">{section.icon}</span>
                      </div>
                      {count > 0 && (
                        <div className="px-2 py-1 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/30">
                          <span className="text-xs font-bold text-[#d4af37]">{count}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-1">{section.title}</h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-gray-400">Open →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Offline notice */}
        {!isOnline && (
          <div className="mt-6 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-xl p-4 border border-yellow-500/20">
            <p className="text-yellow-300 text-sm text-center">
              ⚡ Working offline - Some features may be limited
            </p>
          </div>
        )}

        {/* Minimal footer */}
        <div className="mt-8 pt-4 border-t border-[#1f5a3d]/20">
          <p className="text-gray-500 text-xs text-center">
            {isOnline ? 'Online • ' : 'Offline • '}
            FNote • Local Storage • v1.0
          </p>
        </div>
      </div>
    </div>
  )
}
