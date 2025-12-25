<template>
  <div class="home-view">
    <LoadingSpinner v-if="loading" message="Loading..." />

    <div v-else>
      <!-- Breaking News Banner -->
      <section
        v-if="newsStore.breakingNews.length > 0"
        class="breaking-news-section bg-red-500 py-2"
      >
        <div class="container">
          <div class="flex align-items-center gap-2">
            <span class="font-bold text-white">BREAKING:</span>
            <div class="flex-1 overflow-hidden">
              <router-link
                :to="`/news/${newsStore.breakingNews[0].id}`"
                class="text-white no-underline hover:underline"
              >
                {{ newsStore.breakingNews[0].title }}
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured News Section -->
      <section v-if="newsStore.featuredNews.length > 0" class="featured-section py-6 bg-surface-50">
        <div class="container">
          <h2 class="text-3xl font-bold mb-4">Featured Stories</h2>
          <div class="grid">
            <!-- Main Featured -->
            <div class="col-12 lg:col-8">
              <Card
                class="featured-main cursor-pointer h-full"
                @click="$router.push(`/news/${newsStore.featuredNews[0].id}`)"
              >
                <template #header>
                  <div class="featured-main-image">
                    <img
                      v-if="newsStore.featuredNews[0].featured_image"
                      :src="getImageUrl(newsStore.featuredNews[0].featured_image)"
                      :alt="newsStore.featuredNews[0].title"
                      class="w-full"
                    />
                  </div>
                </template>
                <template #title>
                  <h3 class="text-3xl">{{ newsStore.featuredNews[0].title }}</h3>
                </template>
                <template #content>
                  <p class="text-xl text-color-secondary line-height-3">
                    {{ newsStore.featuredNews[0].excerpt }}
                  </p>
                  <div class="flex gap-3 text-color-secondary mt-3">
                    <span>
                      <i class="pi pi-user mr-1"></i>
                      {{ newsStore.featuredNews[0].author_name }}
                    </span>
                    <span>
                      <i class="pi pi-calendar mr-1"></i>
                      {{ formatDate(newsStore.featuredNews[0].published_at, 'relative') }}
                    </span>
                  </div>
                </template>
              </Card>
            </div>

            <!-- Side Featured -->
            <div class="col-12 lg:col-4">
              <div class="flex flex-column gap-3 h-full">
                <Card
                  v-for="(article, index) in newsStore.featuredNews.slice(1, 3)"
                  :key="article.id"
                  class="featured-side cursor-pointer"
                  @click="$router.push(`/news/${article.id}`)"
                >
                  <template #content>
                    <div class="flex gap-3">
                      <img
                        v-if="article.featured_image"
                        :src="getImageUrl(article.featured_image)"
                        :alt="article.title"
                        class="side-thumb"
                      />
                      <div class="flex-1">
                        <h4 class="text-lg font-semibold mb-2 line-height-3">
                          {{ article.title }}
                        </h4>
                        <span class="text-sm text-color-secondary">
                          {{ formatDate(article.published_at, 'relative') }}
                        </span>
                      </div>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest News Section -->
      <section class="latest-news-section py-6">
        <div class="container">
          <div class="flex justify-content-between align-items-center mb-4">
            <h2 class="text-3xl font-bold m-0">Latest News</h2>
            <Button
              label="View All"
              icon="pi pi-arrow-right"
              iconPos="right"
              outlined
              @click="$router.push('/news')"
            />
          </div>

          <div v-if="newsStore.newsList.length > 0" class="grid">
            <div
              v-for="article in newsStore.newsList.slice(0, 6)"
              :key="article.id"
              class="col-12 md:col-6 lg:col-4"
            >
              <NewsCard :article="article" />
            </div>
          </div>

          <div v-else class="text-center py-8">
            <i class="pi pi-inbox text-6xl text-color-secondary mb-4"></i>
            <h3 class="text-2xl mb-2">No Articles Available</h3>
            <p class="text-color-secondary">Check back later for new content</p>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section py-6 bg-surface-50">
        <div class="container">
          <h2 class="text-3xl font-bold mb-4">Browse by Category</h2>
          <div class="grid">
            <div
              v-for="category in categoryStore.rootCategories.slice(0, 6)"
              :key="category.id"
              class="col-12 md:col-6 lg:col-4"
            >
              <Card
                class="category-card cursor-pointer text-center"
                @click="$router.push(`/category/${category.id}`)"
              >
                <template #content>
                  <i class="pi pi-folder text-5xl text-primary mb-3"></i>
                  <h3 class="text-xl font-semibold mb-2">{{ category.name }}</h3>
                  <p v-if="category.description" class="text-color-secondary m-0">
                    {{ category.description }}
                  </p>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import NewsCard from '@/components/news/NewsCard.vue';
import { useCategoryStore } from '@/stores/categories';
import { useNewsStore } from '@/stores/news';
import { formatDate } from '@/utils/dateFormatter';
import { getImageUrl } from '@/utils/imageUpload';
import { onMounted, ref } from 'vue';

const newsStore = useNewsStore();
const categoryStore = useCategoryStore();
const loading = ref(true);

const fetchHomeData = async () => {
  loading.value = true;

  try {
    await Promise.all([
      newsStore.fetchBreakingNews(3),
      newsStore.fetchFeaturedNews(5),
      newsStore.fetchNews({ limit: 6 }),
      categoryStore.fetchCategories(),
    ]);
  } catch (error) {
    console.error('Failed to load home data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchHomeData();
});
</script>

<style scoped>
.home-view {
  min-height: 60vh;
}

.breaking-news-section {
  position: sticky;
  top: 0;
  z-index: 100;
}

.featured-main-image {
  height: 400px;
  overflow: hidden;
}

.featured-main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-main:hover,
.featured-side:hover,
.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.side-thumb {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.category-card {
  height: 100%;
}
</style>
