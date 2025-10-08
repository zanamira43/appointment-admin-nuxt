<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import type { INewProblem } from "~/types/IProblem";

const toast = useToast();

const props = defineProps<{
  patientId: number;
}>();

const emit = defineEmits(["success"]);

// Validation schema
const schema = yup.object({
  main_problems: yup
    .array()
    .of(yup.string().required())
    .min(1, `${$t("main problems is required")}`),
  secondary_problems: yup
    .array()
    .of(yup.string().required())
    .min(1, `${$t("secondary problems is required")}`),
  need_sessions_count: yup
    .number()
    .min(1, `${$t("sessions count must be at least 1")}`)
    .required(`${$t("sessions count is required")}`),
  session_price: yup
    .number()
    .min(0, `${$t("session price must be positive")}`)
    .required(`${$t("session price is required")}`),
  patient_image: yup.string().optional(),
  details: yup.string().optional(),
});

const initialForm: INewProblem = {
  patient_id: props.patientId,
  main_problems: [],
  secondary_problems: [],
  need_sessions_count: 1,
  session_price: 0,
  patient_image: "",
  details: "",
};

const { values, setFieldValue, errors } = useForm<INewProblem>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Create refs for array fields and sync them with form values
const { value: main_problems } = useField<string[]>("main_problems");
const { value: secondary_problems } = useField<string[]>("secondary_problems");

// Watch for patientId changes
watch(
  () => props.patientId,
  (newId) => {
    setFieldValue("patient_id", newId);
  }
);

const { createProblem, isPending } = useCreateProblem();
const onSubmit = async () => {
  if (props.patientId === null) return;

  try {
    await createProblem(values, {
      onSuccess: () => {
        toast.add({
          description: $t("problem_created_successfully"),
          color: "success",
        });

        emit("success");
      },
    });
  } catch (error) {
    console.log("problem error", error);
  }
};

// Computed property for total price
const sessionTotalPrice = computed(() => {
  const price = values.session_price || 0;
  const count = values.need_sessions_count || 0;
  return price * count;
});

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    values.main_problems.length > 0 &&
    values.secondary_problems.length > 0 &&
    values.need_sessions_count >= 1 &&
    values.session_price >= 0
  );
});

// Image upload handler
const { uploadPatientImage, isPending: isUploadLoading } = useUploadPatientImage();

