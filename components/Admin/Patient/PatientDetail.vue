<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUpdatePatient, useGetPatientbyId } from "~/composables/patients";
import type { IPatient, IUpdatePatient } from "~/types/IPatient";

const props = defineProps<{
  id: number;
}>();

const { patient, fetchPatient } = useGetPatientbyId(props.id as number);
onMounted(async () => {
  await fetchPatient();
  if (patient.value?.body) {
    setValues(patient.value.body);
  }
});

// Validation schema
const schema = yup.object({
  name: yup.string().required(`${$t("Name is required")}`),
  phone_number: yup.string().required(`${$t("Phone number is required")}`),
  gender: yup.string().required(`${$t("Gender is required")}`),
  age: yup
    .number()
    .min(1, `${$t("Age must be a positive number")}`)
    .required(`${$t("Age is required")}`),
  maried_status: yup.string().required(`${$t("Married status is required")}`),
  profession: yup.string().required(`${$t("Profession is required")}`),
  address: yup.string().required(`${$t("Address is required")}`),
});

const { values, setValues } = useForm<IUpdatePatient>({
  validationSchema: schema,
  initialValues: patient.value?.body as IUpdatePatient | null,
});

const toast = useToast();
const { mutate, isPending } = useUpdatePatient();
// update patient function
const handleUpdate = async () => {
  await mutate(
    {
      id: props.id,
      data: values,
    },
    {
      onSuccess: () => {
        toast.add({
          title: $t("patient_updated_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });
      },
    }
  );

  fetchPatient();
};
</script>

<template>
  <div class="text-muted mb-4 mt-2">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">{{ $t("edit_patient") }}</h2>
      </template>

      <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <FormInput :label="$t('name')" name="name" class="w-full" />
          <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />
          <FormSelect
            :label="$t('gender')"
            name="gender"
            :items="[
              { label: $t('Male'), value: 'Male' },
              { label: $t('Female'), value: 'Female' },
              { label: $t('Other'), value: 'Other' },
            ]"
            class="w-full h-[32px]"
            icon="i-heroicons-users"
          />
          <FormInput
            type="number"
            :label="$t('age')"
            name="age"
            class="w-full"
            :min="0"
          />

          <FormSelect
            :label="$t('married_status')"
            name="married_status"
            :items="[
              { label: $t('married'), value: 'married' },
              { label: $t('single'), value: 'single' },
              { label: $t('Other'), value: 'other' },
            ]"
            class="w-full h-[32px]"
          />

          <FormInput :label="$t('profession')" name="profession" class="w-full" />
          <FormInput :label="$t('address')" name="address" class="w-full" />
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
</template>
