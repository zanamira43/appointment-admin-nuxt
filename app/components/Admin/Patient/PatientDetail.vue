<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useUpdatePatient, useUploadPatientSignature, useDeletePatientSignature } from "@/composables/patients";
import type { IPatient, IUpdatePatient } from "@/types/IPatient";

// call user role 
const { role } = useMyUserStore();


const props = defineProps<{
  patient: IPatient;
}>();

watch(
  () => props.patient,
  (editPatient) => {
    if (editPatient) {
      setValues(editPatient);
    }
  }
);

// Validation schema
const schema = yup.object({
  name: yup.string().required(`${$t("Name is required")}`),
  phone_number: yup.string().required(`${$t("Phone number is required")}`),
  gender: yup.string().required(`${$t("Gender is required")}`),
  age: yup
    .number()
    .min(1, `${$t("Age must be a positive number")}`)
    .required(`${$t("Age is required")}`),
  maried_status: yup.string().required(`${$t("Married status is required")}`),
  profession: yup.string().required(`${$t("Profession is required")}`),
  address: yup.string().required(`${$t("Address is required")}`),
  signature_file: yup.string().optional(),
  is_private: yup.boolean().default(false)
});

const { values, setValues, setFieldValue } = useForm<IUpdatePatient>({
  validationSchema: schema,
  initialValues: props.patient,
});

const { value: is_private } = useField<boolean>("is_private");

const toast = useToast();
const { mutate, isPending } = useUpdatePatient();
// update patient function
const handleUpdate = async () => {
  await mutate(
    {
      id: props.patient.id,
      data: values,
    },
    {
      onSuccess: () => {
        toast.add({
          title: $t("patient_updated_successfully"),
          color: "success",
          icon: "i-heroicons-check-circle",
        });
      },
    }
  );
};

// patient signature
const SignaturefileInput = ref<HTMLInputElement | null>(null);
const isUploadingSignatureFile = ref(false);
const { uploadSignatureFile , isUploadPending} = useUploadPatientSignature()
const triggerFileInput = () => {
  SignaturefileInput.value?.click();
};

// compress file function
const compressImage = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  minSize = 300,
  quality = 0.9
): Promise<Blob> => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {

      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {

        let width = img.width;
        let height = img.height;

        // 🔹 Upscale small images (like 99px signatures)
        if (width < minSize || height < minSize) {
          const scale = Math.max(minSize / width, minSize / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        // 🔹 Compress large images
        if (width > maxWidth || height > maxHeight) {
          const scale = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas to Blob conversion failed"));
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

const handleSignatureFileUpload = async (event: Event) => {
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
  isUploadingSignatureFile.value = true;
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
  formData.append("signature", fileToUpload);

  try {
    await uploadSignatureFile(formData, {
      onSuccess: (data) => {
        toast.add({ description: $t("signature_file_uploaded_successfully"), color: "success", icon: "i-heroicons-check-circle", });

        const signatureUrl = data as {
          signature_file_url: string;
        };

        setFieldValue("signature_file", signatureUrl.signature_file_url);
        handleUpdate();
      },
      onError: () => {
        toast.add({ description: $t("signature_file_upload_failed"), color: "error" });
      },
    });
  } catch (error) {
    toast.add({ description: $t("signature_file_upload_failed"), color: "error" });
  } finally {
    isUploadingSignatureFile.value = false;
  }
};

// delete patient signature
const {deletePatientSignature, isDeletePending} = useDeletePatientSignature()
const handleDeleteSignatureFile = async () => {
  if(!values.signature_file) return
  await deletePatientSignature({
    signature_file_url: values.signature_file
  }, 
  {
      onSuccess: () => {
        toast.add({ description: $t("signature_file_deleted_successfully"), color: "success", icon: "i-heroicons-check-circle", });
        setFieldValue("signature_file", "");
        handleUpdate();
      },
      onError: () => {
        toast.add({ description: $t("signature_file_delete_failed"), color: "error" });
      },
  })
}
</script>

<template>
  <div class="text-muted mb-4 mt-2">
    <UCard>
      <template #header>
        <h2 class="text-2xl font-semibold">{{ $t("edit_patient") }}</h2>
      </template>

      <form class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-5">
          <FormInput :label="$t('name')" name="name" class="w-full" />
          <FormInput :label="$t('phone_number')" name="phone_number" class="w-full" />
          <FormSelect
            :label="$t('gender')"
            name="gender"
            :items="[
              { label: $t('Male'), value: 'Male' },
              { label: $t('Female'), value: 'Female' },
              { label: $t('Other'), value: 'Other' },
            ]"
            class="w-full h-full"
            icon="i-heroicons-users"
          />
          <FormInput
            type="number"
            :label="$t('age')"
            name="age"
            class="w-full"
            :min="0"
          />

          <FormSelect
            :label="$t('married_status')"
            name="married_status"
            :items="[
              { label: $t('married'), value: 'married' },
              { label: $t('divorced'), value: 'divorced' },
              { label: $t('single'), value: 'single' },
              { label: $t('Other'), value: 'other' },
            ]"
            class="w-full h-full"
          />

          <FormInput :label="$t('profession')" name="profession" class="w-full" />
          <FormInput :label="$t('address')" name="address" class="w-full" />

          <div class="flex flex-col">
            <div class="text-black">{{ $t("signature") }}</div>
            <input
              ref="SignaturefileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleSignatureFileUpload"
            />
            <UButton
              v-if="patient?.signature_file == ''"
              color="secondary"
              variant="outline"
              block
              @click="triggerFileInput"
              :disabled="isUploadPending"
              class="mt-1"
            >
              {{ $t("upload_signature") }}
            </UButton>
            <UButton
              v-if="patient?.signature_file !== ''"
              color="error"
              variant="outline"
              block
              @click="handleDeleteSignatureFile"
              :disabled="isDeletePending"
              class="mt-1"
            >
              {{ $t("delete_signature") }}
            </UButton>
          </div>
          
          <!-- private patient field true/false -->
          <div v-if="role == 'admin'" class="flex justify-start items-center rounded-md gap-2 mt-5">
              <UCheckbox
                v-model="is_private"
                size="lg"
                color="secondary"
                class="flex flex-row"
              />
              <span>{{ $t("is_private") }}</span>
            </div>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-between gap-2">
           <UButton icon="material-symbols:assignment-return" @click="navigateTo('/admin/patients')">
              {{ $t('back') }}
            </UButton>
          <UButton
            type="button"
            :loading="isPending"
            @click="
              async () => {
                await handleUpdate();
              }
            "
            >{{ $t("update") }}</UButton
          >
        </div>
      </template>
    </UCard>
  </div>
</template>
