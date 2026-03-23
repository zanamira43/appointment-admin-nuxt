<template>
  <UCard
    class="bg-transparent flex flex-wrap justify-between items-center"
    variant="outline"
    :ui="{
      header: 'border-0'
    }"
  >
    <template #header>
      <h1 class="text-2xl font-semibold px-2">{{ title }}</h1>
      <h4 class="text-sm font-normal px-2 text-gray-400">{{ subtitle }}</h4>
    </template>

    <div>
      <slot />
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: String,
  subtitle?: String,
}>();
</script>
