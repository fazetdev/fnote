'use client'
import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import { syncService } from '@/utils/sync'

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
  const [plans, setPlans] = useState<DailyPlan[]>([])
  const [todayPlan, setTodayPlan] = useState<DailyPlan | null>(null)
  const [newTask, setNewTask] = useState({
    text: '',
    time: '09:00',
    priority: 'medium' as Task['priority']
  })
  const [mounted, setMounted] = useState(false)
  const [todayDate, setTodayDate] = useState<string>('')
  const [formattedDate, setFormattedDate] = useState<string>('')
  const [isOnline, setIsOnline] = useState(true)
  const [pendingSyncs, setPendingSyncs] = useState(0)

  useEffect(() => {
    setMounted(true)
    const checkStatus = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', checkStatus)
    window.addEventListener('offline', checkStatus)

    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    setTodayDate(todayStr)
    setFormattedDate(now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }))

    loadPlans(todayStr)

    const interval = setInterval(() => setPendingSyncs(syncService.getQueueSize()), 3000)
    return () => {
      window.removeEventListener('online', checkStatus)
      window.removeEventListener('offline', checkStatus)
      clearInterval(interval)
    }
  }, [])

  const loadPlans = async (todayStr: string) => {
    try {
      const data = await api.getPlans()
      setPlans(data)
      localStorage.setItem('fnote_plans', JSON.stringify(data))
      const found = data.find((p: DailyPlan) => p.date === todayStr)
      setTodayPlan(found || { date: todayStr, focus: '', tasks: [] })
    } catch (error) {
      const saved = localStorage.getItem('fnote_plans')
      if (saved) {
        const parsed = JSON.parse(saved)
        setPlans(parsed)
        const found = parsed.find((p: DailyPlan) => p.date === todayStr)
        setTodayPlan(found || { date: todayStr, focus: '', tasks: [] })
      } else {
        setTodayPlan({ date: todayStr, focus: '', tasks: [] })
      }
    }
  }

  useEffect(() => {
    if (!mounted || !todayPlan) return
    const otherPlans = plans.filter(p => p.date !== todayPlan.date)
    const updatedPlans = [...otherPlans, todayPlan]
    localStorage.setItem('fnote_plans', JSON.stringify(updatedPlans))
    
    const syncData = async () => {
      try {
        await api.updatePlan(todayPlan)
      } catch (error) {
        syncService.addToQueue({
          type: 'UPDATE',
          entityType: 'plan', // Fixed: changed from 'planner' to 'plan'
          entityId: todayPlan.date,
          data: todayPlan
        })
      }
    }
    syncData()
  }, [todayPlan])

  const handleAddTask = () => {
    if (!newTask.text.trim() || !todayPlan) return
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
    if (!todayPlan) return
    setTodayPlan({
      ...todayPlan,
      tasks: todayPlan.tasks.map(t => t.id===id ? {...t, completed: !t.completed} : t)
    })
  }

  const deleteTask = (id: string) => {
    if (!todayPlan) return
    setTodayPlan({
      ...todayPlan,
      tasks: todayPlan.tasks.filter(t => t.id !== id)
    })
  }

  const handleSyncNow = async () => {
    await syncService.syncIfOnline()
    if (todayDate) loadPlans(todayDate)
  }

  if (!mounted || !todayPlan) {
    return (
      <div className="min-h-screen bg-[#0f2e1f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const completedTasks = todayPlan.tasks.filter(t=>t.completed).length
  const totalTasks = todayPlan.tasks.length
  const progress = totalTasks>0 ? Math.round((completedTasks/totalTasks)*100) : 0

  return (
    <div className="min-h-screen bg-[#0f2e1f] text-white px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#d4af37]">📅 Daily Planner</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-300 text-sm">{formattedDate}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${isOnline ? 'bg-green-600/20 text-green-400 border border-green-500/30' : 'bg-red-600/20 text-red-400 border border-red-500/30'}`}>
              {isOnline ? '● Online' : '○ Offline'}
            </span>
            {pendingSyncs > 0 && (
              <button onClick={handleSyncNow} className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-bold hover:bg-yellow-500 transition animate-pulse">
                🔄 SYNC {pendingSyncs}
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-4 py-2 bg-[#143b28] hover:bg-[#1f5a3d] text-white rounded-lg border border-[#1f5a3d] transition"
        >
          ← Back to Dashboard
        </button>
      </div>

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
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">🎯 Today's Focus</h2>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37]"
              placeholder="What is your main goal?"
              value={todayPlan.focus}
              onChange={e => setTodayPlan({...todayPlan, focus: e.target.value})}
            />
          </div>

          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">➕ Add Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white focus:outline-none"
                value={newTask.text}
                onChange={e => setNewTask({...newTask, text: e.target.value})}
                placeholder="Task description"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white"
                  value={newTask.time}
                  onChange={e => setNewTask({...newTask, time: e.target.value})}
                />
                <select
                  className="w-full px-4 py-3 rounded-lg bg-[#0f2e1f] border border-[#1f5a3d] text-white"
                  value={newTask.priority}
                  onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button className="w-full bg-[#d4af37] text-black py-3 rounded-lg font-medium" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="bg-[#143b28] border border-[#1f5a3d] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[#d4af37] mb-6">📋 Today's Tasks</h2>
            <div className="space-y-3">
              {todayPlan.tasks
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(task => (
                  <div key={task.id} className="flex items-start p-4 rounded-lg border bg-[#0f2e1f] border-[#1f5a3d]">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border mr-4 mt-1 flex items-center justify-center ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}
                    >
                      {task.completed && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                    </button>
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{task.text}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>⏰ {task.time}</span>
                        <span className="uppercase">{task.priority}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-red-400 ml-2">🗑️</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
