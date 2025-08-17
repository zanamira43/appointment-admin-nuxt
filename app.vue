<template>
  <UApp>
    <NuxtPage />
    <PwaReload />
  </UApp>
</template>

<script setup lang="ts">
useHead({
  title: "RawezhkarAso",
  meta: [
    {
      name: "description",
      content: "Appointments System for the therapy clinic, using Nuxt/Vue 3",
    },
    { name: "theme-color", content: "#0ea5e9" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],

  link: [{ rel: "apple-touch-icon", href: "/apple-touch-icon.jpeg" }],
});
</script>
