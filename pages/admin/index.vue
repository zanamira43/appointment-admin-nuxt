<script setup lang="ts">
import type { Patient } from "~/types";
import useGetPatient from "~/composable/useGetPatient";

const { patients, isLoading } = await useGetPatient();

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

  {
    key: "actions",
    label: "Actions",
  },
];

const items = (row: Patient) => [
  [
    {
      label: "Edit",
      icon: "heroicons:pencil-square-20-solid",
      iconClass: "text-blue-600",
      class: "text-blue-500",
      click: () => {
        navigateTo(`/admin/edit/${row.id}`);
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "heroicons:trash-20-solid",
      iconClass: "text-red-600",
      class: "text-red-500",
      click: () => {
        console.log("Delete");
      },
    },
  ],
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
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
