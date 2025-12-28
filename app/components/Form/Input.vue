<script setup lang="ts">
import { useField } from "vee-validate";

interface Props {
  name: string; // Required for useField
  label?: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  readonly?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
  variant?: "outline" | "soft" | "subtle" | "ghost" | "none" | undefined;
  icon?: string;
  trailingIcon?: string;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral"
    | undefined;
  // Number input specific
  min?: number;
  max?: number;
  step?: number;
  // Validation
  rules?: any;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  readonly: false,
});

// Use vee-validate's useField
const { value, errorMessage, handleBlur } = useField<string | number>(
  () => props.name,
  props.rules
);
</script>
<template>
  <UFormField :label="label" :name="name" :error="errorMessage" :hint="hint">
    <UInput
      v-model="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"
      :variant="variant"
      :icon="icon"
      :trailing-icon="trailingIcon"
      :color="color"
      :min="min"
      :max="max"
      :step="step"
      v-bind="$attrs"
      @blur="handleBlur"
    >
      <template #trailing>
        <slot name="trailing" />
      </template>
      <template #default>
        <slot />
      </template>
    </UInput>
  </UFormField>
</template>
