<script setup lang="ts">
const phone_number = ref("");
const password = ref("");

const authStore = useAuthStore();

const login = async () => {
  authStore.login(phone_number.value, password.value);
};
</script>
<template>
  <main class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full px-2 mx-auto">
      <UCard class="max-w-md mx-auto">
        <template #header>
          <h1 class="text-2xl font-bold text-center">Login</h1>
          <p class="text-sm text-center text-gray-500 mt-1">
            Please enter your Phone Number and password to login.
          </p>
        </template>

        <div class="space-y-5">
          <UFormField label="Phone Number" name="phone" required>
            <UInput v-model="phone_number" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput v-model="password" type="password" class="w-full" />
          </UFormField>

          <UButton @click="login" color="neutral" block class="mt-5"> Login </UButton>
        </div>
      </UCard>
    </div>
  </main>
</template>
