const API_BASE = '/api'

export interface Thought {
  id: string
  content: string
  type: string
  mood: string
  tags: string[]
  date: string
  createdAt: string
}

export interface DailyPlan {
  id?: string
  date: string
  focus: string
  tasks: any[]
}

export const api = {
  // Thoughts
  async getThoughts() {
    const res = await fetch(`${API_BASE}/thoughts`)
    if (!res.ok) throw new Error('Failed to fetch thoughts')
    return res.json()
  },
  async createThought(data: any) {
    const res = await fetch(`${API_BASE}/thoughts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteThought(id: string) {
    await fetch(`${API_BASE}/thoughts?id=${id}`, { method: 'DELETE' })
  },
  async updateThought(id: string, data: any) {
    const res = await fetch(`${API_BASE}/thoughts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data })
    })
    return res.json()
  },

  // Planner
  async getPlans() {
    const res = await fetch(`${API_BASE}/planner`)
    if (!res.ok) throw new Error('Failed to fetch plans')
    return res.json()
  },
  async updatePlan(plan: DailyPlan) {
    const res = await fetch(`${API_BASE}/planner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    })
    if (!res.ok) throw new Error('Failed to sync plan')
    return res.json()
  },

  // Goals
  async getGoals() {
    const res = await fetch(`${API_BASE}/goals`)
    if (!res.ok) throw new Error('Failed to fetch goals')
    return res.json()
  },
  async createGoal(data: any) {
    const res = await fetch(`${API_BASE}/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateGoal(id: string, data: any) {
    const res = await fetch(`${API_BASE}/goals`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data })
    })
    return res.json()
  },
  async deleteGoal(id: string) {
    await fetch(`${API_BASE}/goals?id=${id}`, { method: 'DELETE' })
  },

  // Notebook / Notes
  async getNotes() {
    const res = await fetch(`${API_BASE}/notes`)
    if (!res.ok) throw new Error('Failed to fetch notes')
    return res.json()
  },
  async createNote(data: any) {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateNote(id: string, data: any) {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data })
    })
    return res.json()
  },
  async deleteNote(id: string) {
    await fetch(`${API_BASE}/notes?id=${id}`, { method: 'DELETE' })
  },

  // Learn
  async getLearnedItems() {
    const res = await fetch(`${API_BASE}/learn`)
    if (!res.ok) throw new Error('Failed to fetch learned items')
    return res.json()
  },
  async createLearnedItem(data: any) {
    const res = await fetch(`${API_BASE}/learn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteLearnedItem(id: string) {
    await fetch(`${API_BASE}/learn?id=${id}`, { method: 'DELETE' })
  }
}
