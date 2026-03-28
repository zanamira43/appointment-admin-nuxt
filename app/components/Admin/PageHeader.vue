<template>
  <UDashboardToolbar  class="bg-transparent border-none flex flex-wrap justify-between items-center w-full h-full p-2">
    <template #left>
     <div>
        <h1 class="text-2xl font-semibold px-2">{{ title }}</h1>
        <h4 class="text-sm font-normal px-2 text-gray-400">{{ subtitle }}</h4>
     </div>
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </UDashboardToolbar>
</template>

<script setup lang="ts">
defineProps<{
  title: String,
  subtitle?: String,
}>();
</script>
