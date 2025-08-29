<script setup></script>
<template>
  <NuxtLayout>
    <div class="h-screen w-full">
      <div class="mx-auto">
        <div class="flex flex-col justify-center items-center">
          <div class="p-3 space-y-4 w-full">
            <h1 class="text-2xl font-bold">{{ $t("rawezhkar_aso") }}</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UCard class="w-full">
                <template #header>{{ $t("patient") }}</template>
                <p>{{ $t("Manage patients and their information.") }}</p>
                <template #footer>
                  <UButton to="/admin/patients">{{ $t("view") }}</UButton>
                </template>
              </UCard>
              <UCard>
                <template #header>{{ $t("session") }}</template>
                <p>{{ $t("Browse all sessions.") }}</p>
                <template #footer>
                  <UButton to="/admin/patients">{{ $t("view") }}</UButton>
                </template>
              </UCard>
              <UCard>
                <template #header>{{ $t("payment") }}</template>
                <p>{{ $t("Track all payments.") }}</p>
                <template #footer>
                  <UButton to="/admin/patients">{{ $t("view") }}</UButton>
                </template>
              </UCard>
            </div>
          </div>
          <div class="mt-5 border rounded-md border-gray-300 shadow">
            <NuxtImg src="/live-organization.jpeg" class="h-[300px] w-full" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
