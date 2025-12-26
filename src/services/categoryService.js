import api from './api';

export const categoryService = {
  // Get all categories with hierarchy
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get all categories with optional parameters
  async getAllCategories(params = {}) {
    const response = await api.get('/categories', { params });
    return response.data;
  },

  // Get category tree
  async getCategoryTree() {
    const response = await api.get('/categories', { params: { tree: true } });
    return response.data;
  },

  // Get category by ID
  async getCategoryById(id) {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Get category children
  async getCategoryChildren(id) {
    const response = await api.get(`/categories/${id}/children`);
    return response.data;
  },

  // Create category
  async createCategory(categoryData) {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  // Update category
  async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category
  async deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Deactivate category
  async deactivateCategory(id) {
    const response = await api.patch(`/categories/${id}/deactivate`);
    return response.data;
  },

  // Reorder categories
  async reorderCategories(orderData) {
    const response = await api.post('/categories/reorder', orderData);
    return response.data;
  },
};

export default categoryService;
