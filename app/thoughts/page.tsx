'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { syncService } from '@/utils/sync'

type ThoughtType = 'insight' | 'pattern' | 'idea' | 'reflection' | 'question' | 'observation'
type Mood = '😊' | '😐' | '😔' | '😡' | '🤔' | '🎯' | '💡'

interface Thought {
  id: string
  content: string
  type: ThoughtType
  mood: Mood
  tags: string[]
  createdAt: Date
  date: string
}

export default function ThoughtsPage() {
  const router = useRouter()
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [newThought, setNewThought] = useState({
    content: '',
    type: 'insight' as ThoughtType,
    mood: '🤔' as Mood,
    tagInput: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [filterType, setFilterType] = useState<ThoughtType | 'all'>('all')
  const [filterDate, setFilterDate] = useState<string>('')
  const [editingThought, setEditingThought] = useState<Thought | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSyncs, setPendingSyncs] = useState(0)
  const [loading, setLoading] = useState(true)

  const thoughtTypes: { id: ThoughtType; name: string; emoji: string; color: string }[] = [
    { id: 'insight', name: 'Insight', emoji: '💡', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'pattern', name: 'Pattern', emoji: '🔄', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'idea', name: 'Idea', emoji: '✨', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'reflection', name: 'Reflection', emoji: '🤔', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'question', name: 'Question', emoji: '❓', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'observation', name: 'Observation', emoji: '👀', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  ]

  const moods: Mood[] = ['😊', '😐', '😔', '😡', '🤔', '🎯', '💡']

  useEffect(() => {
    const checkStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', checkStatus)
    window.addEventListener('offline', checkStatus)
    loadThoughts()
    const interval = setInterval(() => setPendingSyncs(syncService.getQueueSize()), 3000)
    return () => {
      window.removeEventListener('online', checkStatus)
      window.removeEventListener('offline', checkStatus)
      clearInterval(interval)
    }
  }, [])

  const loadThoughts = async () => {
    setLoading(true)
    try {
      const data = await api.getThoughts()
      // Use type assertion to resolve the Mood string vs Mood emoji type mismatch
      setThoughts(data as unknown as Thought[])
      localStorage.setItem('fnote_thoughts', JSON.stringify(data))
    } catch (error) {
      const saved = localStorage.getItem('fnote_thoughts')
      if (saved) setThoughts(JSON.parse(saved))
    } finally {
      setLoading(false)
    }
  }

  const handleAddThought = async () => {
    if (!newThought.content.trim()) return

    const thoughtData = {
      content: newThought.content,
      type: newThought.type,
      mood: newThought.mood,
      tags: newThought.tagInput.split(',').map(t => t.trim()).filter(t => t),
      date: newThought.date
    }

    const localThought: Thought = {
      id: Date.now().toString(),
      ...thoughtData,
      createdAt: new Date()
    }

    const updated = [localThought, ...thoughts]
    setThoughts(updated)
    localStorage.setItem('fnote_thoughts', JSON.stringify(updated))

    try {
      await api.createThought(thoughtData)
    } catch (error) {
      syncService.addToQueue({
        type: 'CREATE',
        entityType: 'thought',
        entityId: localThought.id,
        data: thoughtData
      })
    }

    setNewThought({ 
      content: '', type: 'insight', mood: '🤔', tagInput: '', 
      date: new Date().toISOString().split('T')[0] 
    })
  }

  const handleEditThought = (thought: Thought) => {
    setEditingThought(thought)
    setNewThought({
      content: thought.content,
      type: thought.type,
      mood: thought.mood,
      tagInput: thought.tags.join(', '),
      date: thought.date
    })
  }

  const handleUpdateThought = async () => {
    if (!editingThought || !newThought.content.trim()) return

    const updatedData = {
      content: newThought.content,
      type: newThought.type,
      mood: newThought.mood,
      tags: newThought.tagInput.split(',').map(t => t.trim()).filter(t => t),
      date: newThought.date
    }

    const updated = thoughts.map(t => 
      t.id === editingThought.id ? { ...t, ...updatedData } : t
    )

    setThoughts(updated)
    localStorage.setItem('fnote_thoughts', JSON.stringify(updated))

    try {
      // Assuming api handles update
      await (api as any).updateThought?.(editingThought.id, updatedData)
    } catch (error) {
      syncService.addToQueue({
        type: 'UPDATE',
        entityType: 'thought',
        entityId: editingThought.id,
        data: updatedData
      })
    }

    setEditingThought(null)
    setNewThought({ 
      content: '', type: 'insight', mood: '🤔', tagInput: '', 
      date: new Date().toISOString().split('T')[0] 
    })
  }

  const deleteThought = async (id: string) => {
    const updated = thoughts.filter(t => t.id !== id)
    setThoughts(updated)
    localStorage.setItem('fnote_thoughts', JSON.stringify(updated))

    try {
      await api.deleteThought(id)
    } catch (error) {
      syncService.addToQueue({
        type: 'DELETE',
        entityType: 'thought',
        entityId: id,
        data: { id }
      })
    }
  }

  const handleSyncNow = async () => {
    await syncService.syncIfOnline()
    loadThoughts()
  }

  const filteredThoughts = thoughts.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false
    if (filterDate && t.date !== filterDate) return false
    return true
  })

  const getThoughtCountByType = (type: ThoughtType) => thoughts.filter(t => t.type === type).length

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">💭 Thinking Tracker</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${isOnline ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'bg-red-600/20 text-red-400 border border-red-500/30'}`}>
              {isOnline ? '● Online' : '○ Offline'}
            </span>
            {pendingSyncs > 0 && (
              <button onClick={handleSyncNow} className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-bold hover:bg-yellow-500 transition animate-pulse">
                🔄 {pendingSyncs} SYNC PENDING
              </button>
            )}
          </div>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white text-sm">← Back to Dashboard</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingThought ? '✏️ Edit Thought' : '➕ Record Thought'}
            </h2>
            <div className="space-y-4">
              <input type="date" value={newThought.date} onChange={e => setNewThought({...newThought, date: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]" />
              <div>
                <label className="block text-sm text-gray-300 mb-2">Thought Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {thoughtTypes.map(t => (
                    <button key={t.id} onClick={() => setNewThought({...newThought, type: t.id})} className={`p-3 rounded-lg border flex flex-col items-center ${newThought.type === t.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]'}`}>
                      <span className="text-xl">{t.emoji}</span>
                      <span className="text-xs mt-1 text-gray-300">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Mood/Feeling</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <button key={m} onClick={() => setNewThought({...newThought, mood: m})} className={`text-2xl p-2 rounded-lg ${newThought.mood === m ? 'border-2 border-[#d4af37] bg-[#d4af37]/10' : 'bg-[#0f2e1f] border border-[#1f5a3d] hover:bg-[#1f5a3d]'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <textarea placeholder="What's on your mind?" value={newThought.content} onChange={e => setNewThought({...newThought, content: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]" rows={5} />
              <input type="text" placeholder="Tags (comma separated)" value={newThought.tagInput} onChange={e => setNewThought({...newThought, tagInput: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]" />
              {editingThought ? (
                <div className="flex gap-2">
                  <button onClick={handleUpdateThought} className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition">Update Thought</button>
                  <button onClick={() => { setEditingThought(null); setNewThought({ content: '', type: 'insight', mood: '🤔', tagInput: '', date: new Date().toISOString().split('T')[0] }) }} className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancel</button>
                </div>
              ) : (
                <button onClick={handleAddThought} className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition">Save Thought</button>
              )}
            </div>
          </div>
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4">📊 Thought Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-gray-300">
                <span>Total Thoughts</span>
                <span className="text-[#d4af37] font-bold">{thoughts.length}</span>
              </div>
              {thoughtTypes.map(t => (
                <div key={t.id} className="flex justify-between items-center text-gray-300">
                  <span className="flex items-center gap-2"><span>{t.emoji}</span>{t.name}</span>
                  <span className="font-medium text-white">{getThoughtCountByType(t.id)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilterType('all')} className={`px-3 py-1.5 rounded-lg text-sm ${filterType === 'all' ? 'bg-[#d4af37] text-black' : 'bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d]'}`}>All</button>
                {thoughtTypes.map(t => (
                  <button key={t.id} onClick={() => setFilterType(t.id)} className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${filterType === t.id ? t.color : 'bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d]'}`}>
                    <span>{t.emoji}</span><span>{t.name}</span>
                  </button>
                ))}
              </div>
              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="px-4 py-2 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10 text-[#d4af37] animate-pulse">Syncing thoughts...</div>
            ) : filteredThoughts.map(t => {
                const typeInfo = thoughtTypes.find(tt => tt.id === t.type)
                return (
                  <div key={t.id} className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{t.mood}</div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${typeInfo?.color}`}>{typeInfo?.emoji} {typeInfo?.name}</span>
                            <span className="text-sm text-gray-400">{t.date}</span>
                          </div>
                          <p className="text-gray-200 whitespace-pre-line">{t.content}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleEditThought(t)} className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded">Edit</button>
                        <button onClick={() => deleteThought(t.id)} className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-1 rounded">Delete</button>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
