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
      <UCard class="max-w-lg mx-auto">
        <template #header>
          <h1 class="text-2xl md:text-4xl font-bold text-center">{{ $t("login") }}</h1>
          <p class="text-lg text-center text-gray-500 mt-1">
            {{ $t("Please enter your Phone Number and password to login") }}
          </p>
        </template>

        <div class="space-y-5">
          <UFormField
            :label="$t('phone_number')"
            name="phone"
            class="md:text-lg"
            required
          >
            <UInput v-model="phone_number" class="w-full" />
          </UFormField>
          <UFormField :label="$t('password')" name="password" class="md:text-lg" required>
            <UInput v-model="password" type="password" class="w-full" />
          </UFormField>

          <UButton @click="login" color="neutral" block class="mt-5 md:text-xl">
            {{ $t("login") }}
          </UButton>
        </div>
      </UCard>
    </div>
  </main>
</template>
