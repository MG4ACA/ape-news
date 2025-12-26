<template>
  <div class="admin-categories">
    <div class="flex justify-content-between align-items-center mb-4">
      <h1 class="text-3xl font-bold m-0">Category Management</h1>

      <Button label="Add Category" icon="pi pi-plus" @click="openCreateDialog" />
      <InputText
        v-model="filterModel.value"
        type="text"
        @input="filterCallback()"
        placeholder="Search by name"
        class="p-column-filter"
      />
    </div>

    <LoadingSpinner v-if="loading" message="Loading categories..." />

    <div v-else class="card">
      <DataTable
        :value="filteredCategories"
        :loading="loading"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50]"
        stripedRows
        responsiveLayout="scroll"
        dataKey="id"
        filterDisplay="row"
        v-model:filters="filters"
      >
        <template #empty>
          <div class="text-center py-6">
            <i class="pi pi-inbox text-5xl text-color-secondary mb-3"></i>
            <p class="text-xl">No categories found</p>
          </div>
        </template>

        <Column field="id" header="ID" sortable style="width: 80px"></Column>

        <Column field="name" header="Name (Sinhala)" sortable>
          <template #body="slotProps">
            <div class="flex flex-column gap-1">
              <span class="font-semibold">{{ slotProps.data.name_si || slotProps.data.name }}</span>
              <span class="text-sm text-color-secondary">{{ slotProps.data.name_en }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              v-model="filterModel.value"
              type="text"
              @input="filterCallback()"
              placeholder="Search by name"
              class="p-column-filter"
            />
          </template>
        </Column>

        <Column field="slug" header="Slug" sortable>
          <template #body="slotProps">
            <code class="text-sm">{{ slotProps.data.slug }}</code>
          </template>
        </Column>

        <Column field="parent_name" header="Parent Category" sortable>
          <template #body="slotProps">
            <span v-if="slotProps.data.parent_name" class="text-sm">
              {{ slotProps.data.parent_name }}
            </span>
            <span v-else class="text-sm text-color-secondary">Root Category</span>
          </template>
        </Column>

        <Column field="display_order" header="Order" sortable style="width: 100px">
          <template #body="slotProps">
            <Tag :value="slotProps.data.display_order" severity="info"></Tag>
          </template>
        </Column>

        <Column field="is_active" header="Status" sortable style="width: 120px">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.is_active ? 'Active' : 'Inactive'"
              :severity="slotProps.data.is_active ? 'success' : 'danger'"
            ></Tag>
          </template>
        </Column>

        <Column header="Actions" style="width: 200px">
          <template #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                severity="info"
                size="small"
                @click="openEditDialog(slotProps.data)"
                v-tooltip.top="'Edit'"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                size="small"
                @click="confirmDelete(slotProps.data)"
                v-tooltip.top="'Delete'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Create/Edit Dialog -->
    <Dialog
      v-model:visible="showDialog"
      :header="isEditing ? 'Edit Category' : 'Create Category'"
      :modal="true"
      :closable="true"
      :style="{ width: '600px' }"
    >
      <div class="flex flex-column gap-3 py-3">
        <!-- Sinhala Name -->
        <div class="field">
          <label for="name_si" class="font-semibold">Name (Sinhala) *</label>
          <InputText
            id="name_si"
            v-model="formData.name_si"
            class="w-full"
            placeholder="ප්‍රවර්ගය නම"
            :class="{ 'p-invalid': errors.name_si }"
          />
          <small v-if="errors.name_si" class="p-error">{{ errors.name_si }}</small>
        </div>

        <!-- English Name -->
        <div class="field">
          <label for="name_en" class="font-semibold">Name (English)</label>
          <InputText
            id="name_en"
            v-model="formData.name_en"
            class="w-full"
            placeholder="Category Name"
          />
        </div>

        <!-- Tamil Name -->
        <div class="field">
          <label for="name_ta" class="font-semibold">Name (Tamil)</label>
          <InputText
            id="name_ta"
            v-model="formData.name_ta"
            class="w-full"
            placeholder="பிரிவு பெயர்"
          />
        </div>

        <!-- Slug -->
        <div class="field">
          <label for="slug" class="font-semibold">Slug</label>
          <InputText
            id="slug"
            v-model="formData.slug"
            class="w-full"
            placeholder="category-slug"
            :class="{ 'p-invalid': errors.slug }"
          />
          <small v-if="errors.slug" class="p-error">{{ errors.slug }}</small>
          <small class="text-color-secondary">Leave empty to auto-generate from name</small>
        </div>

        <!-- Description (Sinhala) -->
        <div class="field">
          <label for="description_si" class="font-semibold">Description (Sinhala)</label>
          <Textarea
            id="description_si"
            v-model="formData.description_si"
            rows="3"
            class="w-full"
            placeholder="ප්‍රවර්ගය විස්තරය"
          />
        </div>

        <!-- Description (English) -->
        <div class="field">
          <label for="description_en" class="font-semibold">Description (English)</label>
          <Textarea
            id="description_en"
            v-model="formData.description_en"
            rows="3"
            class="w-full"
            placeholder="Category description"
          />
        </div>

        <!-- Description (Tamil) -->
        <div class="field">
          <label for="description_ta" class="font-semibold">Description (Tamil)</label>
          <Textarea
            id="description_ta"
            v-model="formData.description_ta"
            rows="3"
            class="w-full"
            placeholder="பிரிவு விளக்கம்"
          />
        </div>

        <!-- Parent Category -->
        <div class="field">
          <label for="parent_id" class="font-semibold">Parent Category</label>
          <Dropdown
            id="parent_id"
            v-model="formData.parent_id"
            :options="parentCategoryOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select parent category (optional)"
            class="w-full"
            showClear
          />
          <small class="text-color-secondary">Leave empty for root category</small>
        </div>

        <!-- Display Order -->
        <div class="field">
          <label for="display_order" class="font-semibold">Display Order</label>
          <InputNumber
            id="display_order"
            v-model="formData.display_order"
            class="w-full"
            :min="0"
            :max="999"
          />
        </div>

        <!-- Active Status -->
        <div class="field">
          <div class="flex align-items-center gap-2">
            <Checkbox v-model="formData.is_active" :binary="true" inputId="is_active" />
            <label for="is_active" class="font-semibold">Active</label>
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeDialog" text />
        <Button
          :label="isEditing ? 'Update' : 'Create'"
          icon="pi pi-check"
          @click="handleSubmit"
          :loading="submitting"
        />
      </template>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="showDeleteDialog"
      header="Confirm Delete"
      :modal="true"
      :style="{ width: '450px' }"
    >
      <div class="flex align-items-center gap-3">
        <i class="pi pi-exclamation-triangle text-5xl text-orange-500"></i>
        <div>
          <p class="m-0">Are you sure you want to delete this category?</p>
          <p class="font-semibold mt-2">
            {{ categoryToDelete?.name || categoryToDelete?.name_si }}
          </p>
          <p class="text-sm text-color-secondary mt-2">
            This action cannot be undone. All subcategories will also be affected.
          </p>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="showDeleteDialog = false" text />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          @click="handleDelete"
          :loading="deleting"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { categoryService } from '@/services/categoryService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

const toast = useToast();

const loading = ref(false);
const submitting = ref(false);
const deleting = ref(false);
const categories = ref([]);
const showDialog = ref(false);
const showDeleteDialog = ref(false);
const isEditing = ref(false);
const categoryToDelete = ref(null);

const formData = ref({
  name_si: '',
  name_en: '',
  name_ta: '',
  slug: '',
  description_si: '',
  description_en: '',
  description_ta: '',
  parent_id: null,
  display_order: 0,
  is_active: true,
});

const errors = ref({});

const filterModel = ref('');

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const filteredCategories = computed(() => {
  if (filterModel.value.trim() === '') {
    return categories.value;
  } else {
    const searchTerm = filterModel.value.toLowerCase().trim();
    return categories.value.filter(
      (category) =>
        (category.name_si && category.name_si.toLowerCase().includes(searchTerm)) ||
        (category.name_en && category.name_en.toLowerCase().includes(searchTerm)) ||
        (category.name_ta && category.name_ta.toLowerCase().includes(searchTerm)) ||
        (category.name && category.name.toLowerCase().includes(searchTerm)) ||
        (category.slug && category.slug.toLowerCase().includes(searchTerm))
    );
  }
});

const parentCategoryOptions = computed(() => {
  const options = [{ label: 'None (Root Category)', value: null }];

  const rootCategories = categories.value.filter((cat) => !cat.parent_id);

  rootCategories.forEach((cat) => {
    options.push({
      label: cat.name_si || cat.name,
      value: cat.id,
    });
  });

  return options;
});

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await categoryService.getAllCategories();
    categories.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Failed to fetch categories',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

const openCreateDialog = () => {
  isEditing.value = false;
  resetForm();
  showDialog.value = true;
};

const openEditDialog = (category) => {
  isEditing.value = true;
  formData.value = {
    id: category.id,
    name_si: category.name_si || category.name,
    name_en: category.name_en || '',
    name_ta: category.name_ta || '',
    slug: category.slug,
    description_si: category.description_si || category.description || '',
    description_en: category.description_en || '',
    description_ta: category.description_ta || '',
    parent_id: category.parent_id,
    display_order: category.display_order,
    is_active: Boolean(category.is_active),
  };
  errors.value = {};
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name_si: '',
    name_en: '',
    name_ta: '',
    slug: '',
    description_si: '',
    description_en: '',
    description_ta: '',
    parent_id: null,
    display_order: 0,
    is_active: true,
  };
  errors.value = {};
};

