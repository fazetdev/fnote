'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('fnote_logged_in') === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      if (password === 'fnote123' || password === '1234') {
        localStorage.setItem('fnote_logged_in', 'true')
        router.push('/dashboard')
      } else {
        setError('Incorrect password')
        setIsLoading(false)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f2e1f] px-4 text-center">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#d4af37]">FNOTE</h1>
        <p className="text-white text-lg mt-2">Welcome back Faruk</p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm">
        <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Password"
              className="w-full rounded-md bg-[#0f2e1f] border border-[#1f5a3d] px-3 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              autoFocus
              disabled={isLoading}
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#d4af37] text-black py-3 text-sm font-medium hover:bg-[#c9a633] disabled:opacity-60"
            >
              {isLoading ? 'Checking…' : 'Log in'}
            </button>
          </form>
        </div>

        {/* Quote below login */}
        <p className="text-gray-300 italic mt-6 max-w-md mx-auto">
          "Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you."
        </p>
      </div>
    </div>
  )
}
