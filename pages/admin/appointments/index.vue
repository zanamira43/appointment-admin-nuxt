<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";
import { h, resolveComponent } from "vue";
import type { IAllAppointments } from "~/types/IAppointment";

import { formatDate, formatTimeTo12Hour } from "~/util/util";

// search input
const search = ref("");

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const { appointments, isLoading, fetchAppointments } = useGetAppointments(search);
onMounted(async () => {
  await fetchAppointments();
});

watch(search, () => {
  fetchAppointments();
});

const { deleteAppointment, isPending } = useDeleteAppointment();

const toast = useToast();

const appointmentLists = computed<IAllAppointments | any>(() => {
  return appointments?.value?.data ?? [];
});

const delModal = ref(false);
const delId = ref<number | null>(null);

const columns: TableColumn<IAllAppointments>[] = [
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
    cell: ({ row }: any) => {
      const value = row.getValue("week_day");
      return $t(value);
    },
  },
  {
    accessorKey: "date",
    header: $t("date"),
    cell: ({ row }: any) => {
      const value = row.getValue("date");
      return formatDate(value);
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
    accessorKey: "status",
    header: $t("status"),
    cell: ({ row }: any) => {
      const value = row.getValue("status");
      if (!value) return "";
      return h(
        "span",
        {
          class: [
            "px-2 py-1 rounded-full text-white text-sm w-full inline-block",
            value === "new_appointment"
              ? "bg-info"
              : value === "finished"
              ? "bg-green-500"
              : value === "in_progress"
              ? "bg-yellow-500"
              : "",
          ],
        },
        $t(value)
      );
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
    cell: ({ row }: { row: TableRow<IAllAppointments> }) => {
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

const deleteAppoinment = async () => {
  await deleteAppointment(delId.value as number, {
    onSuccess: () => {
      toast.add({
        description: $t("appointment_deleted_successfully"),
        color: "success",
      });
    },
  });
  await fetchAppointments();
  delModal.value = false;
  delId.value = null;
};

const rowSelection = ref<Record<string, boolean>>({});
const lastClickTime = ref<number | null>(null);
function handleClick(row: TableRow<IAllAppointments>, e?: Event) {
  const rowValue = row.getValue("id");
  const now = Date.now();
  if (lastClickTime.value && now - lastClickTime.value <= 360) {
    lastClickTime.value = null;
    navigateTo(`/admin/appointments/${rowValue}`);
  } else {
    // Store current time for the next click
    lastClickTime.value = now;
  }
}

// search by date
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const today = new Date();
const modelValue = ref(
  new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
);

function formatDateToYYYYMMDD(date: CalendarDate): string {
  const y = date.year;
  const m = String(date.month).padStart(2, "0");
  const d = String(date.day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
watch(modelValue, (newValue: any) => {
  if (newValue) {
    search.value = formatDateToYYYYMMDD(newValue);
  } else {
    search.value = "";
  }
});

// pagination
const page = ref(appointments.value?.page ?? 1);

// create new appointment modal
const createModal = ref(false);
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('appointments')">
          <div class="flex justify-between items-center w-full gap-4">
            <UInput
              v-model="search"
              type="text"
              icon="heroicons:magnifying-glass-20-solid"
              :placeholder="$t('search')"
            />
            <UPopover>
              <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                {{
                  modelValue
                    ? df.format(modelValue.toDate(getLocalTimeZone()))
                    : $t("Select a date")
                }}
              </UButton>

              <template #content>
                <UCalendar v-model="modelValue as CalendarDate" class="p-2" />
              </template>
            </UPopover>
            <UButton
              :label="$t('new_appointment')"
              color="primary"
              icon="heroicons:plus-20-solid"
              @click="`${navigateTo('/admin/appointments/add')}`"
            />
            <!-- <UButton
              :label="$t('add')"
              color="primary"
              icon="heroicons:plus-20-solid"
              @click="createModal = true"
            /> -->
          </div>
        </AdminPageHeader>
        <div class="mt-2">
          <UTable
            sticky
            loading-color="primary"
            loading-animation="carousel"
            :loading="isLoading"
            :data="appointmentLists"
            :columns="columns"
            :row-selection="rowSelection"
            @select="handleClick"
            class="cursor-pointer border border-gray-200 rounded-md text-cetner"
            :ui="{
              thead: 'bg-gray-50',
              th:
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              tbody: 'bg-white divide-y divide-gray-200',
              tr: 'hover:bg-gray-100',
              td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center',
            }"
          />

          <UPagination
            v-model:page="page"
            :items-per-page="appointments?.limit ?? 1"
            :total="appointments?.total ?? 0"
            class="mt-4"
          />
        </div>
        <!-- delete appointment Modal -->
        <UModal v-model:open="delModal">
          <template #body>
            <div class="flex flex-col justify-center items-center gap-2">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("delete_appointment") }}
              </h1>
              <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-start items-start gap-2">
              <UButton
                :label="$t('yes')"
                color="error"
                @click="deleteAppoinment"
                :loading="isPending"
              />
            </div>
          </template>
        </UModal>

        <!-- create new appointment -->
        <UModal v-model:open="createModal" :ui="{ content: 'min-w-[900px]' }">
          <template #header>
            <div class="flex justify-between items-center w-full">
              <h1 class="text-2xl font-bold text-center">
                {{ $t("new_appointment") }}
              </h1>

              <UButton>
                {{ $t("create") }}
              </UButton>
            </div>
          </template>
          <template #body>
            <AdminAppointmentCreateAppointment @close="createModal = false" />
          </template>
        </UModal>
      </div>
    </div>
  </NuxtLayout>
</template>
