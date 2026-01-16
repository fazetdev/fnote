// Script to clear incorrect sync data
console.log('Clearing incorrect sync data...')

if (typeof window !== 'undefined') {
  localStorage.removeItem('fnote_sync_queue')
  console.log('✅ Sync queue cleared')
  
  // Also clear any incorrect counts
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.includes('sync') || key.includes('pending')) {
      localStorage.removeItem(key)
    }
  })
  console.log('✅ All sync-related data cleared')
} else {
  console.log('⚠️  Run this in browser console')
  console.log('Copy and paste: localStorage.removeItem("fnote_sync_queue")')
}
