import api from './api';

export const adService = {
  // Get active ads by position
  async getActiveAds(position) {
    const response = await api.get('/ads/active', { params: { position } });
    return response.data;
  },
};

export default adService;
