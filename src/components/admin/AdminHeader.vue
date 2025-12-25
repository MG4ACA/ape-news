<template>
  <div class="admin-header">
    <div class="header-left">
      <Button
        icon="pi pi-bars"
        text
        rounded
        @click="$emit('toggle-sidebar')"
        class="sidebar-toggle"
      />
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>

    <div class="header-right">
      <!-- Notifications -->
      <Button
        icon="pi pi-bell"
        text
        rounded
        severity="secondary"
        v-badge="3"
        @click="toggleNotifications"
      />

      <!-- Theme Toggle -->
      <Button
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        text
        rounded
        severity="secondary"
        @click="toggleTheme"
      />

      <!-- User Menu -->
      <div class="user-menu">
        <Button
          :label="authStore.user?.full_name || 'Admin'"
          icon="pi pi-user"
          text
          @click="toggleUserMenu"
          class="user-button"
        />
        <Menu ref="userMenuRef" :model="userMenuItems" :popup="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { usePrimeVue } from 'primevue/config';

defineEmits(['toggle-sidebar']);

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const primeVue = usePrimeVue();
const userMenuRef = ref();

const isDark = computed(() => primeVue.config.theme?.preset === 'Aura');

const pageTitle = computed(() => {
  const titles = {
    '/admin': 'Dashboard',
    '/admin/news': 'News Management',
    '/admin/categories': 'Categories',
    '/admin/comments': 'Comment Moderation',
    '/admin/videos': 'Video Gallery',
    '/admin/ads': 'Advertisements',
    '/admin/analytics': 'Analytics',
    '/admin/users': 'User Management',
  };

  // Find matching route
  for (const [path, title] of Object.entries(titles)) {
    if (route.path === path || route.path.startsWith(path + '/')) {
      return title;
    }
  }

  return 'Admin Panel';
});

const userMenuItems = [
  {
    label: authStore.user?.full_name || 'Admin',
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => router.push('/profile'),
      },
      {
        label: 'View Site',
        icon: 'pi pi-home',
        command: () => router.push('/'),
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: async () => {
          await authStore.logout();
          router.push('/login');
        },
      },
    ],
  },
];

const toggleUserMenu = (event) => {
  userMenuRef.value.toggle(event);
};

const toggleNotifications = () => {
  // TODO: Implement notifications
  console.log('Notifications clicked');
};

const toggleTheme = () => {
  const element = document.querySelector('html');
  const currentTheme = element.classList.contains('dark-mode') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  if (newTheme === 'dark') {
    element.classList.add('dark-mode');
  } else {
    element.classList.remove('dark-mode');
  }
  
  localStorage.setItem('theme', newTheme);
};
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 70px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-toggle {
  display: none;
}

.page-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-menu {
  position: relative;
}

.user-button {
  font-weight: 500;
}

@media (max-width: 768px) {
  .admin-header {
    padding: 1rem;
  }

  .sidebar-toggle {
    display: inline-flex;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .user-button :deep(.p-button-label) {
    display: none;
  }
}
</style>
