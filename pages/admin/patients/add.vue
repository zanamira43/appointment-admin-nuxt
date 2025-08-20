<script setup lang="ts">
import { useCreatePatient } from "~/composables/patients";
import type { INewPatient } from "~/types/IPatient";

const toast = useToast();
const patientForm = reactive<INewPatient>({
  name: "",
  gender: "",
  age: 0,
  profession: "",
  address: "",
  phone_number: "",
});

const { mutate, validationError, isPatientCreated } = useCreatePatient();
const submitForm = async () => {
  try {
    await mutate(patientForm);
    if (validationError.value) {
      return;
    }
    if (isPatientCreated) {
      toast.add({
        title: "Patient Created Successfully",
        color: "success",
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
    <div class="w-full px-2 mx-auto">
      <AdminPatientAppointmentForm
        formTitle="Make an Appointment"
        @submitForm="submitForm"
        :form="patientForm"
        :validationError="validationError as string"
        btnLable="Send"
      />
    </div>
  </NuxtLayout>
</template>
