<template>
  <div class="profile-view py-6">
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">My Profile</h1>

      <LoadingSpinner v-if="userStore.loading" message="Loading profile..." />

      <ErrorMessage
        v-else-if="userStore.error"
        :error="userStore.error"
        @close="userStore.clearError"
      />

      <div v-else class="grid">
        <div class="col-12 lg:col-8">
          <Card>
            <template #title>Profile Information</template>
            <template #content>
              <form @submit.prevent="handleUpdateProfile" class="flex flex-column gap-4">
                <div class="field">
                  <label for="fullname" class="font-semibold mb-2 block">Full Name</label>
                  <InputText id="fullname" v-model="formData.full_name" class="w-full" />
                </div>

                <div class="field">
                  <label for="username" class="font-semibold mb-2 block">Username</label>
                  <InputText id="username" v-model="formData.username" class="w-full" disabled />
                  <small class="text-color-secondary">Username cannot be changed</small>
                </div>

                <div class="field">
                  <label for="email" class="font-semibold mb-2 block">Email</label>
                  <InputText id="email" v-model="formData.email" type="email" class="w-full" />
                </div>

                <div class="field">
                  <label for="bio" class="font-semibold mb-2 block">Bio</label>
                  <Textarea
                    id="bio"
                    v-model="formData.bio"
                    rows="4"
                    class="w-full"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div class="flex gap-2">
                  <Button type="submit" label="Save Changes" :loading="saving" :disabled="saving" />
                  <Button
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    outlined
                    @click="loadProfile"
                  />
                </div>
              </form>
            </template>
          </Card>
        </div>

        <div class="col-12 lg:col-4">
          <Card>
            <template #title>Account Details</template>
            <template #content>
              <div class="flex flex-column gap-3">
                <div>
                  <span class="font-semibold">Role:</span>
                  <span class="ml-2 text-capitalize">{{ authStore.userRole }}</span>
                </div>
                <div>
                  <span class="font-semibold">Member Since:</span>
                  <span class="ml-2">{{ formatDate(authStore.user?.created_at, 'short') }}</span>
                </div>
                <div>
                  <span class="font-semibold">Bookmarks:</span>
                  <span class="ml-2">{{ userStore.bookmarks.length }}</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { formatDate } from '@/utils/dateFormatter';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const formData = ref({
  full_name: '',
  username: '',
  email: '',
  bio: '',
});

const saving = ref(false);

const loadProfile = () => {
  if (authStore.user) {
    formData.value = {
      full_name: authStore.user.full_name || '',
      username: authStore.user.username || '',
      email: authStore.user.email || '',
      bio: authStore.user.bio || '',
    };
  }
};

const handleUpdateProfile = async () => {
  saving.value = true;

  try {
    await userStore.updateProfile({
      full_name: formData.value.full_name,
      email: formData.value.email,
      bio: formData.value.bio,
    });

    // Update auth store user
    await authStore.getCurrentUser();

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile updated successfully!',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || 'Failed to update profile',
      life: 5000,
    });
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadProfile();
  userStore.fetchBookmarks();
});
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
