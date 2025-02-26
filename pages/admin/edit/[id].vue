<script setup lang="ts">
import useUpdatePatient from "~/composable/useUpdatePatient";
import useGetPatientbyId from "~/composable/useGetPatientbyId";
import type { NewPatient, Patient } from "~/types";

const route = useRoute();
const id = ref(route.params.id);

const updatePatientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});

const { patient, isLoading } = await useGetPatientbyId(id.value);

watch(patient, () => {
  updatePatientForm.name = patient.value?.body.name as string;
  updatePatientForm.gender = patient.value?.body.gender as string;
  updatePatientForm.age = patient.value?.body.age as number;
  updatePatientForm.phone_number = patient.value?.body.phone_number as string;
  updatePatientForm.profession = patient.value?.body.profession as string;
  updatePatientForm.address = patient.value?.body.address as string;
});

const { mutate } = await useUpdatePatient();
// update patient function
const handleUpdate = async () => {
  await mutate({
    params: {
      id: id.value as string,
    },
    body: updatePatientForm as Patient,
  });
};
</script>
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <DashboardPageHeader
          title="Edit Patient"
          subtitle="You can edit patient information"
        />

        <div class="mt-20">
          <div v-if="isLoading" class="flex justify-center items-center mt-9">
            <Icon name="mdi:loading" size="3em" />
          </div>
          <div v-else>
            <AppAppointmentForm
              :form="updatePatientForm"
              formTitle="Edit Patient"
              btnLable="Update"
              @submitForm="handleUpdate"
            />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
