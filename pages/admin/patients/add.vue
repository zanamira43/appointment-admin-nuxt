<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useCreatePatient } from "~/composables/patients";
import type { INewPatient } from "~/types/IPatient";

const toast = useToast();
const { mutate } = useCreatePatient();

// Validation schema
const schema = yup.object({
  name: yup.string().required(`${$t("Name is required")}`),
  phone_number: yup.string().required(`${$t("Phone number is required")}`),
  gender: yup.string().required(`${$t("Gender is required")}`),
  age: yup
    .number()
    .min(1, `${$t("Age must be a positive number")}`)
    .required(`${$t("Age is required")}`),

  married_status: yup.string().required(`${$t("Married status is required")}`),
  profession: yup.string().required(`${$t("Profession is required")}`),
  address: yup.string().required(`${$t("Address is required")}`),
});

const { handleSubmit, values } = useForm<INewPatient>({
  validationSchema: schema,
  initialValues: {
    name: "",
    phone_number: "",
    age: 0,
    married_status: "",
    gender: "",
    profession: "",
    address: "",
  },
});

const submitForm = handleSubmit(async () => {
  try {
    await mutate(values, {
      onSuccess: () => {
        toast.add({
          title: $t("patient_created_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });

        values.name = "";
        values.gender = "";
        values.age = 0;
        values.married_status = "";
        values.profession = "";
        values.address = "";
        values.phone_number = "";

        navigateTo("/admin/patients");
      },
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">{{ $t("add_patient") }}</h2>
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
            <UButton type="button" @click="submitForm()">{{ $t("save") }}</UButton>
          </div>
        </template>
      </UCard>
    </div>
  </NuxtLayout>
</template>
