<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { UserPassword } from "~/types/IUser";

const { updatePassword, isPending } = await useUpdateUserPassword();
const toast = useToast();

const emit = defineEmits(["closeModal"]);

// Validation schema
const schema = yup.object({
  password: yup.string().required(`${$t("password is required")}`),
  password_confirmation: yup
    .string()
    .required(`${$t("password confirmation is required")}`),
});
const { values, handleSubmit } = useForm<UserPassword>({
  validationSchema: schema,
  initialValues: {
    password: "",
    password_confirmation: "",
  },
});

const handleUpdatePassword = handleSubmit(() => {
  updatePassword(values, {
    onSuccess: () => {
      toast.add({
        title: $t("profile_password_updated_successfully"),
        color: "success",
        icon: "i-heroicons-check-circle",
      });

      setTimeout(() => {
        emit("closeModal");
      }, 200);
    },

    onError: (error: unknown) => {
      const err = error;
      toast.add({
        description: `${$t(`${err}`)}`,
        color: "error",
      });
    },
  });
});
</script>
<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl font-bold text-center">{{ $t("change_password") }}</h1>
    </template>
    <div class="grid grid-cols-1 w-full px-5 h-[210px]">
      <FormInput :label="$t('password')" name="password" class="w-full" />
      <FormInput
        :label="$t('password_confirmation')"
        name="password_confirmation"
        class="w-full"
      />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton :disabled="isPending" type="button" @click="handleUpdatePassword">
          {{ $t("update") }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
