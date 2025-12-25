<template>
  <div class="auth-page flex align-items-center justify-content-center min-h-screen py-8">
    <div class="container">
      <Card class="auth-card max-w-30rem mx-auto">
        <template #header>
          <div class="text-center pt-4">
            <img src="/logo.png" alt="APE News Logo" class="mb-3" style="height: 60px" />
            <h2 class="text-3xl font-bold mb-2">Create Account</h2>
            <p class="text-color-secondary">Join APE News today</p>
          </div>
        </template>

        <template #content>
          <ErrorMessage v-if="errorMessage" :error="errorMessage" @close="errorMessage = ''" />

          <form @submit.prevent="handleRegister" class="flex flex-column gap-4">
            <div class="field">
              <label for="fullname" class="font-semibold mb-2 block">Full Name</label>
              <InputText
                id="fullname"
                v-model="formData.full_name"
                placeholder="Enter your full name"
                class="w-full"
                :class="{ 'p-invalid': errors.full_name }"
                required
              />
              <small v-if="errors.full_name" class="p-error">{{ errors.full_name }}</small>
            </div>

            <div class="field">
              <label for="username" class="font-semibold mb-2 block">Username</label>
              <InputText
                id="username"
                v-model="formData.username"
                placeholder="Choose a username"
                class="w-full"
                :class="{ 'p-invalid': errors.username }"
                required
              />
              <small v-if="errors.username" class="p-error">{{ errors.username }}</small>
            </div>

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
                placeholder="Create a password"
                class="w-full"
                :class="{ 'p-invalid': errors.password }"
                required
              />
              <small v-if="errors.password" class="p-error">{{ errors.password }}</small>
            </div>

            <div class="field">
              <label for="confirmPassword" class="font-semibold mb-2 block">Confirm Password</label>
              <InputText
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                placeholder="Confirm your password"
                class="w-full"
                :class="{ 'p-invalid': errors.confirmPassword }"
                required
              />
              <small v-if="errors.confirmPassword" class="p-error">
                {{ errors.confirmPassword }}
              </small>
            </div>

            <Button
              type="submit"
              label="Create Account"
              class="w-full"
              :loading="loading"
              :disabled="loading"
            />
          </form>

          <div class="text-center mt-4">
            <p class="text-color-secondary">
              Already have an account?
              <router-link to="/login" class="text-primary font-semibold no-underline">
                Sign In
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
import { isValidEmail, validatePassword, validateUsername } from '@/utils/validators';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const formData = ref({
  full_name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = ref({
  full_name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage = ref('');
const loading = ref(false);

const validateForm = () => {
  errors.value = {
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  let isValid = true;

  if (!formData.value.full_name) {
    errors.value.full_name = 'Full name is required';
    isValid = false;
  }

  const usernameValidation = validateUsername(formData.value.username);
  if (!usernameValidation.valid) {
    errors.value.username = usernameValidation.error;
    isValid = false;
  }

  if (!formData.value.email) {
    errors.value.email = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = 'Invalid email format';
    isValid = false;
  }

  const passwordValidation = validatePassword(formData.value.password);
  if (!passwordValidation.valid) {
    errors.value.password = passwordValidation.error;
    isValid = false;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  errorMessage.value = '';

  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    await authStore.register({
      full_name: formData.value.full_name,
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
    });

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Account created successfully! Please login.',
      life: 3000,
    });

    // Redirect to login
    router.push('/login');
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.';
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
