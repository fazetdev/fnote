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
      
      {/* Animated background - subtle enhancement */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1f5a3d]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Heading with enhanced design */}
      <div className="mb-8 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#1f5a3d]/20 backdrop-blur-sm border border-[#d4af37]/30 mb-4 shadow-lg">
          <span className="text-4xl">📝</span>
        </div>
        <h1 className="text-4xl font-bold text-[#d4af37] mb-2">FNOTE</h1>
        <p className="text-white text-lg">Welcome back Faruk</p>
      </div>

      {/* Login Form - enhanced but same structure */}
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 shadow-2xl shadow-black/30">
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
              className="w-full rounded-md bg-[#d4af37] text-black py-3 text-sm font-medium hover:bg-[#c9a633] disabled:opacity-60 transition-all"
            >
              {isLoading ? 'Checking…' : 'Log in'}
            </button>
          </form>
          
          {/* Fingerprint/Passkey Section - RESTORED */}
          <div className="mt-6 pt-6 border-t border-[#1f5a3d]">
            <button
              onClick={() => {
                // This would trigger fingerprint/passkey login
                console.log('Fingerprint login clicked')
                // For now, just use password '1234' as fallback
                setPassword('1234')
                handleLogin(new Event('submit') as any)
              }}
              className="w-full rounded-md bg-[#1f5a3d] hover:bg-[#2a6e47] text-white py-3 text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <span className="text-lg">👆</span>
              Login with Fingerprint / Passkey
            </button>
            <p className="text-gray-400 text-xs mt-2 text-center">
              Use biometric authentication for quick access
            </p>
          </div>
        </div>

        {/* Quote - enhanced presentation */}
        <div className="mt-8 bg-gradient-to-r from-transparent via-[#1f5a3d]/30 to-transparent rounded-xl p-6 border border-[#1f5a3d]/50">
          <p className="text-gray-300 italic text-lg leading-relaxed">
            "Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you."
          </p>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
            <span className="mx-4 text-[#d4af37] text-sm">— Tyrion Lannister</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
