<template>
  <div class="auth-page flex align-items-center justify-content-center min-h-screen py-8">
    <div class="container">
      <Card class="auth-card max-w-30rem mx-auto">
        <template #header>
          <div class="text-center pt-4">
            <img src="/logo.png" alt="APE News Logo" class="mb-3" style="height: 60px" />
            <h2 class="text-3xl font-bold mb-2">Welcome Back</h2>
            <p class="text-color-secondary">Sign in to your account</p>
          </div>
        </template>

        <template #content>
          <ErrorMessage v-if="errorMessage" :error="errorMessage" @close="errorMessage = ''" />

          <form @submit.prevent="handleLogin" class="flex flex-column gap-4">
            <div class="field">
              <label for="email" class="font-semibold mb-2 block">Email</label>
              <InputText
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="Enter your email"
                class="w-full"
                :class="{ 'p-invalid': errors.email }"
                required
              />
              <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
            </div>

            <div class="field">
              <label for="password" class="font-semibold mb-2 block">Password</label>
              <InputText
                id="password"
                v-model="formData.password"
                type="password"
                placeholder="Enter your password"
                class="w-full"
                :class="{ 'p-invalid': errors.password }"
                required
              />
              <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
            </div>

            <Button
              type="submit"
              label="Sign In"
              class="w-full"
              :loading="loading"
              :disabled="loading"
            />
          </form>

          <div class="text-center mt-4">
            <p class="text-color-secondary">
              Don't have an account?
              <router-link to="/register" class="text-primary font-semibold no-underline">
                Sign Up
              </router-link>
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import { useAuthStore } from '@/stores/auth';
import { isValidEmail } from '@/utils/validators';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const toast = useToast();

const formData = ref({
  email: '',
  password: '',
});

const errors = ref({
  email: '',
  password: '',
});

const errorMessage = ref('');
const loading = ref(false);

const validateForm = () => {
  errors.value = {
    email: '',
    password: '',
  };

  let isValid = true;

  if (!formData.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = 'Invalid email format';
    isValid = false;
  }

  if (!formData.value.password) {
    errors.value.password = 'Password is required';
    isValid = false;
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters';
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    await authStore.login({
      email: formData.value.email,
      password: formData.value.password,
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful!',
      life: 3000,
    });

    // Redirect to intended page or home
    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please try again.';
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage.value,
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  background: var(--surface-ground);
}

.auth-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.field {
  margin-bottom: 1rem;
}
</style>
