<script setup lang="ts">
import type { NewPatient, Patient } from "~/types";
import type { FormSubmitEvent } from "#ui/types";
import  { type PatientFormSchema,  patientSchema  } from '~/validation/patientvalidation';

const props = defineProps<{
  formTitle?: string;
  loading?: boolean;
  btnLable?: string;
  form: NewPatient | Patient;
  validationError?: string;
}>();



const emits = defineEmits(["submitForm"]);

const submitForm = async (event: FormSubmitEvent<PatientFormSchema>) => {
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

    <UForm
      :state="form"
      :schema="patientSchema"
      @submit.prevent="submitForm"
      class="space-y-6"
    >
      <!-- Name Input -->
      <UFormField label="Full Name" name="name" required eager-validation>
        <UInput
          v-model="form.name"
          placeholder="John Doe"
          icon="i-heroicons-user-circle"
          class="w-full"
        />
      </UFormField>

      <!-- Gender Select -->
      <UFormField label="Gender" name="gender" required>
        <USelect
          v-model="form.gender"
          :items="['male', 'female', 'other']"
          icon="i-heroicons-users"
          class="w-full"
        />
      </UFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Age Input -->
        <UFormField label="Age" name="age" required>
          <UInput
            v-model="form.age"
            type="number"
            placeholder="30"
            icon="i-heroicons-identification"
            class="w-full"
          />
        </UFormField>

        <!-- Profession -->
        <UFormField label="Profession" name="profession" required>
          <UInput
            v-model="form.profession"
            placeholder="Lawyer"
            icon="i-heroicons-briefcase"
            class="w-full"
          />
        </UFormField>
      </div>

      <!-- Address -->
      <UFormField label="Address" name="address" required>
        <UTextarea
          v-model="form.address"
          placeholder="123 Main Street, City, Country"
          icon="i-heroicons-home"
          class="w-full"
        />
      </UFormField>

      <!-- Phone Number -->
      <UFormField label="Phone Number" name="phone" required>
        <UInput
          v-model="form.phone_number"
          type="tel"
          placeholder="+1 234 567 890"
          icon="i-heroicons-phone"
          class="w-full"
        />
      </UFormField>

      <!-- Error Alert -->
      <UAlert
        v-if="validationError"
        :title="validationError"
        color="error"
        variant="outline"
        class="mb-4"
      />

      <!-- Submit Button -->
      <div class="flex justify-end">
        <UButton type="submit" color="neutral" :loading="loading" :label="btnLable" />
      </div>
    </UForm>
  </UCard>
</template>
