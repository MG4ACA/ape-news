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
};

export default commentService;
