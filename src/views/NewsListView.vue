<template>
  <div class="news-list-view py-6">
    <div class="container">
      <div class="flex justify-content-between align-items-center mb-5">
        <h1 class="text-4xl font-bold m-0">All News</h1>
        <div class="flex gap-2">
          <Button
            label="Latest"
            :outlined="sortBy !== 'latest'"
            @click="sortBy = 'latest'"
            size="small"
          />
          <Button
            label="Popular"
            :outlined="sortBy !== 'popular'"
            @click="sortBy = 'popular'"
            size="small"
          />
        </div>
      </div>

      <LoadingSpinner v-if="newsStore.loading" message="Loading news..." />

      <ErrorMessage
        v-else-if="newsStore.error"
        :error="newsStore.error"
        @close="newsStore.clearError"
      />

      <div v-else>
        <div class="grid" v-if="newsStore.newsList.length > 0">
          <div
            v-for="article in newsStore.newsList"
            :key="article.id"
            class="col-12 md:col-6 lg:col-4"
          >
            <NewsCard :article="article" />
          </div>
        </div>

        <div v-else class="text-center py-8">
          <i class="pi pi-inbox text-6xl text-color-secondary mb-4"></i>
          <h3 class="text-2xl mb-2">No Articles Found</h3>
          <p class="text-color-secondary">Check back later for new content</p>
        </div>

        <Pagination
          v-if="newsStore.newsList.length > 0"
          :page="newsStore.pagination.page"
          :limit="newsStore.pagination.limit"
          :total="newsStore.pagination.total"
          :totalPages="newsStore.pagination.totalPages"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Pagination from '@/components/common/Pagination.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import { useNewsStore } from '@/stores/news';
import { onMounted, ref, watch } from 'vue';

const newsStore = useNewsStore();
const sortBy = ref('latest');

const fetchNews = async () => {
  try {
    await newsStore.fetchNews({ sort: sortBy.value });
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }
};

const handlePageChange = (page) => {
  newsStore.setPage(page);
  fetchNews();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(sortBy, () => {
  newsStore.setPage(1);
  fetchNews();
});

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.news-list-view {
  min-height: 60vh;
}
</style>
