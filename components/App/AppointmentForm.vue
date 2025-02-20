<script setup lang="ts">
const submitForm = (e: any) => {
  e.preventDefault();
  console.log("form submitted");
};

const loading = ref(false);

const form = reactive({
  name: "",
  gender: "",
  age: "",
  phone: "",
  profession: "",
  address: "",
});
</script>
<template>
  <UCard class="max-w-3xl mx-auto -mt-10">
    <template #header>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Make an Appointment
      </h2>
    </template>

    <UForm :state="form" @submit="submitForm" class="space-y-6">
      <!-- Name Input -->
      <UFormGroup label="Full Name" name="name" required>
        <UInput
          v-model="form.name"
          placeholder="John Doe"
          icon="i-heroicons-user-circle"
        />
      </UFormGroup>

      <!-- Gender Select -->
      <UFormGroup label="Gender" name="gender" required>
        <USelect
          v-model="form.gender"
          :options="['Male', 'Female', 'Other']"
          icon="i-heroicons-users"
        />
      </UFormGroup>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Age Input -->
        <UFormGroup label="Age" name="age" required>
          <UInput
            v-model="form.age"
            type="number"
            min="18"
            max="100"
            placeholder="30"
            icon="i-heroicons-identification"
          />
        </UFormGroup>

        <!-- Phone Number -->
        <UFormGroup label="Phone Number" name="phone" required>
          <UInput
            v-model="form.phone"
            type="tel"
            placeholder="+1 234 567 890"
            icon="i-heroicons-phone"
          />
        </UFormGroup>
      </div>

      <!-- Profession -->
      <UFormGroup label="Profession" name="profession" required>
        <UInput
          v-model="form.profession"
          placeholder="Lawyer"
          icon="i-heroicons-briefcase"
        />
      </UFormGroup>

      <!-- Address -->
      <UFormGroup label="Address" name="address" required>
        <UTextarea
          v-model="form.address"
          placeholder="123 Main Street, City, Country"
          icon="i-heroicons-home"
        />
      </UFormGroup>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <UButton type="submit" color="primary" :loading="loading" label="Send" />
      </div>
    </UForm>
  </UCard>
</template>
