<script setup lang="ts">
const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const login = async () => {
  await authStore.login(email.value, password.value);
  console.log("logged In");
};
</script>
<template>
  <NuxtLayout>
    <AppHeroSection
      title="Manage Your System"
      subtitle="Admin user can access the system form here."
    />
    <div class="w-full px-2 mx-auto">
      <UCard class="max-w-md mx-auto">
        <template #header>
          <h1 class="text-2xl font-bold text-center">Login</h1>
        </template>

        <div class="space-y-5">
          <UFormField label="Email" name="email" required>
            <UInput v-model="email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput v-model="password" type="password" class="w-full" />
          </UFormField>

          <UButton @click="login" color="neutral" block class="mt-5"> Login </UButton>
        </div>
      </UCard>
    </div>
  </NuxtLayout>
</template>
