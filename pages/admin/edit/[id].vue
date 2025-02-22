<script setup lang="ts">
const name = ref("admin")
const route = useRoute();
const id = route.params.id;
</script>
<template>
  <NuxtLayout name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <DashboardPageHeader title="Edit Patient" subtitle="You can edit patient information" />

        <div class="mt-20">
          <AppAppointmentForm />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
