'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('faruk@example.com') // Pre-filled email
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFingerprintLoading, setIsFingerprintLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('fnote_logged_in') === 'true') {
      router.push('/dashboard')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await api.login(email, password)
      
      localStorage.setItem('fnote_logged_in', 'true')
      localStorage.setItem('fnote_user', JSON.stringify(result.user))
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      
      // Fallback to local password check for development
      if (password === 'fnote123' || password === '1234') {
        localStorage.setItem('fnote_logged_in', 'true')
        localStorage.setItem('fnote_user', JSON.stringify({
          id: 'mock-user-id',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        }))
        router.push('/dashboard')
      } else {
        setError(error.message || 'Login failed. Please try again.')
        setIsLoading(false)
      }
    }
  }

  const handleFingerprint = async () => {
    setIsFingerprintLoading(true)
    setError('')

    try {
      // Try to trigger fingerprint with minimal WebAuthn
      if (typeof window === 'undefined' || !window.PublicKeyCredential) {
        throw new Error('Fingerprint not supported')
      }

      // Create a simple public key request
      const publicKey = {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: 'required' as UserVerificationRequirement,
        rpId: window.location.hostname
      }

      // This should trigger fingerprint dialog
      const credential = await navigator.credentials.get({
        publicKey
      } as CredentialRequestOptions)

      if (credential) {
        // Fingerprint successful
        localStorage.setItem('fnote_logged_in', 'true')
        // For mock authentication
        localStorage.setItem('fnote_user', JSON.stringify({
          id: 'mock-user-id',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        }))
        router.push('/dashboard')
      } else {
        setError('Fingerprint failed')
        setIsFingerprintLoading(false)
      }
    } catch (error: any) {
      console.log('Fingerprint error:', error.name || error.message)

      // Show helpful error messages
      if (error.name === 'NotAllowedError') {
        setError('Touch fingerprint sensor')
      } else if (error.name === 'NotSupportedError') {
        setError('Fingerprint not supported')
      } else if (error.message?.includes('HTTPS')) {
        setError('Fingerprint requires HTTPS (works in production)')
      } else {
        setError('Use password')
      }

      setIsFingerprintLoading(false)
    }
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
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="Email"
              className="w-full rounded-md bg-[#0f2e1f] border border-[#1f5a3d] px-3 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              disabled={isLoading || isFingerprintLoading}
            />
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Password"
              className="w-full rounded-md bg-[#0f2e1f] border border-[#1f5a3d] px-3 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              autoFocus
              disabled={isLoading || isFingerprintLoading}
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            {/* Password Login Button */}
            <button
              type="submit"
              disabled={isLoading || isFingerprintLoading}
              className="w-full rounded-md bg-[#d4af37] text-black py-3 text-sm font-medium hover:bg-[#c9a633] disabled:opacity-60"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {/* Fingerprint Button */}
          <button
            onClick={handleFingerprint}
            disabled={isLoading || isFingerprintLoading}
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm font-medium mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isFingerprintLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Waiting for fingerprint...
              </>
            ) : (
              <>
                <span>👆</span>
                Fingerprint Login
              </>
            )}
          </button>
        </div>

        {/* Fingerprint Info */}
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <p className="text-xs text-blue-300">
            {typeof window !== 'undefined' && window.location.protocol === 'https:'
              ? '✅ HTTPS detected - Fingerprint should work'
              : '⚠️ Local HTTP - Fingerprint needs HTTPS (works when deployed)'}
          </p>
        </div>

        {/* Quote below login */}
        <p className="text-gray-300 italic mt-6 max-w-md mx-auto">
          "Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you."
        </p>
      </div>
    </div>
  )
}
