<template>
  <header class="sticky top-0 z-5 app-header" style="height: var(--nav-height)">
    <Menubar :model="navItems" class="border-round-xl px-3 py-2 menubar-custom">
      <template #start>
        <div class="flex align-items-center gap-2 cursor-pointer" @click="$router.push('/')">
          <img src="/logo.png" alt="APE News Logo" class="logo-header" style="height: 40px" />
          <span class="text-xl font-bold hidden md:inline">APE News</span>
        </div>
      </template>

      <template #item="{ item }">
        <a @click="item.command" class="p-menuitem-link">
          <span :class="item.icon" />
          <span class="p-menuitem-text">{{ item.label }}</span>
        </a>
      </template>

      <template #end>
        <div class="flex align-items-center gap-3">
          <!-- Search Icon -->
          <Button
            icon="pi pi-search"
            text
            rounded
            severity="secondary"
            @click="$router.push('/search')"
            v-tooltip.bottom="'Search'"
          />

          <!-- Theme Toggle -->
          <div class="flex align-items-center gap-2">
            <i :class="['pi', theme === 'dark' ? 'pi-moon' : 'pi-sun', 'text-secondary']"></i>
            <InputSwitch v-model="theme" true-value="dark" false-value="light" />
          </div>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="flex align-items-center gap-2">
            <Button
              :label="authStore.user?.full_name || authStore.user?.username"
              icon="pi pi-user"
              text
              @click="toggleUserMenu"
              aria-haspopup="true"
              :aria-controls="userMenuId"
            />
            <Menu ref="userMenu" :id="userMenuId" :model="userMenuItems" :popup="true" />
          </div>

          <!-- Login Button -->
          <Button v-else label="Login" icon="pi pi-sign-in" @click="$router.push('/login')" />
        </div>
      </template>
    </Menubar>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useCategoryStore } from '@/stores/categories';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const categoryStore = useCategoryStore();

const theme = ref(localStorage.getItem('ape-news-theme') || 'light');
const userMenu = ref();
const userMenuId = 'user-menu';

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('ape-news-theme', theme.value);
};

onMounted(async () => {
  applyTheme();
  // Fetch categories for navigation
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories();
  }
});

watch(theme, applyTheme);

const navItems = computed(() => {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => router.push('/'),
    },
    {
      label: 'News',
      icon: 'pi pi-list',
      command: () => router.push('/news'),
    },
  ];

  // Add categories as submenu
  if (categoryStore.rootCategories.length > 0) {
    items.push({
      label: 'Categories',
      icon: 'pi pi-tag',
      items: categoryStore.rootCategories.map((cat) => ({
        label: cat.name,
        command: () => router.push(`/category/${cat.id}`),
      })),
    });
  }

  items.push({
    label: 'Videos',
    icon: 'pi pi-video',
    command: () => router.push('/videos'),
  });

  // Add admin link if user is admin
  if (authStore.isAdmin) {
    items.push({
      label: 'Admin Panel',
      icon: 'pi pi-cog',
      command: () => router.push('/admin'),
    });
  }

  return items;
});

const userMenuItems = computed(() => [
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => router.push('/profile'),
  },
  {
    label: 'Bookmarks',
    icon: 'pi pi-bookmark',
    command: () => router.push('/bookmarks'),
  },
  {
    separator: true,
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      authStore.logout();
      router.push('/');
    },
  },
]);

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event);
};
</script>

<style scoped>
.logo-header {
  width: auto;
  object-fit: contain;
}
</style>
