<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { Patient } from "~/types";
import { useGetPatients, useDeletePatient } from "~/composables/patients";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const searchStore = useSearchStore();
const searchQuery = ref("");

const { patients, isLoading, fetchPatients } = useGetPatients();

const PatientLists = computed<Patient[] | undefined>(() => {
  const body = (patients.value?.body ?? []) as Patient[];
  if (searchStore.query) {
    return body.filter((patient: Patient) => {
      return (
        patient.slug.includes(searchStore.query) ||
        patient.phone_number.includes(searchStore.query) ||
        patient.name.includes(searchStore.query)
      );
    });
  }
  return Array.isArray(patients.value?.body) ? (patients.value.body as Patient[]) : [];
});

const patientOptions: Ref<{ label: string; value: string }[]> = ref([
  {
    label: "",
    value: "",
  },
]);

onMounted(async () => {
  await fetchPatients();
  if (Array.isArray(PatientLists.value)) {
    patientOptions.value = PatientLists.value.map<{ label: string; value: string }>(
      (patient: any) => {
        return {
          label: patient.slug,
          value: patient.slug,
        };
      }
    );
  }
});

// watch search query any changes
watch(
  () => searchQuery.value,
  () => {
    if (searchQuery.value) {
      searchStore.query = searchQuery.value;
    } else {
      searchStore.query = "";
      patientOptions.value = [];
      fetchPatients();
    }
  }
);

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: any) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "slug",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => {
      return h(
        "div",
        { class: "text-center" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            })
        )
      );
    },
  },
];

const getRowItems = (row: any) => [
  [
    {
      label: "Edit",
      icon: "heroicons:pencil-square-20-solid",
      iconClass: "text-blue-600",
      class: "text-blue-500",
      onSelect() {
        navigateTo(`/admin/edit/${row.original.id}`);
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "heroicons:trash-20-solid",
      iconClass: "text-red-600",
      class: "text-red-500",
      onSelect() {
        delModal.value = true;
        delId.value = row.original.id;
      },
    },
  ],
];

const toast = useToast();
const delModal = ref(false);
const delId = ref(0);
const { mutate, isPatientDeleted } = useDeletePatient();
const deletePatient = async () => {
  if (!delId.value) return;

  await mutate(delId.value);
  if (isPatientDeleted) {
    await toast.add({
      description: "Patient Deleted Successfully",
      color: "success",
      icon: "i-heroicons-check-circle",
    });
    delModal.value = false;
    delId.value = 0;
    fetchPatients();
  }
};
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <!-- page header -->
        <AdminPageHeader title="Patient List" subtitle="List of all patients">
          <div class="flex items-center justify-between gap-4">
            <UButton
              color="neutral"
              label="All"
              size="sm"
              class="mr-2 p-2"
              @click="searchStore.query = ''"
            />
            <USelectMenu
              id="searchPatient"
              :searchable="true"
              arrow
              placeholder="Search by Code"
              v-model:search-term="searchQuery"
              :items="patientOptions"
              size="lg"
              clear-search-on-close
              class="w-[200px]"
              :search-attributes="['label', 'value']"
            >
              <template #empty>
                <div class="text-center">No Patient Found</div>
              </template>
            </USelectMenu>

            <UButton
              color="primary"
              label="Add Patient"
              icon="i-heroicons-plus-20-solid"
              class="ml-auto"
              @click="navigateTo('/admin/patients/add')"
            />
          </div>
        </AdminPageHeader>

        <!-- patient table  -->
        <div class="mt-2">
          <UTable :data="PatientLists" :columns="columns" :loading="isLoading"> </UTable>
        </div>

        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">Delete Patient</h1>
              <p class="text-center">Are you sure you want to delete this patient?</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
                @click="delModal = false"
              />
              <UButton label="Delete" color="error" @click="deletePatient" />
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
