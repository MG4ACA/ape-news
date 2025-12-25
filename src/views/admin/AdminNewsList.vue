<template>
  <div class="admin-news-list">
    <div class="list-header mb-4">
      <h1 class="text-3xl font-bold">News Management</h1>
      <Button
        label="Create Article"
        icon="pi pi-plus"
        @click="$router.push('/admin/news/create')"
      />
    </div>

    <Card>
      <template #content>
        <DataTable
          :value="[]"
          :loading="false"
          paginator
          :rows="10"
          stripedRows
          responsiveLayout="scroll"
        >
          <Column field="title" header="Title" sortable />
          <Column field="author_name" header="Author" sortable />
          <Column field="status" header="Status" sortable />
          <Column field="created_at" header="Date" sortable />
          <Column header="Actions">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button icon="pi pi-pencil" text rounded severity="info" />
                <Button icon="pi pi-trash" text rounded severity="danger" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
// TODO: Implement news management
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
