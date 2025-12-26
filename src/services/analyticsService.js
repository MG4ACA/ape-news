import api from './api';

export const analyticsService = {
  // Track article view
  async trackView(newsId) {
    const response = await api.post('/analytics/track', {
      news_id: newsId,
      event_type: 'view',
    });
    return response.data;
  },

  // Get article analytics
  async getArticleAnalytics(newsId) {
    const response = await api.get(`/analytics/article/${newsId}`);
    return response.data;
  },

  // Admin: Get dashboard statistics
  async getDashboardStats(days = 30) {
    const response = await api.get('/analytics/dashboard', {
      params: { days },
    });
    return response.data;
  },

  // Admin: Get popular articles
  async getPopularArticles(limit = 10, days = 30, categoryId = null) {
    const params = { limit, days };
    if (categoryId) params.category_id = categoryId;
    const response = await api.get('/analytics/popular', { params });
    return response.data;
  },

  // Admin: Get trending articles
  async getTrendingArticles(limit = 10) {
    const response = await api.get('/analytics/trending', {
      params: { limit },
    });
    return response.data;
  },

  // Admin: Get views by category
  async getViewsByCategory(days = 30) {
    const response = await api.get('/analytics/categories', {
      params: { days },
    });
    return response.data;
  },

  // Admin: Get user activity
  async getUserActivity() {
    const response = await api.get('/analytics/user/activity');
    return response.data;
  },
};

export default analyticsService;
