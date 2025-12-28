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
          <div class="font-bold">{{ $t("session_price_one_month") }}</div>
          <UBadge color="neutral">
            {{ Number(patientData?.session_price_one_month).toLocaleString() }}
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

        <!-- total received payment -->
        <div
          class="flex justify-between items-center border border-gray-200 rounded-md px-5 py-2"
        >
          <div class="font-bold">{{ $t("total_received_payment") }}</div>
          <UBadge color="secondary">
            {{ Number(patientData?.total_received_payments).toLocaleString() }}
            <span v-if="patientData?.is_dollar_payment">$</span>
            <span v-else>{{ $t("iqd") }}</span>
          </UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>
