<script setup lang="ts">
import type { Patient } from "~/types";
import useGetPatients from "~/composable/useGetPatients";
import useDeletePatient from "~/composable/useDeletePatient";

const { patients, isLoading, refetch } = useGetPatients();

onMounted(() => {
  refetch();
});

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
        delModal.value = true;
        delId.value = row.id;
      },
    },
  ],
];

const delModal = ref(false);
const delId = ref(0);
const { mutate } = useDeletePatient();
const deletePatient = async () => {
  if (!delId.value) return;

  await mutate(delId.value);
  delModal.value = false;
  delId.value = 0;
  await window.location.reload();
  await refetch();
};
</script>
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <!-- page header -->
        <DashboardPageHeader title="Patient List" subtitle="List of all patients" />

        <!-- patient table  -->
        <div class="mt-2">
          <UTable
            :rows="patients?.body as Patient []"
            :columns="columns"
            :loading="isLoading"
          >
            <template #id-data="{ row }">
              <!-- <NuxtLink :to="`/admin/edit/${row.id}`">
                {{ row.id }}
              </NuxtLink> -->
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

        <UModal v-model="delModal">
          <div>
            <UCard divide="none">
              <!-- <template #header> -->
              <h1 class="text-2xl font-bold text-center">Delete Patient</h1>
              <!-- </template> -->
              <p class="text-center">Are you sure you want to delete this patient?</p>
              <template #footer>
                <div class="flex justify-end gap-2">
                  <UButton
                    label="Cancel"
                    color="gray"
                    variant="outline"
                    @click="delModal = false"
                  />
                  <UButton label="Delete" color="red" @click="deletePatient" />
                </div>
              </template>
            </UCard>
          </div>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
