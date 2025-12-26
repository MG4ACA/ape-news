import api from './api';

export const adService = {
  // Get active ads by position
  async getActiveAds(position) {
    const response = await api.get('/ads/active', { params: { position } });
    return response.data;
  },

  // Get all ads (admin)
  async getAllAds(params = {}) {
    const response = await api.get('/ads', { params });
    return response.data;
  },

  // Get single ad
  async getAd(id) {
    const response = await api.get(`/ads/${id}`);
    return response.data;
  },

  // Create ad
  async createAd(formData) {
    const response = await api.post('/ads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update ad
  async updateAd(id, formData) {
    const response = await api.put(`/ads/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete ad
  async deleteAd(id) {
    const response = await api.delete(`/ads/${id}`);
    return response.data;
  },

  // Track ad click
  async trackClick(id) {
    const response = await api.post(`/ads/${id}/click`);
    return response.data;
  },

  // Reorder ads
  async reorderAds(ads) {
    const response = await api.put('/ads/reorder', { ads });
    return response.data;
  },

  // Get ad statistics
  async getAdStats() {
    const response = await api.get('/ads/stats');
    return response.data;
  },
};

export default adService;
