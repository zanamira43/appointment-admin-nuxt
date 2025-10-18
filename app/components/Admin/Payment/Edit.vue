<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { IPayment, IPaymentType, IUpdatePayment } from "@/types/IPayment";

const toast = useToast();

const { paymentTypes } = useGetPaymentTypes();

const paymentTypeOptions: Ref<{ label: string; value: number }[]> = computed(() =>
  paymentTypes?.value?.data
    ? paymentTypes.value.data.map((el: IPaymentType) => ({
        label: el.name,
        value: el.id,
      }))
    : []
);

const props = defineProps<{
  id: number;
  patientId?: number;
}>();

const emit = defineEmits(["closeModal"]);

// Validation schema based on IEditSession type
const schema = yup.object({
  patient_id: yup.number().required($t("patient is required")),
  payment_type_id: yup.string().required($t("payment_type is required")),
  payment_date: yup
    .string()
    .required($t("payment_date is required"))
    .matches(/^\d{4}-\d{2}-\d{2}$/, $t("invalid date format")),
  amount: yup
    .number()
    .min(1, $t("amount money must be greator than 0 "))
    .required($t("amount money is required")),
});

const initialForm: IUpdatePayment = {
  patient_id: props.patientId as number,
  payment_type_id: "",
  amount: 0,
  payment_date: "",
};

const { values, resetForm, handleSubmit } = useForm<IUpdatePayment>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Fetch session data
const { payment: paymentData, isLoading: isLoadingPaymet } = useGetPayment(props.id);

// Populate form when payment data is loaded
watch(
  () => paymentData.value,
  (paymentData) => {
    if (paymentData?.body) {
      const data = paymentData.body as IPayment;

      // Format the payment_date to match date input format (YYYY-MM-DD)
      let formattedDate = data.payment_date;
      if (formattedDate) {
        // Extract only the date part (YYYY-MM-DD)
        formattedDate = formattedDate.substring(0, 10);
      }

      resetForm({
        values: {
          patient_id: data.patient_id,
          payment_type_id: data.payment_type_id,
          payment_date: formattedDate,
          amount: data.amount,
        },
      });
    }
  },
  { immediate: true }
);

// Use TanStack Query mutation for updating session
const { updatePayment, isUpdatePaymentLoading } = useUpdatePaymet();

const onSubmit = async () => {
  await handleSubmit(async (values) => {
    try {
      updatePayment(
        {
          id: props.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.add({
              description: $t("payment_updated_successfully"),
              color: "success",
            });
            emit("closeModal");
          },
          onError: (error: any) => {
            console.error("Payment update error:", error);
            toast.add({
              description: $t("payment_update_failed"),
              color: "error",
            });
          },
        }
      );
    } catch (error) {
      console.error("Payment update error:", error);
    }
  })();
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    values.patient_id && values.payment_type_id && values.amount && values.payment_date
  );
});
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <!-- Loading State -->
      <div v-if="isLoadingPaymet" class="flex justify-center items-center py-10">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl" />
      </div>

      <!-- Form -->
      <form v-else class="w-full" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <!-- Paymnet Type -->
          <FormSelect
            :label="$t('payment_type')"
            name="payment_type_id"
            :items="paymentTypeOptions"
            :placeholder="$t('select_payment_type')"
            class="w-full"
          />

          <!-- amount -->
          <FormInput
            type="number"
            :label="$t('amount_money')"
            name="amount"
            class="w-full"
          />

          <!-- Payment Date -->
          <FormInput
            type="date"
            :label="$t('payment_date')"
            name="payment_date"
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
            :disabled="isUpdatePaymentLoading"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isUpdatePaymentLoading"
            :disabled="!isFormValid || isUpdatePaymentLoading || isLoadingPaymet"
          >
            <span>{{ $t("update") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
