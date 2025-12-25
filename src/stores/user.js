import { userService } from '@/services/userService';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    bookmarks: [],
    loading: false,
    error: null,
  }),

  getters: {
    isBookmarked: (state) => {
      return (newsId) => {
        return state.bookmarks.some((bookmark) => bookmark.news_id === newsId);
      };
    },
  },

  actions: {
    async fetchProfile() {
      this.loading = true;
      this.error = null;

      try {
        const response = await userService.getProfile();

        if (response.success) {
          this.profile = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch profile';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await userService.updateProfile(userData);

        if (response.success) {
          this.profile = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to update profile';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchBookmarks() {
      this.loading = true;
      this.error = null;

      try {
        const response = await userService.getBookmarks();

        if (response.success) {
          this.bookmarks = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch bookmarks';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addBookmark(newsId) {
      try {
        const response = await userService.addBookmark(newsId);

        if (response.success) {
          // Add to bookmarks list
          await this.fetchBookmarks();
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to add bookmark';
        throw error;
      }
    },

    async removeBookmark(newsId) {
      try {
        const response = await userService.removeBookmark(newsId);

        if (response.success) {
          // Remove from bookmarks list
          this.bookmarks = this.bookmarks.filter((b) => b.news_id !== newsId);
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to remove bookmark';
        throw error;
      }
    },

    toggleBookmark(newsId) {
      if (this.isBookmarked(newsId)) {
        return this.removeBookmark(newsId);
      } else {
        return this.addBookmark(newsId);
      }
    },

    clearError() {
      this.error = null;
    },
  },
});

export default useUserStore;
