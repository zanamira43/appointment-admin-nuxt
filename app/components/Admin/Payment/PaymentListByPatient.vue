<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";
import type { IAllPayment } from "@/types/IPayment";

const UIcon = resolveComponent("UIcon");

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

const { payments, isLoading, fetchPayments } = useGetPaymentsByPatient(
  props.patientId,
  search,
  page
);

const paymentLists = computed<IAllPayment | any>(() => {
  return payments.value?.data || [];
});

onMounted(async () => {
  await fetchPayments();
});

// watch search query any changes
watch(search, () => {
  fetchPayments();
});

const columns: TableColumn<IAllPayment>[] = [
  {
    accessorKey: "id",
    header: $t("id"),
    cell: ({ row }: any) => `${row.index + 1}`,
  },
  {
    accessorKey: "payment_type",
    header: $t("payment_type"),
    cell: ({ row }: any) => {
      const value = row.getValue("payment_type");
      return value.name;
    },
  },
  {
    accessorKey: "is_dollar_payment",
    header: $t("is_dollar_payment"),
    cell: ({ row }: any) => {
      const value = row.getValue("is_dollar_payment");
      return h(
        UIcon,
        {
          name: `${value ? "i-heroicons-check-circle" : "ic:baseline-cancel"}`,
          class: `${value ? "text-green-500" : "text-red-500"}`,
          size: "20",
        },
        () => {
          row.getValue("is_dollar_payment");
        }
      );
    },
  },
  {
    accessorKey: "amount",
    header: $t("amount_money"),
    cell: ({ row }: any) => {
      const value = row.getValue("amount");
      const isValueDollar = row.getValue("is_dollar_payment");
      if (isValueDollar) {
        return `${"$"}${value} `;
      } else {
        return `${value} ${$t("iqd")}`;
      }
    },
  },
  {
    accessorKey: "payment_date",
    header: $t("date"),
    cell: ({ row }: any) => {
      const date = new Date(row.getValue("payment_date"));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
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
const { deletePayment: mutate, isDeletePaymentLoading } = useDeletePayment();
const deletepayment = async () => {
  if (!delId.value) return;

  await mutate(delId.value, {
    onSuccess: () => {
      toast.add({
        description: $t("payment_deleted_successfully"),
        color: "success",
        icon: "i-heroicons-check-circle",
      });
      delModal.value = false;
      delId.value = 0;
      fetchPayments();
    },
  });
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(e: Event, row: TableRow<IAllPayment>) {
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
      <AdminPageHeader :title="$t('payment')" :subtitle="$t('list_of_all_payment')">
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
          :data="paymentLists"
          :columns="columns"
          :loading="isLoading"
          :row-selection="rowSelection"
          @select="handleClick"
          class="cursor-pointer border border-gray-200 rounded-md"
        >
        </UTable>

        <UPagination
          v-model:page="page"
          :items-per-page="payments?.limit ?? 1"
          :total="payments?.total ?? 0"
          :siblingCount="1"
          variant="soft"
          active-color="secondary"
          :next="payments?.has_next"
          :prev="payments?.has_prev"
          class="mt-4"
        />
      </div>

      <!-- delete payment Modal -->
      <UModal v-model:open="delModal">
        <template #body>
          <div class="flex flex-col justify-center items-center gap-2">
            <h1 class="text-2xl font-bold text-center">{{ $t("delete_payment") }}</h1>
            <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-start items-start gap-2">
            <UButton
              :disabled="isDeletePaymentLoading"
              :label="$t('yes')"
              color="error"
              @click="deletepayment"
            />
          </div>
        </template>
      </UModal>

      <!-- create new  payment  modal -->
      <UModal v-model:open="createModal" :ui="{ content: 'min-w-[900px]' }">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h1 class="text-2xl font-bold text-center">
              {{ $t("add_payment") }}
            </h1>
          </div>
        </template>
        <template #body>
          <AdminPaymentCreate @closeModal="createModal = false" :patientId="patientId" />
        </template>
      </UModal>

      <!-- edit payment modal -->
      <UModal v-model:open="EditModal" :ui="{ content: 'min-w-[900px]' }">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <h1 class="text-2xl font-bold text-center">
              {{ $t("edit_payment") }}
            </h1>
          </div>
        </template>
        <template #body>
          <AdminPaymentEdit
            @closeModal="EditModal = false"
            :id="editId ?? 0"
            :patient-id="patientId"
          />
        </template>
      </UModal>
    </div>
  </div>
</template>
