<template>
  <div class="analytics-dashboard">
    <!-- Header with Date Range Selector -->
    <div class="flex justify-content-between align-items-center mb-6">
      <h1 class="text-3xl font-bold m-0">Analytics Dashboard</h1>
      <div class="flex gap-2 align-items-center">
        <label class="font-semibold">Time Period:</label>
        <Dropdown
          v-model="selectedDays"
          :options="dayOptions"
          optionLabel="label"
          optionValue="value"
          @change="handleDateChange"
        />
        <Button
          icon="pi pi-refresh"
          rounded
          text
          @click="refreshData"
          :loading="analyticsStore.loading"
        />
      </div>
    </div>

    <LoadingSpinner v-if="analyticsStore.loading" message="Loading analytics..." />

    <div v-else>
      <!-- Key Metrics Cards -->
      <div class="grid mb-6">
        <div class="col-12 md:col-3">
          <Card class="metric-card">
            <template #content>
              <div class="flex justify-content-between align-items-center">
                <div>
                  <div class="text-color-secondary text-sm mb-2">Total Views</div>
                  <div class="text-3xl font-bold">{{ formatNumber(stats.totalViews || 0) }}</div>
                </div>
                <i class="pi pi-eye text-4xl" style="color: var(--primary-color)"></i>
              </div>
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-3">
          <Card class="metric-card">
            <template #content>
              <div class="flex justify-content-between align-items-center">
                <div>
                  <div class="text-color-secondary text-sm mb-2">Total Articles</div>
                  <div class="text-3xl font-bold">{{ formatNumber(stats.totalArticles || 0) }}</div>
                </div>
                <i class="pi pi-file text-4xl" style="color: var(--green-500)"></i>
              </div>
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-3">
          <Card class="metric-card">
            <template #content>
              <div class="flex justify-content-between align-items-center">
                <div>
                  <div class="text-color-secondary text-sm mb-2">Avg Views/Article</div>
                  <div class="text-3xl font-bold">{{ formatNumber(avgViews) }}</div>
                </div>
                <i class="pi pi-chart-line text-4xl" style="color: var(--orange-500)"></i>
              </div>
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-3">
          <Card class="metric-card">
            <template #content>
              <div class="flex justify-content-between align-items-center">
                <div>
                  <div class="text-color-secondary text-sm mb-2">Total Categories</div>
                  <div class="text-3xl font-bold">
                    {{ formatNumber(stats.totalCategories || 0) }}
                  </div>
                </div>
                <i class="pi pi-list text-4xl" style="color: var(--purple-500)"></i>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid mb-6">
        <!-- Views Over Time Chart -->
        <div class="col-12 lg:col-8">
          <Card>
            <template #title>
              <h3 class="text-xl font-bold">Views Over Time</h3>
            </template>
            <template #content>
              <Chart
                v-if="viewsChartData"
                type="line"
                :data="viewsChartData"
                :options="chartOptions"
              />
            </template>
          </Card>
        </div>

        <!-- Views by Category Chart -->
        <div class="col-12 lg:col-4">
          <Card>
            <template #title>
              <h3 class="text-xl font-bold">Views by Category</h3>
            </template>
            <template #content>
              <Chart
                v-if="categoryChartData"
                type="doughnut"
                :data="categoryChartData"
                :options="doughnutOptions"
              />
            </template>
          </Card>
        </div>
      </div>

      <!-- Popular and Trending Articles -->
      <div class="grid mb-6">
        <!-- Most Popular Articles -->
        <div class="col-12 lg:col-6">
          <Card>
            <template #title>
              <h3 class="text-xl font-bold">Most Popular Articles</h3>
            </template>
            <template #content>
              <DataTable
                :value="analyticsStore.popularArticles"
                stripedRows
                responsiveLayout="scroll"
                class="p-datatable-sm"
              >
                <Column field="title" header="Article" style="width: 70%">
                  <template #body="{ data }">
                    <a :href="`/news/${data.id}`" target="_blank" class="text-primary truncate">
                      {{ truncateText(data.title, 40) }}
                    </a>
                  </template>
                </Column>
                <Column field="view_count" header="Views" style="width: 30%">
                  <template #body="{ data }">
                    <Badge :value="formatNumber(data.view_count)" severity="info" />
                  </template>
                </Column>
              </DataTable>
            </template>
          </Card>
        </div>

        <!-- Trending Articles -->
        <div class="col-12 lg:col-6">
          <Card>
            <template #title>
              <h3 class="text-xl font-bold">Trending Now</h3>
            </template>
            <template #content>
              <DataTable
                :value="analyticsStore.trendingArticles"
                stripedRows
                responsiveLayout="scroll"
                class="p-datatable-sm"
              >
                <Column field="title" header="Article" style="width: 70%">
                  <template #body="{ data }">
                    <a :href="`/news/${data.id}`" target="_blank" class="text-primary truncate">
                      {{ truncateText(data.title, 40) }}
                    </a>
                  </template>
                </Column>
                <Column field="recent_views" header="Recent Views" style="width: 30%">
                  <template #body="{ data }">
                    <Badge :value="formatNumber(data.recent_views)" severity="success" />
                  </template>
                </Column>
              </DataTable>
            </template>
          </Card>
        </div>
      </div>

      <!-- Category Performance -->
      <div class="grid">
        <div class="col-12">
          <Card>
            <template #title>
              <h3 class="text-xl font-bold">Category Performance</h3>
            </template>
            <template #content>
              <Chart
                v-if="categoryPerformanceData"
                type="bar"
                :data="categoryPerformanceData"
                :options="barChartOptions"
              />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useAnalyticsStore } from '@/stores/analytics';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dropdown from 'primevue/dropdown';
