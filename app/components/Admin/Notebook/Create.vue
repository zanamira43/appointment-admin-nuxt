<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { INewNotbook } from "~/types/INotebook";

definePageMeta({
  middleware: "admin",
});

const emit = defineEmits(["close", "note_created"]);

const toast = useToast();

// Validation schema
const schema = yup.object({
  content: yup.string().required(`${$t("note is required")}`),
});

const { values } = useForm<INewNotbook>({
  initialValues: {
    content: "",
  },
  validationSchema: schema,
});
const { createNotebook, isPending: isCreating } = useCreateNotebook();
const handleCreateNewNote = async () => {
  if (!values.content) return;

  await createNotebook(values, {
    onSuccess: async () => {
      toast.add({
        description: $t("new_note_created_successfully"),
        color: "success",
      });
      await emit("note_created");
    },
  });
};

const breakpoint = useBreakpoints({
  mobile: 0,
  tablet: 800,
});

const isMobile = breakpoint.smaller("tablet");
</script>
<template>
  <!-- New Notebook Form -->
  <div class="mt-2">
    <UCard class="relative">
      <div class="flex justify-between items-center">
        <!-- card input -->
        <div class="flex justify-center items-center gap-3 w-full">
          <FormTextArea :label="$t('note')" name="content" class="w-3/4" />
        </div>
        <!-- card actions -->
        <div class="flex justify-center items-center gap-5 w-1/4">
          <UButton
            icon="material-symbols:save-rounded"
            color="neutral"
            @click="handleCreateNewNote"
            :label="isMobile ? '' : $t('create_note')"
            class="w-full text-xl flex justify-center items-center"
            :loading="isCreating"
          />
        </div>
      </div>
      <UButton
        icon="mdi:close-circle"
        color="warning"
        variant="soft"
        @click="emit('close')"
        class="absolute left-2 top-2"
      />
    </UCard>
  </div>
</template>
