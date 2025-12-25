<template>
  <div class="admin-dashboard">
    <div class="dashboard-header mb-5">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-color-secondary">Welcome back, {{ authStore.user?.full_name }}</p>
    </div>

    <LoadingSpinner v-if="loading" message="Loading dashboard..." />

    <div v-else>
      <!-- Stats Cards -->
      <div class="grid mb-5">
        <div v-for="stat in stats" :key="stat.label" class="col-12 md:col-6 lg:col-3">
          <Card class="stat-card">
            <template #content>
              <div class="flex justify-content-between align-items-start">
                <div>
                  <div class="stat-label">{{ stat.label }}</div>
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-change" :class="stat.changeClass">
                    <i :class="stat.changeIcon"></i>
                    {{ stat.change }}
                  </div>
                </div>
                <div class="stat-icon" :style="{ background: stat.iconBg }">
                  <i :class="stat.icon" :style="{ color: stat.iconColor }"></i>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid mb-5">
        <div class="col-12 lg:col-8">
          <Card>
            <template #title>Article Views (Last 7 Days)</template>
            <template #content>
              <div class="chart-placeholder">
                <i class="pi pi-chart-line text-6xl text-color-secondary"></i>
                <p class="text-color-secondary">Chart coming soon</p>
              </div>
            </template>
          </Card>
        </div>

        <div class="col-12 lg:col-4">
          <Card>
            <template #title>Category Distribution</template>
            <template #content>
              <div class="chart-placeholder">
                <i class="pi pi-chart-pie text-6xl text-color-secondary"></i>
                <p class="text-color-secondary">Chart coming soon</p>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid">
        <div class="col-12 lg:col-6">
          <Card>
            <template #title>Recent Articles</template>
            <template #content>
              <div v-if="recentNews.length > 0" class="activity-list">
                <div
                  v-for="article in recentNews"
                  :key="article.id"
                  class="activity-item cursor-pointer"
                  @click="$router.push(`/news/${article.id}`)"
                >
                  <div class="activity-icon">
                    <i class="pi pi-file"></i>
                  </div>
                  <div class="activity-content">
                    <div class="activity-title">{{ article.title }}</div>
                    <div class="activity-meta">
                      <span>{{ article.author_name }}</span>
                      <span>•</span>
                      <span>{{ formatDate(article.created_at, 'relative') }}</span>
                    </div>
                  </div>
                  <span class="activity-badge" :class="getStatusClass(article.status)">
                    {{ article.status }}
                  </span>
                </div>
              </div>
              <div v-else class="text-center py-4">
                <p class="text-color-secondary">No recent articles</p>
              </div>
            </template>
          </Card>
        </div>

        <div class="col-12 lg:col-6">
          <Card>
            <template #title>Recent Comments</template>
            <template #content>
              <div v-if="recentComments.length > 0" class="activity-list">
                <div
                  v-for="comment in recentComments"
                  :key="comment.id"
                  class="activity-item"
                >
                  <div class="activity-icon">
                    <i class="pi pi-comment"></i>
                  </div>
                  <div class="activity-content">
                    <div class="activity-title">{{ comment.author_name }}</div>
                    <div class="activity-text">{{ truncate(comment.content, 60) }}</div>
                    <div class="activity-meta">
                      {{ formatDate(comment.created_at, 'relative') }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-4">
                <p class="text-color-secondary">No recent comments</p>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { newsService } from '@/services/newsService';
import { commentService } from '@/services/commentService';
import { analyticsService } from '@/services/analyticsService';
import { formatDate } from '@/utils/dateFormatter';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const authStore = useAuthStore();
const loading = ref(true);
const recentNews = ref([]);
const recentComments = ref([]);

const stats = ref([
  {
    label: 'Total Articles',
    value: '0',
    change: '+12% from last month',
    changeClass: 'positive',
    changeIcon: 'pi pi-arrow-up',
    icon: 'pi pi-file',
    iconBg: '#EBF5FF',
    iconColor: '#2196F3',
  },
  {
    label: 'Total Views',
    value: '0',
    change: '+8% from last month',
    changeClass: 'positive',
    changeIcon: 'pi pi-arrow-up',
    icon: 'pi pi-eye',
    iconBg: '#F3E8FF',
    iconColor: '#9333EA',
  },
  {
    label: 'Comments',
    value: '0',
    change: '+23% from last month',
    changeClass: 'positive',
    changeIcon: 'pi pi-arrow-up',
    icon: 'pi pi-comments',
    iconBg: '#FFF4E6',
    iconColor: '#F59E0B',
  },
  {
    label: 'Active Users',
    value: '0',
    change: '+5% from last month',
    changeClass: 'positive',
    changeIcon: 'pi pi-arrow-up',
    icon: 'pi pi-users',
    iconBg: '#E8F5E9',
    iconColor: '#4CAF50',
  },
]);

const fetchDashboardData = async () => {
  loading.value = true;

  try {
    // Fetch recent articles
    const newsResponse = await newsService.getNews({ limit: 5 });
    if (newsResponse.success) {
      recentNews.value = newsResponse.data.news || [];
    }

    // Fetch recent comments (you'll need to add this to commentService)
    // For now, using placeholder
    recentComments.value = [];

    // Fetch analytics stats (you'll need to implement this)
    // const statsResponse = await analyticsService.getDashboardStats();
    // Update stats.value with real data
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  } finally {
    loading.value = false;
  }
};

const getStatusClass = (status) => {
  return {
    published: 'status-published',
    draft: 'status-draft',
  }[status] || '';
};

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
.stat-card {
  height: 100%;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-change.positive {
  color: var(--green-500);
}

.stat-change.negative {
  color: var(--red-500);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.activity-item:hover {
  background: var(--surface-hover);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--surface-100);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.activity-text {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.activity-meta {
  font-size: 0.75rem;
  color: var(--text-color-secondary);
  display: flex;
  gap: 0.5rem;
}

.activity-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-published {
  background: var(--green-100);
  color: var(--green-700);
}

.status-draft {
  background: var(--orange-100);
  color: var(--orange-700);
}
</style>
