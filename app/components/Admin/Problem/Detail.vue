<script setup lang="ts">
import ProblemCreate from "./Create.vue";
import ProblemEdit from "./Edit.vue";

const props = defineProps<{
  patientId: number;
}>();

// Fetch problems by patient ID
const { problem, isLoading, fetchProblems } = useGetProblemsByPatientId(
  toRef(props, "patientId")
);

// Determine which component to show
const hasExistingProblem = ref(false);
watch(
  () => problem?.value,
  (newVal) => {
    if (newVal?.id) {
      hasExistingProblem.value = true;
    }
  }
);

// Handle success events from child components
const handleSuccess = async () => {
  await fetchProblems();
};

const reRenderDetail = () => {
  hasExistingProblem.value = false;
};
</script>

<template>
  <div class="text-muted mb-4 mt-2">
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
    </div>

    <div v-else>
      <ProblemEdit
        v-if="hasExistingProblem"
        :patient-id="patientId"
        :problem-id="problem?.id"
        @success="handleSuccess"
        @delete="reRenderDetail"
      />
      <ProblemCreate v-else :patient-id="patientId" @success="handleSuccess" />
    </div>
  </div>
</template>
