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
};

export default analyticsService;
