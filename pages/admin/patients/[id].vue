<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUpdatePatient, useGetPatientbyId } from "~/composables/patients";
import type { IUpdatePatient } from "~/types/IPatient";

const route = useRoute();
const id: Ref<number> = ref(parseInt(route.params.id as string));
const { patient, fetchPatient } = useGetPatientbyId(id.value as number);
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
  age: yup
    .number()
    .min(1, `${$t("Age must be a positive number")}`)
    .required(`${$t("Age is required")}`),
  gender: yup.string().required(`${$t("Gender is required")}`),
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
      id: id.value,
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
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("edit_patient") }}</h2>
        </template>

        <form class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormInput :label="$t('name')" name="name" class="w-full" />
            <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />
            <FormInput
              type="number"
              :label="$t('age')"
              name="age"
              class="w-full"
              :min="0"
            />
            <FormSelect
              :label="$t('gender')"
              name="gender"
              :items="['Male', 'Female', 'Other']"
              class="w-full h-[32px]"
              icon="i-heroicons-users"
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
  </NuxtLayout>
</template>
