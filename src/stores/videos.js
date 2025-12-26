import { videoService } from '@/services/videoService';
import { defineStore } from 'pinia';

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: [],
    loading: false,
    submitting: false,
    deleting: false,
    pagination: null,
    filters: {
      page: 1,
      limit: 12,
      category_id: '',
      search: '',
      sort_by: 'created_at',
      sort_order: 'DESC',
    },
  }),

  getters: {
    activeVideos: (state) => state.videos.filter((video) => video.is_active),
    inactiveVideos: (state) => state.videos.filter((video) => !video.is_active),
    featuredVideos: (state) => state.videos.filter((video) => video.is_featured),
  },

  actions: {
    async fetchVideos() {
      this.loading = true;
      try {
        const response = await videoService.getAllVideos(this.filters);
        this.videos = response.data;
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createVideo(data) {
      this.submitting = true;
      try {
        const response = await videoService.createVideo(data);
        this.videos.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating video:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async updateVideo(id, data) {
      this.submitting = true;
      try {
        const response = await videoService.updateVideo(id, data);
        const index = this.videos.findIndex((video) => video.id === id);
        if (index !== -1) {
          this.videos[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error updating video:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async deleteVideo(id) {
      this.deleting = true;
      try {
        await videoService.deleteVideo(id);
        this.videos = this.videos.filter((video) => video.id !== id);
      } catch (error) {
        console.error('Error deleting video:', error);
        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async toggleFeatured(id) {
      try {
        const response = await videoService.toggleFeatured(id);
        const index = this.videos.findIndex((video) => video.id === id);
        if (index !== -1) {
          this.videos[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error toggling featured:', error);
        throw error;
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },

    resetFilters() {
      this.filters = {
        page: 1,
        limit: 12,
        category_id: '',
        search: '',
        sort_by: 'created_at',
        sort_order: 'DESC',
      };
    },
  },
});
