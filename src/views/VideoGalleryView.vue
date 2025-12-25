<template>
  <div class="video-gallery-view py-6">
    <div class="container">
      <h1 class="text-4xl font-bold mb-5">Video Gallery</h1>

      <LoadingSpinner v-if="loading" message="Loading videos..." />

      <ErrorMessage v-else-if="error" :error="error" @close="error = ''" />

      <div v-else>
        <div v-if="videos.length > 0" class="grid">
          <div v-for="video in videos" :key="video.id" class="col-12 md:col-6 lg:col-4">
            <VideoCard :video="video" />
          </div>
        </div>

        <div v-else class="text-center py-8">
          <i class="pi pi-video text-6xl text-color-secondary mb-4"></i>
          <h3 class="text-2xl mb-2">No Videos Available</h3>
          <p class="text-color-secondary">Check back later for new videos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import VideoCard from '@/components/video/VideoCard.vue';
import { videoService } from '@/services/videoService';
import { onMounted, ref } from 'vue';

const videos = ref([]);
const loading = ref(false);
const error = ref('');

const fetchVideos = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await videoService.getVideos();
    if (response.success) {
      videos.value = response.data;
    }
  } catch (err) {
    error.value = err.message || 'Failed to fetch videos';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchVideos();
});
</script>
