<script setup lang="ts">
import { computed } from "vue";
import { useField } from "vee-validate";

interface Props {
  name: string; // Required for useField
  label?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  maxlength?: number;
  showCharCount?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none" | undefined;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral"
    | undefined;
  resize?: boolean;
  // Validation
  rules?: any;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  disabled: false,
  readonly: false,
  showCharCount: false,
  resize: true,
});

// Use vee-validate's useField
const { value, errorMessage, handleBlur } = useField<string | undefined>(
  () => props.name,
  props.rules
);

const characterCount = computed(() => (value.value as string)?.length || 0);
</script>
<template>
  <UFormField :label="label" :name="name" :error="errorMessage" :hint="hint">
    <UTextarea
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :size="size"
      :variant="variant"
      :color="color"
      :resize="resize"
      v-bind="$attrs"
      @blur="handleBlur"
    />
    <div v-if="showCharCount && maxlength" class="flex justify-end mt-1">
      <span class="text-xs text-gray-500"> {{ characterCount }}/{{ maxlength }} </span>
    </div>
  </UFormField>
</template>
