<template>
  <footer class="site-footer py-8 mt-8 surface-100">
    <div class="container mx-auto px-4">
      <div class="grid">
        <!-- Logo and Description -->
        <div class="col-12 md:col-4 mb-4">
          <div class="flex align-items-center gap-2 mb-4">
            <img src="/logo.png" alt="APE News Logo" class="logo-footer" style="height: 40px" />
            <span class="text-xl font-bold">APE News</span>
          </div>
          <p class="text-color-secondary line-height-3">
            Your trusted source for the latest news and updates. Stay informed with breaking news,
            in-depth analysis, and comprehensive coverage.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="col-12 md:col-4 mb-4">
          <h3 class="text-lg font-bold mb-4">Quick Links</h3>
          <ul class="list-none p-0">
            <li class="mb-2">
              <router-link to="/" class="text-color-secondary hover:text-primary no-underline">
                Home
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/news" class="text-color-secondary hover:text-primary no-underline">
                All News
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/videos"
                class="text-color-secondary hover:text-primary no-underline"
              >
                Videos
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/about" class="text-color-secondary hover:text-primary no-underline">
                About Us
              </router-link>
            </li>
            <li class="mb-2">
              <router-link
                to="/contact"
                class="text-color-secondary hover:text-primary no-underline"
              >
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="col-12 md:col-4 mb-4">
          <h3 class="text-lg font-bold mb-4">Connect With Us</h3>
          <div class="flex gap-3 mb-4">
            <a href="#" class="text-2xl text-color-secondary hover:text-primary">
              <i class="pi pi-facebook"></i>
            </a>
            <a href="#" class="text-2xl text-color-secondary hover:text-primary">
              <i class="pi pi-twitter"></i>
            </a>
            <a href="#" class="text-2xl text-color-secondary hover:text-primary">
              <i class="pi pi-linkedin"></i>
            </a>
            <a href="#" class="text-2xl text-color-secondary hover:text-primary">
              <i class="pi pi-instagram"></i>
            </a>
            <a href="#" class="text-2xl text-color-secondary hover:text-primary">
              <i class="pi pi-youtube"></i>
            </a>
          </div>
          <p class="text-color-secondary text-sm">Subscribe to our newsletter for daily updates</p>
          <div class="flex gap-2 mt-2">
            <InputText placeholder="Your email" class="flex-1" />
            <Button label="Subscribe" icon="pi pi-send" />
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-top-1 surface-border pt-4 mt-4">
        <div class="flex flex-wrap justify-content-between align-items-center gap-3">
          <p class="text-color-secondary text-sm m-0">
            © {{ currentYear }} APE News. All rights reserved.
          </p>
          <div class="flex gap-4">
            <router-link
              to="/privacy"
              class="text-color-secondary hover:text-primary no-underline text-sm"
            >
              Privacy Policy
            </router-link>
            <router-link
              to="/terms"
              class="text-color-secondary hover:text-primary no-underline text-sm"
            >
              Terms of Service
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--surface-border);
}

.logo-footer {
  width: auto;
  object-fit: contain;
}
</style>
