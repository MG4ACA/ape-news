<template>
  <div class="search-view py-6">
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">Search Articles</h1>

      <!-- Search Input -->
      <div class="search-box mb-5">
        <div class="p-inputgroup">
          <InputText
            v-model="searchQuery"
            placeholder="Search for news articles..."
            @keyup.enter="handleSearch"
            class="text-lg"
          />
          <Button
            icon="pi pi-search"
            label="Search"
            @click="handleSearch"
            :loading="newsStore.loading"
          />
        </div>
      </div>

      <LoadingSpinner v-if="newsStore.loading" message="Searching..." />

      <ErrorMessage
        v-else-if="newsStore.error"
        :error="newsStore.error"
        @close="newsStore.clearError"
      />

      <div v-else-if="hasSearched">
        <div class="search-results-header mb-4">
          <p class="text-xl text-color-secondary">
            Found {{ newsStore.pagination.total }} result{{
              newsStore.pagination.total !== 1 ? 's' : ''
            }}
            <span v-if="searchQuery">for "{{ searchQuery }}"</span>
          </p>
        </div>

        <div v-if="newsStore.newsList.length > 0">
          <div class="grid">
            <div
              v-for="article in newsStore.newsList"
              :key="article.id"
              class="col-12 md:col-6 lg:col-4"
            >
              <NewsCard :article="article" />
            </div>
          </div>

          <Pagination
            :page="newsStore.pagination.page"
            :limit="newsStore.pagination.limit"
            :total="newsStore.pagination.total"
            :totalPages="newsStore.pagination.totalPages"
            @page-change="handlePageChange"
          />
        </div>

        <div v-else class="text-center py-8">
          <i class="pi pi-search text-6xl text-color-secondary mb-4"></i>
          <h3 class="text-2xl mb-2">No Results Found</h3>
          <p class="text-color-secondary">Try different keywords</p>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <i class="pi pi-search text-6xl text-color-secondary mb-4"></i>
        <h3 class="text-2xl mb-2">Search for News</h3>
        <p class="text-color-secondary">Enter keywords to find articles</p>
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
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const newsStore = useNewsStore();

const searchQuery = ref(route.query.q || '');
const hasSearched = ref(false);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;

  hasSearched.value = true;
  newsStore.setPage(1);

  // Update URL with search query
  router.push({ query: { q: searchQuery.value } });

  try {
    await newsStore.searchNews(searchQuery.value);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

const handlePageChange = (page) => {
  newsStore.setPage(page);
  newsStore.searchNews(searchQuery.value);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  if (searchQuery.value) {
    handleSearch();
  }
});
</script>

<style scoped>
.search-box {
  max-width: 600px;
  margin: 0 auto;
}
</style>
