<template>
  <div class="news-detail-view py-6">
    <LoadingSpinner v-if="newsStore.loading" message="Loading article..." />

    <ErrorMessage
      v-else-if="newsStore.error"
      :error="newsStore.error"
      @close="$router.push('/news')"
    />

    <div v-else-if="article" class="container">
      <div class="grid">
        <!-- Main Content -->
        <div class="col-12 lg:col-8">
          <article class="article-content">
            <!-- Breadcrumb -->
            <nav class="breadcrumb mb-4">
              <router-link to="/" class="text-color-secondary">Home</router-link>
              <span class="mx-2">/</span>
              <router-link to="/news" class="text-color-secondary">News</router-link>
              <span class="mx-2">/</span>
              <span>{{ article.title }}</span>
            </nav>

            <!-- Article Header -->
            <div class="article-header mb-4">
              <div class="flex gap-2 mb-3">
                <span v-if="article.is_breaking" class="badge badge-danger">Breaking News</span>
                <span v-if="article.is_featured" class="badge badge-primary">Featured</span>
              </div>

              <h1 class="text-5xl font-bold mb-3">{{ article.title }}</h1>

              <div class="article-meta flex flex-wrap gap-4 text-color-secondary mb-4">
                <span>
                  <i class="pi pi-user mr-2"></i>
                  {{ article.author_name }}
                </span>
                <span>
                  <i class="pi pi-calendar mr-2"></i>
                  {{ formatDate(article.published_at, 'long') }}
                </span>
                <span>
                  <i class="pi pi-clock mr-2"></i>
                  {{ readingTime }} min read
                </span>
                <span>
                  <i class="pi pi-eye mr-2"></i>
                  {{ article.views || 0 }} views
                </span>
              </div>

              <!-- Social Share & Bookmark -->
              <div class="flex justify-content-between align-items-center mb-4">
                <div class="flex gap-2">
                  <Button icon="pi pi-facebook" rounded outlined @click="shareOnFacebook" />
                  <Button icon="pi pi-twitter" rounded outlined @click="shareOnTwitter" />
                  <Button icon="pi pi-linkedin" rounded outlined @click="shareOnLinkedIn" />
                  <Button icon="pi pi-link" rounded outlined @click="copyLink" />
                </div>
                <Button
                  v-if="authStore.isAuthenticated"
                  :icon="
                    userStore.isBookmarked(article.id) ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'
                  "
                  :label="userStore.isBookmarked(article.id) ? 'Saved' : 'Save'"
                  @click="toggleBookmark"
                  outlined
                />
              </div>
            </div>

            <!-- Featured Image -->
            <div v-if="article.featured_image" class="article-image mb-5">
              <Image
                :src="getImageUrl(article.featured_image)"
                :alt="article.title"
                preview
                class="w-full border-round-lg"
              />
            </div>

            <!-- Excerpt -->
            <div v-if="article.excerpt" class="article-excerpt mb-4">
              <p class="text-xl line-height-3 text-color-secondary">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- YouTube Video -->
            <div v-if="article.youtube_video_id" class="article-video mb-5">
              <div class="video-container">
                <iframe
                  :src="`https://www.youtube.com/embed/${article.youtube_video_id}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full"
                  style="height: 400px"
                ></iframe>
              </div>
            </div>

            <!-- Article Content -->
            <div class="article-body mb-5" v-html="article.content"></div>

            <!-- Tags/Categories -->
            <div class="article-tags mb-5">
              <div class="flex flex-wrap gap-2">
                <router-link
                  v-for="category in article.categories"
                  :key="category.id"
                  :to="`/category/${category.id}`"
                  class="badge badge-info"
                >
                  {{ category.name }}
                </router-link>
              </div>
            </div>
          </article>

          <!-- Comments Section -->
          <CommentSection :newsId="article.id" />
        </div>

        <!-- Sidebar -->
        <div class="col-12 lg:col-4">
          <!-- Related Articles -->
          <div class="related-articles mb-5">
            <h3 class="text-2xl font-bold mb-4">Related Articles</h3>
            <div v-if="newsStore.relatedArticles.length > 0" class="flex flex-column gap-3">
              <Card
                v-for="related in newsStore.relatedArticles"
                :key="related.id"
                class="cursor-pointer hover:surface-hover"
                @click="$router.push(`/news/${related.id}`)"
              >
                <template #content>
                  <div class="flex gap-3">
                    <img
                      v-if="related.featured_image"
                      :src="getImageUrl(related.featured_image)"
                      :alt="related.title"
                      class="related-thumb"
                    />
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold mb-2 line-height-3">
                        {{ related.title }}
                      </h4>
                      <span class="text-sm text-color-secondary">
                        {{ formatDate(related.published_at, 'short') }}
                      </span>
                    </div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import CommentSection from '@/components/news/CommentSection.vue';
import { analyticsService } from '@/services/analyticsService';
import { useAuthStore } from '@/stores/auth';
import { useNewsStore } from '@/stores/news';
import { useUserStore } from '@/stores/user';
import { formatDate } from '@/utils/dateFormatter';
import { getImageUrl } from '@/utils/imageUpload';
import { calculateReadingTime } from '@/utils/readingTime';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const newsStore = useNewsStore();
const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const article = computed(() => newsStore.currentArticle);
const readingTime = computed(() =>
  article.value ? calculateReadingTime(article.value.content) : 0
);

const fetchArticle = async () => {
  const articleId = route.params.id;
  try {
    await newsStore.fetchNewsById(articleId);
    await newsStore.fetchRelatedNews(articleId);

    // Track view
    analyticsService
      .trackView(articleId)
      .catch((err) => console.error('Failed to track view:', err));
  } catch (error) {
    console.error('Failed to fetch article:', error);
  }
};

const toggleBookmark = async () => {
  try {
    await userStore.toggleBookmark(article.value.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: userStore.isBookmarked(article.value.id)
        ? 'Article saved!'
        : 'Article removed from bookmarks',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update bookmark',
      life: 3000,
    });
  }
};

const shareOnFacebook = () => {
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

const shareOnTwitter = () => {
  const url = window.location.href;
  const text = article.value.title;
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
      text
    )}`,
    '_blank'
  );
};

const shareOnLinkedIn = () => {
  const url = window.location.href;
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    '_blank'
  );
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Link copied to clipboard!',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to copy link',
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchArticle();
  if (authStore.isAuthenticated) {
    userStore.fetchBookmarks();
  }
});

watch(
  () => route.params.id,
  () => {
    if (route.name === 'news-detail') {
      newsStore.clearCurrentArticle();
      fetchArticle();
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

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-danger {
  background: #ef4444;
  color: white;
}

.badge-primary {
  background: var(--primary-color);
  color: white;
}

.badge-info {
  background: var(--surface-200);
  color: var(--text-color);
  text-decoration: none;
  display: inline-block;
}

.badge-info:hover {
  background: var(--surface-300);
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.8;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.article-body :deep(p) {
  margin-bottom: 1.5rem;
}

.article-body :deep(h2),
.article-body :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.related-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.video-container {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
</style>
