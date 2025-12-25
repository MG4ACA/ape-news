<template>
  <div
    v-if="totalPages > 1"
    class="pagination-container flex justify-content-center align-items-center gap-2 my-4"
  >
    <Paginator
      :rows="limit"
      :totalRecords="total"
      :first="(page - 1) * limit"
      @page="onPageChange"
      :template="{
        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
        '960px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        '1300px':
          'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      }"
    />
  </div>
</template>

<script setup>
import Paginator from 'primevue/paginator';

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-change']);

const onPageChange = (event) => {
  const newPage = event.page + 1; // PrimeVue Paginator is 0-indexed
  emit('page-change', newPage);
};
</script>

<style scoped>
.pagination-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
