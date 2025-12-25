<template>
  <div class="loading-spinner-container">
    <ProgressSpinner v-if="!inline" style="width: 50px; height: 50px" strokeWidth="4" />
    <ProgressSpinner
      v-else
      style="width: 30px; height: 30px"
      strokeWidth="4"
      class="inline-spinner"
    />
    <p v-if="message" class="mt-3 text-color-secondary">{{ message }}</p>
  </div>
</template>

<script setup>
import ProgressSpinner from 'primevue/progressspinner';

defineProps({
  message: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.inline-spinner {
  display: inline-block;
}
</style>
