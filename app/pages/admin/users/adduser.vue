<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useCreateUser } from "@/composables/users";
import type { IRequestUser } from "@/types/IUser";

definePageMeta({
  middleware: "admin",
});

const showPassword = ref(true);
const toast = useToast();
const { mutate, isCreateUserLoading } = useCreateUser();

// Validation schema
const schema = yup.object({
  first_name: yup.string().required(`${$t("First Name is required")}`),
  last_name: yup.string().required(`${$t("Last Name is required")}`),
  phone_number: yup.string().required(`${$t("Phone number is required")}`),
  password: yup.string().required(`${$t("Password is required")}`),
  role: yup.string().required(`${$t("Role is required")}`),
});

const { handleSubmit, values } = useForm<IRequestUser>({
  validationSchema: schema,
  initialValues: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    active: true,
  },
});

const submitForm = handleSubmit(async () => {
  try {
    await mutate(values, {
      onSuccess: () => {
        toast.add({
          title: $t("patient_created_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });

        values.first_name = "";
        values.last_name = "";
        values.email = "";
        values.phone_number = "";
        values.password = "";
        values.role = "";

        navigateTo("/admin/users");
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
          <h2 class="text-2xl font-semibold">{{ $t("add_user") }}</h2>
        </template>

        <form class="w-full py-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormInput :label="$t('first_name')" name="first_name" class="w-full" />
            <FormInput :label="$t('last_name')" name="last_name" class="w-full" />
            <FormInput :label="$t('email')" name="email" class="w-full" />
            <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />

            <div class="relative">
              <FormInput
                :type="showPassword ? 'text' : 'password'"
                :label="$t('password')"
                name="password"
                class="w-full"
              />
            </div>

            <FormSelect
              :label="$t('role')"
              name="role"
              :items="[
                { label: $t('admin'), value: 'admin' },
                { label: $t('user'), value: 'user' },
              ]"
              class="w-full h-[35px]"
              icon="i-heroicons-users"
            />

            <FormSelect
              :label="$t('active')"
              name="active"
              :items="[
                { label: $t('yes'), value: true },
                { label: $t('no'), value: false },
              ]"
              class="w-full h-[35px]"
              icon="i-heroicons-users"
            />
          </div>
        </form>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton :loading="isCreateUserLoading" type="button" @click="submitForm()">
              {{ $t("save") }}
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </NuxtLayout>
</template>
