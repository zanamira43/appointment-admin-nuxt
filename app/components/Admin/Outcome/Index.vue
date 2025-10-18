<script setup></script>
<template>
  <AdminPageHeader :title="`${$t('outcome')}`" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
    <!-- predict outcome -->
    <UCard>
      <template #header>
        <div class="text-lg font-medium">
          {{ $t("determined_outcome") }}
        </div>
      </template>

      <div class="space-y-4 w-full mx-auto">
        <UFormField
          :label="$t('need_sessions_count')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>

        <UFormField
          :label="$t('session_price')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>

        <UFormField
          :label="$t('session_total_price')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>
      </div>
    </UCard>

    <!-- completed outcome -->
    <UCard>
      <template #header>
        <div class="text-lg font-medium">
          {{ $t("completed_outcome") }}
        </div>
      </template>

      <div class="space-y-4 w-full mx-auto">
        <UFormField
          :label="$t('received_session_count')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>

        <UFormField
          :label="$t('received_session_total_price')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>

        <UFormField
          :label="$t('total_received_payment')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>

        <UFormField
          :label="$t('total_left_money')"
          class="flex justify-between items-center"
        >
          <UInput placeholder="0" />
        </UFormField>
      </div>
    </UCard>
  </div>
</template>
