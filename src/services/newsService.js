import api from './api';

export const newsService = {
  // Get all published news with pagination
  async getNews(params = {}) {
    const response = await api.get('/news', { params });
    return response.data;
  },

  // Get single news article by ID
  async getNewsById(id) {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  // Get featured news
  async getFeaturedNews(limit = 5) {
    const response = await api.get('/news/featured', { params: { limit } });
    return response.data;
  },

  // Get breaking news
  async getBreakingNews(limit = 3) {
    const response = await api.get('/news/breaking', { params: { limit } });
    return response.data;
  },

  // Get news by category
  async getNewsByCategory(categoryId, params = {}) {
    const response = await api.get(`/news/category/${categoryId}`, { params });
    return response.data;
  },

  // Search news
  async searchNews(query, params = {}) {
    const response = await api.get('/news/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },

  // Get related news
  async getRelatedNews(id, limit = 4) {
    const response = await api.get(`/news/${id}/related`, { params: { limit } });
    return response.data;
  },
};

export default newsService;
