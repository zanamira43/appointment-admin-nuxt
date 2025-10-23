<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import type { IEditProblem } from "@/types/IProblem";

const toast = useToast();

const props = defineProps<{
  patientId: number;
  problemId?: number;
}>();

const emit = defineEmits(["success", "delete"]);

const { problem, fetchProblem } = useGetProblem(props.problemId as number);
const { uploadPatientImage, isPending: isUploadLoading } = useUploadPatientImage();
const { deletePatientImage, isPending: isDeleteLoading } = useDeletePatientImage();

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
  is_dollar_payment: yup.bool().optional(),
  session_price: yup
    .number()
    .min(1, `${$t("session price must be positive")}`)
    .required(`${$t("session price is required")}`),
  patient_image: yup.string().optional(),
  details: yup.string().optional(),
});

const initialForm: IEditProblem = {
  patient_id: props.patientId,
  main_problems: [],
  secondary_problems: [],
  need_sessions_count: 1,
  is_dollar_payment: false,
  session_price: 1,
  patient_image: "",
  details: "",
};

const { values, setFieldValue, errors, resetForm } = useForm<IEditProblem>({
  validationSchema: schema,
  initialValues: initialForm,
});

// Create refs for array fields and sync them with form values
const { value: main_problems } = useField<string[]>("main_problems");
const { value: secondary_problems } = useField<string[]>("secondary_problems");
const { value: is_dollar_payment } = useField<boolean>("is_dollar_payment");

onMounted(async () => {
  await fetchProblem();
  if (problem.value?.body) {
    resetForm({
      values: problem.value.body,
    });
  }
});

// Watch for patientId changes
watch(
  () => props.patientId,
  (newId) => {
    setFieldValue("patient_id", newId);
  }
);

// Computed property for total price
const sessionTotalPrice = computed(() => {
  const price = values.session_price || 0;
  const count = values.need_sessions_count || 0;
  return price * count;
});

const { updateProblem, isPending } = useUpdateProblem();
const updatePatientProblem = async () => {
  if (props.patientId === null) return;

  try {
    await updateProblem(
      {
        id: props.problemId as number,
        data: values,
      },
      {
        onSuccess: () => {
          toast.add({
            description: $t("problem_updated_successfully"),
            color: "success",
          });

          emit("success");
        },
      }
    );
  } catch (error) {
    console.log("problem error", error);
  }
};

/// delete patient problem
const problemDeleleteModal = ref(false);
const { deleteProblem, isPending: isDeleteProblemLoading } = useDeleteProblem();
const handleDeleteProblem = async () => {
  if (props.problemId === null) return;

  try {
    await deleteProblem(props.problemId, {
      onSuccess: () => {
        toast.add({
          description: $t("problem_deleted_successfully"),
          color: "success",
        });

        emit("delete");

        if (values.patient_image !== "") {
          deletePatientImage(
            { patient_image_url: values.patient_image },
            {
              onSuccess: () => {
                toast.add({
                  description: $t("image_deleted_successfully"),
                  color: "success",
                });
                setFieldValue("patient_image", "");
              },
              onError: () => {
                toast.add({ description: $t("image_delete_failed"), color: "error" });
              },
            }
          );
        }
      },
    });

    problemDeleleteModal.value = false;
  } catch (err) {
    console.error("Failed to delete problem:", err);
  } finally {
    // emit("delete");
  }
};

// Image upload handler
const fileInput = ref<HTMLInputElement | null>(null);
const isUploadingImage = ref(false);

