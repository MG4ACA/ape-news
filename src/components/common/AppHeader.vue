<template>
  <header class="sticky top-0 app-header m-2" style="height: var(--nav-height)">
    <div
      class="logo-container flex align-items-center gap-2 cursor-pointer"
      @click="$router.push('/')"
    >
      <img src="/logo.png" alt="APE News Logo" class="logo-header" />
    </div>
    <Menubar :model="navItems" class="border-round-xl px-3 py-2 menubar-custom">
      <template #item="{ item }">
        <a @click="item.command" class="p-menuitem-link">
          <span :class="item.icon" />
          <span class="p-menuitem-text">{{ item.label }}</span>
        </a>
      </template>

      <template #end>
        <div class="flex align-items-center gap-3">
          <!-- Language Switcher -->
          <LanguageSwitcher />

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
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue';
import { useAuthStore } from '@/stores/auth';
import { useCategoryStore } from '@/stores/categories';
import { getLocalizedField } from '@/utils/i18nHelpers';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
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
      label: '',
      icon: 'pi pi-home',
      command: () => router.push('/'),
    },
    {
      label: t('nav.news'),
      command: () => router.push('/news'),
    },
  ];

  // Add first 6 categories as individual menu items
  if (categoryStore.rootCategories.length > 0) {
    const visibleCategories = categoryStore.rootCategories.slice(0, 6);
    const remainingCategories = categoryStore.rootCategories.slice(6);

    // Add visible categories as individual items
    visibleCategories.forEach((cat) => {
      items.push({
        label: getLocalizedField(cat, 'name', locale.value),
        command: () => router.push(`/category/${cat.id}`),
      });
    });

    // Add "More" dropdown for remaining categories
    if (remainingCategories.length > 0) {
      items.push({
        label: t('nav.more'),
        items: remainingCategories.map((cat) => ({
          label: getLocalizedField(cat, 'name', locale.value),
          command: () => router.push(`/category/${cat.id}`),
        })),
      });
    }
  }

  items.push({
    label: t('nav.videos'),
    command: () => router.push('/videos'),
  });

  // Add admin link if user is admin
  if (authStore.isAdmin) {
    items.push({
      // label: t('nav.admin'),
      icon: 'pi pi-cog',
      command: () => router.push('/admin'),
    });
  }

  return items;
});

const userMenuItems = computed(() => [
  {
    label: t('nav.profile'),
    icon: 'pi pi-user',
    command: () => router.push('/profile'),
  },
  {
    label: t('news.bookmarks'),
    icon: 'pi pi-bookmark',
    command: () => router.push('/bookmarks'),
  },
  {
    separator: true,
  },
  {
    label: t('nav.logout'),
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

<style scoped lang="scss">
.logo-header {
  width: auto;
  object-fit: contain;
}

:deep(.menubar-custom .p-menuitem-text) {
  font-size: 0.875rem;
}

.logo-container {
  position: absolute;
  z-index: 300;
}

header {
  z-index: 200;
}
</style>
