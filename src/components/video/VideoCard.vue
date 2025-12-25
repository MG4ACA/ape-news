<template>
  <Card class="video-card h-full cursor-pointer" @click="handleClick">
    <template #header>
      <div class="video-thumbnail">
        <img
          v-if="video.thumbnail_url"
          :src="video.thumbnail_url"
          :alt="video.title"
          class="w-full"
        />
        <div v-else-if="video.youtube_video_id" class="youtube-thumbnail">
          <img
            :src="`https://img.youtube.com/vi/${video.youtube_video_id}/mqdefault.jpg`"
            :alt="video.title"
            class="w-full"
          />
        </div>
        <div v-else class="placeholder-thumbnail flex align-items-center justify-content-center">
          <i class="pi pi-video text-6xl text-color-secondary"></i>
        </div>

        <!-- Play Overlay -->
        <div class="play-overlay">
          <i class="pi pi-play-circle text-6xl"></i>
        </div>
      </div>
    </template>

    <template #title>
      <h3 class="video-title line-clamp-2">{{ video.title }}</h3>
    </template>

    <template #content>
      <p v-if="video.description" class="video-description line-clamp-2 text-color-secondary mb-3">
        {{ video.description }}
      </p>

      <div
        class="video-meta flex justify-content-between align-items-center text-sm text-color-secondary"
      >
        <span>
          <i class="pi pi-calendar mr-1"></i>
          {{ formatDate(video.created_at, 'short') }}
        </span>
        <span v-if="video.views">
          <i class="pi pi-eye mr-1"></i>
          {{ video.views }} views
        </span>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { formatDate } from '@/utils/dateFormatter';

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['play']);

const handleClick = () => {
  emit('play', props.video);
};
</script>

<style scoped>
.video-card {
  transition: all 0.3s ease;
  height: 100%;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  background: var(--surface-100);
}

.video-thumbnail img,
.youtube-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-thumbnail {
  width: 100%;
  height: 100%;
  background: var(--surface-100);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-overlay i {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.video-title {
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0;
  color: var(--text-color);
}

.video-description {
  line-height: 1.6;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
