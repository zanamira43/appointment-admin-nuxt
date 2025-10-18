<template>
  <UFormField :label="label" :name="name" :error="errorMessage" :hint="hint">
    <USelect
      v-model="value"
      :items="items"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :variant="variant"
      :icon="icon"
      :trailing-icon="trailingIcon"
      :color="color"
      :multiple="multiple"
      :searchable="searchable"
      :clearable="clearable"
      v-bind="$attrs"
      @blur="handleBlur"
    />
  </UFormField>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

interface SelectOption {
  label?: string;
  value?: any;
  disabled?: boolean;
  [key: string]: any;
}

interface Props {
  name: string; // Required for useField
  label?: string;
  items?: string[] | SelectOption[]; // Support both simple arrays and option objects
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
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
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  // Validation
  rules?: any;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  multiple: false,
  searchable: false,
  clearable: false,
});

// Use vee-validate's useField
const { value, errorMessage, handleBlur } = useField<string | number>(
  () => props.name,
  props.rules
);
</script>
