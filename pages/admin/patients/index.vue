<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { IAllPatient } from "~/types/IPatient";
import { useGetPatients, useDeletePatient } from "~/composables/patients";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const search = ref("");
const searchByCode = ref("");
const page = ref(1);

const { patients, isLoading, fetchPatients } = useGetPatients(search, searchByCode, page);

const PatientLists = computed<IAllPatient | any>(() => {
  return patients.value?.data ?? [];
});

const { patients: allPatients } = useGetPatients();

const patientOptions: Ref<{ label: string; value: string }[]> = computed(() =>
  allPatients?.value?.data
    ? allPatients?.value.data?.map((patient: any) => ({
        label: patient.slug,
        value: patient.slug,
      }))
    : []
);

// watch search query any changes
watch(search, () => {
  fetchPatients();
});

// Watch for changes and refetch
watch(searchByCode, () => {
  fetchPatients();
});

const clearSearch = () => {
  search.value = "";
  searchByCode.value = "";
  fetchPatients();
};

const columns: TableColumn<IAllPatient>[] = [
  {
    accessorKey: "id",
    header: $t("id"),
    cell: ({ row }: any) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "slug",
    header: $t("code"),
  },
  {
    accessorKey: "name",
    header: $t("name"),
  },
  {
    accessorKey: "gender",
    header: $t("gender"),
    cell: (row: any) => {
      const value = row.getValue("gender");
      return value === "Male" ? $t("Male") : $t("Female");
    },
  },
  {
    accessorKey: "age",
    header: $t("age"),
  },
  {
    accessorKey: "phone_number",
    header: $t("phone_number"),
  },

  {
    id: "actions",
    header: $t("actions"),
    cell: ({ row }: any) => {
      return h(
        "div",
        { class: "" },
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
      label: $t("edit"),
      icon: "heroicons:pencil-square-20-solid",
      iconClass: "text-blue-600",
      class: "text-blue-500",
      onSelect() {
        navigateTo(`/admin/patients/${row.original.id}`);
      },
    },
  ],
  [
    {
      label: $t("delete"),
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
      description: $t("patient_deleted_successfully"),
      color: "success",
      icon: "i-heroicons-check-circle",
    });
    delModal.value = false;
    delId.value = 0;
    fetchPatients();
  }
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(row: TableRow<IAllPatient>, e?: Event) {
  const rowValue = row.getValue("id");
  const now = Date.now();
  if (lastClickTime.value && now - lastClickTime.value <= 360) {
    lastClickTime.value = null;
    navigateTo(`/admin/patients/${rowValue}`);
  } else {
    // Store current time for the next click
    lastClickTime.value = now;
  }
}
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <!-- page header -->
        <AdminPageHeader :title="$t('patient')" :subtitle="$t('list_of_all_patients')">
          <div class="flex items-center justify-between gap-4">
            <!-- search by patient name && phone number -->
            <UInput
              v-model="search"
              type="text"
              icon="heroicons:magnifying-glass-20-solid"
              :placeholder="$t('search')"
              class="w-[200px]"
            />
            <USelect
              arrow
              :placeholder="$t('search_by_code')"
              v-model="searchByCode"
              :items="patientOptions"
              size="lg"
              class="w-[200px] h-[32px]"
              :search-attributes="['label', 'value']"
            >
            </USelect>

            <UButton
              color="neutral"
              :label="$t('all')"
              class="ml-auto"
              @click="clearSearch"
            />

            <UButton
              color="primary"
              :label="$t('add')"
              icon="i-heroicons-plus-20-solid"
              class="ml-auto"
              @click="navigateTo('/admin/patients/add')"
            />
          </div>
        </AdminPageHeader>

        <!-- patient table  -->
        <div class="mt-2">
          <UTable
            sticky
            loading-color="primary"
            loading-animation="carousel"
            :data="PatientLists"
            :columns="columns"
            :loading="isLoading"
            :row-selection="rowSelection"
            @select="handleClick"
            class="cursor-pointer border border-gray-200 rounded-md"
          >
          </UTable>

          <UPagination
            v-model:page="page"
            :items-per-page="patients?.limit ?? 1"
            :total="patients?.total ?? 0"
            :siblingCount="1"
            variant="soft"
            active-color="secondary"
            :next="patients?.has_next"
            :prev="patients?.has_prev"
            class="mt-4"
          />
        </div>

        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">{{ $t("delete_patient") }}</h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton :label="$t('yes')" color="error" @click="deletePatient" />
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
