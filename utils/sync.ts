// Offline sync service for handling offline operations

interface SyncOperation {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  entityType: 'note' | 'goal' | 'plan' | 'thought' | 'learned';
  entityId: string;
  data: any;
  timestamp: number;
  retries: number;
}

class SyncService {
  private readonly SYNC_QUEUE_KEY = 'fnote_sync_queue';
  private readonly MAX_RETRIES = 3;

  // Add operation to sync queue
  addToQueue(operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retries'>): void {
    if (typeof window === 'undefined') return;

    const queue = this.getQueue();
    const syncOp: SyncOperation = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      retries: 0,
      ...operation
    };

    queue.push(syncOp);
    this.saveQueue(queue);
    console.log('Added to sync queue:', syncOp);
  }

  // Get sync queue
  getQueue(): SyncOperation[] {
    if (typeof window === 'undefined') return [];
    const queueJson = localStorage.getItem(this.SYNC_QUEUE_KEY);
    return queueJson ? JSON.parse(queueJson) : [];
  }

  // Save sync queue
  private saveQueue(queue: SyncOperation[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
  }

  // Check if online and sync pending operations
  async syncIfOnline(): Promise<void> {
    if (typeof window === 'undefined' || !navigator.onLine) return;

    const queue = this.getQueue();
    if (queue.length === 0) return;

    console.log('Syncing', queue.length, 'pending operations...');

    for (const operation of [...queue]) { // Create a copy to iterate
      try {
        await this.processOperation(operation);
        
        // Remove from queue if successful
        const newQueue = this.getQueue().filter(op => op.id !== operation.id);
        this.saveQueue(newQueue);
      } catch (error) {
        console.error('Failed to sync operation:', operation.id, error);
        
        // Increment retry count
        operation.retries += 1;
        
        // Remove if max retries reached
        if (operation.retries >= this.MAX_RETRIES) {
          console.warn('Max retries reached for operation:', operation.id);
          const newQueue = this.getQueue().filter(op => op.id !== operation.id);
          this.saveQueue(newQueue);
        } else {
          // Update queue with incremented retry count
          const updatedQueue = this.getQueue().map(op => 
            op.id === operation.id ? operation : op
          );
          this.saveQueue(updatedQueue);
        }
      }
    }
  }

  // Process a single sync operation
  private async processOperation(operation: SyncOperation): Promise<void> {
    // This would make actual API calls
    // For now, we'll simulate it
    console.log('Processing operation:', operation);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In real implementation, you would call your API endpoints here
    // Example: await fetch(`/api/${operation.entityType}s`, { method: 'POST', body: JSON.stringify(operation.data) });
  }

  // Clear sync queue
  clearQueue(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.SYNC_QUEUE_KEY);
  }

  // Get queue size
  getQueueSize(): number {
    return this.getQueue().length;
  }
}

export const syncService = new SyncService();

// Listen for online/offline events
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Back online, syncing...');
    syncService.syncIfOnline();
  });

  window.addEventListener('offline', () => {
    console.log('Offline mode');
  });
}
