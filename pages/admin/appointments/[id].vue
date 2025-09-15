<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { CalendarDate } from "@internationalized/date";

import type { IEditAppointments } from "~/types/IAppointment";

const { patients } = useGetPatients();

const patientOptions: Ref<{ label: string; value: string }[]> = computed(() =>
  patients?.value?.data
    ? patients?.value.data?.map((patient: any) => ({
        label: patient.name,
        value: patient.id.toString(),
      }))
    : []
);

const route = useRoute();
const id: Ref<number> = ref(parseInt(route.params.id as string));
const { appointment, fetchAppointment } = useGetAppointment(id.value as number);
const { updateAppointment, isPending } = useUpdateAppointment();

onMounted(async () => {
  await fetchAppointment();
  if (appointment.value) {
    setValues(appointment.value);
  }
});

// Validation schema
const schema = yup.object({
  patient_id: yup.string().nullable(),
  patient_name: yup.string().required(`${$t("patient name is required")}`),
  week_day: yup.string().required(`${$t("week day is required")}`),
  date: yup.string().required(`${$t("date is required")}`),
  start_time: yup
    .string()
    .required(`${$t("start time is required")}`)
    .matches(/^\d{2}:\d{2}(:\d{2})?$/, `${$t("invalid start time format")}`),
  end_time: yup
    .string()
    .required(`${$t("end time is required")}`)
    .matches(/^\d{2}:\d{2}(:\d{2})?$/, `${$t("invalid end time format")}`),
  status: yup.string().required(`${$t("status is required")}`),
});

const { values, setValues, setFieldValue } = useForm<IEditAppointments>({
  validationSchema: schema,
  initialValues: appointment.value as IEditAppointments | null,
});

const toast = useToast();

// update patient function
const handleUpdate = async () => {
  const payload = {
    ...values,
    start_time: values.start_time ? values.start_time + ":00" : "",
    end_time: values.end_time ? values.end_time + ":00" : "",
  };
  await updateAppointment(
    {
      id: id.value,
      data: payload,
    },
    {
      onSuccess: () => {
        toast.add({
          title: $t("appointment_updated_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });

        navigateTo("/admin/appointments");
      },
    }
  );

  fetchAppointment();
};

const weekdays = ref([
  { label: $t("Saturday"), value: "Saturday" },
  { label: $t("Sunday"), value: "Sunday" },
  { label: $t("Monday"), value: "Monday" },
  { label: $t("Tuesday"), value: "Tuesday" },
  { label: $t("Wednesday"), value: "Wednesday" },
  { label: $t("Thursday"), value: "Thursday" },
  { label: $t("Friday"), value: "Friday" },
]);

/// date picker section
// const df = new DateFormatter("en-US", {
//   dateStyle: "medium",
// });

const today = new Date();
const modelValue = ref<CalendarDate>(
  new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
);

function formatDateToYYYYMMDD(date: CalendarDate): string {
  const y = date.year;
  const m = String(date.month).padStart(2, "0");
  const d = String(date.day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
watch(
  () => modelValue.value,
  (newValue: any) => {
    if (newValue) {
      setFieldValue("date", formatDateToYYYYMMDD(newValue));
    } else {
      values.date = "";
    }
  }
);
</script>
<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("edit_appointment") }}</h2>
        </template>

        <form class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormSelect
              :label="$t('patients')"
              name="patient_id"
              class="w-full"
              :items="patientOptions"
            />
            <FormInput :label="$t('patient_name')" name="patient_name" class="w-full" />
            <FormSelect
              :label="$t('week_day')"
              name="week_day"
              :items="weekdays"
              class="w-full h-[32px]"
              icon="i-heroicons-users"
            />

            <div class="relative">
              <UPopover>
                <UButton
                  color="neutral"
                  variant="soft"
                  icon="i-lucide-calendar"
                  class="absolute left-0 top-[28px] z-5 bg-light-200"
                />

                <template #content>
                  <UCalendar v-model="modelValue" class="p-2" />
                </template>
              </UPopover>
              <FormInput :label="$t('date')" name="date" class="w-full" />
            </div>
            <FormSelect
              :label="$t('status')"
              name="status"
              :items="[
                { label: $t('new_appointment'), value: 'new_appointment' },
                { label: $t('in_progress'), value: 'in_progress' },
                { label: $t('finished'), value: 'finished' },
              ]"
              class="w-full h-[32px]"
            />

            <FormInput
              type="time"
              :label="$t('start_time')"
              name="start_time"
              class="w-full"
            />
            <FormInput
              type="time"
              :label="$t('end_time')"
              name="end_time"
              class="w-full"
            />
          </div>
        </form>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              type="button"
              :loading="isPending"
              @click="
                async () => {
                  await handleUpdate();
                }
              "
              >{{ $t("update") }}</UButton
            >
          </div>
        </template>
      </UCard>
    </div>
  </NuxtLayout>
</template>
