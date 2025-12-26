<template>
  <div class="admin-users">
    <UserManager />
  </div>
</template>

<script setup>
import UserManager from '@/components/admin/UserManager.vue';
</script>

<style scoped>
.admin-users {
  @apply w-full;
}
</style>
