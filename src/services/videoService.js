import api from './api';

export const videoService = {
  // Get all videos
  async getVideos(params = {}) {
    const response = await api.get('/videos', { params });
    return response.data;
  },

  // Get video by ID
  async getVideoById(id) {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },
};

export default videoService;
