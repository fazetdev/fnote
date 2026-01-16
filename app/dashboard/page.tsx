'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [stats, setStats] = useState<Record<string, number>>({})

  useEffect(() => {
    // 1. Mark as mounted to prevent hydration errors
    setMounted(true)
    
    // 2. Set initial online status
    setIsOnline(navigator.onLine)

    // 3. Auth Check
    const isLoggedIn = localStorage.getItem('fnote_logged_in') === 'true'
    if (!isLoggedIn) {
      router.push('/')
      return
    }

    // 4. Load Stats from LocalStorage
    const keys = ['fnote_notes', 'fnote_goals', 'fnote_plans', 'fnote_thoughts', 'fnote_learned']
    const newStats: Record<string, number> = {}
    keys.forEach(key => {
      try {
        const data = localStorage.getItem(key)
        newStats[key] = data ? JSON.parse(data).length : 0
      } catch {
        newStats[key] = 0
      }
    })
    setStats(newStats)

    // 5. Event Listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('fnote_logged_in')
    router.push('/')
  }

  // Define sections inside to use the stats state safely
  const sections = [
    { title: 'Notes', icon: '📝', href: '/notebook', gradient: 'from-blue-500/20', border: 'border-blue-500/40', statKey: 'fnote_notes' },
    { title: 'Goals', icon: '🎯', href: '/goals', gradient: 'from-purple-500/20', border: 'border-purple-500/40', statKey: 'fnote_goals' },
    { title: 'Planner', icon: '📅', href: '/planner', gradient: 'from-emerald-500/20', border: 'border-emerald-500/40', statKey: 'fnote_plans' },
    { title: 'Thoughts', icon: '💭', href: '/thoughts', gradient: 'from-amber-500/20', border: 'border-amber-500/40', statKey: 'fnote_thoughts' },
    { title: 'Learned Today', icon: '📚', href: '/learned-today', gradient: 'from-pink-500/20', border: 'border-pink-500/40', statKey: 'fnote_learned' },
    { title: 'Settings', icon: '⚙️', href: '#', gradient: 'from-gray-500/20', border: 'border-gray-500/40', statKey: null }
  ]

  // IMPORTANT: For hydration error #423, we must return the exact same thing 
  // on first render as the server. Since the server can't see localStorage, 
  // we return null until mounted.
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0a1f14] text-white p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1f5a3d_0%,transparent_70%)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-6">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#aa8d2e] p-[1px]">
              <div className="w-full h-full rounded-2xl bg-[#0a1f14] flex items-center justify-center text-2xl">⚡</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">FNote Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  {isOnline ? 'Sync Active' : 'Offline Mode'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-400 uppercase tracking-widest hover:bg-red-500/20"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const count = section.statKey ? stats[section.statKey] || 0 : 0
            const isSettings = section.title === 'Settings'

            if (isSettings) {
              return (
                <div key={section.title} className="h-40 rounded-3xl border border-white/5 bg-white/[0.02] p-6 flex flex-col justify-between opacity-40">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.gradient} border ${section.border} flex items-center justify-center text-2xl`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white/70">{section.title}</h3>
                    <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Coming Soon</p>
                  </div>
                </div>
              )
            }

            return (
              <Link key={section.title} href={section.href} className="group h-40 outline-none">
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-[#d4af37]/40 group-hover:-translate-y-1 group-active:scale-95">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.gradient} border ${section.border} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
                      {section.icon}
                    </div>
                    {count > 0 && (
                      <div className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[10px] font-black text-[#d4af37]">
                        {count}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors">{section.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-[1px] w-4 bg-[#d4af37]/40 group-hover:w-8 transition-all duration-500" />
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest group-hover:text-gray-300">Open Section</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <footer className="mt-12 flex justify-center">
          <div className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
            <span>Production v1.0.4</span>
            <div className="w-[1px] h-4 bg-white/10" />
            <span>Local Storage Active</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
