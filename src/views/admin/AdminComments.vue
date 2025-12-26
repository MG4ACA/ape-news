<template>
  <div class="admin-comments">
    <CommentManager />
  </div>
</template>

<script setup>
import CommentManager from '@/components/admin/CommentManager.vue';
</script>

<style scoped>
.admin-comments {
  @apply w-full;
}
</style>
