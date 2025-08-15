<script setup lang="ts">
import { useUpdatePatient, useGetPatientbyId } from "~/composables/patients";

const route = useRoute();
const id: Ref<number> = ref(parseInt(route.params.id as string));
const { patient, fetchPatient } = useGetPatientbyId(id.value as number);
onMounted(async () => {
  await fetchPatient();
  if (patient.value?.body) {
    Object.assign(updatePatientForm, patient.value?.body);
  }
});

const updatePatientForm = reactive<{
  name: string;
  gender: string;
  age: number;
  phone_number: string;
  profession: string;
  address: string;
}>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});

const toast = useToast();
const { mutate, isLoading, validationError, isPatientUpdated } = useUpdatePatient();
// update patient function
const handleUpdate = async () => {
  await mutate({ id: id.value, updatePatientForm });
  if (isPatientUpdated) {
    toast.add({
      title: "Patient Updated Successfully",
      color: "success",
      icon: "i-heroicons-check-circle",
    });

    fetchPatient();
  }

  if (validationError.value) {
    return;
  }

  setTimeout(() => {
    validationError.value = null;
  }, 5000);
};
</script>
<template>
  <NuxtLayout>
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
          <AdminPatientAppointmentForm
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
