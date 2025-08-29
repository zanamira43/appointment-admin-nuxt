<script setup>
const { locale } = useI18n();
const lang = locale.value;

const isRTL = computed(() => ["ckb"].includes(lang));
</script>
<template>
  <div class="flex flex-row h-screen w-full">
    <AdminSidebar />

    <div :class="`w-full ${isRTL ? 'md:pr-72' : 'md:pl-72'} `">
      <!-- navbar -->
      <AdminNavbar />

      <!-- admin content -->
      <div class="mt-5 px-2 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
