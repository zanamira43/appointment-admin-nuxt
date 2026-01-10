<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import type { IPatient } from "@/types/IPatient";

import { type IEditTimeTables } from "@/types/ITimeTable";

const toast = useToast();

const props = defineProps(['id'])
const emit = defineEmits(["closeModal"]);

const { timeTable, fetchTimeTable } = useGetTimeTable(parseInt(props.id as string) || props.id);

const { patients, fetchPatients } = useGetPatients();

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
  patient_id: yup.number().nullable(),
  patient_name: yup.string()
  .when("patient_id", {
    // only required if patient_id is empty
      is: (val: number | null) => !val || val === 0,
      then: (schema) => schema.required(`${$t("patient name is required")}`),
      otherwise: (schema) => schema.optional(),
    })
    .required(`${$t("patient name is required")}`),
  week_day:  yup.array().of(
    yup.string().required()
  ).min(1, `${$t("week day is required")}`),
  start_time: yup
    .string()
    .required(`${$t("start time is required")}`)
    .matches(/^\d{2}:\d{2}(:\d{2})?$/, `${$t("invalid start time format")}`),
  end_time: yup
    .string()
    .required(`${$t("end time is required")}`)
    .matches(/^\d{2}:\d{2}(:\d{2})?$/, `${$t("invalid end time format")}`),
});

const initialForm = {
  patient_id: null,
  patient_name:"",
  week_day: [],
  start_time: "",
  end_time: "",
};


const { values, setFieldValue, errors, resetForm } = useForm<IEditTimeTables>({
  validationSchema: schema,
  initialValues: initialForm as IEditTimeTables
});

onMounted(async () => {
  await fetchPatients();
  await fetchTimeTable();
  if (timeTable.value?.body) {
    resetForm({
      values :timeTable.value.body
    });
  }
})

const {value: week_day} = useField<string[]>("week_day")

watchEffect(() => {
  if (values.patient_id) {
    const patientList = (patients?.value?.data ?? []) as IPatient[];
    const selected = patientList.find(p => p.id === values.patient_id)?.name;
    setFieldValue("patient_name", selected ?? '')
  }
})


const {updateTimeTable, isPending} = useUpdateTimeTable()
const onSubmit = async () => {
  try {
    await updateTimeTable({
      id: props.id,
      data: values
    }, {
      onSuccess: () => {
        toast.add({
          description: $t('time_table_updated_successfully'),
          color: 'success'
        })

        emit('closeModal')
      }
    })

  }catch(error){
    console.log("time tables error", error)

  }
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
</script>
<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <FormSelect
            :label="$t('patient')"
            :name="`patient_id`"
            class="w-full"
            :items="patientOptions"
          />
          <FormInput :label="$t('patient_name')" :name="`patient_name`" class="w-full" />

          <FormInput
            type="time"
            :label="$t('start_time')"
            :name="`start_time`"
            class="w-full"
          />
          <FormInput
            type="time"
            :label="$t('end_time')"
            :name="`end_time`"
            class="w-full"
          />

          <div class="flex flex-col gap-3">
            <span>{{ $t("week_day") }}: </span>
            <UCheckboxGroup v-model="week_day" :items="weekdays" />
            <p v-if="errors.week_day" class="text-red-500">{{ errors.week_day }}</p>
          </div>
        </div>
      </form>
      <div>
        <div class="flex items-center justify-end gap-2 p-2 w-full mt-5">
          <UButton type="button" @click="onSubmit()" :loading="isPending">
            <span>{{ $t("update") }}</span>
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
