import { newsService } from '@/services/newsService';
import { defineStore } from 'pinia';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [],
    featuredNews: [],
    breakingNews: [],
    currentArticle: null,
    relatedArticles: [],
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    },
    loading: false,
    error: null,
  }),

  getters: {
    hasMore: (state) => {
      return state.pagination.page < state.pagination.totalPages;
    },
  },

  actions: {
    async fetchNews(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await newsService.getNews({
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...params,
        });

        if (response.success) {
          this.newsList = response.data.news || [];
          if (response.data.pagination) {
            this.pagination = {
              page: response.data.pagination.page,
              limit: response.data.pagination.limit,
              total: response.data.pagination.total,
              totalPages: response.data.pagination.totalPages,
            };
          }
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch news';
        this.newsList = [];
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchFeaturedNews(limit = 5) {
      try {
        const response = await newsService.getFeaturedNews(limit);

        if (response.success) {
          this.featuredNews = response.data || [];
        }

        return response;
      } catch (error) {
        console.error('Failed to fetch featured news:', error);
        this.featuredNews = [];
      }
    },

    async fetchBreakingNews(limit = 3) {
      try {
        const response = await newsService.getBreakingNews(limit);

        if (response.success) {
          this.breakingNews = response.data || [];
        }

        return response;
      } catch (error) {
        console.error('Failed to fetch breaking news:', error);
        this.breakingNews = [];
      }
    },

    async fetchNewsById(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await newsService.getNewsById(id);

        if (response.success) {
          this.currentArticle = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch article';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchNewsByCategory(categoryId, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await newsService.getNewsByCategory(categoryId, {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...params,
        });

        if (response.success) {
          this.newsList = response.data.news || [];
          if (response.data.pagination) {
            this.pagination = {
              page: response.data.pagination.page,
              limit: response.data.pagination.limit,
              total: response.data.pagination.total,
              totalPages: response.data.pagination.totalPages,
            };
          }
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch news';
        this.newsList = [];
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async searchNews(query, params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const response = await newsService.searchNews(query, {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...params,
        });

        if (response.success) {
          this.newsList = response.data.news || [];
          if (response.data.pagination) {
            this.pagination = {
              page: response.data.pagination.page,
              limit: response.data.pagination.limit,
              total: response.data.pagination.total,
              totalPages: response.data.pagination.totalPages,
            };
          }
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Search failed';
        this.newsList = [];
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchRelatedNews(id, limit = 4) {
      try {
        const response = await newsService.getRelatedNews(id, limit);

        if (response.success) {
          this.relatedArticles = response.data || [];
        }

        return response;
      } catch (error) {
        console.error('Failed to fetch related news:', error);
        this.relatedArticles = [];
      }
    },

    setPage(page) {
      this.pagination.page = page;
    },

    clearCurrentArticle() {
      this.currentArticle = null;
      this.relatedArticles = [];
    },

    clearError() {
      this.error = null;
    },
  },
});

export default useNewsStore;
