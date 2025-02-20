<script setup lang="ts">
const loginForm = reactive({
  email: "",
  password: "",
});
const login = () => {
  console.log(loginForm);
};
</script>
<template>
  <div>
    <UCard class="max-w-md mx-auto -mt-10">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Login</h1>
      </template>

      <UForm :state="loginForm" class="space-y-4">
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="loginForm.email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password" required>
          <UInput v-model="loginForm.password" type="password" />
        </UFormGroup>

        <UButton type="submit" color="primary" block> Login </UButton>
      </UForm>
    </UCard>
  </div>
</template>
