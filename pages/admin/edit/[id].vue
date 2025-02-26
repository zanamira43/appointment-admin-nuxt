<script setup lang="ts">
import useUpdatePatient from "~/composable/useUpdatePatient";
import useGetPatientbyId from "~/composable/useGetPatientbyId";
import type { NewPatient, Patient } from "~/types";

const route = useRoute();
const id = ref(route.params.id);

const { mutate, isLoading } = await useUpdatePatient();
const { patient } = await useGetPatientbyId(id.value);

const updatePatientForm = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});

const handleUpdate = async () => {
  console.log(id.value);

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
          <AppAppointmentForm
            :form="updatePatientForm"
            formTitle="Edit Patient"
            :loading="isLoading"
            btnLable="Update"
            @submit="handleUpdate"
          />

          <pre>
            {{ patient }}
          </pre>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
