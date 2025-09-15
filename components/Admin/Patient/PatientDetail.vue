<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { IPatient } from '~/types/IPatient';

const items = [
  {
    label: $t('session'),
    slot: 'session' as const
  },
  {
    label: $t('payment'),
    slot: 'payment' as const
  }
] satisfies TabsItem[]


const props = defineProps<{ patientDetail?:  IPatient}>();

console.log(props.patientDetail)
</script>

<template>
  <UTabs :items="items" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
    <template #session="{ item }">
      <div class="text-muted mb-4 mt-2">
        {{ patientDetail }}
      </div>
    </template>

    <template #payment="{ item }">
      <div class="text-muted mb-4">
        {{ item.label }}
      </div>
    </template>
  </UTabs>
</template>
