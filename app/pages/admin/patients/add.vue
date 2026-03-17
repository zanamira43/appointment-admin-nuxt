<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useCreatePatient } from "@/composables/patients";
import type { INewPatient } from "@/types/IPatient";

const toast = useToast();
const { mutate } = useCreatePatient();

// call user role 
const { role } = useMyUserStore();

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
  is_private: yup.boolean().default(false),
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
    is_private: false,
  },
});

const { value: is_private } = useField<boolean>("is_private");

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
        values.is_private = false;


        navigateTo("/admin/patients");
      },
    });
  } catch (error) {
    console.log(error);
  }
});

definePageMeta({
  titleKey: 'add_patient'
})
</script>

<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UCard variant="outline">
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
              class="w-full h-full"
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
                { label: $t('divorced'), value: 'divorced' },
                { label: $t('single'), value: 'single' },
                { label: $t('Other'), value: 'other' },
              ]"
              class="w-full h-full"
            />

            <FormInput :label="$t('profession')" name="profession" class="w-full" />
            <FormInput :label="$t('address')" name="address" class="w-full" />

            <!-- private patient field true/false -->
            <div v-if="role == 'admin'" class="flex justify-start items-center rounded-md gap-2 mt-5">
              <UCheckbox
                v-model="is_private"
                size="lg"
                color="secondary"
                class="flex flex-row"
              />
              <span>{{ $t("is_private") }}</span>
            </div>
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
