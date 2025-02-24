<script setup lang="ts">
import useGetPatientbyId from "~/composable/useGetPatientbyId";
import type { NewPatient } from "~/types";

const name = ref("admin");
const route = useRoute();
const id = route.params.id;

const { patient } = await useGetPatientbyId(id);

const form = reactive<NewPatient>({
  name: "",
  gender: "",
  age: 0,
  phone_number: "",
  profession: "",
  address: "",
});
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
          <AppAppointmentForm :form="form" />

          <pre>
           {{ patient }}
           </pre
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
