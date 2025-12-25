import api from './api';

export const userService = {
  // Get user profile
  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  async updateProfile(userData) {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  // Get user bookmarks
  async getBookmarks() {
    const response = await api.get('/users/bookmarks');
    return response.data;
  },

  // Add bookmark
  async addBookmark(newsId) {
    const response = await api.post('/users/bookmarks', { news_id: newsId });
    return response.data;
  },

  // Remove bookmark
  async removeBookmark(newsId) {
    const response = await api.delete(`/users/bookmarks/${newsId}`);
    return response.data;
  },
};

export default userService;
