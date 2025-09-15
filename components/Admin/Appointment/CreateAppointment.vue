<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

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
  appointments: yup.array().of(
     yup.object({
       patient_id: yup.number().nullable(),
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
     })
  )
});

export interface IAppointmentsForm {
  appointments: INewAppointments[];
}

const initialForm: INewAppointments = {
  patient_id: 0,
  patient_name: "",
  week_day: "",
  date: "",
  start_time: "",
  end_time: "",
  status: "new_appointment",
};

const { values, handleSubmit, setFieldValue } = useForm<IAppointmentsForm>({
  validationSchema: schema,
  initialValues: {
    appointments: [initialForm],
  },
});


function addAppointment() {
  const updated = [...values.appointments, { ...initialForm }];
  setFieldValue("appointments", updated);
}

function removeAppointment(index: number) {
  const updated = values.appointments.filter((_, i) => i !== index);
  setFieldValue("appointments", updated);
}
const {createAppointment, isPending} = useCreateAppointment()

const onSubmit = handleSubmit(async (formValues) => {
    await createAppointment(formValues.appointments, {
      onSuccess: () => {

      },
      onError: () => {

      }
    })
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
</script>
<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard v-for="(appointment, index) in values.appointments" :key="index">
      <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <FormSelect
            :label="$t('patient')"
            :name="`appointment[${index}].patient_id`"
            class="w-full"
            :items="patientOptions"
          />
          <FormInput
            :label="$t('patient_name')"
            :name="`appointment[${index}].patient_name`"
            class="w-full"
          />
          <FormSelect
            :label="$t('week_day')"
            :name="`appointment[${index}].week_day`"
            :items="weekdays"
            class="w-full h-[32px]"
            icon="i-heroicons-users"
          />
          <FormInput
            :label="$t('date')"
            :name="`appointment[${index}].date`"
            class="w-full"
          />

          <FormSelect
            :label="$t('status')"
            :name="`appointment[${index}].status`"
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
            :name="`appointment[${index}].start_time`"
            class="w-full"
          />
          <FormInput
            type="time"
            :label="$t('end_time')"
            :name="`appointment[${index}].end_time`"
            class="w-full"
          />
        </div>
      </form>
      <div>
        <div class="flex items-center justify-between gap-2 p-2 w-full mt-5">
          <UButton type="button" class="bg-orange-500">
            <UIcon
              name="i-heroicons-plus"
              class="size-5"
              @click.prevent="addAppointment"
            />
          </UButton>

          <UButton type="button" class="bg-red-600" v-if="values.appointments.length > 1">
            <UIcon
              name="i-heroicons-x-mark-solid"
              class="size-5"
              @click="removeAppointment(index)"
            />
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
