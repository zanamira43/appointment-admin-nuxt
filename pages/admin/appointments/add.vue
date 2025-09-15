<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { CalendarDate, DateFormatter} from "@internationalized/date";

import { type INewAppointments } from "~/types/IAppointment";

const { patients } = useGetPatients();

const patientOptions: Ref<{ label: string; value: number }[]> = computed(() =>
  patients?.value?.data
    ? patients?.value.data?.map((patient: any) => ({
        label: patient.name,
        value: patient.id,
      }))
    : []
);

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


const { values, handleSubmit, resetForm, setFieldValue } = useForm<INewAppointments>({
  validationSchema: schema,
  initialValues: {
      patient_id: 0,
      patient_name: "",
      week_day: "",
      date: "",
      start_time: "",
      end_time: "",
      status: "",
  },
});


const {createAppointment, isPending} = useCreateAppointment()

const onSubmitForm = handleSubmit(async () => {
  const payload = {
    ...values,
    start_time: values.start_time ? values.start_time + ":00" : "",
    end_time: values.end_time ? values.end_time + ":00" : "",
  };

   try {
     await createAppointment(payload, {
      onSuccess: () => {
        toast.add({
          title: $t("appointment_created_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });

        resetForm()
        navigateTo("/admin/appointments");
      }
    })


   }catch(error){
    console.log(error)
   }
});


const toast = useToast();
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
      setFieldValue("date" , formatDateToYYYYMMDD(newValue));
  } else {
    values.date = "";
  }
});
</script>
<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('new_appointment')"> </AdminPageHeader>
        <div class="w-full mx-auto flex flex-col gap-5 mt-5 py-5">
          <UCard>
            <form class="w-full">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  :label="$t('patient')"
                  name="patient_id"
                  class="w-full"
                  :items="patientOptions"
                />
                <FormInput
                  :label="$t('patient_name')"
                  name="patient_name"
                  class="w-full"
                />
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
                      <UCalendar v-model="modelValue as CalendarDate" class="p-2" />
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
            <div>
              <div class="flex items-center justify-end gap-2 p-2 w-full mt-5">
                <UButton type="button" @click="onSubmitForm()" :loading="isPending">
                  <UIcon name="i-heroicons-plus" class="size-5" />
                  {{ $t("add") }}
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