// Helper function to compress image for better mobile performance
const compressImage = (
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas to Blob conversion failed"));
            }
          },
          file.type,
          quality
        );
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

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

  // Validate file size (max 10MB for better mobile compatibility)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    toast.add({
      description: $t("image_size_too_large_max_10mb"),
      color: "error",
    });
    return;
  }

  // Compress image for better mobile performance and faster uploads
  isUploadingImage.value = true;
  let fileToUpload: File | Blob = file;

  try {
    // Only compress if file is larger than 500KB
    if (file.size > 500 * 1024) {
      const compressedBlob = await compressImage(file);
      fileToUpload = new File([compressedBlob], file.name, { type: file.type });
    }
  } catch (compressionError) {
    console.warn("Image compression failed, uploading original:", compressionError);
    // Continue with original file if compression fails
  }

  const formData = new FormData();
  formData.append("image", fileToUpload);

  try {
    await uploadPatientImage(formData, {
      onSuccess: (data) => {
        toast.add({ description: $t("image_uploaded_successfully"), color: "success" });

        const imgeUrl = data as {
          patient_image_url: string;
        };

        setFieldValue("patient_image", imgeUrl.patient_image_url);
        updatePatientProblem();
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

const handleDeleteImage = async () => {
  if (!values.patient_image) return;
  await deletePatientImage(
    { patient_image_url: values.patient_image },
    {
      onSuccess: () => {
        toast.add({ description: $t("image_deleted_successfully"), color: "success" });
        setFieldValue("patient_image", "");
        updatePatientProblem();
      },
      onError: () => {
        toast.add({ description: $t("image_delete_failed"), color: "error" });
      },
    }
  );
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
          <h2 class="text-2xl font-semibold">{{ $t("edit_problem") }}</h2>
          <div class="flex justify-center items-center gap-2">
            <UButton
              type="button"
              @click="problemDeleleteModal = true"
              variant="ghost"
              color="error"
              class="border"
            >
              <Icon
                name="heroicons:trash-20-solid"
                size="20"
                class="text-red-500 cursor-pointer"
              />
            </UButton>
            <UButton type="button" @click="updatePatientProblem()" :loading="isPending">
              <span>{{ $t("update") }}</span>
            </UButton>
          </div>
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
            capture="environment"
            class="hidden"
            @change="handleImageUpload"
          />
          <UButton
            color="primary"
            variant="outline"
            block
            @click="triggerFileInput"
            :loading="isUploadingImage"
            :disabled="values.patient_image !== ''"
          >
            {{ $t("upload_image") }}
          </UButton>
          <UButton
            color="error"
            variant="outline"
            block
            @click="handleDeleteImage"
            :loading="isDeleteLoading"
            :disabled="values.patient_image === ''"
          >
            {{ $t("delete_image") }}
          </UButton>
        </div>

        <!-- Form Fields -->
        <form class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <!-- main problems -->
            <div class="flex flex-col gap-3">
              <span>{{ $t("main_problems") }}: </span>
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
              <span>{{ $t("secondary_problems") }}: </span>
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
                trailing-icon="mingcute:numbers-90-sort-ascending-line"
              />

              <!-- dolar payment field true/false -->
              <UCheckbox
                :label="$t('is_dollar_payment')"
                v-model="is_dollar_payment"
                size="lg"
                color="secondary"
                variant="card"
                class="w-full"
                indicator="end"
              />

              <div class="flex relative min-w-full">
                <FormInput
                  type="number"
                  :label="$t('session_price')"
                  name="session_price"
                  class="w-full"
                  :min="1"
                  :trailing-icon="`${
                    values.is_dollar_payment ? 'lucide:circle-dollar-sign' : $t('iqd')
                  }`"
                />
                <span v-if="!values.is_dollar_payment" class="absolute top-8 left-3">
                  {{ $t("iqd") }}
                </span>
              </div>

              <div class="flex flex-col gap-2 w-full">
                <label class="text-sm font-medium">{{ $t("session_total_price") }}</label>
                <div
                  class="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-800 items-center flex justify-between"
                >
                  {{ sessionTotalPrice }}
                  <Icon
                    name="lucide:circle-dollar-sign"
                    size="20"
                    v-if="values.is_dollar_payment"
                  />
                  <span v-else>{{ $t("iqd") }}</span>
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

    <!-- Problme Delete Modal -->
    <UModal v-model:open="problemDeleleteModal">
      <template #body>
        <div class="flex flex-col justify-center items-center gap-2">
          <h1 class="text-2xl font-bold text-center">{{ $t("delete_problem") }}</h1>
          <p class="text-center">{{ $t("are_you_sure_to_delete") }}</p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-start items-start gap-2">
          <UButton
            :label="$t('yes')"
            :disabled="isDeleteProblemLoading"
            color="error"
            @click="handleDeleteProblem()"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
