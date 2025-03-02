<script setup lang="ts">
import useCreatePatient from "~/composable/useCreatePatient";
import type { NewPatient } from "~/types";

const patientForm = reactive<NewPatient>({
  name: "Ashly Brown",
  gender: "female",
  age: 42,
  profession: "Lawyer",
  address: "02 Cedar Blvd, Miami, FL",
  phone_number: "(555) 567-8801",
});

const { mutate, isLoading } = useCreatePatient();
const submitForm = async () => {
  await mutate(patientForm);
  await window.location.reload();
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
