<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { $apiQueryClient } = useNuxtApp();

const { data } = $apiQueryClient.getPatients.useQuery();

console.log(data);

useHead({
  title: "Appointments System",
  meta: [
    {
      name: "description",
      content: "Appointments System for the therapy clinic, using Nuxt/Vue 3",
    },
  ],
});
</script>
