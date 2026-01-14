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
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: newGoal.progress === 0 ? 'not-started' : newGoal.progress === 100 ? 'completed' : 'in-progress',
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
    
    const updatedGoal: Goal = {
      ...editingGoal,
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: newGoal.targetDate,
      progress: newGoal.progress,
      status: newGoal.progress === 0 ? 'not-started' : newGoal.progress === 100 ? 'completed' : 'in-progress',
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
    const updated = goalsList.map(g => 
      g.id === parentId 
        ? { ...g, progress: parentProgress, status: parentProgress === 0 ? 'not-started' : parentProgress === 100 ? 'completed' : 'in-progress' }
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
    const updated = goals.map(goal =>
      goal.id === id
        ? { 
            ...goal, 
            progress: newProgress, 
            status: newProgress === 0 ? 'not-started' : newProgress === 100 ? 'completed' : 'in-progress' 
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

            {/* Progress Display */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[#d4af37] font-medium text-lg">{goal.progress}%</div>
                <div className="text-xs text-gray-400">{goal.status.replace('-', ' ')}</div>
              </div>
              <div className="text-gray-400">
                {isExpanded ? '▲' : '▼'}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-[#0f2e1f] h-2 rounded-full overflow-hidden">
              <div
                className={`h-2 ${goal.progress < 30 ? 'bg-red-500' : goal.progress < 70 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="bg-[#0f2e1f] border border-[#1f5a3d] rounded-lg p-4 mt-2">
            {/* Description */}
            {goal.description && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#d4af37] mb-2">Description</h4>
                <p className="text-gray-300">{goal.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Target Date</div>
                <div className="text-white">{new Date(goal.targetDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-gray-400">Created</div>
                <div className="text-white">{new Date(goal.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Adjust Progress</span>
                <span className="text-[#d4af37] font-medium">{goal.progress}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={goal.progress}
                onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#1f5a3d]">
              {canAddChild && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    const childType = typeInfo!.childType!
                    setNewGoal({
                      title: '',
                      description: '',
                      type: childType,
                      targetDate: goal.targetDate,
                      progress: 0,
                      parentId: goal.id
                    })
                    setSelectedParent(goal.id)
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition"
                >
                  Add {goalTypes.find(t => t.id === typeInfo!.childType)?.name}
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleEditGoal(goal)
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteGoal(goal.id)
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
              >
                Delete
              </button>
            </div>

            {/* Child Goals */}
            {childGoals.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#1f5a3d]">
                <h4 className="text-sm font-medium text-[#d4af37] mb-3">
                  {typeInfo?.childType?.toUpperCase()} GOALS
                </h4>
                <div className="space-y-3">
                  {childGoals.map(child => (
                    <GoalCard key={child.id} goal={child} depth={depth + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">🎯 Goals</h1>
          <p className="text-gray-300 text-sm">Track your progress hierarchically</p>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Goal Form */}
        <div className="lg:w-1/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">
              {editingGoal ? '✏️ Edit Goal' : '➕ Add Goal'}
            </h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              {/* Goal Type */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {goalTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setNewGoal({...newGoal, type: type.id, parentId: null})
                        setSelectedParent(null)
                      }}
                      className={`p-3 rounded-lg border flex flex-col items-center ${newGoal.type === type.id ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#1f5a3d] bg-[#0f2e1f] hover:bg-[#1f5a3d]'}`}
                    >
                      <span className="text-xl">{type.emoji}</span>
                      <span className="text-xs mt-1 text-gray-300">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parent Selection */}
              {newGoal.type !== 'yearly' && getParentOptions(newGoal.type).length > 0 && (
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Parent Goal (Optional)
                  </label>
                  <select
                    value={selectedParent || ''}
                    onChange={(e) => {
                      const parentId = e.target.value || null
                      setSelectedParent(parentId)
                      setNewGoal({...newGoal, parentId})
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">None (standalone)</option>
                    {getParentOptions(newGoal.type).map(parent => (
                      <option key={parent.id} value={parent.id}>
                        {parent.title} ({parent.type})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
              />

              <textarea
                placeholder="Description (Optional)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-[#d4af37] font-medium">{newGoal.progress}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={newGoal.progress}
                  onChange={(e) => setNewGoal({ ...newGoal, progress: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              {editingGoal ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateGoal}
                    className="flex-1 bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                  >
                    Update
                  </button>
                  <button
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
                    className="px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddGoal}
                  className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                >
                  Save Goal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Goals List */}
        <div className="lg:w-2/3">
          {/* Type Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveType('all')}
                className={`px-4 py-2 rounded-lg ${activeType === 'all' ? 'bg-[#d4af37] text-black' : 'bg-[#143b28] text-white border border-[#1f5a3d]'}`}
              >
                All Goals
              </button>
              {goalTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeType === type.id ? type.color.replace('bg-', 'bg-').replace('text-', 'text-') : 'bg-[#143b28] text-gray-300 border border-[#1f5a3d]'}`}
                >
                  <span>{type.emoji}</span>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goals List */}
          <div>
            {filteredGoals.length === 0 ? (
              <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-8 text-center">
                <p className="text-gray-300">No goals yet</p>
                <p className="text-gray-400 text-sm mt-1">Create your first goal</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredGoals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
