// Proper sync service for FNote - Works with actual backend API

type SyncItem = {
  id: string
  type: 'note' | 'goal' | 'plan' | 'thought' | 'learned'
  action: 'create' | 'update' | 'delete'
  data: any
  timestamp: number
  synced: boolean
  retries: number
}

class SyncService {
  private queue: SyncItem[] = []
  private isOnline = false
  private isSyncing = false
  private maxRetries = 3

  constructor() {
    if (typeof window === 'undefined') return
    
    this.isOnline = navigator.onLine
    this.loadQueue()
    this.setupListeners()
    
    // Clean up old items on startup
    this.cleanupOldItems()
  }

  private loadQueue() {
    try {
      const saved = localStorage.getItem('fnote_sync_queue')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Only keep valid items from last 7 days
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
        this.queue = parsed.filter((item: SyncItem) => 
          item && 
          item.id && 
          item.type && 
          item.timestamp > sevenDaysAgo &&
          item.retries < this.maxRetries
        )
        this.saveQueue() // Save cleaned version
      }
    } catch (error) {
      console.error('Error loading sync queue:', error)
      this.queue = []
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

  private cleanupOldItems() {
    // Remove items older than 7 days or with too many retries
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
    this.queue = this.queue.filter(item => 
      item.timestamp > sevenDaysAgo && 
      item.retries < this.maxRetries
    )
    this.saveQueue()
  }

  // Only add to queue for actual changes, not all localStorage writes
  addToQueue(type: SyncItem['type'], action: SyncItem['action'], data: any) {
    if (typeof window === 'undefined') return
    
    // Don't sync authentication data
    if (type === 'note' && data?.includes('password')) return
    if (type === 'note' && data?.includes('logged_in')) return
    
    const syncItem: SyncItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      action,
      data,
      timestamp: Date.now(),
      synced: false,
      retries: 0
    }

    this.queue.push(syncItem)
    this.saveQueue()

    // Try to sync immediately if online
    if (this.isOnline && !this.isSyncing) {
      this.processQueue()
    }
  }

  async syncToAPI(item: SyncItem): Promise<boolean> {
    try {
      // Map to your actual API endpoints
      const endpoints = {
        note: '/api/notes',
        goal: '/api/goals',
        plan: '/api/planner',
        thought: '/api/thoughts',
        learned: '/api/learned'
      }

      const endpoint = endpoints[item.type]
      if (!endpoint) return false

      // Get user data for authentication
      const userData = localStorage.getItem('fnote_user')
      const user = userData ? JSON.parse(userData) : null

      if (!user) {
        console.warn('No user data for sync')
        return false
      }

      const response = await fetch(endpoint, {
        method: item.action === 'delete' ? 'DELETE' : 
                item.action === 'update' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-data': JSON.stringify(user)
        },
        body: JSON.stringify(item.data)
      })

      return response.ok
    } catch (error) {
      console.error('Sync to API failed:', error)
      return false
    }
  }

  async processQueue() {
    if (typeof window === 'undefined') return
    if (this.isSyncing || !this.isOnline || this.queue.length === 0) {
      return
    }

    this.isSyncing = true

    try {
      const unsyncedItems = this.queue.filter(item => !item.synced)
      
      for (const item of unsyncedItems) {
        const success = await this.syncToAPI(item)
        
        if (success) {
          item.synced = true
          item.retries = 0
        } else {
          item.retries += 1
          if (item.retries >= this.maxRetries) {
            console.warn(`Max retries reached for item: ${item.id}`)
          }
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Clean up synced items
      this.queue = this.queue.filter(item => !item.synced || item.retries < this.maxRetries)
      this.saveQueue()
      
      console.log(`Sync completed. ${unsyncedItems.filter(i => i.synced).length} items synced`)

    } catch (error) {
      console.error('Sync process failed:', error)
    } finally {
      this.isSyncing = false
    }
  }

  getPendingCount() {
    return this.queue.filter(item => !item.synced).length
  }

  clearQueue() {
    this.queue = []
    this.saveQueue()
  }
}

// Create instance only in browser
export const syncService = typeof window !== 'undefined' ? new SyncService() : null

// Helper to manually trigger sync for specific actions
export function trackChange(type: SyncItem['type'], action: SyncItem['action'], data: any) {
  if (syncService) {
    syncService.addToQueue(type, action, data)
  }
}
