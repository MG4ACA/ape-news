import api from './api';

export const promotionService = {
  // Get active promotions by position
  async getActivePromotions(position) {
    const response = await api.get('/ads/active', { params: { position } });
    return response.data;
  },

  // Get all promotions (admin)
  async getAllPromotions(params = {}) {
    const response = await api.get('/ads', { params });
    return response.data;
  },

  // Get single promotion
  async getPromotion(id) {
    const response = await api.get(`/ads/${id}`);
    return response.data;
  },

  // Create promotion
  async createPromotion(formData) {
    const response = await api.post('/ads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update promotion
  async updatePromotion(id, formData) {
    const response = await api.put(`/ads/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete promotion
  async deletePromotion(id) {
    const response = await api.delete(`/ads/${id}`);
    return response.data;
  },

  // Track promotion click
  async trackClick(id) {
    const response = await api.post(`/ads/${id}/click`);
    return response.data;
  },

  // Reorder promotions
  async reorderPromotions(promotions) {
    const response = await api.put('/ads/reorder', { ads: promotions });
    return response.data;
  },

  // Get promotion statistics
  async getPromotionStats() {
    const response = await api.get('/ads/stats');
    return response.data;
  },
};

export default promotionService;
