<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { IAllSession } from "@/types/ISession";

const props = defineProps<{
  patientId: number;
}>();

/// create time table Modal Ref
const createModal = ref(false);
const EditModal = ref(false);
const editId = ref<number | null>(0);

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const search = ref("");
const page = ref(1);

const { sessions, isLoading, fetchSessions } = useGetSessionsByPatient(
  props.patientId,
  search,
  page
);

const sessionLists = computed<IAllSession | any>(() => {
  return sessions.value?.data ?? [];
});

onMounted(async () => {
  await fetchSessions();
});

// watch search query any changes
watch(search, () => {
  fetchSessions();
});

const columns: TableColumn<IAllSession>[] = [
  {
    accessorKey: "id",
    header: $t("id"),
    cell: ({ row }: any) => `${row.index + 1}`,
  },
  {
    accessorKey: "subject",
    header: $t("subject"),
  },
  {
    accessorKey: "communication_types",
    header: $t("communication_types"),
    cell: ({ row }: any) => {
      const value = row.getValue("communication_types");
      return $t(value);
    },
  },
  {
    accessorKey: "session_date",
    header: $t("session_date"),
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("session_date"));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  {
    accessorKey: "status",
    header: $t("status"),
    cell: ({ row }: any) => {
      const value = row.getValue("status");
      const statusColors: Record<string, string> = {
        new_session: "text-blue-600",
        completed: "text-green-600",
        cancelled: "text-red-600",
        in_progress: "text-amber-600",
      };
      const colorClass = statusColors[value] || "text-gray-600";
      return h("span", { class: colorClass }, $t(value));
    },
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
        EditModal.value = true;
        editId.value = row.original.id;
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
const { deleteSession: mutate, isDeleteSessionLoading } = useDeleteSession();
const deleteSession = async () => {
  if (!delId.value) return;

  await mutate(delId.value, {
    onSuccess: () => {
      toast.add({
        description: $t("session_deleted_successfully"),
        color: "success",
        icon: "i-heroicons-check-circle",
      });
      delModal.value = false;
      delId.value = 0;
      fetchSessions();
    },
  });
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(row: TableRow<IAllSession>, e?: Event) {
  const rowValue = row.getValue("id");
  const now = Date.now();
  if (lastClickTime.value && now - lastClickTime.value <= 360) {
    lastClickTime.value = null;
    EditModal.value = true;
    editId.value = rowValue as number;
  } else {
    // Store current time for the next click
    lastClickTime.value = now;
  }
}
</script>
<template>
  <div class="w-full h-auto">
    <div class="px-4 py-2">
      <!-- page header -->
      <AdminPageHeader :title="$t('session')" :subtitle="$t('list_of_all_sessions')">
        <div class="flex items-center justify-between gap-4">
          <!-- search by patient name && phone number -->
          <UInput
            v-model="search"
            type="text"
            icon="heroicons:magnifying-glass-20-solid"
            :placeholder="$t('search')"
            class="w-[200px]"
          />

          <UButton
            color="primary"
            :label="$t('add')"
            icon="i-heroicons-plus-20-solid"
            class="ml-auto"
            @click="createModal = true"
          />
        </div>
      </AdminPageHeader>

      <!-- patient table  -->
      <div class="mt-2">
        <UTable
          sticky
          loading-color="primary"
          loading-animation="carousel"
          :data="sessionLists"
          :columns="columns"
          :loading="isLoading"
          :row-selection="rowSelection"
          @select="handleClick"
          class="cursor-pointer border border-gray-200 rounded-md"
        >
        </UTable>

        <UPagination
          v-model:page="page"
          :items-per-page="sessions?.limit ?? 1"
          :total="sessions?.total ?? 0"
          :siblingCount="1"
          variant="soft"
          active-color="secondary"
          :next="sessions?.has_next"
          :prev="sessions?.has_prev"
          class="mt-4"
        />
      </div>

      <!-- delete session Modal -->
      <UModal v-model:open="delModal">
        <template #body>
          <div class="flex flex-col justify-center items-center gap-2">
            <h1 class="text-2xl font-bold text-center">{{ $t("delete_session") }}</h1>
            <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-start items-start gap-2">
            <UButton
              :disabled="isDeleteSessionLoading"
              :label="$t('yes')"
              color="error"
              @click="deleteSession"
            />
          </div>
        </template>
      </UModal>

      <!-- create new session modal -->
      <UModal v-model:open="createModal" :ui="{ content: 'min-w-[900px]' }">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h1 class="text-2xl font-bold text-center">
              {{ $t("add_session") }}
            </h1>
          </div>
        </template>
        <template #body>
          <AdminSessionCreate @closeModal="createModal = false" :patientId="patientId" />
        </template>
      </UModal>

      <!-- edit session modal -->
      <UModal v-model:open="EditModal" :ui="{ content: 'min-w-[900px]' }">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h1 class="text-2xl font-bold text-center">
              {{ $t("edit_session") }}
            </h1>
          </div>
        </template>
        <template #body>
          <AdminSessionEdit
            @closeModal="EditModal = false"
            :id="editId ?? 0"
            :patient-id="patientId"
          />
        </template>
      </UModal>
    </div>
  </div>
</template>
