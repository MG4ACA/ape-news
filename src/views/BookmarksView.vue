<template>
  <div class="bookmarks-view py-6">
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">My Bookmarks</h1>

      <LoadingSpinner v-if="userStore.loading" message="Loading bookmarks..." />

      <ErrorMessage
        v-else-if="userStore.error"
        :error="userStore.error"
        @close="userStore.clearError"
      />

      <div v-else>
        <div v-if="userStore.bookmarks.length > 0">
          <div class="grid">
            <div
              v-for="bookmark in userStore.bookmarks"
              :key="bookmark.id"
              class="col-12 md:col-6 lg:col-4"
            >
              <NewsCard :article="bookmark.news" />
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <i class="pi pi-bookmark text-6xl text-color-secondary mb-4"></i>
          <h3 class="text-2xl mb-2">No Bookmarks Yet</h3>
          <p class="text-color-secondary mb-4">Save articles you want to read later</p>
          <Button label="Browse Articles" icon="pi pi-arrow-right" @click="$router.push('/news')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchBookmarks();
});
</script>
