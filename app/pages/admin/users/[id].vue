<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

import { useUpdateUser, useGetUser } from "@/composables/users";
import type { IRequestUser } from "@/types/IUser";

definePageMeta({
  middleware: "admin",
});

const route = useRoute();
const id: Ref<number> = ref((route.params.id as unknown) as number);
const { user, fetchUser } = useGetUser(id.value as number);
onMounted(async () => {
  await fetchUser();
  if (user.value) {
    setValues(user.value);
  }
});

// Validation schema
const schema = yup.object({
  first_name: yup.string().required(`${$t("First Name is required")}`),
  last_name: yup.string().required(`${$t("Last Name is required")}`),
  phone_number: yup.string().required(`${$t("Phone number is required")}`),
  role: yup.string().required(`${$t("Role is required")}`),
});
const { values, setValues } = useForm<IRequestUser>({
  validationSchema: schema,
  initialValues: (user.value as IRequestUser) || null,
});

const toast = useToast();
const { mutate, isUpdateUserLoading } = useUpdateUser();
// update patient function
const handleUpdate = async () => {
  await mutate(
    {
      id: id.value,
      body: values,
    },
    {
      onSuccess: () => {
        toast.add({
          title: $t("user_updated_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });
      },
    }
  );

  fetchUser();
};

const isChagePassword = ref(false);
</script>
<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <div class="py-2">
        <AdminPageHeader :title="$t('edit_user')">
          <UButton @click="isChagePassword = true">
            {{ $t("change_password") }}
          </UButton>
        </AdminPageHeader>
      </div>
      <UCard>
        <form class="w-full py-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormInput :label="$t('first_name')" name="first_name" class="w-full" />
            <FormInput :label="$t('last_name')" name="last_name" class="w-full" />
            <FormInput :label="$t('email')" name="email" class="w-full" />
            <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />
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
            <UButton
              type="button"
              :loading="isUpdateUserLoading"
              @click="
                async () => {
                  await handleUpdate();
                }
              "
              >{{ $t("update") }}</UButton
            >
          </div>
        </template>
      </UCard>

      <!-- change user password -->
      <UModal v-model:open="isChagePassword" class="max-w-[50%]">
        <template #body>
          <AdminUserChangePassword
            class="w-full"
            @closeModal="isChagePassword = false"
            :userId="id"
          />
        </template>
      </UModal>
    </div>
  </NuxtLayout>
</template>
