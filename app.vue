<template>
  <div>
    <NuxtPage />

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
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
