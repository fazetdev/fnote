'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LearnedItem {
  id: string
  title: string
  content: string
  category: string
  date: string
  tags: string[]
  createdAt: Date
}

export default function LearnedTodayPage() {
  const router = useRouter()
  const [items, setItems] = useState<LearnedItem[]>([])
  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    category: 'general',
    tagInput: ''
  })
  const [editingItem, setEditingItem] = useState<LearnedItem | null>(null)
  const [activeDate, setActiveDate] = useState<string>(new Date().toISOString().split('T')[0])

  const categories = [
    { id: 'technology', name: 'Technology', emoji: '💻', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'business', name: 'Business', emoji: '💼', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'personal', name: 'Personal', emoji: '👤', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    { id: 'skills', name: 'Skills', emoji: '🎯', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'ideas', name: 'Ideas', emoji: '💡', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'general', name: 'General', emoji: '📚', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  ]

  // Load from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('fnote_learned')
    if (savedItems) setItems(JSON.parse(savedItems))
  }, [])

  const saveItemsToStorage = (updatedItems: LearnedItem[]) => {
    localStorage.setItem('fnote_learned', JSON.stringify(updatedItems))
  }

  const handleAddItem = () => {
    if (!newItem.title.trim() || !newItem.content.trim()) return

    const item: LearnedItem = {
      id: Date.now().toString(),
      title: newItem.title,
      content: newItem.content,
      category: newItem.category,
      date: activeDate,
      tags: newItem.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date()
    }

    const updatedItems = [item, ...items]
    setItems(updatedItems)
    saveItemsToStorage(updatedItems)

    setNewItem({
      title: '',
      content: '',
      category: 'general',
      tagInput: ''
    })
  }

  const handleEditItem = (item: LearnedItem) => {
    setEditingItem(item)
    setNewItem({
      title: item.title,
      content: item.content,
      category: item.category,
      tagInput: item.tags.join(', ')
    })
  }

  const handleUpdateItem = () => {
    if (!editingItem || !newItem.title.trim() || !newItem.content.trim()) return

    const updatedItem: LearnedItem = {
      ...editingItem,
      title: newItem.title,
      content: newItem.content,
      category: newItem.category,
      tags: newItem.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    const updatedItems = items.map(item => 
      item.id === editingItem.id ? updatedItem : item
    )
    
    setItems(updatedItems)
    saveItemsToStorage(updatedItems)
    
    setEditingItem(null)
    setNewItem({
      title: '',
      content: '',
      category: 'general',
      tagInput: ''
    })
  }

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    saveItemsToStorage(updatedItems)
    if (editingItem?.id === id) setEditingItem(null)
  }

  const filteredItems = items.filter(item => item.date === activeDate)

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">📚 Learned Today</h1>
          <p className="text-gray-300 text-sm">Track what you learn each day</p>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Add Learned Item */}
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingItem ? '✏️ Edit Item' : '➕ Add Learned Item'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <input
                type="text"
                placeholder="What did you learn?"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              <div>
                <label className="block text-sm text-gray-300 mb-2">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewItem({...newItem, category: cat.id})}
                      className={`p-3 rounded-lg border flex flex-col items-center ${newItem.category === cat.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]'}`}
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <span className="text-xs mt-1 text-gray-300">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Details about what you learned..."
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newItem.tagInput}
                onChange={(e) => setNewItem({ ...newItem, tagInput: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              {editingItem ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateItem}
                    className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                  >
                    Update Item
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(null)
                      setNewItem({ title: '', content: '', category: 'general', tagInput: '' })
                    }}
                    className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddItem}
                  className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                >
                  Save Learned Item
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Learned Items List */}
        <div className="lg:w-2/3">
          {/* Date Navigation */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#d4af37]">
                Learned on {new Date(activeDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              <button
                onClick={() => setActiveDate(new Date().toISOString().split('T')[0])}
                className="text-sm text-gray-400 hover:text-white"
              >
                Today
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center">
                <p className="text-gray-300">Nothing learned on this day yet</p>
                <p className="text-gray-400 text-sm mt-1">Add what you learned using the form on the left</p>
              </div>
            ) : (
              filteredItems.map(item => {
                const categoryInfo = categories.find(c => c.id === item.category)
                return (
                  <div key={item.id} className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-5 hover:border-[#d4af37] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo?.color}`}>
                          <span className="text-xl">{categoryInfo?.emoji}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${categoryInfo?.color}`}>
                              {categoryInfo?.name}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 mt-2">{item.content}</p>
                          
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {item.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-sm rounded bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d]">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="text-sm text-gray-400 mt-3">
                            Added {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4">Learning Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl text-white mb-2">{filteredItems.length}</div>
                <div className="text-sm text-gray-300">Today's Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white mb-2">{items.length}</div>
                <div className="text-sm text-gray-300">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-white mb-2">
                  {[...new Set(items.map(item => item.date))].length}
                </div>
                <div className="text-sm text-gray-300">Days Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
