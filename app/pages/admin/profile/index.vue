<script setup lang="ts">
import { useForm } from "vee-validate";

// const admin = ref("admin");
const { first_name, last_name, email, phone_number } = useMyUserStore();
const { updateProfile, isPending } = await useUpdateProfile();
const toast = useToast();

const isChagePassword = ref(false);

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const { values, setValues } = useForm<Profile>({
  initialValues: {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  },
});

onMounted(() => {
  setValues({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
  });
});

const handleUpdateProfile = () => {
  updateProfile(values, {
    onSuccess: () => {
      toast.add({
        title: $t("profile_updated_successfully"),
        color: "success",
        icon: "i-heroicons-check-circle",
      });
    },
  });
};
</script>
<template>
  <NuxtLayout>
    <div class="w-full h-auto">
      <div class="px-4 py-2">
        <AdminPageHeader :title="$t('profile')">
          <UButton @click="isChagePassword = true">
            {{ $t("change_password") }}
          </UButton>
        </AdminPageHeader>
      </div>

      <UCard>
        <form class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
            <FormInput :label="$t('first_name')" name="first_name" class="w-full" />
            <FormInput :label="$t('last_name')" name="last_name" class="w-full" />
            <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />
            <FormInput :label="$t('email')" name="email" class="w-full" />
          </div>
        </form>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton :disabled="isPending" type="button" @click="handleUpdateProfile">
              {{ $t("update") }}
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
    <UModal v-model:open="isChagePassword" class="max-w-[50%]">
      <template #body>
        <AdminProfileChangePassword @closeModal="isChagePassword = false" />
      </template>
    </UModal>
  </NuxtLayout>
</template>
