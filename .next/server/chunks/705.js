exports.id = 705;
exports.ids = [705];
exports.modules = {

/***/ 3657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ api)
/* harmony export */ });
// API service for frontend-backend communication
const API_BASE = "/api";
class ApiService {
    isOnline() {
        return typeof navigator !== "undefined" && navigator.onLine;
    }
    getCurrentUser() {
        if (true) return null;
        const userData = localStorage.getItem("fnote_user");
        return userData ? JSON.parse(userData) : null;
    }
    async fetchWithOfflineSupport(endpoint, options = {}) {
        if (!this.isOnline()) {
            throw new Error("Offline: Please check your internet connection");
        }
        const user = this.getCurrentUser();
        const headers = {
            "Content-Type": "application/json",
            ...user && {
                "x-user-data": JSON.stringify(user)
            },
            ...options.headers
        };
        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                ...options,
                headers
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }
    // Auth API
    async login(email, password) {
        return this.fetchWithOfflineSupport("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
    }
    // Notes API
    async getNotes() {
        return this.fetchWithOfflineSupport("/notes");
    }
    async createNote(note) {
        return this.fetchWithOfflineSupport("/notes", {
            method: "POST",
            body: JSON.stringify(note)
        });
    }
    async updateNote(id, note) {
        return this.fetchWithOfflineSupport(`/notes?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(note)
        });
    }
    async deleteNote(id) {
        await this.fetchWithOfflineSupport(`/notes?id=${id}`, {
            method: "DELETE"
        });
    }
    // Goals API
    async getGoals(type, parentId) {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (parentId !== undefined) params.append("parentId", parentId || "null");
        const query = params.toString() ? `?${params.toString()}` : "";
        return this.fetchWithOfflineSupport(`/goals${query}`);
    }
    async createGoal(goal) {
        return this.fetchWithOfflineSupport("/goals", {
            method: "POST",
            body: JSON.stringify(goal)
        });
    }
    async updateGoal(id, goal) {
        return this.fetchWithOfflineSupport(`/goals?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(goal)
        });
    }
    async deleteGoal(id) {
        await this.fetchWithOfflineSupport(`/goals?id=${id}`, {
            method: "DELETE"
        });
    }
    // Planner API
    async getPlanner(date) {
        const query = date ? `?date=${date}` : "";
        return this.fetchWithOfflineSupport(`/planner${query}`);
    }
    async savePlanner(plan) {
        return this.fetchWithOfflineSupport("/planner", {
            method: "POST",
            body: JSON.stringify(plan)
        });
    }
    async updatePlanner(id, plan) {
        return this.fetchWithOfflineSupport(`/planner?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(plan)
        });
    }
    async deletePlanner(id) {
        await this.fetchWithOfflineSupport(`/planner?id=${id}`, {
            method: "DELETE"
        });
    }
    // Thoughts API
    async getThoughts(date, type) {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (type) params.append("type", type);
        const query = params.toString() ? `?${params.toString()}` : "";
        return this.fetchWithOfflineSupport(`/thoughts${query}`);
    }
    async createThought(thought) {
        return this.fetchWithOfflineSupport("/thoughts", {
            method: "POST",
            body: JSON.stringify(thought)
        });
    }
    async updateThought(id, thought) {
        return this.fetchWithOfflineSupport(`/thoughts?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(thought)
        });
    }
    async deleteThought(id) {
        await this.fetchWithOfflineSupport(`/thoughts?id=${id}`, {
            method: "DELETE"
        });
    }
    // Learned Items API
    async getLearnedItems(date, category) {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (category) params.append("category", category);
        const query = params.toString() ? `?${params.toString()}` : "";
        return this.fetchWithOfflineSupport(`/learned${query}`);
    }
    async createLearnedItem(item) {
        return this.fetchWithOfflineSupport("/learned", {
            method: "POST",
            body: JSON.stringify(item)
        });
    }
    async updateLearnedItem(id, item) {
        return this.fetchWithOfflineSupport(`/learned?id=${id}`, {
            method: "PUT",
            body: JSON.stringify(item)
        });
    }
    async deleteLearnedItem(id) {
        await this.fetchWithOfflineSupport(`/learned?id=${id}`, {
            method: "DELETE"
        });
    }
}
const api = new ApiService();


/***/ }),

/***/ 6385:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ syncService)
/* harmony export */ });
// Offline sync service for handling offline operations
class SyncService {
    // Add operation to sync queue
    addToQueue(operation) {
        if (true) return;
        const queue = this.getQueue();
        const syncOp = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            retries: 0,
            ...operation
        };
        queue.push(syncOp);
        this.saveQueue(queue);
        console.log("Added to sync queue:", syncOp);
    }
    // Get sync queue
    getQueue() {
        if (true) return [];
        const queueJson = localStorage.getItem(this.SYNC_QUEUE_KEY);
        return queueJson ? JSON.parse(queueJson) : [];
    }
    // Save sync queue
    saveQueue(queue) {
        if (true) return;
        localStorage.setItem(this.SYNC_QUEUE_KEY, JSON.stringify(queue));
    }
    // Check if online and sync pending operations
    async syncIfOnline() {
        if (true) return;
        const queue = this.getQueue();
        if (queue.length === 0) return;
        console.log("Syncing", queue.length, "pending operations...");
        for (const operation of [
            ...queue
        ]){
            try {
                await this.processOperation(operation);
                // Remove from queue if successful
                const newQueue = this.getQueue().filter((op)=>op.id !== operation.id);
                this.saveQueue(newQueue);
            } catch (error) {
                console.error("Failed to sync operation:", operation.id, error);
                // Increment retry count
                operation.retries += 1;
                // Remove if max retries reached
                if (operation.retries >= this.MAX_RETRIES) {
                    console.warn("Max retries reached for operation:", operation.id);
                    const newQueue = this.getQueue().filter((op)=>op.id !== operation.id);
                    this.saveQueue(newQueue);
                } else {
                    // Update queue with incremented retry count
                    const updatedQueue = this.getQueue().map((op)=>op.id === operation.id ? operation : op);
                    this.saveQueue(updatedQueue);
                }
            }
        }
    }
    // Process a single sync operation
    async processOperation(operation) {
        // This would make actual API calls
        // For now, we'll simulate it
        console.log("Processing operation:", operation);
        // Simulate API call delay
        await new Promise((resolve)=>setTimeout(resolve, 100));
    // In real implementation, you would call your API endpoints here
    // Example: await fetch(`/api/${operation.entityType}s`, { method: 'POST', body: JSON.stringify(operation.data) });
    }
    // Clear sync queue
    clearQueue() {
        if (true) return;
        localStorage.removeItem(this.SYNC_QUEUE_KEY);
    }
    // Get queue size
    getQueueSize() {
        return this.getQueue().length;
    }
    constructor(){
        this.SYNC_QUEUE_KEY = "fnote_sync_queue";
        this.MAX_RETRIES = 3;
    }
}
const syncService = new SyncService();
// Listen for online/offline events
if (false) {}


/***/ }),

/***/ 8079:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(5563)


/***/ })

};
;