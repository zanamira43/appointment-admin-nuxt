<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { INewSession } from "~/types/ISession";
import type { IPatient } from "~/types/IPatient";

const toast = useToast();

const emit = defineEmits(["closeModal"]);

const props = defineProps<{
  patientId: number;
}>();

// Validation schema based on INewSession type
const schema = yup.object({
  patient_id: yup.number().required($t("patient is required")),
  subject: yup.string().required($t("subject is required")),
  communication_types: yup.string().required($t("communication type is required")),
  session_date: yup
    .string()
    .required($t("session date is required"))
    .matches(/^\d{4}-\d{2}-\d{2}$/, $t("invalid date format")),
  duration: yup
    .number()
    .min(1, $t("duration must be at least 1 minute"))
    .required($t("duration is required")),
  status: yup.string().required($t("status is required")),
});

const initialForm: INewSession = {
  patient_id: props.patientId || 0,
  subject: "",
  communication_types: "",
  session_date: "",
  duration: 60, // Default 60 minutes
  status: "new_session",
};

const { values, setFieldValue } = useForm<INewSession>({
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

// Communication type options
const communicationTypeOptions = [
  { label: $t("face_to_face"), value: "face_to_face" },
  { label: $t("video_call"), value: "video_call" },
  { label: $t("audio_call"), value: "audio_call" },
  { label: $t("voice_message"), value: "voice_message" },
  { label: $t("chat_message"), value: "chat_message" },
];

// Status options
const statusOptions = [
  { label: $t("new_session"), value: "new_session" },
  { label: $t("in_progress"), value: "in_progress" },
  { label: $t("completed"), value: "completed" },
  { label: $t("cancelled"), value: "cancelled" },
];

// Get patients for select dropdown
const { patients } = useGetPatients();
const patientOptions = computed(() => {
  const patientList = (patients?.value?.data ?? []) as IPatient[];
  return patientList.map((p) => ({
    label: p.name,
    value: p.id,
  }));
});

// Use TanStack Query mutation for creating session
const { createNewSession, isPending } = useCreateSession();

const onSubmit = async () => {
  try {
    await createNewSession(values, {
      onSuccess: () => {
        toast.add({
          description: $t("session_created_successfully"),
          color: "success",
        });
        emit("closeModal");
      },
      onError: (error: any) => {
        console.error("Session creation error:", error);
        toast.add({
          description: $t("session_creation_failed"),
          color: "error",
        });
      },
    });
  } catch (error) {
    console.error("Session creation error:", error);
  }
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    values.patient_id &&
    values.subject &&
    values.communication_types &&
    values.session_date &&
    values.duration > 0 &&
    values.status
  );
});
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard variant="outline">
      <form class="w-full" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <!-- Patient Selection -->
          <FormSelect
            :label="$t('patient')"
            name="patient_id"
            :items="patientOptions"
            :placeholder="$t('select_patient')"
            :disabled="!!patientId"
            class="w-full"
          />

          <!-- Subject -->
          <FormInput
            :label="$t('subject')"
            name="subject"
            :placeholder="$t('enter_session_subject')"
            class="w-full"
          />

          <!-- Communication Type -->
          <FormSelect
            :label="$t('communication_type')"
            name="communication_types"
            :items="communicationTypeOptions"
            :placeholder="$t('select_communication_type')"
            class="w-full"
          />

          <!-- Status -->
          <FormSelect
            :label="$t('status')"
            name="status"
            :items="statusOptions"
            :placeholder="$t('select_status')"
            class="w-full"
          />

          <!-- Session Date -->
          <FormInput
            type="date"
            :label="$t('session_date')"
            name="session_date"
            class="w-full"
          />

          <!-- Duration (in minutes) -->
          <FormInput
            type="number"
            :label="$t('duration_minutes')"
            name="duration"
            :placeholder="$t('enter_duration')"
            :min="1"
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
            :disabled="isPending"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isPending"
            :disabled="!isFormValid || isPending"
          >
            <span>{{ $t("save") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
