<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const theme = ref(localStorage.getItem('lumicore-theme') || 'light');

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('lumicore-theme', theme.value);
};

onMounted(applyTheme);
watch(theme, applyTheme);

const navItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/'),
  },
  {
    label: 'Services',
    icon: 'pi pi-th-large',
    command: () => router.push('/services'),
  },
  {
    label: 'Portfolio',
    icon: 'pi pi-images',
    command: () => router.push('/portfolio'),
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => router.push('/about'),
  },
  {
    label: 'Contact',
    icon: 'pi pi-send',
    command: () => router.push('/contact'),
  },
]);

const homeAnchors = [
  { icon: 'pi pi-sparkles', href: '#hero', label: 'Top' },
  { icon: 'pi pi-chart-line', href: '#stats', label: 'Stats' },
  { icon: 'pi pi-th-large', href: '#services', label: 'Services' },
  { icon: 'pi pi-cog', href: '#process', label: 'Process' },
  { icon: 'pi pi-star', href: '#testimonials', label: 'Love' },
  { icon: 'pi pi-book', href: '#blog', label: 'Blog' },
  { icon: 'pi pi-send', href: '#cta', label: 'CTA' },
];

const servicesAnchors = [
  { icon: 'pi pi-th-large', href: '#services', label: 'Services' },
  { icon: 'pi pi-shield', href: '#differentiators', label: 'Differentiators' },
  { icon: 'pi pi-question-circle', href: '#faq', label: 'FAQ' },
  { icon: 'pi pi-send', href: '#cta', label: 'CTA' },
];

const portfolioAnchors = [
  { icon: 'pi pi-images', href: '#portfolio', label: 'Portfolio' },
  { icon: 'pi pi-send', href: '#cta', label: 'CTA' },
];

const aboutAnchors = [
  { icon: 'pi pi-heart', href: '#values', label: 'Values' },
  { icon: 'pi pi-clock', href: '#timeline', label: 'Timeline' },
];

const contactAnchors = [{ icon: 'pi pi-send', href: '#contact', label: 'Contact' }];

const anchors = computed(() => {
  switch (route.name) {
    case 'home':
      return homeAnchors;
    case 'services':
      return servicesAnchors;
    case 'portfolio':
      return portfolioAnchors;
    case 'about':
      return aboutAnchors;
    case 'contact':
      return contactAnchors;
    default:
      return [];
  }
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
          <div class="col-12 md:col-4 mb-4">
            <div class="flex align-items-center gap-2 mb-4">
              <img src="/logo.png" alt="Lumicore Logo" class="logo-footer" />
              <span class="text-xl font-bold">Lumicore</span>
            </div>
            <p class="opacity-80">
              AI-first software, bold experiences, and resilient platforms for modern businesses.
            </p>
          </div>
          <div class="col-12 md:col-4 mb-4">
            <h3 class="text-lg font-bold mb-4">Quick Links</h3>
            <ul class="list-none p-0 opacity-80">
              <li class="mb-2"><router-link to="/services">Services</router-link></li>
              <li class="mb-2"><router-link to="/portfolio">Portfolio</router-link></li>
              <li class="mb-2"><router-link to="/about">About</router-link></li>
              <li class="mb-2"><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
          <div class="col-12 md:col-4 mb-4">
            <h3 class="text-lg font-bold mb-4">Connect</h3>
            <div class="flex gap-3">
              <i class="pi pi-facebook text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-twitter text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-linkedin text-xl cursor-pointer hover:text-accent"></i>
              <i class="pi pi-instagram text-xl cursor-pointer hover:text-accent"></i>
            </div>
            <p class="mt-4 opacity-80">© 2025 Lumicore Labs. All rights reserved.</p>
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