const fileInput = ref<HTMLInputElement | null>(null);
const isUploadingImage = ref(false);

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    toast.add({
      description: $t("please_select_a_valid_image_file"),
      color: "error",
    });
    return;
  }

  // For now, create a local URL preview
  // You can replace this with actual upload logic to your server
  // const imageUrl = URL.createObjectURL(file);

  isUploadingImage.value = true;
  try {
    const formData = new FormData();
    formData.append("image", file);
    await uploadPatientImage(formData, {
      onSuccess: (data) => {
        toast.add({ description: $t("image_uploaded_successfully"), color: "success" });

        const imgeUrl = data as {
          patient_image_url: string;
        };

        setFieldValue("patient_image", imgeUrl.patient_image_url);
      },
      onError: () => {
        toast.add({ description: $t("image_upload_failed"), color: "error" });
      },
    });
  } catch (error) {
    toast.add({ description: $t("image_upload_failed"), color: "error" });
  } finally {
    isUploadingImage.value = false;
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

// Options for problem tags
const mainProblemOptions = ref([
  { label: $t("Depression"), value: "Depression" },
  { label: $t("Attachment"), value: "Attachment" },
  { label: $t("Obsessive thoughts"), value: "Obsessive thoughts" },
  { label: $t("Panic"), value: "Panic" },
  { label: $t("Addiction"), value: "Addiction" },
  { label: $t("Anger"), value: "Anger" },
  { label: $t("Marrige jealousy"), value: "Marrige jealousy" },
  { label: $t("Sleep problems"), value: "Sleep problems" },
  { label: $t("Homosexual"), value: "Homosexual" },
]);

const secondaryProblemOptions = ref([
  { label: $t("Mood swings"), value: "Mood swings" },
  { label: $t("Fear"), value: "Fear" },
  { label: $t("Jealousy"), value: "Jealousy" },
  { label: $t("Hate"), value: "Hate" },
  { label: $t("Breathing and heart problems"), value: "Breathing and heart problems" },
  {
    label: $t("Obsession with cleanliness and hygiene"),
    value: "Obsession with cleanliness and hygiene",
  },
  {
    label: $t("Blasphemous obsessive thoughts"),
    value: "Blasphemous obsessive thoughts",
  },
  { label: $t("Obsession with harm"), value: "Obsession with harm" },
  {
    label: $t("Repeating actions compulsively"),
    value: "Repeating actions compulsively",
  },
  {
    label: $t("Existential obsessive thoughts"),
    value: "Existential obsessive thoughts",
  },
  {
    label: $t("Sexual obsessive thoughts"),
    value: "Sexual obsessive thoughts",
  },
  {
    label: $t("Health-related obsessive thoughts"),
    value: "Health-related obsessive thoughts",
  },
]);
</script>
<template>
  <div class="w-full mx-auto flex flex-col gap-5">
    <UCard>
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h2 class="text-2xl font-semibold">{{ $t("add_problem") }}</h2>

          <UButton
            type="button"
            @click="onSubmit()"
            :loading="isPending"
            :disabled="!isFormValid"
          >
            <span>{{ $t("save") }}</span>
          </UButton>
        </div>
      </template>

      <div class="flex flex-col lg:flex-row gap-6 w-full px-1">
        <!-- Image Preview Panel -->
        <div class="flex flex-col items-center gap-4 lg:w-1/4">
          <div
            class="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800"
          >
            <UAvatar
              v-if="!values.patient_image"
              :alt="$t('patient_image')"
              size="3xl"
              icon="i-heroicons-user"
            />
            <img
              v-else
              :src="values.patient_image"
              :alt="$t('patient_image')"
              class="w-full h-full object-cover"
            />
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
          <!-- <UButton
            color="primary"
            variant="outline"
            block
            @click="triggerFileInput"
            :loading="isUploadLoading"
            :disabled="true"
          >
            {{ $t("upload_image") }}
          </UButton> -->
        </div>

        <!-- Form Fields -->
        <form class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <!-- main problems -->
            <div class="flex flex-col gap-3">
              <span class="font-bold">{{ $t("main_problems") }} </span>
              <UCheckboxGroup
                v-model="main_problems"
                :items="mainProblemOptions"
                size="sm"
                class="w-full"
              />
              <p v-if="errors.main_problems" class="text-red-500">
                {{ errors.main_problems }}
              </p>
            </div>
            <!-- secondary problems -->
            <div class="flex flex-col gap-3">
              <span class="font-bold">{{ $t("secondary_problems") }}</span>
              <UCheckboxGroup
                v-model="secondary_problems"
                :items="secondaryProblemOptions"
                size="sm"
                class="w-full"
              />
              <p v-if="errors.secondary_problems" class="text-red-500">
                {{ errors.secondary_problems }}
              </p>
            </div>
            <!-- proble price & session count & session total -->
            <div class="flex flex-col gap-2 md:gap-5 items-center">
              <FormInput
                type="number"
                :label="$t('need_sessions_count')"
                name="need_sessions_count"
                class="w-full"
                :min="1"
              />

              <FormInput
                type="number"
                :label="$t('session_price')"
                name="session_price"
                class="w-full"
                :min="0"
              />

              <div class="flex flex-col gap-2 w-full">
                <label class="text-sm font-medium">{{ $t("session_total_price") }}</label>
                <div class="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800">
                  {{ sessionTotalPrice }}
                </div>
              </div>
            </div>

            <div class="md:col-span-3">
              <FormTextArea
                :label="$t('details')"
                name="details"
                class="w-full"
                :rows="4"
              />
            </div>
          </div>
        </form>
      </div>
    </UCard>
  </div>
</template>