import { computed, onMounted, ref } from 'vue';

const analyticsStore = useAnalyticsStore();

const selectedDays = ref(30);

const dayOptions = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 14 Days', value: 14 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 90 Days', value: 90 },
];

// Computed stats
const stats = computed(() => analyticsStore.dashboardStats || {});

const avgViews = computed(() => {
  const total = stats.value.totalViews || 0;
  const articles = stats.value.totalArticles || 0;
  return articles > 0 ? Math.round(total / articles) : 0;
});

// Chart Data
const viewsChartData = computed(() => {
  if (!stats.value.viewsOverTime || stats.value.viewsOverTime.length === 0) {
    return null;
  }

  const labels = stats.value.viewsOverTime.map((item) => item.date || '');
  const data = stats.value.viewsOverTime.map((item) => item.views || 0);

  return {
    labels,
    datasets: [
      {
        label: 'Views',
        data,
        borderColor: 'var(--primary-color)',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'var(--primary-color)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
});

const categoryChartData = computed(() => {
  if (!analyticsStore.categoryStats || analyticsStore.categoryStats.length === 0) {
    return null;
  }

  const colors = [
    '#4A90E2',
    '#7B68EE',
    '#FF6B6B',
    '#FFA500',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
  ];

  return {
    labels: analyticsStore.categoryStats.map((item) => item.category_name || 'Unknown'),
    datasets: [
      {
        data: analyticsStore.categoryStats.map((item) => item.view_count || 0),
        backgroundColor: colors.slice(0, analyticsStore.categoryStats.length),
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };
});

const categoryPerformanceData = computed(() => {
  if (!analyticsStore.categoryStats || analyticsStore.categoryStats.length === 0) {
    return null;
  }

  return {
    labels: analyticsStore.categoryStats.map((item) => item.category_name || 'Unknown'),
    datasets: [
      {
        label: 'Total Views',
        data: analyticsStore.categoryStats.map((item) => item.view_count || 0),
        backgroundColor: 'var(--primary-color)',
        borderRadius: 5,
      },
    ],
  };
});

// Chart Options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'var(--surface-border)',
      },
    },
    x: {
      grid: {
        color: 'var(--surface-border)',
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'var(--surface-border)',
      },
    },
    x: {
      grid: {
        color: 'var(--surface-border)',
      },
    },
  },
};

// Utilities
const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const truncateText = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// Actions
const handleDateChange = () => {
  refreshData();
};

const refreshData = async () => {
  await analyticsStore.refreshAllData(selectedDays.value);
};

// Initialization
onMounted(() => {
  analyticsStore.refreshAllData(selectedDays.value);
});
</script>

<style scoped>
.analytics-dashboard {
  @apply w-full;
}

.metric-card {
  height: 100%;
  min-height: 120px;
}

:deep(.p-chart) {
  height: 400px;
}

:deep(.p-datatable-sm) {
  font-size: 0.875rem;
}

a {
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}
</style>
