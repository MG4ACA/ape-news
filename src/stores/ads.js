import { adService } from '@/services/adService';
import { defineStore } from 'pinia';

export const useAdStore = defineStore('ad', {
  state: () => ({
    ads: [],
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
    activeAds: (state) => state.ads.filter((ad) => ad.is_active),
    inactiveAds: (state) => state.ads.filter((ad) => !ad.is_active),
    adsByPosition: (state) => {
      const grouped = {
        header: [],
        sidebar: [],
        content_top: [],
        content_middle: [],
        content_bottom: [],
      };
      state.ads.forEach((ad) => {
        if (grouped[ad.position]) {
          grouped[ad.position].push(ad);
        }
      });
      return grouped;
    },
  },

  actions: {
    async fetchAds() {
      this.loading = true;
      try {
        const response = await adService.getAllAds(this.filters);
        this.ads = response.data;
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Error fetching ads:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createAd(formData) {
      this.submitting = true;
      try {
        const response = await adService.createAd(formData);
        this.ads.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating ad:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async updateAd(id, formData) {
      this.submitting = true;
      try {
        const response = await adService.updateAd(id, formData);
        const index = this.ads.findIndex((ad) => ad.id === id);
        if (index !== -1) {
          this.ads[index] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error('Error updating ad:', error);
        throw error;
      } finally {
        this.submitting = false;
      }
    },

    async deleteAd(id) {
      this.deleting = true;
      try {
        await adService.deleteAd(id);
        this.ads = this.ads.filter((ad) => ad.id !== id);
      } catch (error) {
        console.error('Error deleting ad:', error);
        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async reorderAds(ads) {
      try {
        await adService.reorderAds(ads);
        // Update local state
        ads.forEach((adUpdate) => {
          const ad = this.ads.find((a) => a.id === adUpdate.id);
          if (ad) {
            ad.display_order = adUpdate.display_order;
          }
        });
        // Sort ads by display_order
        this.ads.sort((a, b) => a.display_order - b.display_order);
      } catch (error) {
        console.error('Error reordering ads:', error);
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
