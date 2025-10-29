class APIClient {
    constructor(config) {
        this.baseURL = config.BASE_URL;
        this.endpoints = config.ENDPOINTS;
        this.options = config.OPTIONS;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...this.options,
            ...options,
            headers: {
                ...this.options.headers,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || data.message || 'Request failed');
                }
                
                return data;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Auth methods
    async login(email, password) {
        return this.request(this.endpoints.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async logout() {
        return this.request(this.endpoints.LOGOUT, {
            method: 'POST'
        });
    }

    async getCurrentUser() {
        return this.request(this.endpoints.ME);
    }

    // Admin methods
    async getAdminStats() {
        return this.request(this.endpoints.ADMIN_STATS);
    }

    async getUsers() {
        return this.request(this.endpoints.ADMIN_USERS);
    }

    async blockUser(name) {
        const formData = new FormData();
        formData.append('name', name);
        
        return this.request(this.endpoints.BLOCK_USER, {
            method: 'POST',
            headers: {}, // Let browser set Content-Type for FormData
            body: formData
        });
    }

    // Attendance methods
    async getRecentAttendance(limit = 50) {
        return this.request(`${this.endpoints.ATTENDANCE_RECENT}?limit=${limit}`);
    }

    async getAttendanceStats(days = 30) {
        return this.request(`${this.endpoints.ATTENDANCE_STATS}?days=${days}`);
    }

    // User methods
    async getUserProfile() {
        return this.request(this.endpoints.USER_PROFILE);
    }

    async getUserAttendance(days = 30) {
        return this.request(`${this.endpoints.USER_ATTENDANCE}?days=${days}`);
    }

    async getUserStats(days = 30) {
        return this.request(`${this.endpoints.USER_STATS}?days=${days}`);
    }
}

// Create global API client instance
const api = new APIClient(API_CONFIG);