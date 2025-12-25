<template>
  <div class="comment-section">
    <h3 class="text-2xl font-bold mb-4">Comments ({{ comments.length }})</h3>

    <!-- Comment Form -->
    <div v-if="authStore.isAuthenticated" class="comment-form mb-5">
      <Card>
        <template #content>
          <form @submit.prevent="handleSubmit">
            <Textarea
              v-model="commentContent"
              placeholder="Share your thoughts..."
              rows="3"
              class="w-full mb-3"
              :disabled="submitting"
            />
            <div class="flex justify-content-end gap-2">
              <Button
                type="button"
                label="Cancel"
                severity="secondary"
                outlined
                @click="commentContent = ''"
                v-if="commentContent"
              />
              <Button
                type="submit"
                label="Post Comment"
                :loading="submitting"
                :disabled="!commentContent.trim() || submitting"
              />
            </div>
          </form>
        </template>
      </Card>
    </div>

    <div v-else class="login-prompt mb-5">
      <Message severity="info">
        <router-link to="/login" class="text-primary">Login</router-link>
        to post comments
      </Message>
    </div>

    <!-- Comments List -->
    <LoadingSpinner v-if="loading" message="Loading comments..." />

    <ErrorMessage v-else-if="error" :error="error" @close="error = ''" />

    <div v-else-if="comments.length > 0" class="comments-list flex flex-column gap-3">
      <Card v-for="comment in comments" :key="comment.id" class="comment-item">
        <template #content>
          <div class="flex justify-content-between align-items-start mb-2">
            <div class="comment-author">
              <span class="font-semibold">{{ comment.author_name }}</span>
              <span class="text-sm text-color-secondary ml-2">
                {{ formatDate(comment.created_at, 'relative') }}
              </span>
            </div>
            <Button
              v-if="canDelete(comment)"
              icon="pi pi-trash"
              text
              rounded
              severity="danger"
              @click="handleDelete(comment.id)"
              v-tooltip.top="'Delete comment'"
            />
          </div>
          <p class="comment-content m-0">{{ comment.content }}</p>
        </template>
      </Card>
    </div>

    <div v-else class="text-center py-6">
      <i class="pi pi-comments text-4xl text-color-secondary mb-3"></i>
      <p class="text-color-secondary">No comments yet. Be the first to comment!</p>
    </div>
  </div>
</template>

<script setup>
import ErrorMessage from '@/components/common/ErrorMessage.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { commentService } from '@/services/commentService';
import { useAuthStore } from '@/stores/auth';
import { formatDate } from '@/utils/dateFormatter';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const props = defineProps({
  newsId: {
    type: [String, Number],
    required: true,
  },
});

const authStore = useAuthStore();
const toast = useToast();

const comments = ref([]);
const commentContent = ref('');
const loading = ref(false);
const submitting = ref(false);
const error = ref('');

const canDelete = (comment) => {
  return authStore.isAuthenticated && (authStore.user?.id === comment.user_id || authStore.isAdmin);
};

const fetchComments = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await commentService.getComments(props.newsId);
    if (response.success) {
      comments.value = response.data;
    }
  } catch (err) {
    error.value = err.message || 'Failed to load comments';
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!commentContent.value.trim()) return;

  submitting.value = true;

  try {
    const response = await commentService.createComment(props.newsId, {
      content: commentContent.value.trim(),
    });

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Comment posted successfully!',
        life: 3000,
      });

      commentContent.value = '';
      await fetchComments();
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.message || 'Failed to post comment',
      life: 5000,
    });
  } finally {
    submitting.value = false;
  }
};

const handleDelete = async (commentId) => {
  if (!confirm('Are you sure you want to delete this comment?')) return;

  try {
    await commentService.deleteComment(commentId);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Comment deleted',
      life: 3000,
    });

    await fetchComments();
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.message || 'Failed to delete comment',
      life: 5000,
    });
  }
};

onMounted(() => {
  fetchComments();
});
</script>

<style scoped>
.comment-item {
  background: var(--surface-50);
}

.comment-content {
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.login-prompt a {
  text-decoration: none;
  font-weight: 600;
}

.login-prompt a:hover {
  text-decoration: underline;
}
</style>
