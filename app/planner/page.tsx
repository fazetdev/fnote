'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  text: string
  completed: boolean
  time: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

type DailyPlan = {
  date: string
  focus: string
  tasks: Task[]
}

export default function PlannerPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<DailyPlan[]>([])
  const [todayPlan, setTodayPlan] = useState<DailyPlan>({
    date: new Date().toISOString().split('T')[0],
    focus: '',
    tasks: []
  })
  const [newTask, setNewTask] = useState({
    text: '',
    time: '09:00',
    priority: 'medium' as Task['priority']
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedPlans = localStorage.getItem('fnote_plans')
    if (savedPlans) {
      const parsedPlans = JSON.parse(savedPlans)
      setPlans(parsedPlans)
      const today = new Date().toISOString().split('T')[0]
      const found = parsedPlans.find((p: DailyPlan) => p.date === today)
      if (found) setTodayPlan(found)
    }
  }, [])

  // Save today plan
  useEffect(() => {
    if (!mounted) return
    const otherPlans = plans.filter(p => p.date !== todayPlan.date)
    const updatedPlans = [...otherPlans, todayPlan]
    setPlans(updatedPlans)
    localStorage.setItem('fnote_plans', JSON.stringify(updatedPlans))
  }, [todayPlan, plans, mounted])

  const handleAddTask = () => {
    if (!newTask.text.trim()) return
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.text,
      completed: false,
      time: newTask.time,
      priority: newTask.priority,
      createdAt: new Date()
    }
    setTodayPlan({...todayPlan, tasks: [...todayPlan.tasks, task]})
    setNewTask({text: '', time: '09:00', priority: 'medium'})
  }

  const toggleTask = (id: string) => {
    setTodayPlan({
      ...todayPlan,
      tasks: todayPlan.tasks.map(t => t.id===id ? {...t, completed: !t.completed} : t)
    })
  }

  const deleteTask = (id: string) => {
    setTodayPlan({
      ...todayPlan,
      tasks: todayPlan.tasks.filter(t => t.id !== id)
    })
  }

  const getPriorityColor = (p: Task['priority']) => {
    switch(p){
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    }
  }

  const completedTasks = todayPlan.tasks.filter(t=>t.completed).length
  const totalTasks = todayPlan.tasks.length
  const progress = totalTasks>0 ? Math.round((completedTasks/totalTasks)*100) : 0

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f2e1f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">📅 Daily Planner</h1>
          <p className="text-gray-300 text-sm">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric'
            })}
          </p>
        </div>
        <button
          onClick={handleBackToDashboard}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Progress Card */}
      <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-300">Today's Progress</span>
          <span className="text-[#d4af37] font-bold text-lg">{progress}%</span>
        </div>
        <div className="w-full bg-[#0f2e1f] h-2.5 rounded-full overflow-hidden">
          <div 
            className={`h-2.5 ${progress<30?'bg-red-500':progress<70?'bg-yellow-500':'bg-emerald-500'}`} 
            style={{width:`${progress}%`}} 
          />
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Focus & Add Task */}
        <div className="lg:w-1/3 space-y-6">
          {/* Today's Focus */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">🎯 Today's Focus</h2>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              placeholder="What is your main goal for today?"
              value={todayPlan.focus}
              onChange={e => setTodayPlan({...todayPlan, focus: e.target.value})}
            />
            <p className="text-sm text-gray-400 mt-2">
              Write your most important goal for the day
            </p>
          </div>

          {/* Add Task Form */}
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">➕ Add Task</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task description"
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
                value={newTask.text}
                onChange={e => setNewTask({...newTask, text: e.target.value})}
                onKeyDown={e => e.key==='Enter' && handleAddTask()}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Time</label>
                  <input 
                    type="time" 
                    className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                    value={newTask.time}
                    onChange={e => setNewTask({...newTask, time: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Priority</label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none focus:border-[#d4af37]"
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <button 
                className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium hover:bg-[#c9a633] transition"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Right: Task List */}
        <div className="lg:w-2/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#d4af37]">📋 Today's Tasks</h2>
              <span className="text-sm text-gray-400">
                {todayPlan.tasks.length} task{todayPlan.tasks.length !== 1 ? 's' : ''}
              </span>
            </div>

            {todayPlan.tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 mb-2">No tasks for today</p>
                <p className="text-sm text-gray-400">Add your first task using the form on the left</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayPlan.tasks
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(task => (
                    <div 
                      key={task.id} 
                      className={`flex items-start p-4 rounded-lg border ${
                        task.completed 
                          ? 'bg-[#0f2e1f] border-[#1f5a3d]' 
                          : 'bg-[#0f2e1f] border-[#1f5a3d] hover:border-[#d4af37]'
                      } transition-colors`}
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-4 mt-1 ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-gray-500 hover:border-gray-400'
                        }`}
                      >
                        {task.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                              {task.text}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-sm text-gray-400">
                                ⏰ {task.time}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-gray-500 hover:text-red-400 p-1 ml-2"
                            title="Delete task"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Tips */}
            <div className="mt-8 pt-6 border-t border-[#1f5a3d]">
              <h3 className="text-sm font-medium text-[#d4af37] mb-2">💡 Tips</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Click the circle to mark tasks complete</li>
                <li>• Set priorities to focus on important tasks</li>
                <li>• Plan your day around your main focus</li>
                <li>• Delete tasks you won't complete</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
