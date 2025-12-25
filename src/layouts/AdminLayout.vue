<template>
  <div class="admin-layout">
    <AdminSidebar :visible="sidebarVisible" @toggle="sidebarVisible = !sidebarVisible" />
    
    <div class="admin-main" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <AdminHeader @toggle-sidebar="sidebarVisible = !sidebarVisible" />
      
      <div class="admin-content">
        <router-view />
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';

const authStore = useAuthStore();
const router = useRouter();
const sidebarVisible = ref(true);

onMounted(() => {
  // Verify admin access
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    router.push('/');
  }
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--surface-ground);
}

.admin-main {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.admin-main.sidebar-collapsed {
  margin-left: 80px;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 0;
  }
  
  .admin-content {
    padding: 1rem;
  }
}
</style>
