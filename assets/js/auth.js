class AuthManager {
    constructor(apiClient) {
        this.api = apiClient;
        this.currentUser = null;
    }

    async checkAuth() {
        try {
            const response = await this.api.getCurrentUser();
            this.currentUser = response.user;
            return true;
        } catch (error) {
            this.currentUser = null;
            return false;
        }
    }

    async login(email, password) {
        try {
            const response = await this.api.login(email, password);
            this.currentUser = response.user;
            return response;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            await this.api.logout();
            this.currentUser = null;
            window.location.href = '/login.html';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    isUser() {
        return this.currentUser && this.currentUser.role === 'user';
    }

    async requireAuth(requiredRole = null) {
        const isAuth = await this.checkAuth();
        
        if (!isAuth) {
            window.location.href = '/login.html';
            return false;
        }

        if (requiredRole && this.currentUser.role !== requiredRole) {
            window.location.href = '/login.html';
            return false;
        }

        return true;
    }
}

// Create global auth manager
const auth = new AuthManager(api);