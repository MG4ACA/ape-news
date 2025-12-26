<template>
  <div class="comment-manager">
    <!-- Header with Stats -->
    <div class="flex justify-content-between align-items-center mb-6">
      <h1 class="text-3xl font-bold m-0">Comment Moderation</h1>
      <div class="flex gap-3">
        <Card v-if="stats.pending > 0" class="stat-badge pending">
          <template #content>
            <div class="text-center">
              <div class="stat-number text-2xl font-bold">{{ stats.pending }}</div>
              <div class="text-sm">Pending</div>
            </div>
          </template>
        </Card>
        <Card class="stat-badge">
          <template #content>
            <div class="text-center">
              <div class="stat-number text-2xl font-bold">{{ stats.total }}</div>
              <div class="text-sm">Total</div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- Filters -->
    <Card class="mb-4">
      <template #content>
        <div class="grid">
          <div class="col-12 md:col-4">
            <label class="block mb-2 font-semibold">Filter by Status</label>
            <Dropdown
              v-model="localFilters.status"
              :options="statusOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Statuses"
              @change="applyFilters"
            />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2 font-semibold">Sort By</label>
            <Dropdown
              v-model="localFilters.sort_by"
              :options="sortOptions"
              optionLabel="label"
              optionValue="value"
              @change="applyFilters"
            />
          </div>
          <div class="col-12 md:col-4">
            <label class="block mb-2 font-semibold">Sort Order</label>
            <Dropdown
              v-model="localFilters.sort_order"
              :options="orderOptions"
              optionLabel="label"
              optionValue="value"
              @change="applyFilters"
            />
          </div>
        </div>
        <Button
          label="Reset Filters"
          icon="pi pi-filter-slash"
          severity="secondary"
          @click="resetFiltersClick"
          class="mt-3"
        />
      </template>
    </Card>

    <!-- Comments Table -->
    <LoadingSpinner v-if="commentStore.loading" message="Loading comments..." />

    <div v-else class="card">
      <DataTable
        :value="commentStore.comments"
        :loading="commentStore.loading"
        paginator
        :rows="20"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="commentStore.totalRecords"
        :lazy="true"
        @page="onPage"
        stripedRows
        responsiveLayout="scroll"
        dataKey="id"
      >
        <!-- ID Column -->
        <Column field="id" header="ID" style="width: 80px">
          <template #body="{ data }">
            <span class="font-semibold">#{{ data.id }}</span>
          </template>
        </Column>

        <!-- Author Column -->
        <Column field="user_id" header="Author" style="width: 150px">
          <template #body="{ data }">
            <div class="flex align-items-center gap-2">
              <Avatar :label="data.user_name?.charAt(0)" shape="circle" />
              <div>
                <div class="font-semibold">{{ data.user_name }}</div>
                <div class="text-xs text-color-secondary">{{ data.user_email }}</div>
              </div>
            </div>
          </template>
        </Column>

        <!-- Article Column -->
        <Column field="news_id" header="Article" style="width: 200px">
          <template #body="{ data }">
            <div class="flex flex-column gap-1">
              <span class="font-semibold">{{ data.article_title }}</span>
              <Tag :value="`#${data.news_id}`" severity="info" />
            </div>
          </template>
        </Column>

        <!-- Comment Content Column -->
        <Column field="content" header="Comment" style="width: 300px">
          <template #body="{ data }">
            <div class="comment-text">{{ truncateText(data.content, 100) }}</div>
          </template>
        </Column>

        <!-- Status Column -->
        <Column field="status" header="Status" style="width: 120px">
          <template #body="{ data }">
            <Tag
              :value="data.status"
              :severity="getStatusSeverity(data.status)"
              :icon="getStatusIcon(data.status)"
            />
          </template>
        </Column>

        <!-- Date Column -->
        <Column field="created_at" header="Date" style="width: 150px">
          <template #body="{ data }">
            <div class="flex flex-column gap-1">
              <span>{{ formatDate(data.created_at) }}</span>
              <span class="text-xs text-color-secondary">{{ formatTime(data.created_at) }}</span>
            </div>
          </template>
        </Column>

        <!-- Actions Column -->
        <Column header="Actions" style="width: 200px" :frozen="true" alignFrozen="right">
          <template #body="{ data }">
            <div class="flex gap-2">
              <Button
                v-if="data.status === 'pending'"
                icon="pi pi-check"
                severity="success"
                rounded
                text
                @click="handleApprove(data.id)"
                v-tooltip="'Approve'"
              />
              <Button
                v-if="data.status === 'pending'"
                icon="pi pi-times"
                severity="danger"
                rounded
                text
                @click="handleReject(data.id)"
                v-tooltip="'Reject'"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                @click="handleDelete(data.id)"
                v-tooltip="'Delete'"
              />
              <Button
                icon="pi pi-eye"
                severity="info"
                rounded
                text
                @click="viewCommentDetail(data)"
                v-tooltip="'View Detail'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Comment Detail Dialog -->
    <Dialog
      v-model:visible="detailDialogVisible"
      header="Comment Detail"
      :modal="true"
      :style="{ width: '50vw' }"
      @hide="detailDialogVisible = false"
    >
      <div v-if="selectedComment" class="grid">
        <div class="col-12">
          <div class="mb-3">
            <label class="block font-semibold mb-2">Author</label>
            <div class="flex align-items-center gap-2">
              <Avatar :label="selectedComment.user_name?.charAt(0)" shape="circle" />
              <div>
                <div class="font-semibold">{{ selectedComment.user_name }}</div>
                <div class="text-sm text-color-secondary">{{ selectedComment.user_email }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="mb-3">
            <label class="block font-semibold mb-2">Article</label>
            <a :href="`/news/${selectedComment.news_id}`" target="_blank" class="text-primary">
              {{ selectedComment.article_title }}
            </a>
          </div>
        </div>

        <div class="col-12">
          <div class="mb-3">
            <label class="block font-semibold mb-2">Status</label>
            <Tag
              :value="selectedComment.status"
              :severity="getStatusSeverity(selectedComment.status)"
            />
          </div>
        </div>

        <div class="col-12">
          <div class="mb-3">
            <label class="block font-semibold mb-2">Comment</label>
            <div class="surface-card p-3 border-round">
              {{ selectedComment.content }}
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="mb-3">
            <label class="block font-semibold mb-2">Created At</label>
            <span>
              {{ formatDate(selectedComment.created_at) }}
              {{ formatTime(selectedComment.created_at) }}
            </span>
          </div>
        </div>

        <div class="col-12 flex gap-2 justify-content-end">
          <Button
            v-if="selectedComment.status === 'pending'"
            label="Approve"
            icon="pi pi-check"
            severity="success"
            @click="handleApprove(selectedComment.id, true)"
          />
          <Button
            v-if="selectedComment.status === 'pending'"
            label="Reject"
            icon="pi pi-times"
            severity="danger"
            @click="handleReject(selectedComment.id, true)"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="handleDelete(selectedComment.id, true)"
          />
        </div>
      </div>
    </Dialog>

    <!-- Confirmation Dialog -->
    <ConfirmDialog />

    <!-- Toast Messages -->
    <Toast />
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useCommentStore } from '@/stores/comments';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref } from 'vue';

