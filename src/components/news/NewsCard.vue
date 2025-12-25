<template>
  <Card class="news-card h-full cursor-pointer" @click="navigateToArticle">
    <template #header>
      <div class="news-card-image">
        <img
          v-if="article.featured_image"
          :src="getImageUrl(article.featured_image)"
          :alt="article.title"
          class="w-full"
        />
        <div v-else class="placeholder-image flex align-items-center justify-content-center">
          <i class="pi pi-image text-6xl text-color-secondary"></i>
        </div>

        <!-- Badges -->
        <div class="badges">
          <span v-if="article.is_breaking" class="badge badge-danger">Breaking</span>
          <span v-if="article.is_featured" class="badge badge-primary">Featured</span>
        </div>
      </div>
    </template>

    <template #title>
      <h3 class="news-card-title line-clamp-2">{{ article.title }}</h3>
    </template>

    <template #subtitle>
      <div class="news-card-meta text-sm text-color-secondary mb-2">
        <span>
          <i class="pi pi-user mr-1"></i>
          {{ article.author_name }}
        </span>
        <span class="mx-2">•</span>
        <span>
          <i class="pi pi-calendar mr-1"></i>
          {{ formatDate(article.published_at, 'relative') }}
        </span>
      </div>
    </template>

    <template #content>
      <p class="news-card-excerpt line-clamp-3 text-color-secondary mb-3">
        {{ article.excerpt }}
      </p>

      <div class="news-card-footer flex justify-content-between align-items-center">
        <div class="flex gap-3 text-sm text-color-secondary">
          <span v-if="article.views">
            <i class="pi pi-eye mr-1"></i>
            {{ article.views }}
          </span>
          <span v-if="article.comments_count">
            <i class="pi pi-comment mr-1"></i>
            {{ article.comments_count }}
          </span>
          <span>
            <i class="pi pi-clock mr-1"></i>
            {{ readingTime }} min
          </span>
        </div>

        <Button
          v-if="showBookmark"
          :icon="isBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
          text
          rounded
          @click.stop="toggleBookmark"
          v-tooltip.top="isBookmarked ? 'Remove bookmark' : 'Bookmark'"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { formatDate } from '@/utils/dateFormatter';
import { getImageUrl } from '@/utils/imageUpload';
import { calculateReadingTime } from '@/utils/readingTime';
import { useToast } from 'primevue/usetoast';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  showBookmark: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();

const readingTime = computed(() => calculateReadingTime(props.article.content || ''));
const isBookmarked = computed(() => userStore.isBookmarked(props.article.id));

const navigateToArticle = () => {
  router.push(`/news/${props.article.id}`);
};

const toggleBookmark = async () => {
  if (!authStore.isAuthenticated) {
    toast.add({
      severity: 'warn',
      summary: 'Login Required',
      detail: 'Please login to bookmark articles',
      life: 3000,
    });
    router.push('/login');
    return;
  }

  try {
    await userStore.toggleBookmark(props.article.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: isBookmarked.value ? 'Article saved!' : 'Bookmark removed',
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
</script>

<style scoped>
.news-card {
  transition: all 0.3s ease;
  height: 100%;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.news-card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.news-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: var(--surface-100);
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.badge-danger {
  background: #ef4444;
}

.badge-primary {
  background: var(--primary-color);
}

.news-card-title {
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
  color: var(--text-color);
}

.news-card-meta {
  display: flex;
  align-items: center;
}

.news-card-excerpt {
  line-height: 1.6;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
