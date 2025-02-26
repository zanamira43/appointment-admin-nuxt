<script setup lang="ts">
import useCreatePatient from "~/composable/useCreatePatient";
import type { NewPatient } from "~/types";

const { mutate, isLoading } = await useCreatePatient();

const patientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});
const submitForm = async (form: NewPatient) => {
  isLoading.value = true;
  await mutate({
    body: form,
  });
  isLoading.value = false;
};
</script>
<!-- new patien page component -->
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <DashboardPageHeader
          title="Insert New Patient"
          subtitle="You can insert new patient information."
        />

        <div class="mt-20">
          <AppAppointmentForm
            formTitle="Insert New Patient"
            @submitForm="submitForm"
            :loading="isLoading"
            :form="patientForm"
            btnLable="Insert"
            btnColor="black"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
