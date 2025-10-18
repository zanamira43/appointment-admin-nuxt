<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { INewPaymentType } from "@/types/IPayment";

const toast = useToast();

const emit = defineEmits(["closeModal"]);

// Validation schema based on INewSession type
const schema = yup.object({
  name: yup.string().required($t("Name is required")),
});

const initialForm: INewPaymentType = {
  name: "",
};

const { values } = useForm<INewPaymentType>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Use TanStack Query mutation for creating session
const { createPaymentType, isCreatePaymentTypeLoading } = useCreatePaymentType();

const onSubmit = async () => {
  try {
    await createPaymentType(values, {
      onSuccess: () => {
        toast.add({
          description: $t("payment_type_created_successfully"),
          color: "success",
        });
        emit("closeModal");
      },
      onError: (error: any) => {
        console.error("Payment Type creation error:", error);
        toast.add({
          description: $t("payment_type_creation_failed"),
          color: "error",
        });
      },
    });
  } catch (error) {
    console.error("Payment Type creation error:", error);
  }
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return values.name;
});
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard variant="outline">
      <form class="w-full" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <!-- Subject -->
          <FormInput
            :label="$t('name')"
            name="name"
            :placeholder="$t('enter_name')"
            class="w-full"
          />
        </div>
      </form>

      <template #footer>
        <div class="flex items-center justify-end gap-2 w-full">
          <UButton
            type="button"
            variant="outline"
            @click="emit('closeModal')"
            :disabled="isCreatePaymentTypeLoading"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isCreatePaymentTypeLoading"
            :disabled="!isFormValid || isCreatePaymentTypeLoading"
          >
            <span>{{ $t("save") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
