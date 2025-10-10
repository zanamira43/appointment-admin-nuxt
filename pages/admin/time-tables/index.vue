<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { h, resolveComponent } from "vue";
import type { IAllTimeTables } from "~/types/ITimeTable";

import { formatTimeTo12Hour } from "~/util/util";
import { useDeleteTimeTable, useGetTimeTables } from "~/composables/timeTables";

// search input
const search = ref("");
// search by week day
const searchByWeekDays = ref("");

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const page = ref(1);
const { timeTables, isLoading, fetchTimeTables } = useGetTimeTables(
  search,
  searchByWeekDays,
  page
);

onMounted(async () => {
  await fetchTimeTables();
});

watch(search, () => {
  fetchTimeTables();
});

const { deleteTimeTable, isPending } = useDeleteTimeTable();

const toast = useToast();

const timeTablesLists = computed<IAllTimeTables | any>(() => {
  return timeTables?.value?.data ?? [];
});

// delete time table modal Ref
const delModal = ref(false);
const delId = ref<number | null>(null);

/// create time table Modal Ref
const createModal = ref(false);

// edit time table modal Ref

const EditModal = ref(false);
const editId = ref<number | null>(0);

const columns: TableColumn<IAllTimeTables>[] = [
  {
    accessorKey: "id",
    header: $t("id"),
  },
  {
    accessorKey: "patient_name",
    header: $t("patient"),
  },
  {
    accessorKey: "week_day",
    header: $t("week_day"),
    cell: ({ row }: { row: TableRow<IAllTimeTables> }) => {
      const days: string[] = row.getValue("week_day");
      // Translate and join with "/"
      const translated = days.map((day) => $t(`${day}`)).join(" / ");
      return translated;
    },
  },
  {
    accessorKey: "start_time",
    header: $t("start_time"),
    cell: ({ row }: any) => {
      const value = row.getValue("start_time");
      return formatTimeTo12Hour(value);
    },
  },
  {
    accessorKey: "end_time",
    header: $t("end_time"),
    cell: ({ row }: any) => {
      const value = row.getValue("end_time");
      return formatTimeTo12Hour(value);
    },
  },
  {
    accessorKey: "user",
    header: $t("user"),
    cell: ({ row }: any) => {
      const value = row.getValue("user");
      return value.first_name ? value.first_name : "";
    },
  },

  {
    id: "actions",
    header: $t("actions"),
    cell: ({ row }: { row: TableRow<IAllTimeTables> }) => {
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

const deleteTimeTables = async () => {
  await deleteTimeTable(delId.value as number, {
    onSuccess: () => {
      toast.add({
        description: $t("appointment_deleted_successfully"),
        color: "success",
      });
    },
  });
  await fetchTimeTables();
  delModal.value = false;
  delId.value = null;
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(row: TableRow<IAllTimeTables>, e?: Event) {
  const rowValue = row.getValue("id");
  const now = Date.now();
  if (lastClickTime.value && now - lastClickTime.value <= 360) {
    lastClickTime.value = null;
    editId.value = rowValue as number;
    EditModal.value = true;
  } else {
    // Store current time for the next click
    lastClickTime.value = now;
  }
}

const weekdaysOption = ref([
  { label: $t("Saturday"), value: "Saturday" },
  { label: $t("Sunday"), value: "Sunday" },
  { label: $t("Monday"), value: "Monday" },
  { label: $t("Tuesday"), value: "Tuesday" },
  { label: $t("Wednesday"), value: "Wednesday" },
  { label: $t("Thursday"), value: "Thursday" },
  { label: $t("Friday"), value: "Friday" },
]);

const showTime = ref(false);
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('time_tables')">
          <div class="flex justify-between items-center w-full gap-4">
            <!-- search by week days -->
            <USelect
              arrow
              :placeholder="$t('search_by_week_day')"
              v-model="searchByWeekDays"
              :items="weekdaysOption"
              size="lg"
              class="w-full h-[32px]"
              :search-attributes="['label', 'value']"
            />
            <!-- search by patient name -->
            <UInput
              v-model="search"
              :type="showTime ? 'time' : 'text'"
              icon="heroicons:magnifying-glass-20-solid"
              :placeholder="$t('search')"
              class="w-full"
              :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="secondary"
                  variant="link"
                  size="sm"
                  :icon="
                    showTime
                      ? 'material-symbols:alarm-off-rounded'
                      : 'material-symbols:alarm-on'
                  "
                  :aria-label="showTime ? 'Show Time' : 'Hide Time'"
                  :aria-pressed="showTime"
                  aria-controls="time"
                  @click="showTime = !showTime"
                />
              </template>
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
            :data="timeTablesLists"
            :columns="columns"
            :row-selection="rowSelection"
            @select="handleClick"
            class="cursor-pointer border border-gray-200 rounded-md"
          />

          <UPagination
            v-model:page="page"
            :items-per-page="timeTables?.limit ?? 1"
            :total="timeTables?.total ?? 0"
            :siblingCount="1"
            variant="soft"
            active-color="secondary"
            :next="timeTables?.has_next"
            :prev="timeTables?.has_prev"
            class="mt-4"
          />
        </div>
        <!-- delete appointment Modal -->
        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("delete_time_table") }}
              </h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton
                :label="$t('yes')"
                color="error"
                @click="deleteTimeTables"
                :loading="isPending"
              />
            </div>
          </template>
        </UModal>

        <!-- create new time table -->
        <UModal v-model:open="createModal" :ui="{ content: 'min-w-[900px]' }">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("new_time_table") }}
              </h1>
            </div>
          </template>
          <template #body>
            <AdminTimeTableCreate @closeModal="createModal = false" />
          </template>
        </UModal>

        <!-- edit time Table -->
        <UModal v-model:open="EditModal" :ui="{ content: 'min-w-[900px]' }">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("edit_time_table") }}
              </h1>
            </div>
          </template>
          <template #body>
            <AdminTimeTableEdit @closeModal="EditModal = false" :id="editId" />
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
