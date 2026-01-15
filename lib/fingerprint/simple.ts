// Simple fingerprint system for personal app
// Uses device fingerprint + local storage

export class SimpleFingerprintAuth {
  private storageKey = 'fnote_fingerprint_data'
  private maxAttempts = 3
  private lockoutTime = 5 * 60 * 1000 // 5 minutes

  // Generate a simple device fingerprint
  private generateDeviceFingerprint(): string {
    const fingerprintData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
      deviceMemory: (navigator as any).deviceMemory || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      touchSupport: 'ontouchstart' in window,
      cookiesEnabled: navigator.cookieEnabled
    }

    // Create a simple hash of the fingerprint data
    const fingerprintString = JSON.stringify(fingerprintData)
    let hash = 0
    for (let i = 0; i < fingerprintString.length; i++) {
      const char = fingerprintString.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    return `device-${Math.abs(hash).toString(16)}`
  }

  // Check if device supports "fingerprint" (actually device recognition)
  async isSupported(): Promise<boolean> {
    return true // Always supported with our simple approach
  }

  // Register device for fingerprint login
  async register(password: string): Promise<{ success: boolean; message: string }> {
    try {
      // Verify password first
      if (password !== 'fnote123' && password !== '1234') {
        return {
          success: false,
          message: 'Invalid password. Use fnote123 or 1234'
        }
      }

      const deviceId = this.generateDeviceFingerprint()
      const registrationData = {
        deviceId,
        registeredAt: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        version: '1.0'
      }

      // Store in localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(registrationData))
      
      return {
        success: true,
        message: '✅ Device registered for quick access!'
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        message: 'Failed to register device'
      }
    }
  }

  // Attempt fingerprint login
  async authenticate(): Promise<{ success: boolean; message: string; requiresPassword?: boolean }> {
    try {
      // Check if locked out
      const lockoutUntil = localStorage.getItem('fnote_fingerprint_lockout')
      if (lockoutUntil && Date.now() < parseInt(lockoutUntil)) {
        const minutesLeft = Math.ceil((parseInt(lockoutUntil) - Date.now()) / 60000)
        return {
          success: false,
          message: `Too many attempts. Try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`,
          requiresPassword: true
        }
      }

      const storedData = localStorage.getItem(this.storageKey)
      if (!storedData) {
        return {
          success: false,
          message: 'Device not registered. Use password first.',
          requiresPassword: true
        }
      }

      const registration = JSON.parse(storedData)
      const currentDeviceId = this.generateDeviceFingerprint()

      // Check if it's the same device
      if (registration.deviceId === currentDeviceId) {
        // Update last used time
        registration.lastUsed = new Date().toISOString()
        localStorage.setItem(this.storageKey, JSON.stringify(registration))
        
        // Reset attempt counter
        localStorage.removeItem('fnote_fingerprint_attempts')
        localStorage.removeItem('fnote_fingerprint_lockout')

        return {
          success: true,
          message: '✅ Quick access granted!'
        }
      } else {
        // Different device - count as failed attempt
        const attempts = parseInt(localStorage.getItem('fnote_fingerprint_attempts') || '0') + 1
        localStorage.setItem('fnote_fingerprint_attempts', attempts.toString())

        if (attempts >= this.maxAttempts) {
          const lockoutTime = Date.now() + this.lockoutTime
          localStorage.setItem('fnote_fingerprint_lockout', lockoutTime.toString())
          localStorage.removeItem('fnote_fingerprint_attempts')
          
          return {
            success: false,
            message: 'Too many failed attempts. Use password instead.',
            requiresPassword: true
          }
        }

        return {
          success: false,
          message: 'Device not recognized. Use password.',
          requiresPassword: true
        }
      }
    } catch (error) {
      console.error('Authentication error:', error)
      return {
        success: false,
        message: 'Quick access failed. Use password.',
        requiresPassword: true
      }
    }
  }

  // Check if device is registered
  isRegistered(): boolean {
    const storedData = localStorage.getItem(this.storageKey)
    return !!storedData
  }

  // Clear registration
  clearRegistration(): void {
    localStorage.removeItem(this.storageKey)
    localStorage.removeItem('fnote_fingerprint_attempts')
    localStorage.removeItem('fnote_fingerprint_lockout')
  }
}

// Singleton instance
export const fingerprintAuth = new SimpleFingerprintAuth()
