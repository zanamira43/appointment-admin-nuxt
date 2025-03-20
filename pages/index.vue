<script setup lang="ts">
import useCreatePatient from "~/composables/useCreatePatient";
import type { NewPatient } from "~/types";

const toast = useToast();
const patientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  profession: "",
  address: "",
  phone_number: "",
});

const { mutate, isLoading, validationError, isPatientCreated } = useCreatePatient();
const submitForm = async () => {
  try {
    await mutate(patientForm);
    if (validationError.value) {
      return;
    }
    if (isPatientCreated) {
      toast.add({
        title: "Patient Created Successfully",
        color: "green",
        icon: "i-heroicons-check-circle",
      });
    }

    patientForm.name = "";
    patientForm.gender = "";
    patientForm.age = 0;
    patientForm.profession = "";
    patientForm.address = "";
    patientForm.phone_number = "";
  } catch (error) {
    console.log(error);
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
