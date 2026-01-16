// API service for frontend-backend communication

const API_BASE = '/api';

// Interfaces
export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'ideas' | 'growth' | 'business' | 'work' | 'personal';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'yearly' | 'quarterly' | 'monthly' | 'weekly';
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  parentId: string | null;
  periodLabel: string;
  createdAt: Date;
  children?: Goal[];
}

export interface DailyPlan {
  id: string;
  date: string;
  focus: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  time: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface Thought {
  id: string;
  content: string;
  type: 'insight' | 'pattern' | 'idea' | 'reflection' | 'question' | 'observation';
  mood: string;
  tags: string[];
  date: string;
  createdAt: Date;
}

export interface LearnedItem {
  id: string;
  title: string;
  content: string;
  category: 'technology' | 'business' | 'personal' | 'skills' | 'ideas' | 'general';
  tags: string[];
  date: string;
  createdAt: Date;
}

class ApiService {
  private isOnline(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  private getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('fnote_user');
    return userData ? JSON.parse(userData) : null;
  }

  private async fetchWithOfflineSupport(endpoint: string, options: RequestInit = {}) {
    if (!this.isOnline()) {
      throw new Error('Offline: Please check your internet connection');
    }

    const user = this.getCurrentUser();
    const headers = {
      'Content-Type': 'application/json',
      ...(user && { 'x-user-data': JSON.stringify(user) }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth API
  async login(email: string, password: string): Promise<{ user: any; message: string }> {
    return this.fetchWithOfflineSupport('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Notes API
  async getNotes(): Promise<Note[]> {
    return this.fetchWithOfflineSupport('/notes');
  }

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    return this.fetchWithOfflineSupport('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  }

  async updateNote(id: string, note: Partial<Note>): Promise<Note> {
    return this.fetchWithOfflineSupport(`/notes?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
    });
  }

  async deleteNote(id: string): Promise<void> {
    await this.fetchWithOfflineSupport(`/notes?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Goals API
  async getGoals(type?: string, parentId?: string | null): Promise<Goal[]> {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (parentId !== undefined) params.append('parentId', parentId || 'null');
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchWithOfflineSupport(`/goals${query}`);
  }

  async createGoal(goal: Omit<Goal, 'id' | 'createdAt' | 'children'>): Promise<Goal> {
    return this.fetchWithOfflineSupport('/goals', {
      method: 'POST',
      body: JSON.stringify(goal),
    });
  }

  async updateGoal(id: string, goal: Partial<Goal>): Promise<Goal> {
    return this.fetchWithOfflineSupport(`/goals?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(goal),
    });
  }

  async deleteGoal(id: string): Promise<void> {
    await this.fetchWithOfflineSupport(`/goals?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Planner API
  async getPlanner(date?: string): Promise<DailyPlan> {
    const query = date ? `?date=${date}` : '';
    return this.fetchWithOfflineSupport(`/planner${query}`);
  }

  async savePlanner(plan: { date: string; focus?: string; tasks?: Omit<Task, 'id' | 'createdAt'>[] }): Promise<DailyPlan> {
    return this.fetchWithOfflineSupport('/planner', {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  async updatePlanner(id: string, plan: { focus?: string; tasks?: Omit<Task, 'id' | 'createdAt'>[] }): Promise<DailyPlan> {
    return this.fetchWithOfflineSupport(`/planner?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(plan),
    });
  }

  async deletePlanner(id: string): Promise<void> {
    await this.fetchWithOfflineSupport(`/planner?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Thoughts API
  async getThoughts(date?: string, type?: string): Promise<Thought[]> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (type) params.append('type', type);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchWithOfflineSupport(`/thoughts${query}`);
  }

  async createThought(thought: Omit<Thought, 'id' | 'createdAt'>): Promise<Thought> {
    return this.fetchWithOfflineSupport('/thoughts', {
      method: 'POST',
      body: JSON.stringify(thought),
    });
  }

  async updateThought(id: string, thought: Partial<Thought>): Promise<Thought> {
    return this.fetchWithOfflineSupport(`/thoughts?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(thought),
    });
  }

  async deleteThought(id: string): Promise<void> {
    await this.fetchWithOfflineSupport(`/thoughts?id=${id}`, {
      method: 'DELETE',
    });
  }

  // Learned Items API
  async getLearnedItems(date?: string, category?: string): Promise<LearnedItem[]> {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (category) params.append('category', category);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.fetchWithOfflineSupport(`/learned${query}`);
  }

  async createLearnedItem(item: Omit<LearnedItem, 'id' | 'createdAt'>): Promise<LearnedItem> {
    return this.fetchWithOfflineSupport('/learned', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateLearnedItem(id: string, item: Partial<LearnedItem>): Promise<LearnedItem> {
    return this.fetchWithOfflineSupport(`/learned?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async deleteLearnedItem(id: string): Promise<void> {
    await this.fetchWithOfflineSupport(`/learned?id=${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
