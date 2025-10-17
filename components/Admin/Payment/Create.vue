<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { INewPayment, IPaymentType } from "~/types/IPayment";

const toast = useToast();

const emit = defineEmits(["closeModal"]);

const props = defineProps<{
  patientId: number;
}>();

const { paymentTypes } = useGetPaymentTypes();

const paymentTypeOptions: Ref<{ label: string; value: number }[]> = computed(() =>
  paymentTypes?.value?.data
    ? paymentTypes.value.data.map((el: IPaymentType) => ({
        label: el.name,
        value: el.id,
      }))
    : []
);

// Validation schema based on INewPaymet
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

const initialForm: INewPayment = {
  patient_id: props.patientId || 0,
  payment_type_id: "",
  amount: 0,
  payment_date: "",
};

const { values, setFieldValue } = useForm<INewPayment>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Watch for patientId changes
watch(
  () => props.patientId,
  (newId) => {
    setFieldValue("patient_id", newId);
  }
);

// Use TanStack Query mutation for creating payment
const { createPayment, isCreatePaymentLoading } = useCreatePayment();

const onSubmit = async () => {
  try {
    await createPayment(values, {
      onSuccess: () => {
        toast.add({
          description: $t("payment_created_successfully"),
          color: "success",
        });
        emit("closeModal");
      },
      onError: (error: any) => {
        console.error("Payment creation error:", error);
        toast.add({
          description: $t("payment_creation_failed"),
          color: "error",
        });
      },
    });
  } catch (error) {
    console.error("Payment creation error:", error);
  }
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
    <UCard variant="outline">
      <form class="w-full" @submit.prevent="onSubmit">
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

          <!-- Session Date -->
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
            :disabled="isCreatePaymentLoading"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isCreatePaymentLoading"
            :disabled="!isFormValid || isCreatePaymentLoading"
          >
            <span>{{ $t("save") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
