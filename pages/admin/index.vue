<script setup lang="ts">
import usePatient from "~/composable/usePatient";
const admin = ref("admin");

const { patients, isLoading } = await usePatient();

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    key: "phone_number",
    label: "Phone Number",
  },
];

const items = (row: any) => [
  {
    label: "Edit",
    icon: "heroicons:pencil-square-20-solid",
    click: () => {
      navigateTo(`/admin/edit/${row.id}`);
    },
  },
  {
    label: "Delete",
    icon: "heroicons:trash-20-solid",
    click: () => {
      console.log("Delete");
    },
  },
];
</script>
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <DashboardPageHeader title="Patient List" subtitle="List of all patients" />

        <div class="mt-2">
          <UTable :rows="patients?.body" :columns="columns" :loading="isLoading">
            <template #id-data="{ row }">
              <NuxtLink :to="`/admin/edit/${row.id}`">
                {{ row.id }}
              </NuxtLink>
            </template>

            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="heroicons:ellipsis-horizontal"
                />
              </UDropdown>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
