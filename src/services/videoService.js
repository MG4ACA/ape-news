import api from './api';

export const videoService = {
  // Get all videos (public)
  async getVideos(params = {}) {
    const response = await api.get('/videos', { params });
    return response.data;
  },

  // Get all videos (admin)
  async getAllVideos(params = {}) {
    const response = await api.get('/videos/admin/all', { params });
    return response.data;
  },

  // Get video by ID
  async getVideoById(id) {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  },

  // Create video
  async createVideo(data) {
    const response = await api.post('/videos', data);
    return response.data;
  },

  // Update video
  async updateVideo(id, data) {
    const response = await api.put(`/videos/${id}`, data);
    return response.data;
  },

  // Delete video
  async deleteVideo(id) {
    const response = await api.delete(`/videos/${id}`);
    return response.data;
  },

  // Toggle featured status
  async toggleFeatured(id) {
    const response = await api.patch(`/videos/${id}/featured`);
    return response.data;
  },

  // Get thumbnail from YouTube URL
  async getYouTubeThumbnail(url) {
    try {
      const videoId = this.extractYouTubeId(url);
      if (!videoId) return null;
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } catch (error) {
      return null;
    }
  },

  // Extract YouTube video ID from URL
  extractYouTubeId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  },
};

export default videoService;
