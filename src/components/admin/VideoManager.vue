<template>
  <div class="video-manager">
    <!-- Header with actions -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Manage Videos</h2>
      <Button
        label="Add New Video"
        icon="pi pi-plus"
        @click="openCreateDialog"
        class="p-button-primary"
      />
    </div>

    <!-- Filters -->
    <Card class="mb-4">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Search</label>
            <InputText
              v-model="filters.search"
              placeholder="Search videos..."
              class="w-full"
              @input="applyFilters"
            />
          </div>
          <div class="flex items-end">
            <Button
              label="Clear Filters"
              icon="pi pi-filter-slash"
              @click="clearFilters"
              class="p-button-secondary"
            />
          </div>
        </div>
      </template>
    </Card>

    <!-- Data Table -->
    <DataTable
      :value="videos"
      :loading="loading"
      :paginator="true"
      :rows="filters.limit"
      :total-records="pagination?.total || 0"
      :lazy="true"
      @page="onPageChange"
      @sort="onSort"
      class="p-datatable-sm"
      striped-rows
      show-gridlines
    >
      <template #empty>
        <div class="text-center py-8 text-color-secondary">No videos found</div>
      </template>

      <Column field="id" header="ID" sortable style="width: 80px"></Column>

      <Column field="title" header="Title" sortable>
        <template #body="slotProps">
          <div class="flex items-center gap-3">
            <img
              v-if="slotProps.data.thumbnail_url"
              :src="slotProps.data.thumbnail_url"
              :alt="slotProps.data.title"
              class="w-16 h-10 object-cover rounded"
            />
            <div v-else class="w-16 h-10 bg-gray-300 rounded flex items-center justify-center">
              <i class="pi pi-video"></i>
            </div>
            <div class="flex-1">
              <div class="font-medium">{{ slotProps.data.title }}</div>
              <div class="text-xs text-color-secondary">
                {{ truncate(slotProps.data.description, 50) }}
              </div>
            </div>
          </div>
        </template>
      </Column>

      <Column field="youtube_url" header="YouTube URL" style="width: 150px">
        <template #body="slotProps">
          <a
            :href="slotProps.data.youtube_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:underline text-sm"
          >
            Watch →
          </a>
        </template>
      </Column>

      <Column field="is_featured" header="Featured" sortable>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.is_featured ? 'Featured' : 'Regular'"
            :severity="slotProps.data.is_featured ? 'warning' : 'secondary'"
          />
        </template>
      </Column>

      <Column field="is_active" header="Status" sortable>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.is_active ? 'Active' : 'Inactive'"
            :severity="slotProps.data.is_active ? 'success' : 'danger'"
          />
        </template>
      </Column>

      <Column field="created_at" header="Created" sortable>
        <template #body="slotProps">
          {{ formatDate(slotProps.data.created_at) }}
        </template>
      </Column>

      <Column header="Actions" style="width: 180px">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi"
              :class="slotProps.data.is_featured ? 'pi-star-fill text-yellow-500' : 'pi-star'"
              class="p-button-rounded p-button-text"
              @click="toggleFeatured(slotProps.data)"
              v-tooltip="slotProps.data.is_featured ? 'Unmark Featured' : 'Mark Featured'"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-info"
              @click="openEditDialog(slotProps.data)"
              v-tooltip="'Edit'"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              @click="confirmDelete(slotProps.data)"
              v-tooltip="'Delete'"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Create/Edit Dialog -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="isEditing ? 'Edit Video' : 'Add Video'"
      :modal="true"
      :closable="true"
      :style="{ width: '700px' }"
      :loading="submitting"
    >
      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium mb-2">Title *</label>
            <InputText
              v-model="form.title"
              required
              class="w-full"
              placeholder="Enter video title"
            />
          </div>

          <!-- YouTube URL -->
          <div>
            <label class="block text-sm font-medium mb-2">YouTube URL *</label>
            <InputText
              v-model="form.youtube_url"
              required
              class="w-full"
              placeholder="https://www.youtube.com/watch?v=..."
              @blur="updateThumbnail"
              type="url"
            />
            <small class="text-color-secondary">Full YouTube video URL</small>
          </div>

          <!-- Thumbnail Preview -->
          <div v-if="thumbnailPreview">
            <label class="block text-sm font-medium mb-2">Thumbnail Preview</label>
            <img
              :src="thumbnailPreview"
              alt="Thumbnail"
              class="max-w-full h-32 object-cover rounded border"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium mb-2">Description</label>
            <Textarea
              v-model="form.description"
              rows="3"
              class="w-full"
              placeholder="Enter video description"
            />
          </div>

          <!-- Active Status -->
          <div class="flex items-center gap-2">
            <Checkbox v-model="form.is_active" input-id="is_active" />
            <label for="is_active" class="text-sm font-medium">Active</label>
          </div>

          <!-- Featured Status -->
          <div class="flex items-center gap-2">
            <Checkbox v-model="form.is_featured" input-id="is_featured" />
            <label for="is_featured" class="text-sm font-medium">Mark as Featured</label>
          </div>
        </div>
      </form>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
        <Button
          :label="isEditing ? 'Update' : 'Create'"
          icon="pi pi-check"
          class="p-button-primary"
          :loading="submitting"
          @click="handleSubmit"
        />
      </template>
    </Dialog>

    <!-- Delete Confirmation -->
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { videoService } from '@/services/videoService';
import { useVideoStore } from '@/stores/videos';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, reactive, ref } from 'vue';

