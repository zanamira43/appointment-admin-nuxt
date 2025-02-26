<script setup lang="ts">
import useUpdatePatient from "~/composable/useUpdatePatient";
import useGetPatientbyId from "~/composable/useGetPatientbyId";
import type { NewPatient, Patient } from "~/types";

const route = useRoute();
const id = route.params.id;

const { mutate, isLoading } = await useUpdatePatient();
const { patient } = await useGetPatientbyId(id);

const updatePatientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});

const submitForm = async (id: number) => {
  console.log(id);
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
          <AppAppointmentForm
            :form="updatePatientForm"
            formTitle="Edit Patient"
            :loading="isLoading"
            btnLable="Update"
            btnColor="primary"
            @submit="submitForm"
          />

          <pre>
            {{ patient }}
          </pre>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
