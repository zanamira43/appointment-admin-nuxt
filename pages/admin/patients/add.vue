<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useCreatePatient } from "~/composables/patients";
import type { INewPatient } from "~/types/IPatient";

const toast = useToast();
const { mutate } = useCreatePatient();

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  phone_number: yup.string().required("Phone number is required"),
  age: yup.number().min(1, "Age must be a positive number").required("Age is required"),
  gender: yup.string().required("Gender is required"),
  profession: yup.string().required("Profession is required"),
  address: yup.string().required("Address is required"),
});

const { handleSubmit, values } = useForm<INewPatient>({
  validationSchema: schema,
  initialValues: {
    name: "",
    phone_number: "",
    age: 0,
    gender: "",
    profession: "",
    address: "",
  },
});

const submitForm = handleSubmit(async () => {
  try {
    await mutate(values, {
      onSuccess: () => {
        toast.add({
          title: "Patient Created Successfully",
          color: "success",
          icon: "i-heroicons-check-circle",
        });

        values.name = "";
        values.gender = "";
        values.age = 0;
        values.profession = "";
        values.address = "";
        values.phone_number = "";

        navigateTo("/admin/patients");
      },
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UCard>
        <template #header>
          <h2 class="text-2xl font-semibold">Add Patient</h2>
        </template>

        <form class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormInput label="Name" name="name" class="w-full" />
            <FormInput label="Phone Number" name="phone_number" class="w-full" />
            <FormInput type="number" label="Age" name="age" class="w-full" :min="0" />
            <FormSelect
              label="Gender"
              name="gender"
              :items="['Male', 'Female', 'Other']"
              class="w-full h-[32px]"
              icon="i-heroicons-users"
            />

            <FormInput label="Profession" name="profession" class="w-full" />
            <FormInput label="Address" name="address" class="w-full" />
          </div>
        </form>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              type="button"
              @click="
                async () => {
                  await submitForm();
                }
              "
              >Save</UButton
            >
          </div>
        </template>
      </UCard>
    </div>
  </NuxtLayout>
</template>
