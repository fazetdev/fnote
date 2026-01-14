'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

  const thoughtTypes: { id: ThoughtType; name: string; emoji: string; color: string }[] = [
    { id: 'insight', name: 'Insight', emoji: '💡', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'pattern', name: 'Pattern', emoji: '🔄', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'idea', name: 'Idea', emoji: '✨', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'reflection', name: 'Reflection', emoji: '🤔', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'question', name: 'Question', emoji: '❓', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { id: 'observation', name: 'Observation', emoji: '👀', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  ]

  const moods: Mood[] = ['😊', '😐', '😔', '😡', '🤔', '🎯', '💡']

  // Load thoughts
  useEffect(() => {
    const saved = localStorage.getItem('fnote_thoughts')
    if (saved) setThoughts(JSON.parse(saved))
  }, [])

  const saveThoughtsToStorage = (updatedThoughts: Thought[]) => {
    localStorage.setItem('fnote_thoughts', JSON.stringify(updatedThoughts))
  }

  const handleAddThought = () => {
    if (!newThought.content.trim()) return
    
    const thought: Thought = {
      id: Date.now().toString(),
      content: newThought.content,
      type: newThought.type,
      mood: newThought.mood,
      tags: newThought.tagInput.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date(),
      date: newThought.date
    }
    
    const updated = [thought, ...thoughts]
    setThoughts(updated)
    saveThoughtsToStorage(updated)
    
    setNewThought({ 
      content: '', 
      type: 'insight', 
      mood: '🤔', 
      tagInput: '', 
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

  const handleUpdateThought = () => {
    if (!editingThought || !newThought.content.trim()) return
    
    const updatedThought: Thought = {
      ...editingThought,
      content: newThought.content,
      type: newThought.type,
      mood: newThought.mood,
      tags: newThought.tagInput.split(',').map(t => t.trim()).filter(t => t),
      date: newThought.date
    }
    
    const updated = thoughts.map(t => 
      t.id === editingThought.id ? updatedThought : t
    )
    
    setThoughts(updated)
    saveThoughtsToStorage(updated)
    
    setEditingThought(null)
    setNewThought({ 
      content: '', 
      type: 'insight', 
      mood: '🤔', 
      tagInput: '', 
      date: new Date().toISOString().split('T')[0] 
    })
  }

  const deleteThought = (id: string) => {
    const updated = thoughts.filter(t => t.id !== id)
    setThoughts(updated)
    saveThoughtsToStorage(updated)
    if (editingThought?.id === id) setEditingThought(null)
  }

  const filteredThoughts = thoughts.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false
    if (filterDate && t.date !== filterDate) return false
    return true
  })

  const getThoughtCountByType = (type: ThoughtType) => thoughts.filter(t => t.type === type).length

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">💭 Thinking Tracker</h1>
          <p className="text-gray-300 text-sm">Log insights, patterns, and reflections</p>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Add Thought Form */}
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingThought ? '✏️ Edit Thought' : '➕ Record Thought'}
            </h2>
            
            <div className="space-y-4">
              <input 
                type="date" 
                value={newThought.date}
                onChange={e => setNewThought({...newThought, date: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
              />

              {/* Thought Type Selection */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Thought Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {thoughtTypes.map(t => (
                    <button 
                      key={t.id} 
                      onClick={() => setNewThought({...newThought, type: t.id})}
                      className={`p-3 rounded-lg border flex flex-col items-center ${newThought.type === t.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]'}`}
                    >
                      <span className="text-xl">{t.emoji}</span>
                      <span className="text-xs mt-1 text-gray-300">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Mood/Feeling</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <button 
                      key={m} 
                      onClick={() => setNewThought({...newThought, mood: m})}
                      className={`text-2xl p-2 rounded-lg ${newThought.mood === m ? 'border-2 border-[#d4af37] bg-[#d4af37]/10' : 'bg-[#0f2e1f] border border-[#1f5a3d] hover:bg-[#1f5a3d]'}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <textarea 
                placeholder="What's on your mind? Insights, patterns, questions?"
                value={newThought.content}
                onChange={e => setNewThought({...newThought, content: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                rows={5}
              />

              <input 
                type="text" 
                placeholder="Tags (comma separated)"
                value={newThought.tagInput}
                onChange={e => setNewThought({...newThought, tagInput: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              {editingThought ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateThought}
                    className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                  >
                    Update Thought
                  </button>
                  <button
                    onClick={() => {
                      setEditingThought(null)
                      setNewThought({ 
                        content: '', 
                        type: 'insight', 
                        mood: '🤔', 
                        tagInput: '', 
                        date: new Date().toISOString().split('T')[0] 
                      })
                    }}
                    className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAddThought}
                  className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                >
                  Save Thought
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4">📊 Thought Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Thoughts</span>
                <span className="text-[#d4af37] font-bold">{thoughts.length}</span>
              </div>
              {thoughtTypes.map(t => (
                <div key={t.id} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span>{t.emoji}</span>
                    <span className="text-gray-300">{t.name}</span>
                  </span>
                  <span className="font-medium text-white">{getThoughtCountByType(t.id)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Thoughts List */}
        <div className="lg:w-2/3">
          {/* Filters */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Filter by Type</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${filterType === 'all' ? 'bg-[#d4af37] text-black' : 'bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d] hover:border-[#d4af37]'}`}
                  >
                    All Types
                  </button>
                  {thoughtTypes.map(t => (
                    <button 
                      key={t.id} 
                      onClick={() => setFilterType(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${filterType === t.id ? t.color.replace('bg-', 'bg-').replace('text-', 'text-') : 'bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d] hover:border-[#d4af37]'}`}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Date</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="date" 
                    value={filterDate}
                    onChange={e => setFilterDate(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  {filterDate && (
                    <button 
                      onClick={() => setFilterDate('')}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Thoughts List */}
          <div className="space-y-4">
            {filteredThoughts.length === 0 ? (
              <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center">
                <p className="text-gray-300">No thoughts yet</p>
                <p className="text-gray-400 text-sm mt-1">Record your first thought using the form on the left</p>
              </div>
            ) : (
              filteredThoughts.map(t => {
                const typeInfo = thoughtTypes.find(tt => tt.id === t.type)
                return (
                  <div key={t.id} className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-5 hover:border-[#d4af37] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-3xl">
                          {t.mood}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${typeInfo?.color}`}>
                              {typeInfo?.emoji} {typeInfo?.name}
                            </span>
                            <span className="text-sm text-gray-400">
                              {new Date(t.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          
                          <p className="text-gray-200 whitespace-pre-line">{t.content}</p>
                          
                          {t.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {t.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 text-sm rounded bg-[#0f2e1f] text-gray-300 border border-[#1f5a3d]">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="text-sm text-gray-400 mt-3">
                            Recorded {new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEditThought(t)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteThought(t.id)}
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

          {/* Patterns & Insights */}
          {thoughts.length > 10 && (
            <div className="mt-8 bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#d4af37] mb-4">🔍 Patterns & Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                  <h4 className="font-medium text-emerald-400 mb-2">Most Common Type</h4>
                  <p className="text-3xl font-bold text-emerald-300">
                    {thoughtTypes.reduce((prev, current) => 
                      getThoughtCountByType(prev.id) > getThoughtCountByType(current.id) ? prev : current
                    ).emoji}
                  </p>
                  <p className="text-sm text-emerald-400 mt-1">
                    You think in {thoughtTypes.reduce((prev, current) => 
                      getThoughtCountByType(prev.id) > getThoughtCountByType(current.id) ? prev : current
                    ).name.toLowerCase()} patterns
                  </p>
                </div>
                
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h4 className="font-medium text-blue-400 mb-2">Recent Activity</h4>
                  <p className="text-3xl font-bold text-blue-300">
                    {thoughts.filter(t => {
                      const thoughtDate = new Date(t.createdAt)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return thoughtDate > weekAgo
                    }).length}
                  </p>
                  <p className="text-sm text-blue-400 mt-1">
                    thoughts in the last 7 days
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
