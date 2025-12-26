import { promotionService } from '@/services/promotionService';
import { defineStore } from 'pinia';

export const usePromotionStore = defineStore('promotion', {
  state: () => ({
    promotions: [],
    loading: false,
    submitting: false,
    deleting: false,
    pagination: null,
    filters: {
      page: 1,
      limit: 10,
      position: '',
      is_active: '',
      sort_by: 'display_order',
      sort_order: 'ASC',
    },
  }),

  getters: {
    activePromotions: (state) => state.promotions.filter((promotion) => promotion.is_active),
    inactivePromotions: (state) => state.promotions.filter((promotion) => !promotion.is_active),
    promotionsByPosition: (state) => {
      const grouped = {
        header: [],
        sidebar: [],
        content_top: [],
        content_middle: [],
        content_bottom: [],
      };
      state.promotions.forEach((promotion) => {
        if (grouped[promotion.position]) {
          grouped[promotion.position].push(promotion);
        }
      });
      return grouped;
    },
  },

  actions: {
    async fetchPromotions() {
      this.loading = true;
      try {
        const response = await promotionService.getAllPromotions(this.filters);
        this.promotions = response.data;
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Error fetching promotions:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createPromotion(formData) {
      this.submitting = true;
      try {
        const response = await promotionService.createPromotion(formData);
        this.promotions.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating promotion:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async updatePromotion(id, formData) {
      this.submitting = true;
      try {
        const response = await promotionService.updatePromotion(id, formData);
        const index = this.promotions.findIndex((promotion) => promotion.id === id);
        if (index !== -1) {
          this.promotions[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error updating promotion:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async deletePromotion(id) {
      this.deleting = true;
      try {
        await promotionService.deletePromotion(id);
        this.promotions = this.promotions.filter((promotion) => promotion.id !== id);
      } catch (error) {
        console.error('Error deleting promotion:', error);
        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async reorderPromotions(promotions) {
      try {
        await promotionService.reorderPromotions(promotions);
        // Update local state
        promotions.forEach((promotionUpdate) => {
          const promotion = this.promotions.find((p) => p.id === promotionUpdate.id);
          if (promotion) {
            promotion.display_order = promotionUpdate.display_order;
          }
        });
        // Sort promotions by display_order
        this.promotions.sort((a, b) => a.display_order - b.display_order);
      } catch (error) {
        console.error('Error reordering promotions:', error);
        throw error;
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },

    resetFilters() {
      this.filters = {
        page: 1,
        limit: 10,
        position: '',
        is_active: '',
        sort_by: 'display_order',
        sort_order: 'ASC',
      };
    },
  },
});