const commentStore = useCommentStore();
const toast = useToast();
const confirm = useConfirm();

const detailDialogVisible = ref(false);
const selectedComment = ref(null);

const localFilters = reactive({
  status: '',
  sort_by: 'created_at',
  sort_order: 'DESC',
});

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const sortOptions = [
  { label: 'Created Date', value: 'created_at' },
  { label: 'Author', value: 'user_id' },
  { label: 'Article', value: 'news_id' },
];

const orderOptions = [
  { label: 'Descending', value: 'DESC' },
  { label: 'Ascending', value: 'ASC' },
];

const stats = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
});

// Utilities
const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusSeverity = (status) => {
  const severityMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
  };
  return severityMap[status] || 'info';
};

const getStatusIcon = (status) => {
  const iconMap = {
    pending: 'pi pi-hourglass',
    approved: 'pi pi-check-circle',
    rejected: 'pi pi-times-circle',
  };
  return iconMap[status] || '';
};

// Actions
const onPage = (event) => {
  commentStore.fetchComments(event.page + 1);
};

const applyFilters = () => {
  commentStore.setFilters(localFilters);
  commentStore.fetchComments(1);
};

const resetFiltersClick = () => {
  localFilters.status = '';
  localFilters.sort_by = 'created_at';
  localFilters.sort_order = 'DESC';
  commentStore.resetFilters();
  commentStore.fetchComments(1);
};

const viewCommentDetail = (comment) => {
  selectedComment.value = comment;
  detailDialogVisible.value = true;
};

const handleApprove = async (commentId, closeDialog = false) => {
  try {
    await commentStore.approveComment(commentId);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Comment approved successfully',
      life: 3000,
    });
    if (closeDialog) {
      detailDialogVisible.value = false;
      selectedComment.value = null;
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to approve comment',
      life: 3000,
    });
  }
};

const handleReject = async (commentId, closeDialog = false) => {
  try {
    await commentStore.rejectComment(commentId);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Comment rejected successfully',
      life: 3000,
    });
    if (closeDialog) {
      detailDialogVisible.value = false;
      selectedComment.value = null;
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to reject comment',
      life: 3000,
    });
  }
};

const handleDelete = (commentId, closeDialog = false) => {
  confirm.require({
    message: 'Are you sure you want to delete this comment? This action cannot be undone.',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await commentStore.deleteComment(commentId);
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Comment deleted successfully',
          life: 3000,
        });
        if (closeDialog) {
          detailDialogVisible.value = false;
          selectedComment.value = null;
        }
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete comment',
          life: 3000,
        });
      }
    },
  });
};

// Initialization
onMounted(() => {
  commentStore.fetchComments(1);
  commentStore.fetchStats();
  stats.value = commentStore.stats;
});
</script>

<style scoped>
.comment-manager {
  @apply w-full;
}

.stat-badge {
  width: 150px;
}

.stat-badge.pending {
  background-color: rgba(251, 191, 36, 0.1);
}

.stat-number {
  color: var(--primary-color);
}

.comment-text {
  color: var(--text-color);
  line-height: 1.5;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
