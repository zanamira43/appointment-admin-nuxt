<script setup></script>
<template>
  <UCard>
    <template #header>
      <div class="text-lg font-medium">
        {{ $t("general_setting") }}
      </div>
    </template>

    <div class="space-y-4 w-1/2 mx-auto">
      <UFormField :label="$t('system_name')" class="flex justify-between items-center">
        <UInput placeholder=" کلینکی ڕاوێژکار ئاسۆ" />
      </UFormField>

      <UFormField :label="$t('phone_number')" class="flex justify-between items-center">
        <UInput placeholder="٠٧٧١١٥٦٦٣٤٣" />
      </UFormField>

      <UFormField :label="$t('address')" class="flex justify-between items-center">
        <UTextarea placeholder=" سلێمانی - مەجید بەگ - بەرامبەر مزگەوتی قازی محمد" />
      </UFormField>

      <UFormField :label="$t('invoice_prefix')" class="flex justify-between items-center">
        <UInput placeholder="As" />
      </UFormField>
    </div>
  </UCard>
</template>
