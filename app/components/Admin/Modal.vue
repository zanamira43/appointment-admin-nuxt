<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
</script>
<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <slot></slot>
    </div>
  </UModal>
</template>
