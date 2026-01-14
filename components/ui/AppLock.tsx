'use client'

import { useState, useEffect } from 'react'

export default function AppLock({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check if already unlocked (from session)
  useEffect(() => {
    const unlocked = localStorage.getItem('fnote_unlocked') === 'true'
    setIsUnlocked(unlocked)
  }, [])

  const handleUnlock = () => {
    // Simple password - can be changed later
    if (password === 'fnote123' || password === '1234') {
      setIsUnlocked(true)
      localStorage.setItem('fnote_unlocked', 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLock = () => {
    setIsUnlocked(false)
    localStorage.removeItem('fnote_unlocked')
    setPassword('')
  }

  if (isUnlocked) {
    return (
      <>
        {children}
        <button
          onClick={handleLock}
          className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700"
          title="Lock app"
        >
          🔒
        </button>
      </>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🔐 FNote Locked</h1>
          <p className="text-gray-600 mt-2">Enter password to access your notes</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            placeholder="Enter password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            autoFocus
          />
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            onClick={handleUnlock}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Unlock App
          </button>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Default password: <code className="bg-gray-100 px-2 py-1 rounded">fnote123</code></p>
            <p className="mt-2 text-xs">Change in code later</p>
          </div>
        </div>
      </div>
    </div>
  )
}
