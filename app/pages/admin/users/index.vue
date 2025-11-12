<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { IAllUsers } from "@/types/IUser";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const { users, isLoading, fetchUsers } = useGetUsers();
const userLists = computed<IAllUsers | any>(() => {
  return users?.value ?? [];
});

definePageMeta({
  middleware: "admin",
});

onMounted(async () => {
  await fetchUsers();
});

const columns: TableColumn<IAllUsers>[] = [
  {
    accessorKey: "Id",
    header: $t("id"),
    cell: ({ row }: any) => `${row.getValue("Id")}`,
  },
  {
    accessorKey: "first_name",
    header: $t("first_name"),
  },
  {
    accessorKey: "last_name",
    header: $t("last_name"),
  },
  {
    accessorKey: "email",
    header: $t("email"),
  },
  {
    accessorKey: "phone_number",
    header: $t("phone_number"),
  },

  {
    accessorKey: "role",
    header: $t("role"),
    cell: ({ row }: any) => {
      const value = row.getValue("role");
      if (value === "admin") {
        return $t("admin");
      } else {
        return $t("user");
      }
    },
  },

  {
    accessorKey: "active",
    header: $t("active"),
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
        navigateTo(`/admin/users/${row.original.Id}`);
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
        delId.value = row.original.Id;
      },
    },
  ],
];

const toast = useToast();
const delModal = ref(false);
const delId = ref(0);
const { deleteUser, isDeleteUserLoading } = useDeleteUser();
const handleDeleteUser = async () => {
  if (!delId.value) return;

  try {
    await deleteUser(delId.value as number);
    toast.add({
      description: $t("user_deleted_successfully"),
      color: "success",
      icon: "i-heroicons-check-circle",
    });
    delModal.value = false;
    delId.value = 0;
    fetchUsers();
  } catch {
    toast.add({
      description: $t("no_results_found"),
      color: "success",
      icon: "i-heroicons-check-circle",
    });
  }
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(row: TableRow<IAllUsers>, e?: Event) {
  const rowValue = row?.getValue("Id");
  const now = Date.now();
  if (lastClickTime.value && now - lastClickTime.value <= 360) {
    lastClickTime.value = null;
    navigateTo(`/admin/users/${rowValue}`);
  } else {
    // Store current time for the next click
    lastClickTime.value = now;
  }
}
</script>
<template>
  <NuxtLayout>
    <div claass="w-full h-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('user')" :subtitle="$t('list_of_all_users')">
          <UButton
            color="primary"
            :label="$t('add')"
            icon="i-heroicons-plus-20-solid"
            class="ml-auto"
            @click="navigateTo('/admin/users/adduser')"
          />
        </AdminPageHeader>
        <!-- page content -->
        <div class="mt-2">
          <UTable
            sticky
            loading-color="primary"
            loading-animation="carousel"
            :data="userLists"
            :columns="columns"
            :loading="isLoading"
            :row-selection="rowSelection"
            @select="handleClick"
            class="cursor-pointer border border-gray-200 rounded-md"
          >
            <template #emptyState>
              <div class="flex flex-col justify-center items-center gap-2">
                <h1 class="text-2xl font-bold text-center">
                  {{ $t("no_results_found") }}
                </h1>
              </div>
            </template>

            <template #active-cell="{ row }">
              <div class="flex flex-col justify-center items-center gap-2">
                <Icon
                  v-if="row.getValue('active')"
                  name="i-heroicons-check-circle"
                  :size="20"
                  title="Active"
                  class="text-green-500"
                />
                <Icon
                  v-else
                  name="i-heroicons-x-circle"
                  :size="20"
                  title="Inactive"
                  class="text-red-500"
                />
              </div>
            </template>
          </UTable>
        </div>

        <!-- delete user modal -->
        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">{{ $t("delete_user") }}</h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton :label="$t('yes')" color="error" @click="handleDeleteUser" />
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
