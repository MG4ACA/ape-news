<template>
  <AdminLayout>
    <div class="admin-ads">
      <AdManager />
    </div>
  </AdminLayout>
</template>

<script setup>
import AdManager from '@/components/admin/AdManager.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
</script>

<style scoped>
.admin-ads {
  @apply p-6;
}
</style>
