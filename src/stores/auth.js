import { authService } from '@/services/authService';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: authService.getUser(),
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: authService.isAuthenticated(),
    loading: false,
    error: null,
  }),

  getters: {
    isAdmin: (state) => {
      return ['super_admin', 'editor', 'moderator'].includes(state.user?.role);
    },
    isSuperAdmin: (state) => {
      return state.user?.role === 'super_admin';
    },
    userRole: (state) => {
      return state.user?.role || 'user';
    },
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authService.login(credentials);

        if (response.success) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.refreshToken = response.data.refreshToken;
          this.isAuthenticated = true;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authService.register(userData);
        return response;
      } catch (error) {
        this.error = error.message || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getCurrentUser() {
      if (!this.isAuthenticated) return;

      this.loading = true;
      this.error = null;

      try {
        const response = await authService.getCurrentUser();

        if (response.success) {
          this.user = response.data;
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to get user';
        // If token is invalid, logout
        this.logout();
      } finally {
        this.loading = false;
      }
    },

    logout() {
      authService.logout();
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.error = null;
    },

    clearError() {
      this.error = null;
    },
  },
});

export default useAuthStore;
