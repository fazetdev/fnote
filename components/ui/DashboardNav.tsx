'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { name: 'Notebook', href: '/notebook', icon: '📓', desc: 'Notes & Articles' },
  { name: 'Goals', href: '/goals', icon: '🎯', desc: 'Track Progress' },
  { name: 'Planner', href: '/planner', icon: '📅', desc: 'Daily Planning' },
  { name: 'Thoughts', href: '/thoughts', icon: '💭', desc: 'Thinking Journal' },
]

export default function DashboardNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">FNote</h1>
                <p className="text-gray-300 text-sm">Personal Knowledge System</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3
                    ${isActive 
                      ? 'bg-white/10 backdrop-blur-sm shadow-lg' 
                      : 'hover:bg-white/5 hover:backdrop-blur-sm'
                    }
                  `}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-300">{item.desc}</div>
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6">
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      p-4 rounded-xl transition-all duration-200 flex flex-col items-center justify-center
                      ${isActive 
                        ? 'bg-white/10 backdrop-blur-sm shadow-lg' 
                        : 'bg-white/5 hover:bg-white/10'
                      }
                    `}
                  >
                    <span className="text-3xl mb-2">{item.icon}</span>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-300 mt-1">{item.desc}</div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
