<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const theme = ref(localStorage.getItem('ape-news-theme') || 'light');

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('ape-news-theme', theme.value);
};

onMounted(applyTheme);
watch(theme, applyTheme);

const navItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/'),
  },
]);

const anchors = computed(() => {
  return [];
});
</script>

<template>
  <div class="app-container">
    <header class="sticky top-0 z-5 app-header" style="height: var(--nav-height)">
      <Menubar :model="navItems" class="border-round-xl px-3 py-2 menubar-custom">
        <template #start>
          <div class="flex align-items-center gap-2 cursor-pointer" @click="router.push('/')">
            <img src="/logo.png" alt="Lumicore Logo" class="logo-header" />
          </div>
        </template>
        <template #end>
          <div class="flex align-items-center gap-3">
            <div class="flex align-items-center gap-2">
              <i :class="['pi', theme === 'dark' ? 'pi-moon' : 'pi-sun', 'text-secondary']"></i>
              <InputSwitch v-model="theme" true-value="dark" false-value="light" />
            </div>
          </div>
        </template>
      </Menubar>
    </header>

    <nav class="side-rail" aria-label="Section quick nav">
      <a v-for="link in anchors" :key="link.href" :href="link.href" :title="link.label">
        <i :class="link.icon"></i>
      </a>
    </nav>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="site-footer py-8 mt-8">
      <div class="container">
        <div class="grid">
          <div class="col-12 md:col-6 mb-4">
            <div class="flex align-items-center gap-2 mb-4">
              <img src="/logo.png" alt="APE News Logo" class="logo-footer" />
              <span class="text-xl font-bold">APE News</span>
            </div>
            <p class="opacity-80">Your trusted source for the latest news and updates.</p>
          </div>
          <div class="col-12 md:col-6 mb-4">
            <h3 class="text-lg font-bold mb-4">Connect</h3>
            <div class="flex gap-3">
              <i class="pi pi-facebook text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-twitter text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-linkedin text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-instagram text-xl cursor-pointer hover:text-accent"></i>
            </div>
            <p class="mt-4 opacity-80">© 2025 APE News. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
}
</style>
