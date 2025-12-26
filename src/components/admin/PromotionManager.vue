<template>
  <div class="promotion-manager">
    <!-- Header with actions -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Manage Promotions</h2>
      <Button
        label="Add New Promotion"
        icon="pi pi-plus"
        @click="openCreateDialog"
        class="p-button-primary"
      />
    </div>

    <!-- Filters -->
    <Card class="mb-4">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Position</label>
            <Dropdown
              v-model="filters.position"
              :options="positionOptions"
              option-label="label"
              option-value="value"
              placeholder="All positions"
              class="w-full"
              @change="applyFilters"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Status</label>
            <Dropdown
              v-model="filters.is_active"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              placeholder="All statuses"
              class="w-full"
              @change="applyFilters"
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
      :value="promotions"
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
        <div class="text-center py-8 text-color-secondary">No promotions found</div>
      </template>

      <Column field="id" header="ID" sortable style="width: 80px"></Column>

      <Column field="title" header="Title" sortable>
        <template #body="slotProps">
          <div class="flex items-center gap-2">
            <img
              v-if="slotProps.data.image"
              :src="getImageUrl(slotProps.data.image)"
              :alt="slotProps.data.title"
              class="w-12 h-8 object-cover rounded"
            />
            <div>
              <div class="font-medium">{{ slotProps.data.title }}</div>
              <div class="text-sm text-color-secondary">{{ slotProps.data.position }}</div>
            </div>
          </div>
        </template>
      </Column>

      <Column field="position" header="Position" sortable>
        <template #body="slotProps">
          <Tag
            :value="formatPosition(slotProps.data.position)"
            :severity="getPositionSeverity(slotProps.data.position)"
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

      <Column field="click_count" header="Clicks" sortable style="width: 100px">
        <template #body="slotProps">
          {{ slotProps.data.click_count || 0 }}
        </template>
      </Column>

      <Column field="display_order" header="Order" sortable style="width: 100px"></Column>

      <Column field="start_date" header="Start Date" sortable>
        <template #body="slotProps">
          {{ formatDate(slotProps.data.start_date) }}
        </template>
      </Column>

      <Column field="end_date" header="End Date" sortable>
        <template #body="slotProps">
          {{ formatDate(slotProps.data.end_date) }}
        </template>
      </Column>

      <Column header="Actions" style="width: 150px">
        <template #body="slotProps">
          <div class="flex gap-2">
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
      :header="isEditing ? 'Edit Promotion' : 'Create Promotion'"
      :modal="true"
      :closable="true"
      :style="{ width: '600px' }"
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
              placeholder="Enter promotion title"
            />
          </div>

          <!-- Position -->
          <div>
            <label class="block text-sm font-medium mb-2">Position *</label>
            <Dropdown
              v-model="form.position"
              :options="positionOptions"
              option-label="label"
              option-value="value"
              required
              class="w-full"
              placeholder="Select position"
            />
          </div>

          <!-- Link URL -->
          <div>
            <label class="block text-sm font-medium mb-2">Link URL</label>
            <InputText
              v-model="form.link_url"
              class="w-full"
              placeholder="https://example.com"
              type="url"
            />
          </div>

          <!-- Display Order -->
          <div>
            <label class="block text-sm font-medium mb-2">Display Order</label>
            <InputNumber v-model="form.display_order" class="w-full" placeholder="0" :min="0" />
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium mb-2">Promotion Image *</label>
            <FileUpload
              ref="fileUploadRef"
              mode="basic"
              accept="image/*"
              :max-file-size="5000000"
              @select="onFileSelect"
              @clear="onFileClear"
              choose-label="Choose Image"
              class="w-full"
            />
            <small class="text-color-secondary">
              Max file size: 5MB. Recommended: 728x90px for header, 300x250px for sidebar
            </small>
          </div>

          <!-- Image Preview -->
          <div v-if="imagePreview">
            <label class="block text-sm font-medium mb-2">Preview</label>
            <img
              :src="imagePreview"
              alt="Promotion preview"
              class="max-w-full h-32 object-cover rounded border"
            />
          </div>

          <!-- Date Range -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Start Date</label>
              <Calendar
                v-model="form.start_date"
                class="w-full"
                date-format="yy-mm-dd"
                placeholder="Select start date"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">End Date</label>
              <Calendar
                v-model="form.end_date"
                class="w-full"
                date-format="yy-mm-dd"
                placeholder="Select end date"
              />
            </div>
          </div>

          <!-- Active Status -->
          <div class="flex items-center gap-2">
            <Checkbox v-model="form.is_active" input-id="is_active" />
            <label for="is_active" class="text-sm font-medium">Active</label>
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
import { usePromotionStore } from '@/stores/promotions';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, reactive, ref } from 'vue';

const toast = useToast();
const confirm = useConfirm();
const promotionStore = usePromotionStore();

