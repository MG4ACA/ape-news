import api from './api';

export const commentService = {
  // Get comments for a news article
  async getComments(newsId) {
    const response = await api.get(`/comments/news/${newsId}`);
    return response.data;
  },

  // Create a comment
  async createComment(newsId, content) {
    const response = await api.post('/comments', { news_id: newsId, content });
    return response.data;
  },

  // Delete a comment
  async deleteComment(commentId) {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },

  // Admin: Get all comments with filtering
  async getAdminComments(page = 1, limit = 20, filters = {}) {
    const params = {
      page,
      limit,
      ...filters,
    };
    const response = await api.get('/comments/admin/all', { params });
    return response.data;
  },

  // Admin: Get comment statistics
  async getCommentStats() {
    const response = await api.get('/comments/admin/stats');
    return response.data;
  },

  // Admin: Approve a comment
  async approveComment(commentId) {
    const response = await api.patch(`/comments/${commentId}/approve`);
    return response.data;
  },

  // Admin: Reject a comment
  async rejectComment(commentId) {
    const response = await api.patch(`/comments/${commentId}/reject`);
    return response.data;
  },

  // Admin: Delete a comment
  async deleteCommentAdmin(commentId) {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },
};

export default commentService;
