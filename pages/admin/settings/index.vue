<script setup lang="ts">
const items = computed(() => {
  const baseItems = [
    {
      label: $t("general_setting"),
      slot: "general_setting" as const,
    },
    {
      label: $t("payment_type"),
      slot: "payment_type" as const,
    },
  ];

  return baseItems;
});
</script>
<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UTabs
        :items="items"
        :ui="{ trigger: 'grow' }"
        class="gap-4 w-full"
        :unmount-on-hide="false"
        variant="pill"
        color="neutral"
      >
        <template #general_setting="{ item }">
          <div class="px-4 py-2">
            <AdminSettingsGeneralSetting />
          </div>
        </template>

        <template #payment_type="{ item }">
          <div>
            {{ item.label }}
          </div>
        </template>
      </UTabs>
    </div>
  </NuxtLayout>
</template>
