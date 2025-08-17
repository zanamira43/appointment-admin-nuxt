<!-- components/PwaReload.vue -->
<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(swUrl, r) {
    // optional: log or hook
  },
});
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast">
    <p v-if="offlineReady">App is ready to work offline.</p>
    <p v-else>New content available.</p>
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
  </div>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  background: #111827;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
button {
  margin-left: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 0.375rem;
}
</style>
