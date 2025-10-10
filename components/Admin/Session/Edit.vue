<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { IEditSession, ISession } from "~/types/ISession";

const toast = useToast();

const props = defineProps<{
  id: number;
  patientId?: number;
}>();

const emit = defineEmits(["closeModal"]);

// Validation schema based on IEditSession type
const schema = yup.object({
  patient_id: yup.number().required($t("patient is required")),
  subject: yup.string().required($t("subject is required")),
  communication_types: yup.string().required($t("communication type is required")),
  session_date: yup
    .string()
    .required($t("session date is required"))
    .matches(/^\d{4}-\d{2}-\d{2}$/, $t("invalid date format")),
  detail: yup.string().optional(),
  status: yup.string().required($t("status is required")),
});

const initialForm: IEditSession = {
  patient_id: props.patientId as number,
  subject: "",
  communication_types: "",
  session_date: "",
  detail: "",
  status: "new_session",
};

const { values, resetForm, handleSubmit } = useForm<IEditSession>({
  validationSchema: schema,
  initialValues: initialForm,
});

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

// Fetch session data
const { session, isLoading: isLoadingSession } = useGetSession(props.id);

// Populate form when session data is loaded
watch(
  () => session.value,
  (sessionData) => {
    if (sessionData?.body) {
      const data = sessionData.body as ISession;

      // Format the session_date to match date input format (YYYY-MM-DD)
      let formattedDate = data.session_date;
      if (formattedDate) {
        // Extract only the date part (YYYY-MM-DD)
        formattedDate = formattedDate.substring(0, 10);
      }

      resetForm({
        values: {
          patient_id: data.patient_id,
          subject: data.subject,
          communication_types: data.communication_types,
          session_date: formattedDate,
          detail: data.detail,
          status: data.status,
        },
      });
    }
  },
  { immediate: true }
);

// Use TanStack Query mutation for updating session
const { updateSession, isSessionUpdating } = useUpdateSession();

const onSubmit = async () => {
  await handleSubmit(async (values) => {
    try {
      updateSession(
        {
          id: props.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.add({
              description: $t("session_updated_successfully"),
              color: "success",
            });
            emit("closeModal");
          },
          onError: (error: any) => {
            console.error("Session update error:", error);
            toast.add({
              description: $t("session_update_failed"),
              color: "error",
            });
          },
        }
      );
    } catch (error) {
      console.error("Session update error:", error);
    }
  })();
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    values.patient_id &&
    values.subject &&
    values.communication_types &&
    values.session_date &&
    values.detail.length > 0 &&
    values.status
  );
});
</script>

<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <!-- Loading State -->
      <div v-if="isLoadingSession" class="flex justify-center items-center py-10">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl" />
      </div>

      <!-- Form -->
      <form v-else class="w-full" @submit.prevent="onSubmit">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
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

          <!-- Detail -->
          <div class="w-full col-span-2">
            <FormTextArea :label="$t('details')" name="detail" class="w-full" :rows="4" />
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex items-center justify-end gap-2 w-full">
          <UButton
            type="button"
            variant="outline"
            @click="emit('closeModal')"
            :disabled="isSessionUpdating"
          >
            <span>{{ $t("cancel") }}</span>
          </UButton>
          <UButton
            type="button"
            @click="onSubmit"
            :loading="isSessionUpdating"
            :disabled="!isFormValid || isSessionUpdating || isLoadingSession"
          >
            <span>{{ $t("update") }}</span>
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
