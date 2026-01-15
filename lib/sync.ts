// Sync service for offline/online data synchronization

type SyncItem = {
  id: string
  type: 'note' | 'goal' | 'plan' | 'thought' | 'learned'
  action: 'create' | 'update' | 'delete'
  data: any
  timestamp: number
  synced: boolean
}

class SyncService {
  private queue: SyncItem[] = []
  private isOnline = false
  private isSyncing = false

  constructor() {
    // Only run in browser
    if (typeof window === 'undefined') return
    
    this.isOnline = navigator.onLine
    this.loadQueue()
    this.setupListeners()
    
    // Initial sync check
    if (this.isOnline) {
      this.processQueue()
    }
  }

  private loadQueue() {
    const saved = localStorage.getItem('fnote_sync_queue')
    if (saved) {
      this.queue = JSON.parse(saved)
    }
  }

  private saveQueue() {
    localStorage.setItem('fnote_sync_queue', JSON.stringify(this.queue))
  }

  private setupListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.processQueue()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })
  }

  addToQueue(item: Omit<SyncItem, 'id' | 'timestamp' | 'synced'>) {
    if (typeof window === 'undefined') return
    
    const syncItem: SyncItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      synced: false
    }

    this.queue.push(syncItem)
    this.saveQueue()

    // Try to sync immediately if online
    if (this.isOnline && !this.isSyncing) {
      this.processQueue()
    }
  }

  async processQueue() {
    if (typeof window === 'undefined') return
    if (this.isSyncing || !this.isOnline || this.queue.length === 0) {
      return
    }

    this.isSyncing = true

    try {
      // Filter unsynced items
      const unsyncedItems = this.queue.filter(item => !item.synced)
      
      // In a real app, you would send these to your backend API
      // For now, we'll simulate successful sync
      for (const item of unsyncedItems) {
        console.log(`Syncing ${item.type} ${item.action}:`, item.id)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Mark as synced
        item.synced = true
      }

      // Remove synced items older than 24 hours
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000)
      this.queue = this.queue.filter(item => !item.synced || item.timestamp > oneDayAgo)
      
      this.saveQueue()
      console.log('Sync completed successfully')

    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      this.isSyncing = false
    }
  }

  getPendingCount() {
    if (typeof window === 'undefined') return 0
    return this.queue.filter(item => !item.synced).length
  }

  clearQueue() {
    this.queue = []
    this.saveQueue()
  }
}

// Create singleton instance (only in browser)
export const syncService = typeof window !== 'undefined' ? new SyncService() : null

// Helper function to sync localStorage changes
export function setupLocalStorageSync() {
  if (typeof window === 'undefined') return
  
  // Watch for localStorage changes in other tabs/windows
  window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith('fnote_') && event.key !== 'fnote_sync_queue') {
      console.log('LocalStorage changed in another tab:', event.key)
    }
  })

  // Override localStorage.setItem to auto-sync
  const originalSetItem = localStorage.setItem.bind(localStorage)
  
  localStorage.setItem = function(key: string, value: string) {
    originalSetItem(key, value)
    
    if (key.startsWith('fnote_') && !key.includes('sync') && !key.includes('password')) {
      // Determine type from key
      let type: SyncItem['type'] = 'note'
      if (key.includes('goal')) type = 'goal'
      else if (key.includes('plan')) type = 'plan'
      else if (key.includes('thought')) type = 'thought'
      else if (key.includes('learned')) type = 'learned'
      
      // Add to sync queue
      try {
        const data = JSON.parse(value)
        if (syncService) {
          syncService.addToQueue({
            type,
            action: Array.isArray(data) ? 'update' : 'create',
            data
          })
        }
      } catch (e) {
        // Not JSON data (like 'fnote_logged_in')
      }
    }
  }
}

// Initialize sync on module load
if (typeof window !== 'undefined') {
  setupLocalStorageSync()
}
