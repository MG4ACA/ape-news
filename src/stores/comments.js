import commentService from '@/services/commentService';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCommentStore = defineStore('comments', () => {
  // State
  const comments = ref([]);
  const loading = ref(false);
  const totalRecords = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const stats = ref({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const filters = ref({
    status: '',
    news_id: '',
    user_id: '',
    sort_by: 'created_at',
    sort_order: 'DESC',
  });

  // Getters
  const pendingComments = computed(() => comments.value.filter((c) => c.status === 'pending'));
  const approvedComments = computed(() => comments.value.filter((c) => c.status === 'approved'));
  const rejectedComments = computed(() => comments.value.filter((c) => c.status === 'rejected'));

  // Actions
  const fetchComments = async (page = 1) => {
    loading.value = true;
    try {
      const result = await commentService.getAdminComments(page, pageSize.value, {
        status: filters.value.status,
        news_id: filters.value.news_id,
        user_id: filters.value.user_id,
        sort_by: filters.value.sort_by,
        sort_order: filters.value.sort_order,
      });

      comments.value = result.data || [];
      totalRecords.value = result.pagination?.total || 0;
      currentPage.value = page;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const result = await commentService.getCommentStats();
      stats.value = result.data || {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
      };
    } catch (error) {
      console.error('Error fetching comment stats:', error);
    }
  };

  const approveComment = async (commentId) => {
    try {
      await commentService.approveComment(commentId);
      const comment = comments.value.find((c) => c.id === commentId);
      if (comment) {
        comment.status = 'approved';
        if (stats.value.pending > 0) stats.value.pending--;
        stats.value.approved++;
      }
      return true;
    } catch (error) {
      console.error('Error approving comment:', error);
      throw error;
    }
  };

  const rejectComment = async (commentId) => {
    try {
      await commentService.rejectComment(commentId);
      const comment = comments.value.find((c) => c.id === commentId);
      if (comment) {
        comment.status = 'rejected';
        if (stats.value.pending > 0) stats.value.pending--;
        stats.value.rejected++;
      }
      return true;
    } catch (error) {
      console.error('Error rejecting comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentService.deleteCommentAdmin(commentId);
      const index = comments.value.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        const comment = comments.value[index];
        comments.value.splice(index, 1);
        if (stats.value.total > 0) stats.value.total--;
        if (comment.status === 'pending' && stats.value.pending > 0) stats.value.pending--;
        if (comment.status === 'approved' && stats.value.approved > 0) stats.value.approved--;
        if (comment.status === 'rejected' && stats.value.rejected > 0) stats.value.rejected--;
      }
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1;
  };

  const resetFilters = () => {
    filters.value = {
      status: '',
      news_id: '',
      user_id: '',
      sort_by: 'created_at',
      sort_order: 'DESC',
    };
    currentPage.value = 1;
  };

  return {
    // State
    comments,
    loading,
    totalRecords,
    currentPage,
    pageSize,
    stats,
    filters,

    // Getters
    pendingComments,
    approvedComments,
    rejectedComments,

    // Actions
    fetchComments,
    fetchStats,
    approveComment,
    rejectComment,
    deleteComment,
    setFilters,
    resetFilters,
  };
});
