<script setup lang="ts">
const props = defineProps<{
  patinetId: number;
}>();

const {
  patientData,
  isPatinetOutcomeLoading,
  fetchPatientOutcome,
} = useGetPatientOutcome(props.patinetId);

onMounted(async () => {
  await fetchPatientOutcome();
});

const remainingBalanceColor = computed(() => {
  const balance = patientData?.value?.remaining_balance;
  if (balance === undefined) return "error"; // or handle undefined however you like
  return balance > 0 ? "primary" : "error";
});
</script>
<template>
  <AdminPageHeader :title="`${$t('outcome')}`" :subtitle="patientData?.name">
    <div>
      <UBadge v-if="patientData?.is_dollar_payment" color="neutral">
        {{ $t("is_dollar_payment") }}
      </UBadge>

      <UBadge v-else color="neutral">
        {{ $t("iqd") }}
      </UBadge>
    </div>
  </AdminPageHeader>
  <!-- loading page in fetching process -->
  <div v-if="isPatinetOutcomeLoading" class="flex justify-center items-center py-8">
    <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
  </div>
  <!-- data view  -->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
    <!-- predict outcome -->
    <UCard>
      <template #header>
        <div class="text-lg font-medium">
          {{ $t("determined_outcome") }}
        </div>
      </template>

      <div class="space-y-4 w-full mx-auto">
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("need_sessions_count") }}</div>
          <UBadge color="neutral">{{ patientData?.need_sessions_count }}</UBadge>
        </div>

        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("session_price") }}</div>
          <UBadge color="neutral">
            {{ patientData?.session_price }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>

        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("session_total_price") }}</div>
          <UBadge color="neutral">
            {{ patientData?.session_total_price }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>
      </div>
    </UCard>

    <!-- completed outcome -->
    <UCard>
      <template #header>
        <div class="text-lg font-medium">
          {{ $t("completed_outcome") }}
        </div>
      </template>

      <!-- received session count  -->
      <div class="space-y-4 w-full mx-auto">
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("received_session_count") }}</div>
          <UBadge color="secondary">{{ patientData?.sum_received_session_count }}</UBadge>
        </div>

        <!-- received session total price -->
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("received_session_total_price") }}</div>
          <UBadge color="secondary">
            {{ patientData?.session_received_total_price }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>

        <!-- total received payment -->
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("total_received_payment") }}</div>
          <UBadge color="secondary">
            {{ patientData?.total_received_payments }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>

        <!--  remaning balance -->
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("total_left_money") }}</div>
          <UBadge :color="`${remainingBalanceColor}`">
            {{ patientData?.remaining_balance }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>
