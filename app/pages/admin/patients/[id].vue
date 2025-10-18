<script setup lang="ts">
import PatientDetail from "@/components/Admin/Patient/PatientDetail.vue";
import ProblemDetail from "@/components/Admin/Problem/Detail.vue";
import type { IPatient } from "~/app/types/IPatient";

const { role } = useMyUserStore();

const route = useRoute();
const id: Ref<number> = ref(parseInt(route.params.id as string));
const { patient } = useGetPatientbyId(id.value);

const patientDetail = computed(() => {
  return patient?.value?.body as IPatient;
});

const items = computed(() => {
  const baseItems = [
    {
      label: `${$t("patient")} :  ${patientDetail.value.name}`,
      slot: "patient" as const,
    },
    {
      label: $t("session"),
      slot: "session",
    },
    {
      label: $t("payment"),
      slot: "payment",
    },
    {
      label: $t("outcome"),
      slot: "outcome",
    },
  ];

  if (role === "admin") {
    baseItems.splice(1, 0, {
      label: $t("problem"),
      slot: "problem",
    });
  }

  return baseItems;
});
</script>
<template>
  <NuxtLayout>
    <div class="w-full mx-auto">
      <UTabs
        :items="items"
        :ui="{ trigger: 'grow' }"
        class="gap-4 w-full"
        :unmount-on-hide="false"
        variant="pill"
        color="neutral"
      >
        <template #patient="{ item }">
          <PatientDetail :patient="patientDetail" />
        </template>
        <template v-if="role === 'admin'" #problem>
          <ProblemDetail :patientId="id" />
        </template>
        <template #session="{ item }">
          <div class="text-muted mb-4 mt-2">
            <AdminSessionListByPatient :patientId="id" />
          </div>
        </template>

        <template #payment="{ item }">
          <div class="text-muted mb-4">
            <AdminPaymentListByPatient :patient-id="id" />
          </div>
        </template>

        <template #outcome="{ item }">
          <div class="text-muted mb-4">
            <AdminOutcome />
          </div>
        </template>
      </UTabs>
    </div>
  </NuxtLayout>
</template>