// Reactive data
const promotions = computed(() => promotionStore.promotions);
const loading = computed(() => promotionStore.loading);
const submitting = computed(() => promotionStore.submitting);
const pagination = computed(() => promotionStore.pagination);
const filters = reactive({ ...promotionStore.filters });

// Dialog state
const dialogVisible = ref(false);
const isEditing = ref(false);
const editingPromotion = ref(null);
const fileUploadRef = ref(null);

// Form data
const form = reactive({
  title: '',
  position: '',
  link_url: '',
  display_order: 0,
  is_active: true,
  start_date: null,
  end_date: null,
});

// Image preview
const imagePreview = ref(null);
const selectedFile = ref(null);

// Options
const positionOptions = [
  { label: 'Header', value: 'header' },
  { label: 'Sidebar', value: 'sidebar' },
  { label: 'Content Top', value: 'content_top' },
  { label: 'Content Middle', value: 'content_middle' },
  { label: 'Content Bottom', value: 'content_bottom' },
];

const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

// Methods
const fetchPromotions = async () => {
  try {
    await promotionStore.fetchPromotions();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load promotions',
      life: 3000,
    });
  }
};

const openCreateDialog = () => {
  resetForm();
  isEditing.value = false;
  dialogVisible.value = true;
};

const openEditDialog = (promotion) => {
  resetForm();
  isEditing.value = true;
  editingPromotion.value = promotion;

  // Populate form
  form.title = promotion.title;
  form.position = promotion.position;
  form.link_url = promotion.link_url;
  form.display_order = promotion.display_order;
  form.is_active = promotion.is_active;
  form.start_date = promotion.start_date ? new Date(promotion.start_date) : null;
  form.end_date = promotion.end_date ? new Date(promotion.end_date) : null;

  // Set image preview
  if (promotion.image) {
    imagePreview.value = getImageUrl(promotion.image);
  }

  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};

const resetForm = () => {
  form.title = '';
  form.position = '';
  form.link_url = '';
  form.display_order = 0;
  form.is_active = true;
  form.start_date = null;
  form.end_date = null;
  imagePreview.value = null;
  selectedFile.value = null;
  if (fileUploadRef.value) {
    fileUploadRef.value.clear();
  }
};

const onFileSelect = (event) => {
  selectedFile.value = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(event.files[0]);
};

const onFileClear = () => {
  selectedFile.value = null;
  imagePreview.value = null;
};

const handleSubmit = async () => {
  if (!form.title || !form.position) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Title and position are required',
      life: 3000,
    });
    return;
  }

  if (!isEditing.value && !selectedFile.value) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Promotion image is required',
      life: 3000,
    });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('position', form.position);
    formData.append('link_url', form.link_url || '');
    formData.append('display_order', form.display_order.toString());
    formData.append('is_active', form.is_active ? '1' : '0');

    if (form.start_date) {
      formData.append('start_date', form.start_date.toISOString().split('T')[0]);
    }
    if (form.end_date) {
      formData.append('end_date', form.end_date.toISOString().split('T')[0]);
    }

    if (selectedFile.value) {
      formData.append('image', selectedFile.value);
    }

    if (isEditing.value) {
      await promotionStore.updatePromotion(editingPromotion.value.id, formData);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Promotion updated successfully',
        life: 3000,
      });
    } else {
      await promotionStore.createPromotion(formData);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Promotion created successfully',
        life: 3000,
      });
    }

    closeDialog();
    await fetchPromotions();
  } catch (error) {
    console.error('Error saving promotion:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Failed to save promotion',
      life: 3000,
    });
  }
};

const confirmDelete = (promotion) => {
  confirm.require({
    message: `Are you sure you want to delete "${promotion.title}"?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => deletePromotion(promotion),
  });
};

const deletePromotion = async (promotion) => {
  try {
    await promotionStore.deletePromotion(promotion.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Promotion deleted successfully',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete promotion',
      life: 3000,
    });
  }
};

const applyFilters = () => {
  promotionStore.setFilters(filters);
  fetchPromotions();
};

const clearFilters = () => {
  promotionStore.resetFilters();
  Object.assign(filters, promotionStore.filters);
  fetchPromotions();
};

const onPageChange = (event) => {
  filters.page = event.page + 1;
  filters.limit = event.rows;
  applyFilters();
};

const onSort = (event) => {
  filters.sort_by = event.sortField;
  filters.sort_order = event.sortOrder === 1 ? 'ASC' : 'DESC';
  applyFilters();
};

// Utility functions
const getImageUrl = (imageName) => {
  return `${import.meta.env.VITE_API_BASE_URL}/uploads/images/ads/${imageName}`;
};

const formatPosition = (position) => {
  return position.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const getPositionSeverity = (position) => {
  const severities = {
    header: 'info',
    sidebar: 'success',
    content_top: 'warning',
    content_middle: 'danger',
    content_bottom: 'secondary',
  };
  return severities[position] || 'info';
};

const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
};

// Initialize
onMounted(() => {
  fetchPromotions();
});
</script>

<style scoped>
.promotion-manager {
  @apply space-y-4;
}
</style>
