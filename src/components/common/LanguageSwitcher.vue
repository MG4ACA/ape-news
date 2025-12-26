<template>
  <div ref="dropdownRef" class="language-switcher-container">
    <!-- Globe Icon Button -->
    <button @click="toggleDropdown" class="globe-button">
      <img src="/globe-icon.png" alt="Language" class="globe-icon" />
    </button>

    <!-- Language Options Menu -->
    <Transition name="fade">
      <div v-if="isOpen" class="language-menu">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="['language-option', { active: locale === lang.code }]"
        >
          {{ lang.display }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref(null);

const languages = [
  { code: 'si', name: 'Sinhala', native: 'සිංහල', display: 'SI' },
  { code: 'en', name: 'English', native: 'English', display: 'EN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', display: 'TA' },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem('locale', newLocale);
  document.documentElement.setAttribute('lang', newLocale);
  isOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.language-switcher-container {
  position: relative;
  z-index: 500;
}

.globe-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.globe-button:hover {
  transform: scale(1.05);
}

.globe-icon {
  width: 2.5rem;
  object-fit: contain;
}

.language-menu {
  position: absolute;
  right: 0;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0.25rem;
}

.language-option {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  color: #374151;
}

.language-option:hover {
  background: #f9fafb;
}

.language-option.active {
  background: #075b95;
  color: white;
}

.language-option.active:hover {
  background: #075b95;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