const toast = useToast();
const confirm = useConfirm();
const videoStore = useVideoStore();

// Reactive data
const videos = computed(() => videoStore.videos);
const loading = computed(() => videoStore.loading);
const submitting = computed(() => videoStore.submitting);
const pagination = computed(() => videoStore.pagination);
const filters = reactive({ ...videoStore.filters });

// Dialog state
const dialogVisible = ref(false);
const isEditing = ref(false);
const editingVideo = ref(null);

// Form data
const form = reactive({
  title: '',
  youtube_url: '',
  description: '',
  is_active: true,
  is_featured: false,
});

// Thumbnail preview
const thumbnailPreview = ref(null);

// Methods
const fetchVideos = async () => {
  try {
    await videoStore.fetchVideos();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load videos',
      life: 3000,
    });
  }
};

const openCreateDialog = () => {
  resetForm();
  isEditing.value = false;
  dialogVisible.value = true;
};

const openEditDialog = (video) => {
  resetForm();
  isEditing.value = true;
  editingVideo.value = video;

  // Populate form
  form.title = video.title;
  form.youtube_url = video.youtube_url;
  form.description = video.description || '';
  form.is_active = video.is_active;
  form.is_featured = video.is_featured;

  // Set thumbnail preview
  if (video.thumbnail_url) {
    thumbnailPreview.value = video.thumbnail_url;
  }

  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};

const resetForm = () => {
  form.title = '';
  form.youtube_url = '';
  form.description = '';
  form.is_active = true;
  form.is_featured = false;
  thumbnailPreview.value = null;
};

const updateThumbnail = () => {
  if (form.youtube_url) {
    const thumbnail = videoService.getYouTubeThumbnail(form.youtube_url);
    if (thumbnail) {
      thumbnailPreview.value = thumbnail;
    }
  }
};

const handleSubmit = async () => {
  if (!form.title || !form.youtube_url) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Title and YouTube URL are required',
      life: 3000,
    });
    return;
  }

  try {
    const data = {
      title: form.title,
      youtube_url: form.youtube_url,
      description: form.description || null,
      is_active: form.is_active ? 1 : 0,
      is_featured: form.is_featured ? 1 : 0,
    };

    if (isEditing.value) {
      await videoStore.updateVideo(editingVideo.value.id, data);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Video updated successfully',
        life: 3000,
      });
    } else {
      await videoStore.createVideo(data);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Video created successfully',
        life: 3000,
      });
    }

    closeDialog();
    await fetchVideos();
  } catch (error) {
    console.error('Error saving video:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Failed to save video',
      life: 3000,
    });
  }
};

const confirmDelete = (video) => {
  confirm.require({
    message: `Are you sure you want to delete "${video.title}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => deleteVideo(video),
  });
};

const deleteVideo = async (video) => {
  try {
    await videoStore.deleteVideo(video.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Video deleted successfully',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete video',
      life: 3000,
    });
  }
};

const toggleFeatured = async (video) => {
  try {
    await videoStore.toggleFeatured(video.id);
    const message = video.is_featured ? 'Removed from featured' : 'Marked as featured';
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update video',
      life: 3000,
    });
  }
};

const applyFilters = () => {
  videoStore.setFilters(filters);
  fetchVideos();
};

const clearFilters = () => {
  videoStore.resetFilters();
  Object.assign(filters, videoStore.filters);
  fetchVideos();
};

const onPageChange = (event) => {
  filters.page = event.page + 1;
  filters.limit = event.rows;
  applyFilters();
};

const onSort = (event) => {
  filters.sort_by = event.sortField || 'created_at';
  filters.sort_order = event.sortOrder === 1 ? 'ASC' : 'DESC';
  applyFilters();
};

// Utility functions
const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
};

const truncate = (text, length) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Initialize
onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.video-manager {
  @apply space-y-4;
}
</style>
