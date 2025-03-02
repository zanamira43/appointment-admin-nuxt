<script setup lang="ts">
import type { NewPatient, Patient } from "~/types";

const props = defineProps<{
  formTitle?: string;
  loading?: boolean;
  btnLable?: string;
  form: NewPatient | Patient;
  validationError?: string;
}>();

const emits = defineEmits(["submitForm"]);

const submitForm = async () => {
  emits("submitForm", props.form);
};
</script>
<template>
  <UCard class="max-w-3xl mx-auto -mt-10">
    <template #header>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ formTitle }}
      </h2>
    </template>

    <UForm :state="form" @submit.prevent="submitForm" class="space-y-6">
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
          :options="['male', 'female', 'other']"
          icon="i-heroicons-users"
        />
      </UFormGroup>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Age Input -->
        <UFormGroup label="Age" name="age" required>
          <UInput
            v-model="form.age"
            type="number"
            placeholder="30"
            icon="i-heroicons-identification"
          />
        </UFormGroup>

        <!-- Profession -->
        <UFormGroup label="Profession" name="profession" required>
          <UInput
            v-model="form.profession"
            placeholder="Lawyer"
            icon="i-heroicons-briefcase"
          />
        </UFormGroup>
      </div>

      <!-- Address -->
      <UFormGroup label="Address" name="address" required>
        <UTextarea
          v-model="form.address"
          placeholder="123 Main Street, City, Country"
          icon="i-heroicons-home"
        />
      </UFormGroup>

      <!-- Phone Number -->
      <UFormGroup label="Phone Number" name="phone" required>
        <UInput
          v-model="form.phone_number"
          type="tel"
          placeholder="+1 234 567 890"
          icon="i-heroicons-phone"
        />
      </UFormGroup>

      <!-- Error Alert -->
      <UAlert
        v-if="validationError"
        :title="validationError"
        color="red"
        variant="outline"
        class="mb-4"
      />

      <!-- Submit Button -->
      <div class="flex justify-end">
        <UButton type="submit" color="black" :loading="loading" :label="btnLable" />
      </div>
    </UForm>
  </UCard>
</template>
