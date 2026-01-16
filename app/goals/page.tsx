'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/utils/api'
import { syncService } from '@/utils/sync'

type GoalType = 'yearly' | 'quarterly' | 'monthly' | 'weekly'
type GoalStatus = 'not-started' | 'in-progress' | 'completed'

interface Goal {
  id: string
  title: string
  description: string
  type: GoalType
  targetDate: string
  progress: number
  status: GoalStatus
  parentId: string | null
  periodLabel: string
  createdAt: Date
  children?: Goal[]
}

export default function GoalsPage() {
  const router = useRouter()
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'yearly' as GoalType,
    targetDate: new Date().toISOString().split('T')[0],
    progress: 0,
    parentId: null as string | null,
    periodLabel: ''
  })
  const [activeType, setActiveType] = useState<GoalType | 'all'>('all')
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSyncs, setPendingSyncs] = useState(0)
  const [loading, setLoading] = useState(true)

  const goalTypes: { id: GoalType; name: string; emoji: string; color: string; childType: GoalType | null }[] = [
    { id: 'yearly', name: 'Yearly', emoji: '📅', color: 'bg-purple-600/20 border-purple-500/30 text-purple-400', childType: 'quarterly' },
    { id: 'quarterly', name: 'Quarterly', emoji: '🎯', color: 'bg-blue-600/20 border-blue-500/30 text-blue-400', childType: 'monthly' },
    { id: 'monthly', name: 'Monthly', emoji: '📊', color: 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400', childType: 'weekly' },
    { id: 'weekly', name: 'Weekly', emoji: '🗓️', color: 'bg-amber-600/20 border-amber-500/30 text-amber-400', childType: null },
  ]

  useEffect(() => {
    const checkOnlineStatus = () => setIsOnline(navigator.onLine)
    checkOnlineStatus()
    window.addEventListener('online', checkOnlineStatus)
    window.addEventListener('offline', checkOnlineStatus)
    loadGoals()
    checkPendingSyncs()
    return () => {
      window.removeEventListener('online', checkOnlineStatus)
      window.removeEventListener('offline', checkOnlineStatus)
    }
  }, [])

  const checkPendingSyncs = () => {
    setPendingSyncs(syncService.getQueueSize())
  }

  const loadGoals = async () => {
    setLoading(true)
    try {
      const data = await api.getGoals()
      setGoals(data)
      saveGoalsToBackup(data)
    } catch (error) {
      console.error('Failed to load goals:', error)
      const savedGoals = localStorage.getItem('fnote_goals')
      if (savedGoals) setGoals(JSON.parse(savedGoals))
    } finally {
      setLoading(false)
    }
  }

  const saveGoalsToBackup = (updatedGoals: Goal[]) => {
    localStorage.setItem('fnote_goals', JSON.stringify(updatedGoals))
  }

  const calculatePeriodLabel = (type: GoalType, date: string): string => {
    const d = new Date(date)
    switch (type) {
      case 'yearly': return d.getFullYear().toString()
      case 'quarterly':
        const quarter = Math.floor(d.getMonth() / 3) + 1
        return `Q${quarter} ${d.getFullYear()}`
      case 'monthly': return d.toLocaleString('default', { month: 'long' }) + ' ' + d.getFullYear()
      case 'weekly':
        const weekNumber = Math.ceil(d.getDate() / 7)
        return `Week ${weekNumber}, ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`
      default: return ''
    }
  }

  const getStatusFromProgress = (progress: number): GoalStatus => {
    return progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'
  }

  const handleAddGoal = async () => {
    if (!newGoal.title.trim() || !newGoal.targetDate) return

    const periodLabel = newGoal.periodLabel || calculatePeriodLabel(newGoal.type, newGoal.targetDate)
    const status = getStatusFromProgress(newGoal.progress)

    const goalData = {
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: status,
      parentId: newGoal.parentId,
      periodLabel
    }

    const localGoal: Goal = {
      id: Date.now().toString(),
      ...goalData,
      createdAt: new Date(),
    }

    // Optimistic Update
    const updatedGoals = [localGoal, ...goals]
    setGoals(updatedGoals)
    saveGoalsToBackup(updatedGoals)

    try {
      if (isOnline) {
        await api.createGoal(goalData)
        loadGoals()
      } else {
        throw new Error('Offline')
      }
    } catch (error) {
      console.warn('Goal API sync failed, queuing:', error)
      syncService.addToQueue({
        type: 'CREATE',
        entityType: 'goal',
        entityId: localGoal.id,
        data: goalData
      })
      checkPendingSyncs()
    }

    setNewGoal({
      title: '', description: '', type: 'yearly',
      targetDate: new Date().toISOString().split('T')[0],
      progress: 0, parentId: null, periodLabel: ''
    })
    setSelectedParent(null)
  }

  const handleDeleteGoal = async (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id)
    setGoals(updatedGoals)
    saveGoalsToBackup(updatedGoals)

    try {
      if (isOnline) {
        await api.deleteGoal(id)
      } else {
        throw new Error('Offline')
      }
    } catch (error) {
      syncService.addToQueue({
        type: 'DELETE',
        entityType: 'goal',
        entityId: id,
        data: { id }
      })
      checkPendingSyncs()
    }
    if (expandedGoalId === id) setExpandedGoalId(null)
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setNewGoal({
      title: goal.title,
      description: goal.description,
      type: goal.type,
      targetDate: goal.targetDate.split('T')[0],
      progress: goal.progress,
      parentId: goal.parentId,
      periodLabel: goal.periodLabel
    })
    if (goal.parentId) setSelectedParent(goal.parentId)
  }

  const handleUpdateGoal = async () => {
    if (!editingGoal || !newGoal.title.trim() || !newGoal.targetDate) return

    const periodLabel = newGoal.periodLabel || calculatePeriodLabel(newGoal.type, newGoal.targetDate)
    const status = getStatusFromProgress(newGoal.progress)

    const updateData = {
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: status,
      parentId: newGoal.parentId,
      periodLabel
    }

    const updatedGoals = goals.map(goal =>
      goal.id === editingGoal.id ? { ...goal, ...updateData } : goal
    )
    setGoals(updatedGoals)
    saveGoalsToBackup(updatedGoals)

    try {
      if (isOnline) {
        await api.updateGoal(editingGoal.id, updateData)
      } else {
        throw new Error('Offline')
      }
    } catch (error) {
      syncService.addToQueue({
        type: 'UPDATE',
        entityType: 'goal',
        entityId: editingGoal.id,
        data: updateData
      })
      checkPendingSyncs()
    }

    setEditingGoal(null)
    setNewGoal({
      title: '', description: '', type: 'yearly',
      targetDate: new Date().toISOString().split('T')[0],
      progress: 0, parentId: null, periodLabel: ''
    })
    setSelectedParent(null)
  }

  const toggleExpandGoal = (id: string) => {
    setExpandedGoalId(expandedGoalId === id ? null : id)
  }

  const handleSyncNow = async () => {
    try {
      await syncService.syncIfOnline()
      checkPendingSyncs()
      loadGoals()
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  const getTopLevelGoals = () => goals.filter(goal => !goal.parentId)
  const getChildGoals = (parentId: string) => goals.filter(goal => goal.parentId === parentId)

  const filteredGoals = activeType === 'all' 
    ? getTopLevelGoals() 
    : getTopLevelGoals().filter(goal => goal.type === activeType)

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-600'
    if (progress < 30) return 'bg-red-600'
    if (progress < 70) return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case 'not-started': return 'bg-gray-500'
      case 'in-progress': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f2e1f] text-white px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">🎯 Goals</h1>
          <p className="text-gray-300 text-sm">Set and track your goals</p>
          <div className="flex items-center gap-4 mt-2">
            <div className={`px-2 py-1 rounded text-xs ${isOnline ? 'bg-green-600' : 'bg-red-600'}`}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </div>
            {pendingSyncs > 0 && (
              <button onClick={handleSyncNow} className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs flex items-center gap-1">
                🔄 Sync Pending ({pendingSyncs})
              </button>
            )}
          </div>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-gray-400 hover:text-white text-sm">← Back to Dashboard</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">{editingGoal ? '✏️ Edit Goal' : '➕ Add New Goal'}</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Goal Title" value={newGoal.title} onChange={e => setNewGoal({ ...newGoal, title: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]" />
              <textarea placeholder="Description (optional)" value={newGoal.description} onChange={e => setNewGoal({ ...newGoal, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]" />
              <select value={newGoal.type} onChange={e => {
                  const newType = e.target.value as GoalType
                  setNewGoal({ ...newGoal, type: newType, periodLabel: calculatePeriodLabel(newType, newGoal.targetDate)})
                }} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]">
                {goalTypes.map(type => (<option key={type.id} value={type.id} className="bg-[#143b28]">{type.emoji} {type.name}</option>))}
              </select>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Target Date</label>
                <input type="date" value={newGoal.targetDate} onChange={e => {
                    setNewGoal({ ...newGoal, targetDate: e.target.value, periodLabel: calculatePeriodLabel(newGoal.type, e.target.value)})
                  }} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Progress: {newGoal.progress}%</label>
                <input type="range" min="0" max="100" value={newGoal.progress} onChange={e => setNewGoal({ ...newGoal, progress: parseInt(e.target.value) })} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Parent Goal (optional)</label>
                <select value={selectedParent || ''} onChange={e => {
                    const parentId = e.target.value || null
                    setSelectedParent(parentId)
                    setNewGoal({ ...newGoal, parentId })
                  }} className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]">
                  <option value="">No parent</option>
                  {goals.filter(goal => goal.type === goalTypes.find(t => t.id === newGoal.type)?.childType).map(goal => (
                      <option key={goal.id} value={goal.id} className="bg-[#143b28]">{goal.title}</option>
                  ))}
                </select>
              </div>
              {editingGoal ? (
                <div className="flex gap-2">
                  <button onClick={handleUpdateGoal} className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition">Update Goal</button>
                  <button onClick={() => { setEditingGoal(null); setNewGoal({ title: '', description: '', type: 'yearly', targetDate: new Date().toISOString().split('T')[0], progress: 0, parentId: null, periodLabel: '' }); setSelectedParent(null); }} className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancel</button>
                </div>
              ) : (
                <button onClick={handleAddGoal} disabled={!newGoal.title.trim() || !newGoal.targetDate} className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition disabled:opacity-50">Save Goal</button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="mb-6 flex flex-wrap gap-2">
            <button onClick={() => setActiveType('all')} className={`px-4 py-2 rounded-lg ${activeType === 'all' ? 'bg-[#d4af37] text-black' : 'bg-[#143b28] text-white border border-[#1f5a3d]'}`}>All Goals</button>
            {goalTypes.map(type => (
              <button key={type.id} onClick={() => setActiveType(type.id)} className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeType === type.id ? 'bg-[#d4af37] text-black' : 'bg-[#143b28] text-white border border-[#1f5a3d]'}`}>
                <span>{type.emoji}</span><span>{type.name}</span>
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4af37]"></div></div>
            ) : filteredGoals.length === 0 ? (
              <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center"><p className="text-gray-300">No goals yet</p></div>
            ) : (
              filteredGoals.map(goal => {
                const childGoals = getChildGoals(goal.id)
                const isExpanded = expandedGoalId === goal.id
                const goalType = goalTypes.find(t => t.id === goal.type)
                return (
                  <div key={goal.id} className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-3 py-1 rounded-lg ${goalType?.color} border flex items-center gap-2`}>
                            <span>{goalType?.emoji}</span><span className="text-sm font-medium">{goalType?.name}</span>
                          </div>
                          <span className="text-sm text-gray-300">{goal.periodLabel}</span>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(goal.status)}`}>{goal.status.replace('-', ' ')}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{goal.title}</h3>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex-1">
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full ${getProgressColor(goal.progress)} transition-all duration-300`} style={{ width: `${goal.progress}%` }}></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-300">{goal.progress}%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {childGoals.length > 0 && (
                          <button onClick={() => toggleExpandGoal(goal.id)} className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm">{isExpanded ? 'Hide' : 'Show'} Children ({childGoals.length})</button>
                        )}
                        <div className="flex gap-2">
                          <button onClick={() => handleEditGoal(goal)} className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm flex-1">Edit</button>
                          <button onClick={() => handleDeleteGoal(goal.id)} className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm flex-1">Delete</button>
                        </div>
                      </div>
                    </div>
                    {isExpanded && childGoals.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#1f5a3d] space-y-3">
                        {childGoals.map(child => (
                          <div key={child.id} className="bg-[#0f2e1f] rounded-lg p-3 flex items-center justify-between">
                            <div>
                              <h5 className="text-white font-medium">{child.title}</h5>
                              <div className="text-xs text-gray-300">Progress: {child.progress}%</div>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditGoal(child)} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Edit</button>
                              <button onClick={() => handleDeleteGoal(child.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
                            </div>
                          </div>
                        ))}
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
