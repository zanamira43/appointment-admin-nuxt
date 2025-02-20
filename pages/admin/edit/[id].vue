<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
</script>
<template>
  <div class="w-full h-auto">
    <div class="px-4 py-2">
      <DashboardPageHeader title="Edit Patient" subtitle="You can edit patient information" />

      <div class="mt-2">
        <AppAppointmentForm />
      </div>
    </div>
  </div>
</template>
