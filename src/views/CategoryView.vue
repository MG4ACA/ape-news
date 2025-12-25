<template>
  <div class="category-view py-6">
    <div class="container">
      <LoadingSpinner v-if="categoryStore.loading || newsStore.loading" message="Loading..." />

      <ErrorMessage
        v-else-if="categoryStore.error || newsStore.error"
        :error="categoryStore.error || newsStore.error"
        @close="clearErrors"
      />

      <div v-else>
        <!-- Category Header -->
        <div v-if="category" class="category-header mb-5">
          <!-- Breadcrumb -->
          <nav class="breadcrumb mb-3">
            <router-link to="/" class="text-color-secondary">Home</router-link>
            <span class="mx-2">/</span>
            <span v-for="(cat, index) in categoryPath" :key="cat.id">
              <router-link
                v-if="index < categoryPath.length - 1"
                :to="`/category/${cat.id}`"
                class="text-color-secondary"
              >
                {{ cat.name }}
              </router-link>
              <span v-else>{{ cat.name }}</span>
              <span v-if="index < categoryPath.length - 1" class="mx-2">/</span>
            </span>
          </nav>

          <h1 class="text-4xl font-bold mb-2">{{ category.name }}</h1>
          <p v-if="category.description" class="text-xl text-color-secondary">
            {{ category.description }}
          </p>
        </div>

        <!-- Subcategories -->
        <div v-if="subcategories.length > 0" class="subcategories mb-5">
          <h3 class="text-xl font-semibold mb-3">Browse by subcategory:</h3>
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="subcat in subcategories"
              :key="subcat.id"
              :label="subcat.name"
              @click="$router.push(`/category/${subcat.id}`)"
              outlined
              size="small"
            />
          </div>
        </div>

        <!-- News Grid -->
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
          <i class="pi pi-inbox text-6xl text-color-secondary mb-4"></i>
          <h3 class="text-2xl mb-2">No Articles in This Category</h3>
          <p class="text-color-secondary">Check back later for new content</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Pagination from '@/components/common/Pagination.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import { useCategoryStore } from '@/stores/categories';
import { useNewsStore } from '@/stores/news';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const newsStore = useNewsStore();
const categoryStore = useCategoryStore();

const category = computed(() => categoryStore.currentCategory);
const categoryPath = computed(() =>
  category.value ? categoryStore.getCategoryPath(category.value.id) : []
);
const subcategories = computed(() =>
  category.value ? categoryStore.getSubcategories(category.value.id) : []
);

const fetchData = async () => {
  const categoryId = route.params.id;
  try {
    await categoryStore.fetchCategoryById(categoryId);
    await newsStore.fetchNewsByCategory(categoryId);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const handlePageChange = (page) => {
  newsStore.setPage(page);
  newsStore.fetchNewsByCategory(route.params.id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const clearErrors = () => {
  categoryStore.clearError();
  newsStore.clearError();
};

onMounted(() => {
  if (categoryStore.categories.length === 0) {
    categoryStore.fetchCategories();
  }
  fetchData();
});

watch(
  () => route.params.id,
  () => {
    if (route.name === 'category') {
      newsStore.setPage(1);
      fetchData();
    }
  }
);
</script>

<style scoped>
.breadcrumb a {
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}
</style>
