<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { h, resolveComponent } from "vue";
import type { IAllPersonInfo } from "@/types/IPersonInfo";

import { useGetAllPersonsInfo, useDeletePersonInfo } from "@/composables/personInfo";

// search input
const search = ref("");

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const page = ref(1);
const { personsData, isLoading, fetchPersonsInfo } = useGetAllPersonsInfo(search, page);

onMounted(async () => {
  await fetchPersonsInfo();
});

watch(search, () => {
  fetchPersonsInfo();
});

const { deletePersonInfo, isPending } = useDeletePersonInfo();

const toast = useToast();

const personsInfoDataList = computed<IAllPersonInfo | any>(() => {
  return personsData.value?.data ?? [];
});

// delete time table modal Ref
const delModal = ref(false);
const delId = ref<number | null>(null);

/// create time table Modal Ref
const createModal = ref(false);

// edit time table modal Ref

const EditModal = ref(false);
const editId = ref<number | null>(0);

const columns: TableColumn<IAllPersonInfo>[] = [
  {
    accessorKey: "id",
    header: $t("id"),
  },
  {
    accessorKey: "full_name",
    header: $t("fullName"),
  },
  {
    accessorKey: "phone_number",
    header: $t("phone_number"),
  },

  {
    id: "actions",
    header: $t("actions"),
    cell: ({ row }: { row: TableRow<IAllPersonInfo> }) => {
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
      iconClass: "text-red-600",
      class: "text-blue-500",
      onSelect() {
        EditModal.value = true;
        editId.value = row.original.id;
      },
    },
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

const handleDeletePersonInfo = async () => {
  await deletePersonInfo(delId.value as number, {
    onSuccess: () => {
      toast.add({
        description: $t("person_info_deleted_successfully"),
        color: "success",
      });
    },
  });
  await fetchPersonsInfo();
  delModal.value = false;
  delId.value = null;
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClick = ref<number | null>(null);
function handleClick(e: Event, row: TableRow<IAllPersonInfo>) {
  const rowValue = row?.getValue("id");
  const now = Date.now();
  if (lastClick.value && now - lastClick.value <= 360) {
    lastClick.value = null;
    editId.value = rowValue as number;
    EditModal.value = true;
  } else {
    // Store current time for the next click
    lastClick.value = now;
  }
}
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('two_month_plan')">
          <div class="flex justify-between items-center w-full gap-4">
            <!-- search by name && phone number -->
            <UInput
              v-model="search"
              type="text"
              icon="heroicons:magnifying-glass-20-solid"
              :placeholder="$t('search')"
              class="w-full"
            >
            </UInput>

            <UButton
              :label="$t('add')"
              color="primary"
              icon="heroicons:plus-20-solid"
              @click="createModal = true"
            />
          </div>
        </AdminPageHeader>
        <div class="mt-2">
          <UTable
            sticky
            loading-color="primary"
            loading-animation="carousel"
            :loading="isLoading"
            :data="personsInfoDataList"
            :columns="columns"
            :row-selection="rowSelection"
            @select="handleClick"
            class="cursor-pointer border border-gray-200 rounded-md"
          />

          <UPagination
            v-model:page="page"
            :items-per-page="personsData?.limit ?? 1"
            :total="personsData?.total ?? 0"
            :siblingCount="1"
            variant="soft"
            active-color="secondary"
            :next="personsData?.has_next"
            :prev="personsData?.has_prev"
            class="mt-4"
          />
        </div>
        <!-- delete person info Modal -->
        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("delete_person_subscriber") }}
              </h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton
                :label="$t('yes')"
                color="error"
                @click="handleDeletePersonInfo"
                :loading="isPending"
              />
            </div>
          </template>
        </UModal>

        <!-- create new person info - subscriber -->
        <UModal v-model:open="createModal" :ui="{ content: 'min-w-255' }">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("new_subscriber_form") }}
              </h1>

              <UButton
                icon="material-symbols-light:close-rounded"
                @click="createModal = false"
              />
            </div>
          </template>
          <template #body>
            <AdminTwoMonthPlanCreate @closeModal="createModal = false" />
          </template>
        </UModal>

        <!-- edit time Table -->
        <UModal v-model:open="EditModal" :ui="{ content: 'min-w-255' }">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("edit_subscriber_form") }}
              </h1>

              <UButton
                icon="material-symbols-light:close-rounded"
                @click="EditModal = false"
              />
            </div>
          </template>
          <template #body>
            <AdminTwoMonthPlanEdit @closeModal="EditModal = false" :id="editId" />
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
