<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { IEditPaymentType } from "~/types/IPayment";

const toast = useToast();

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits(["closeModal"]);

// Validation schema based on IEditSession type
const schema = yup.object({
  name: yup.string().required($t("Name is required")),
});

const initialForm: IEditPaymentType = {
  name: "",
};

const { values, resetForm, handleSubmit } = useForm<IEditPaymentType>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Fetch session data
const { paymentType, isLoading, fetchPaymentType } = useGetPaymentType(props.id);

// Populate form when session data is loaded
watch(
  () => paymentType.value?.name,
  () => {
    resetForm({
      values: {
        name: paymentType.value?.name || "",
      },
    });

    fetchPaymentType();
  },
  { immediate: true }
);

// Use TanStack Query mutation for updating session
const { updatePaymentType, isUpdatePaymentTypeLoading } = useUpdatePaymetType();

const onSubmit = async () => {
  await handleSubmit(async (values) => {
    try {
      updatePaymentType(
        {
          id: props.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.add({
              description: $t("payment_type_updated_successfully"),
              color: "success",
            });
            emit("closeModal");
          },
          onError: (error: any) => {
            console.error("Payment Type update error:", error);
            toast.add({
              description: $t("payment_type_update_failed"),
              color: "error",
            });
          },
        }
      );
    } catch (error) {
      console.error("Payment Type update error:", error);
    }
  })();
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return values.name;
});
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <!-- Loading State -->
      <div
        v-if="isUpdatePaymentTypeLoading"
        class="flex justify-center items-center py-10"
      >
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl" />
      </div>

      <!-- Form -->
      <form v-else class="w-full" @submit.prevent="onSubmit">
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
            :disabled="isUpdatePaymentTypeLoading"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isLoading || isUpdatePaymentTypeLoading"
            :disabled="!isFormValid || isLoading || isUpdatePaymentTypeLoading"
          >
            <span>{{ $t("update") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
