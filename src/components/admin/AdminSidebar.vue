<template>
  <div class="admin-sidebar" :class="{ collapsed: !visible }">
    <div class="sidebar-header">
      <router-link to="/admin" class="logo">
        <img src="/logo.png" alt="APE Admin Logo" class="logo-image" />
      </router-link>
    </div>

    <div class="sidebar-menu">
      <div class="menu-section">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
        >
          <i :class="item.icon"></i>
          <span v-if="visible" class="menu-label">{{ item.label }}</span>
          <span v-if="item.badge && visible" class="badge-pill">{{ item.badge }}</span>
        </router-link>
      </div>

      <div v-if="authStore.isSuperAdmin" class="menu-section">
        <div v-if="visible" class="section-title">Super Admin</div>
        <router-link
          v-for="item in superAdminItems"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
        >
          <i :class="item.icon"></i>
          <span v-if="visible" class="menu-label">{{ item.label }}</span>
        </router-link>
      </div>

      <div class="menu-section">
        <div v-if="visible" class="section-title">Settings</div>
        <router-link to="/" class="menu-item">
          <i class="pi pi-home"></i>
          <span v-if="visible" class="menu-label">View Site</span>
        </router-link>
        <a href="#" @click.prevent="handleLogout" class="menu-item">
          <i class="pi pi-sign-out"></i>
          <span v-if="visible" class="menu-label">Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const menuItems = [
  { path: '/admin', icon: 'pi pi-th-large', label: 'Dashboard', exact: true },
  { path: '/admin/news', icon: 'pi pi-file', label: 'News' },
  { path: '/admin/categories', icon: 'pi pi-sitemap', label: 'Categories' },
  { path: '/admin/comments', icon: 'pi pi-comments', label: 'Comments' },
  { path: '/admin/videos', icon: 'pi pi-video', label: 'Videos' },
  { path: '/admin/promotions', icon: 'pi pi-image', label: 'Promotions' },
  { path: '/admin/analytics', icon: 'pi pi-chart-line', label: 'Analytics' },
];

const superAdminItems = [{ path: '/admin/users', icon: 'pi pi-users', label: 'User Management' }];

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin';
  }
  return route.path.startsWith(path);
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background: var(--surface-card);
  border-right: 1px solid var(--surface-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 1000;
  overflow-x: hidden;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 0.25rem 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--text-color);
}

.logo-image {
  height: 10vh;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
}

.sidebar-menu {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.menu-section {
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

.section-title {
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-color-secondary);
  letter-spacing: 0.5px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  margin: 0.25rem 0;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.2s ease;
  position: relative;
}

.menu-item:hover {
  background: var(--surface-hover);
}

.menu-item.active {
  background: var(--primary-color);
  color: white;
}

.menu-item i {
  font-size: 1.25rem;
  min-width: 1.25rem;
}

.menu-label {
  flex: 1;
  white-space: nowrap;
}

.badge-pill {
  background: var(--red-500);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Scrollbar */
.sidebar-menu::-webkit-scrollbar {
  width: 6px;
}

.sidebar-menu::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background: var(--surface-border);
  border-radius: 3px;
}

@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }

  .admin-sidebar.visible {
    transform: translateX(0);
  }
}
</style>
