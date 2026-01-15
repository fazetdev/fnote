'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { syncService } from '@/utils/sync'

type Note = {
  id: string
  title: string
  content: string
  category: 'ideas' | 'growth' | 'business' | 'work' | 'personal'
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export default function NotebookPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'ideas' as Note['category'],
    tagInput: ''
  })
  const [activeCategory, setActiveCategory] = useState<Note['category'] | 'all'>('all')
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [viewingNoteId, setViewingNoteId] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSyncs, setPendingSyncs] = useState(0)

  const categories: { id: Note['category']; name: string; emoji: string }[] = [
    { id: 'ideas', name: 'Ideas', emoji: '💡' },
    { id: 'growth', name: 'Growth', emoji: '🌱' },
    { id: 'business', name: 'Business', emoji: '💼' },
    { id: 'work', name: 'Work', emoji: '🛠️' },
    { id: 'personal', name: 'Personal', emoji: '👤' },
  ]

  // Check online status and load notes
  useEffect(() => {
    const checkOnlineStatus = () => setIsOnline(navigator.onLine)
    checkOnlineStatus()
    
    window.addEventListener('online', checkOnlineStatus)
    window.addEventListener('offline', checkOnlineStatus)

    loadNotes()
    checkPendingSyncs()

    return () => {
      window.removeEventListener('online', checkOnlineStatus)
      window.removeEventListener('offline', checkOnlineStatus)
    }
  }, [])

  // Check for pending sync operations
  const checkPendingSyncs = () => {
    setPendingSyncs(syncService.getQueueSize())
  }

  // Load notes from API
  const loadNotes = async () => {
    try {
      const data = await api.getNotes()
      setNotes(data)
    } catch (error) {
      console.error('Failed to load notes:', error)
      // Fallback to localStorage if API fails
      const savedNotes = localStorage.getItem('fnote_notes')
      if (savedNotes) setNotes(JSON.parse(savedNotes))
    }
  }

  // Save notes to localStorage as backup
  const saveNotesToBackup = (updatedNotes: Note[]) => {
    localStorage.setItem('fnote_notes', JSON.stringify(updatedNotes))
  }

  const handleAddNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const noteData = {
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      tags: newNote.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag),
    }

    try {
      if (isOnline) {
        const createdNote = await api.createNote(noteData)
        const updatedNotes = [createdNote, ...notes]
        setNotes(updatedNotes)
        saveNotesToBackup(updatedNotes)
      } else {
        // Offline: add to sync queue and localStorage
        const localNote: Note = {
          id: Date.now().toString(),
          ...noteData,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        const updatedNotes = [localNote, ...notes]
        setNotes(updatedNotes)
        saveNotesToBackup(updatedNotes)
        
        // Add to sync queue
        syncService.addToQueue({
          type: 'CREATE',
          entityType: 'note',
          entityId: localNote.id,
          data: noteData
        })
        checkPendingSyncs()
      }

      // Reset form
      setNewNote({
        title: '',
        content: '',
        category: 'ideas',
        tagInput: ''
      })
    } catch (error) {
      console.error('Failed to save note:', error)
      alert('Failed to save note. Please try again.')
    }
  }

  const handleDeleteNote = async (id: string) => {
    try {
      if (isOnline) {
        await api.deleteNote(id)
        const updatedNotes = notes.filter(note => note.id !== id)
        setNotes(updatedNotes)
        saveNotesToBackup(updatedNotes)
      } else {
        // Offline: mark for deletion in sync queue
        const noteToDelete = notes.find(note => note.id === id)
        if (noteToDelete) {
          const updatedNotes = notes.filter(note => note.id !== id)
          setNotes(updatedNotes)
          saveNotesToBackup(updatedNotes)
          
          syncService.addToQueue({
            type: 'DELETE',
            entityType: 'note',
            entityId: id,
            data: noteToDelete
          })
          checkPendingSyncs()
        }
      }
      
      if (viewingNoteId === id) setViewingNoteId(null)
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setNewNote({
      title: note.title,
      content: note.content,
      category: note.category,
      tagInput: note.tags.join(', ')
    })
    setViewingNoteId(null)
  }

  const handleUpdateNote = async () => {
    if (!editingNote || !newNote.title.trim() || !newNote.content.trim()) return

    const updateData = {
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      tags: newNote.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag),
    }

    try {
      if (isOnline) {
        const updatedNote = await api.updateNote(editingNote.id, updateData)
        const updatedNotes = notes.map(note =>
          note.id === editingNote.id ? updatedNote : note
        )
        setNotes(updatedNotes)
        saveNotesToBackup(updatedNotes)
      } else {
        // Offline: update locally and add to sync queue
        const localNote: Note = {
          ...editingNote,
          ...updateData,
          updatedAt: new Date()
        }
        
        const updatedNotes = notes.map(note =>
          note.id === editingNote.id ? localNote : note
        )
        setNotes(updatedNotes)
        saveNotesToBackup(updatedNotes)
        
        syncService.addToQueue({
          type: 'UPDATE',
          entityType: 'note',
          entityId: editingNote.id,
          data: updateData
        })
        checkPendingSyncs()
      }

      setEditingNote(null)
      setNewNote({
        title: '',
        content: '',
        category: 'ideas',
        tagInput: ''
      })
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  const toggleViewNote = (id: string) => {
    setViewingNoteId(viewingNoteId === id ? null : id)
  }

  const handleSyncNow = async () => {
    try {
      await syncService.syncIfOnline()
      checkPendingSyncs()
      loadNotes() // Reload notes after sync
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  const filteredNotes = activeCategory === 'all' ? notes : notes.filter(note => note.category === activeCategory)

  return (
    <div className="min-h-screen flex flex-col bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">📓 Notebook</h1>
          <p className="text-gray-300 text-sm">Save and organize notes</p>
          <div className="flex items-center gap-4 mt-2">
            <div className={`px-2 py-1 rounded text-xs ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </div>
            {pendingSyncs > 0 && (
              <button
                onClick={handleSyncNow}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs flex items-center gap-1"
              >
                🔄 Sync Pending ({pendingSyncs})
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        {/* Left: Note Form */}
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingNote ? '✏️ Edit Note' : '➕ Add New Note'}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              <select
                value={newNote.category}
                onChange={e => setNewNote({ ...newNote, category: e.target.value as Note['category'] })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-[#143b28]">
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newNote.tagInput}
                onChange={e => setNewNote({ ...newNote, tagInput: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              {editingNote ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateNote}
                    className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                  >
                    Update Note
                  </button>
                  <button
                    onClick={() => {
                      setEditingNote(null)
                      setNewNote({ title: '', content: '', category: 'ideas', tagInput: '' })
                    }}
                    className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.title.trim() || !newNote.content.trim()}
                  className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isOnline ? 'Save Note' : 'Save Locally (Offline)'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Notes List */}
        <div className="lg:w-2/3">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg ${activeCategory === 'all' ? 'bg-[#d4af37] text-black' : 'bg-[#143b28] text-white border border-[#1f5a3d]'}`}
              >
                All Notes
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeCategory === cat.id ? 'bg-[#d4af37] text-black' : 'bg-[#143b28] text-white border border-[#1f5a3d]'}`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {filteredNotes.length === 0 ? (
              <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center">
                <p className="text-gray-300">No notes yet</p>
                <p className="text-gray-400 text-sm mt-1">Create your first note</p>
              </div>
            ) : (
              filteredNotes.map(note => {
                const categoryInfo = categories.find(c => c.id === note.category)
                const isViewing = viewingNoteId === note.id

                return (
                  <div
                    key={note.id}
                    className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4 hover:border-[#d4af37] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryInfo?.id === 'ideas' ? 'bg-blue-500/20' : categoryInfo?.id === 'growth' ? 'bg-green-500/20' : categoryInfo?.id === 'business' ? 'bg-purple-500/20' : categoryInfo?.id === 'work' ? 'bg-yellow-500/20' : 'bg-pink-500/20'}`}>
                          <span className="text-lg">{categoryInfo?.emoji}</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-300">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                            {note.tags.length > 0 && (
                              <span className="text-sm text-gray-400">
                                {note.tags.length} tag{note.tags.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleViewNote(note.id)}
                          className={`px-3 py-1 rounded-lg text-sm transition ${isViewing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
                        >
                          {isViewing ? 'Close' : 'View'}
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditNote(note)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition flex-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition flex-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Note Content Display (toggled) */}
                    {isViewing && (
                      <div className="mt-4 pt-4 border-t border-[#1f5a3d]">
                        <div className="bg-[#0f2e1f] rounded-lg p-4">
                          <h4 className="text-sm font-medium text-[#d4af37] mb-2">Content:</h4>
                          <p className="text-gray-300 whitespace-pre-line">{note.content}</p>

                          {note.tags.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-[#d4af37] mb-2">Tags:</h4>
                              <div className="flex flex-wrap gap-2">
                                {note.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 text-sm rounded bg-[#1f5a3d] text-gray-200">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
