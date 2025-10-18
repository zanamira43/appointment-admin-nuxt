<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { UserPassword } from "@/types/IUser";

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

const showPassword = ref(false);
const showPasswordConfirm = ref(false);
</script>
<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl font-bold text-center">{{ $t("change_password") }}</h1>
    </template>
    <div class="grid grid-cols-1 w-full px-5 h-[210px]">
      <FormInput
        :type="showPassword ? 'text' : 'password'"
        :label="$t('password')"
        name="password"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="md"
            :icon="`${showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'}`"
            aria-label="Clear input"
            @click="showPassword = !showPassword"
          />
        </template>
      </FormInput>
      <FormInput
        :type="showPasswordConfirm ? 'text' : 'password'"
        :label="$t('password_confirmation')"
        name="password_confirmation"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="md"
            :icon="`${showPasswordConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'}`"
            aria-label="Clear input"
            @click="showPasswordConfirm = !showPasswordConfirm"
          />
        </template>
      </FormInput>
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
