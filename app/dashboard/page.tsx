'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('fnote_logged_in') === 'true'
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('fnote_logged_in')
    router.push('/')
  }

  const sections = [
    { 
      title: 'Notes', 
      icon: '📝', 
      href: '/notebook',
      gradient: 'from-blue-400 to-blue-600',
      description: 'View and manage your notes'
    },
    { 
      title: 'Goals', 
      icon: '🎯', 
      href: '/goals',
      gradient: 'from-purple-400 to-purple-600',
      description: 'Set and track your goals'
    },
    { 
      title: 'Planner', 
      icon: '📅', 
      href: '/planner',
      gradient: 'from-green-400 to-green-600',
      description: 'Plan your day and tasks'
    },
    { 
      title: 'Thoughts', 
      icon: '💭', 
      href: '/thoughts',
      gradient: 'from-yellow-400 to-yellow-600',
      description: 'Record and explore your thoughts'
    },
    { 
      title: 'Learned Today', 
      icon: '📚', 
      href: '/learned-today',
      gradient: 'from-pink-400 to-pink-600',
      description: 'Track what you learned each day'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">📊 Dashboard</h1>
          <p className="text-gray-300 text-sm">
            Quick access to all sections of your FNote workspace
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Grid - 5 Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group block"
          >
            <div className={`
              bg-gradient-to-r ${section.gradient}
              rounded-xl
              p-6
              text-white
              cursor-pointer
              transition-transform
              transform
              hover:scale-105
              h-full
              flex
              flex-col
            `}>
              <span className="text-5xl block mb-4">{section.icon}</span>
              <h3 className="text-2xl font-bold">{section.title}</h3>
              <p className="text-lg mt-1 opacity-90">{section.description}</p>
              <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-right">→</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#d4af37] mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {sections.map((section) => (
            <div key={section.title} className="text-center">
              <div className={`text-2xl mb-2`}>{section.icon}</div>
              <div className="text-sm font-medium">{section.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
