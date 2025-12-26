<template>
  <div class="admin-promotions">
    <PromotionManager />
  </div>
</template>

<script setup>
import PromotionManager from '@/components/admin/PromotionManager.vue';
</script>

<style scoped>
.admin-promotions {
  @apply p-6;
}
</style>
