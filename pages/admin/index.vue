<script setup lang="ts">
import type { Patient } from "~/types";
import useGetPatients from "~/composables/useGetPatients";
import useDeletePatient from "~/composables/useDeletePatient";

const searchStore = useSearchStore();
const searchQuery = ref("");

const { patients, isLoading, fetchPatients } = useGetPatients();

const PatientLists = computed(() => {
  const body = patients.value?.body as Patient[];
  if (searchStore.query) {
    return body.filter((patient: Patient) => {
      return (
        patient.slug.includes(searchStore.query) ||
        patient.phone_number.includes(searchStore.query) ||
        patient.name.includes(searchStore.query)
      );
    });
  }
  return patients.value?.body;
});

const patientOptions: Ref<{ label: string; value: string }[]> = ref([
  {
    label: "",
    value: "",
  },
]);

onMounted(async () => {
  await fetchPatients();
  if (PatientLists.value) {
    patientOptions.value = PatientLists.value!.map<{ label: string; value: string }>(
      (patient: any) => {
        return {
          label: patient.slug,
          value: patient.slug,
        };
      }
    );
  }
});

// const patientOpttts = [{ label: "-----", value: "" }, ...patientOptions.value];

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

const sort = ref({
  column: "id",
  direction: "desc",
});

const columns = [
  {
    type: "text",
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "slug",
    label: "Code",
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
      color: "green",
      icon: "i-heroicons-check-circle",
    });
    delModal.value = false;
    delId.value = 0;
    fetchPatients();
  }
};
</script>
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <!-- page header -->
        <DashboardPageHeader title="Patient List" subtitle="List of all patients">
          <div class="flex items-center justify-between gap-4">
            <UButton
              color="black"
              label="All"
              size="sm"
              class="mr-2 p-2"
              @click="searchStore.query = ''"
            />
            <USelectMenu
              id="searchPatient"
              :searchable="true"
              v-model="searchQuery"
              :options="patientOptions"
              size="lg"
              option-attribute="label"
              value-attribute="value"
              clear-search-on-close
              class="w-[200px]"
              :search-attributes="['label', 'value']"
            >
              <template #empty>
                <div class="text-center">No Patient Found</div>
              </template>
            </USelectMenu>
          </div>
        </DashboardPageHeader>

        <!-- patient table  -->
        <div class="mt-2">
          <UTable
            :sort="sort as any"
            :rows="PatientLists as Patient []"
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
