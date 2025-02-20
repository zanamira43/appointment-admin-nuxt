<template>
  <NuxtLayout :name="admin">
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const admin = "admin";
</script>
