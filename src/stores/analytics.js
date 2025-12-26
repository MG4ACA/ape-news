import analyticsService from '@/services/analyticsService';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const loading = ref(false);
  const dashboardStats = ref(null);
  const popularArticles = ref([]);
  const trendingArticles = ref([]);
  const categoryStats = ref([]);
  const userActivity = ref([]);
  const selectedDays = ref(30);

  // Actions
  const fetchDashboardStats = async (days = 30) => {
    loading.value = true;
    try {
      const result = await analyticsService.getDashboardStats(days);
      dashboardStats.value = result.data || {};
      selectedDays.value = days;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchPopularArticles = async (limit = 10, days = 30) => {
    try {
      const result = await analyticsService.getPopularArticles(limit, days);
      popularArticles.value = result.data || [];
    } catch (error) {
      console.error('Error fetching popular articles:', error);
      throw error;
    }
  };

  const fetchTrendingArticles = async (limit = 10) => {
    try {
      const result = await analyticsService.getTrendingArticles(limit);
      trendingArticles.value = result.data || [];
    } catch (error) {
      console.error('Error fetching trending articles:', error);
      throw error;
    }
  };

  const fetchCategoryStats = async (days = 30) => {
    try {
      const result = await analyticsService.getViewsByCategory(days);
      categoryStats.value = result.data || [];
    } catch (error) {
      console.error('Error fetching category stats:', error);
      throw error;
    }
  };

  const fetchUserActivity = async () => {
    try {
      const result = await analyticsService.getUserActivity();
      userActivity.value = result.data || [];
    } catch (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }
  };

  const refreshAllData = async (days = 30) => {
    await Promise.all([
      fetchDashboardStats(days),
      fetchPopularArticles(10, days),
      fetchTrendingArticles(10),
      fetchCategoryStats(days),
      fetchUserActivity(),
    ]);
  };

  return {
    // State
    loading,
    dashboardStats,
    popularArticles,
    trendingArticles,
    categoryStats,
    userActivity,
    selectedDays,

    // Actions
    fetchDashboardStats,
    fetchPopularArticles,
    fetchTrendingArticles,
    fetchCategoryStats,
    fetchUserActivity,
    refreshAllData,
  };
});