const filterCallback = () => {
  // Filtering is handled automatically by the computed property
  // This function can be used for additional logic if needed
};

const validateForm = () => {
  errors.value = {};

  if (!formData.value.name_si) {
    errors.value.name_si = 'Sinhala name is required';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    const payload = {
      name: formData.value.name_si, // Legacy field
      name_si: formData.value.name_si,
      name_en: formData.value.name_en,
      name_ta: formData.value.name_ta,
      slug: formData.value.slug || undefined,
      description: formData.value.description_si, // Legacy field
      description_si: formData.value.description_si,
      description_en: formData.value.description_en,
      description_ta: formData.value.description_ta,
      parent_id: formData.value.parent_id || undefined,
      display_order: formData.value.display_order,
      is_active: formData.value.is_active ? 1 : 0,
    };

    if (isEditing.value) {
      await categoryService.updateCategory(formData.value.id, payload);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category updated successfully',
        life: 3000,
      });
    } else {
      await categoryService.createCategory(payload);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category created successfully',
        life: 3000,
      });
    }

    closeDialog();
    fetchCategories();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Failed to save category',
      life: 3000,
    });
  } finally {
    submitting.value = false;
  }
};

const confirmDelete = (category) => {
  categoryToDelete.value = category;
  showDeleteDialog.value = true;
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await categoryService.deleteCategory(categoryToDelete.value.id);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category deleted successfully',
      life: 3000,
    });
    showDeleteDialog.value = false;
    fetchCategories();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response?.data?.message || 'Failed to delete category',
      life: 3000,
    });
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
.admin-categories {
  padding: 1.5rem;
}

.field {
  margin-bottom: 0;
}

.field label {
  display: block;
  margin-bottom: 0.5rem;
}

code {
  background: var(--surface-100);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}
</style>
