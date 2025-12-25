import { categoryService } from '@/services/categoryService';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
  }),

  getters: {
    // Get root categories (no parent)
    rootCategories: (state) => {
      return state.categories.filter((cat) => !cat.parent_id);
    },

    // Get subcategories by parent ID
    getSubcategories: (state) => {
      return (parentId) => {
        return state.categories.filter((cat) => cat.parent_id === parentId);
      };
    },

    // Get category by ID
    getCategoryById: (state) => {
      return (id) => {
        return state.categories.find((cat) => cat.id === id);
      };
    },

    // Get category hierarchy (breadcrumb)
    getCategoryPath: (state) => {
      return (categoryId) => {
        const path = [];
        let currentId = categoryId;

        while (currentId) {
          const category = state.categories.find((cat) => cat.id === currentId);
          if (category) {
            path.unshift(category);
            currentId = category.parent_id;
          } else {
            break;
          }
        }

        return path;
      };
    },
  },

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const response = await categoryService.getCategories();

        if (response.success) {
          this.categories = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch categories';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategoryById(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await categoryService.getCategoryById(id);

        if (response.success) {
          this.currentCategory = response.data;
        }

        return response;
      } catch (error) {
        this.error = error.message || 'Failed to fetch category';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearCurrentCategory() {
      this.currentCategory = null;
    },

    clearError() {
      this.error = null;
    },
  },
});

export default useCategoryStore;
