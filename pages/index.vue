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
  window.location.reload();
};
</script>
<template>
  <NuxtLayout>
    <AppHeroSection
      title="An Appointment System"
      subtitle="You can have meeting with your a therapist by sending your information."
    />

    <div class="w-full px-2 mx-auto">
      <AppAppointmentForm
        formTitle="Make an Appointment"
        @submitForm="submitForm"
        :loading="isLoading"
        :form="patientForm"
        btnLable="Send"
      />
    </div>
  </NuxtLayout>
</template>
