<template>
  <Message v-if="error" :severity="severity" :closable="closable" @close="handleClose">
    <strong v-if="title">{{ title }}</strong>
    <p class="m-0">{{ error }}</p>
  </Message>
</template>

<script setup>
import Message from 'primevue/message';

defineProps({
  error: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  severity: {
    type: String,
    default: 'error',
    validator: (value) => ['success', 'info', 'warn', 'error'].includes(value),
  },
  closable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};
</script>
