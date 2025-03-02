<script setup lang="ts">
import useUpdatePatient from "~/composable/useUpdatePatient";
import useGetPatientbyId from "~/composable/useGetPatientbyId";
import type { NewPatient, Patient } from "~/types";

const route = useRoute();
const id = ref(parseInt(route.params.id as string));
const { patient, refetch } = useGetPatientbyId(id.value as number);
onMounted(async () => {
  await refetch();
  if (patient.value?.body) {
    Object.assign(updatePatientForm, patient.value?.body);
  }
});

const updatePatientForm = reactive<any>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});

const { mutate, isLoading, validationError } = useUpdatePatient();
// update patient function
const handleUpdate = async () => {
  await mutate({ id: id.value, updatePatientForm });
  if (validationError.value) {
    return;
  }

  await refetch();

  setTimeout(() => {
    validationError.value = null;
  }, 5000);
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
          <!-- <div v-if="isLoading" class="flex justify-center items-center mt-9">
            <Icon name="mdi:loading" size="3em" />
          </div> -->
          <!-- <div v-else> -->
          <AppAppointmentForm
            formTitle="Edit Patient"
            :form="updatePatientForm"
            :validationError="validationError as string"
            :loading="isLoading"
            btnLable="Update"
            @submitForm="handleUpdate"
          />
          <!-- </div> -->
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
