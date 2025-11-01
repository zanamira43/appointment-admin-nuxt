<script setup lang="ts">
import { useForm } from "vee-validate";
import type { ISetting } from "~/contracts/setting";

const { settingData, refetch } = useGetSetting();

onMounted(async () => {
  await refetch();
});

const toast = useToast();

const initialValuse: ISetting = {
  id: 1,
  system_name: "",
  phone_number: "",
  address: "",
  bill_prefix: "",
};

const { values, resetForm } = useForm({
  initialValues: initialValuse,
});

watch(
  () => settingData.value,
  (newVal) => {
    if (newVal) {
      resetForm({
        values: newVal,
      });
    }
  }
);

// update system setting
const { updateSystemSetting, isPending } = useUpdateSetting();
const handleUpdateSystemSetting = async () => {
  await updateSystemSetting(values, {
    onSuccess: () => {
      toast.add({
        description: `${$t("system_setting_updated_successfully")}`,
        color: "success",
      });
    },
  });
};
</script>
<template>
  <UCard>
    <template #header>
      <div class="text-lg font-medium flex flex-row justify-between">
        <span>{{ $t("general_setting") }}</span>
        <UButton @click="handleUpdateSystemSetting" :disabled="isPending">{{
          $t("update")
        }}</UButton>
      </div>
    </template>

    <div class="space-y-4 w-1/2 mx-auto">
      <UFormField :label="$t('system_name')" class="justify-between items-center hidden">
        <FormInput name="id" />
      </UFormField>

      <UFormField :label="$t('system_name')" class="flex justify-between items-center">
        <FormInput name="system_name" placeholder=" کلینکی ڕاوێژکار ئاسۆ" />
      </UFormField>

      <UFormField :label="$t('phone_number')" class="flex justify-between items-center">
        <FormInput name="phone_number" placeholder="٠٧٧١١٥٦٦٣٤٣" />
      </UFormField>

      <UFormField :label="$t('address')" class="flex justify-between items-center">
        <FormTextArea
          name="address"
          placeholder=" سلێمانی - مەجید بەگ - بەرامبەر مزگەوتی قازی محمد"
        />
      </UFormField>

      <UFormField :label="$t('invoice_prefix')" class="flex justify-between items-center">
        <FormInput name="bill_prefix" placeholder="As" />
      </UFormField>
    </div>
  </UCard>
</template>
