<script setup lang="ts">
import useCreatePatient from "~/composable/useCreatePatient";
import type { NewPatient } from "~/types";

const patientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  profession: "",
  address: "",
  phone_number: "",
});

const { mutate, isLoading, validationError } = useCreatePatient();
const submitForm = async () => {
  await mutate(patientForm);
  if (validationError.value) {
    return;
  }
};

setTimeout(() => {
  validationError.value = null;
}, 5000);
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
        :validationError="validationError as string"
        btnLable="Send"
      />
    </div>
  </NuxtLayout>
</template>
