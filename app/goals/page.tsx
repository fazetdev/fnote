'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    parentId: null as string | null
  })
  const [activeType, setActiveType] = useState<GoalType | 'all'>('all')
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null)

  const goalTypes: { id: GoalType; name: string; emoji: string; color: string; childType: GoalType | null }[] = [
    { id: 'yearly', name: 'Yearly', emoji: '📅', color: 'bg-purple-600/20 border-purple-500/30 text-purple-400', childType: 'quarterly' },
    { id: 'quarterly', name: 'Quarterly', emoji: '🎯', color: 'bg-blue-600/20 border-blue-500/30 text-blue-400', childType: 'monthly' },
    { id: 'monthly', name: 'Monthly', emoji: '📊', color: 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400', childType: 'weekly' },
    { id: 'weekly', name: 'Weekly', emoji: '🗓️', color: 'bg-amber-600/20 border-amber-500/30 text-amber-400', childType: null },
  ]

  // Load from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('fnote_goals')
    if (savedGoals) setGoals(JSON.parse(savedGoals))
  }, [])

  const saveGoalsToStorage = (updatedGoals: Goal[]) => {
    localStorage.setItem('fnote_goals', JSON.stringify(updatedGoals))
  }

  // Get parent goals for dropdown
  const getParentOptions = (goalType: GoalType) => {
    const typeIndex = goalTypes.findIndex(t => t.id === goalType)
    if (typeIndex === 0) return []

    const parentType = goalTypes[typeIndex - 1].id
    return goals.filter(goal => goal.type === parentType)
  }

  // Calculate progress from children
  const calculateProgressFromChildren = (parentId: string): number => {
    const children = goals.filter(goal => goal.parentId === parentId)
    if (children.length === 0) return 0

    const totalProgress = children.reduce((sum, child) => sum + child.progress, 0)
    return Math.round(totalProgress / children.length)
  }

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return

    // Determine period label
    let periodLabel = ''
    if (newGoal.type === 'yearly') {
      periodLabel = new Date(newGoal.targetDate).getFullYear().toString()
    } else if (newGoal.type === 'quarterly') {
      const month = new Date(newGoal.targetDate).getMonth()
      const quarter = Math.floor(month / 3) + 1
      periodLabel = `Q${quarter}`
    } else if (newGoal.type === 'monthly') {
      periodLabel = new Date(newGoal.targetDate).toLocaleString('default', { month: 'long' })
    } else {
      const date = new Date(newGoal.targetDate)
      const weekNumber = Math.ceil(date.getDate() / 7)
      periodLabel = `Week ${weekNumber}`
    }

    const getStatusFromProgress = (progress: number): GoalStatus => {
      if (progress === 0) return 'not-started'
      if (progress === 100) return 'completed'
      return 'in-progress'
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: getStatusFromProgress(newGoal.progress),
      parentId: newGoal.parentId,
      periodLabel,
      createdAt: new Date()
    }

    const updatedGoals = [goal, ...goals]
    setGoals(updatedGoals)
    saveGoalsToStorage(updatedGoals)

    // Update parent progress
    if (goal.parentId) {
      updateParentProgress(goal.parentId, updatedGoals)
    }

    // Reset form
    setNewGoal({ 
      title: '', 
      description: '', 
      type: 'yearly', 
      targetDate: new Date().toISOString().split('T')[0], 
      progress: 0,
      parentId: null
    })
    setSelectedParent(null)
    setExpandedGoalId(goal.parentId || goal.id)
  }

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
    setNewGoal({
      title: goal.title,
      description: goal.description,
      type: goal.type,
      targetDate: goal.targetDate,
      progress: goal.progress,
      parentId: goal.parentId
    })
    setSelectedParent(goal.parentId)
    setExpandedGoalId(goal.id)
  }

  const handleUpdateGoal = () => {
    if (!editingGoal || !newGoal.title.trim()) return

    const getStatusFromProgress = (progress: number): GoalStatus => {
      if (progress === 0) return 'not-started'
      if (progress === 100) return 'completed'
      return 'in-progress'
    }

    const updatedGoal: Goal = {
      ...editingGoal,
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: getStatusFromProgress(newGoal.progress),
      parentId: newGoal.parentId
    }

    const updatedGoals = goals.map(goal => 
      goal.id === editingGoal.id ? updatedGoal : goal
    )

    setGoals(updatedGoals)
    saveGoalsToStorage(updatedGoals)

    // Update parent progress
    if (updatedGoal.parentId) {
      updateParentProgress(updatedGoal.parentId, updatedGoals)
    }

    setEditingGoal(null)
    setNewGoal({ 
      title: '', 
      description: '', 
      type: 'yearly', 
      targetDate: new Date().toISOString().split('T')[0], 
      progress: 0,
      parentId: null
    })
    setSelectedParent(null)
  }

  const updateParentProgress = (parentId: string, goalsList: Goal[]) => {
    const parentProgress = calculateProgressFromChildren(parentId)
    
    const getStatusFromProgress = (progress: number): GoalStatus => {
      if (progress === 0) return 'not-started'
      if (progress === 100) return 'completed'
      return 'in-progress'
    }
    
    const updated = goalsList.map(g => 
      g.id === parentId 
        ? { ...g, progress: parentProgress, status: getStatusFromProgress(parentProgress) }
        : g
    )
    setGoals(updated)
    saveGoalsToStorage(updated)

    // Recursively update grandparent
    const parent = updated.find(g => g.id === parentId)
    if (parent?.parentId) {
      updateParentProgress(parent.parentId, updated)
    }
  }

  const handleDeleteGoal = (id: string) => {
    const goalToDelete = goals.find(g => g.id === id)

    // Delete goal and all its children
    const deleteRecursive = (goalId: string): string[] => {
      const toDelete = [goalId]
      const children = goals.filter(g => g.parentId === goalId)
      for (const child of children) {
        toDelete.push(...deleteRecursive(child.id))
      }
      return toDelete
    }

    const idsToDelete = deleteRecursive(id)
    const updatedGoals = goals.filter(goal => !idsToDelete.includes(goal.id))

    setGoals(updatedGoals)
    saveGoalsToStorage(updatedGoals)

    // Update parent progress if exists
    if (goalToDelete?.parentId) {
      updateParentProgress(goalToDelete.parentId, updatedGoals)
    }

    if (editingGoal?.id === id) {
      setEditingGoal(null)
      setNewGoal({ 
        title: '', 
        description: '', 
        type: 'yearly', 
        targetDate: new Date().toISOString().split('T')[0], 
        progress: 0,
        parentId: null
      })
    }

    if (expandedGoalId === id) setExpandedGoalId(null)
  }

  const updateProgress = (id: string, newProgress: number) => {
    const getStatusFromProgress = (progress: number): GoalStatus => {
      if (progress === 0) return 'not-started'
      if (progress === 100) return 'completed'
      return 'in-progress'
    }
    
    const updated = goals.map(goal =>
      goal.id === id
        ? { 
            ...goal, 
            progress: newProgress, 
            status: getStatusFromProgress(newProgress)
          }
        : goal
    )

    setGoals(updated)
    saveGoalsToStorage(updated)

    // Update parent and ancestors
    const goal = updated.find(g => g.id === id)
    if (goal?.parentId) {
      updateParentProgress(goal.parentId, updated)
    }
  }

  // Get child goals
  const getChildGoals = (parentId: string) => {
    return goals
      .filter(goal => goal.parentId === parentId)
      .sort((a, b) => a.periodLabel.localeCompare(b.periodLabel))
  }

  const filteredGoals = activeType === 'all' 
    ? goals.filter(goal => !goal.parentId)
    : goals.filter(g => g.type === activeType)

  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const toggleExpandGoal = (goalId: string) => {
    setExpandedGoalId(expandedGoalId === goalId ? null : goalId)
  }

  const GoalCard = ({ goal, depth = 0 }: { goal: Goal, depth?: number }) => {
    const typeInfo = goalTypes.find(t => t.id === goal.type)
    const childGoals = getChildGoals(goal.id)
    const isExpanded = expandedGoalId === goal.id
    const canAddChild = typeInfo?.childType !== null

    return (
      <div className={`mb-3 ${depth > 0 ? 'ml-6' : ''}`}>
        {/* Goal Card */}
        <div 
          className={`bg-[#143b28] border border-[#1f5a3d] rounded-lg p-4 cursor-pointer hover:border-[#d4af37] transition-colors`}
          onClick={() => toggleExpandGoal(goal.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeInfo?.color}`}>
                <span className="text-lg">{typeInfo?.emoji}</span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">{goal.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300 mt-1">
                  <span>{typeInfo?.name}</span>
                  <span>•</span>
                  <span>{goal.periodLabel}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="text-right">
                  <span className="text-lg font-bold text-[#d4af37]">{goal.progress}%</span>
                </div>
                <div className="w-32 h-2 bg-[#0f2e1f] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#d4af37]"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditGoal(goal)
                }}
                className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 text-sm transition"
              >
                Edit
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm(`Delete "${goal.title}" and all its sub-goals?`)) {
                    handleDeleteGoal(goal.id)
                  }
                }}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg border border-red-500/30 text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>

          {goal.description && (
            <p className="text-gray-300 text-sm mt-3">{goal.description}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(goal.status)}`}>
                {goal.status}
              </span>
              <span className="text-xs text-gray-400">
                Target: {new Date(goal.targetDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {childGoals.length} child{childGoals.length !== 1 ? 'ren' : ''}
              </span>
              <span className="text-gray-500">
                {isExpanded ? '▲' : '▼'}
              </span>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-300">Progress:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => {
                e.stopPropagation()
                updateProgress(goal.id, parseInt(e.target.value))
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1"
            />
            <span className="text-sm text-gray-300 w-10 text-right">
              {goal.progress}%
            </span>
          </div>
        </div>

        {/* Child Goals */}
        {isExpanded && childGoals.length > 0 && (
          <div className="mt-2">
            {childGoals.map(child => (
              <GoalCard key={child.id} goal={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">🎯 Goals</h1>
          <p className="text-gray-300 text-sm">
            Set and track your goals hierarchically
          </p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="px-4 py-2 bg-[#143b28] hover:bg-[#1f5a3d] text-white rounded-lg border border-[#1f5a3d] transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Add Goal Form */}
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingGoal ? '✏️ Edit Goal' : '➕ Add New Goal'}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal title"
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                value={newGoal.title}
                onChange={e => setNewGoal({...newGoal, title: e.target.value})}
              />

              <textarea
                placeholder="Description (optional)"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                value={newGoal.description}
                onChange={e => setNewGoal({...newGoal, description: e.target.value})}
              />

              <div>
                <label className="block text-sm text-gray-300 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {goalTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setNewGoal({...newGoal, type: type.id})}
                      className={`px-3 py-2 rounded-lg border text-sm transition ${
                        newGoal.type === type.id
                          ? 'bg-[#0f2e1f] border-[#d4af37] text-white'
                          : 'bg-[#0f2e1f] border-[#1f5a3d] text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {type.emoji} {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Target Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                  value={newGoal.targetDate}
                  onChange={e => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Initial Progress (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newGoal.progress}
                  onChange={e => setNewGoal({...newGoal, progress: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>0%</span>
                  <span>{newGoal.progress}%</span>
                  <span>100%</span>
                </div>
              </div>

              {newGoal.type !== 'yearly' && (
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Parent Goal (optional)</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                    value={selectedParent || ''}
                    onChange={e => {
                      const value = e.target.value
                      setSelectedParent(value || null)
                      setNewGoal({...newGoal, parentId: value || null})
                    }}
                  >
                    <option value="">No parent</option>
                    {getParentOptions(newGoal.type).map(parent => (
                      <option key={parent.id} value={parent.id}>
                        {parent.title} ({parent.periodLabel})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-3">
                {editingGoal ? (
                  <>
                    <button
                      className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                      onClick={handleUpdateGoal}
                    >
                      Update Goal
                    </button>
                    <button
                      className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
                      onClick={() => {
                        setEditingGoal(null)
                        setNewGoal({ 
                          title: '', 
                          description: '', 
                          type: 'yearly', 
                          targetDate: new Date().toISOString().split('T')[0], 
                          progress: 0,
                          parentId: null
                        })
                        setSelectedParent(null)
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                    onClick={handleAddGoal}
                  >
                    Add Goal
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">📊 Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37]">{goals.length}</div>
                <div className="text-sm text-gray-300">Total Goals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">
                  {goals.filter(g => g.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-300">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {goals.filter(g => g.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-300">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">
                  {goals.filter(g => g.status === 'not-started').length}
                </div>
                <div className="text-sm text-gray-300">Not Started</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Goals List */}
        <div className="lg:w-2/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#d4af37]">🎯 Your Goals</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveType('all')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    activeType === 'all'
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-[#0f2e1f] border border-[#1f5a3d] text-gray-300 hover:border-gray-500'
                  }`}
                >
                  All
                </button>
                {goalTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition ${
                      activeType === type.id
                        ? 'bg-[#d4af37] text-black'
                        : 'bg-[#0f2e1f] border border-[#1f5a3d] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {type.emoji} {type.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredGoals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 mb-2">No goals yet</p>
                <p className="text-sm text-gray-400">Add your first goal using the form on the left</p>
              </div>
            ) : (
              <div>
                {filteredGoals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#d4af37] mb-3">💡 Tips</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37]">•</span>
                <span>Break down yearly goals into quarterly/monthly/weekly sub-goals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37]">•</span>
                <span>Parent goals automatically update progress based on children</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37]">•</span>
                <span>Use progress sliders to track completion percentage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37]">•</span>
                <span>Delete a parent goal to remove all its children</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
