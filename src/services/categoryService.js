import api from './api';

export const categoryService = {
  // Get all categories with hierarchy
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by ID
  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
