<script setup></script>
<template>
  <NuxtLayout>
    <div class="h-screen w-full">
      <div class="container mx-auto">
        <div class="flex flex-col justify-center items-center">
          <div class="p-6 space-y-4">
            <h1 class="text-2xl font-semibold">Razhwekar Aso</h1>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UCard>
                <template #header>Patients</template>
                <p>Manage patients and their information.</p>
                <template #footer>
                  <UButton to="/admin/patients">Go to Patients</UButton>
                </template>
              </UCard>
              <UCard>
                <template #header>Sessions</template>
                <p>Browse all sessions.</p>
                <template #footer>
                  <UButton to="/admin/patients">Open via Patient</UButton>
                </template>
              </UCard>
              <UCard>
                <template #header>Payments</template>
                <p>Track all payments.</p>
                <template #footer>
                  <UButton to="/admin/patients">Open via Patient</UButton>
                </template>
              </UCard>
            </div>
          </div>
          <div class="mt-5 border rounded-md border-gray-300 p-5 shadow">
            <NuxtImg src="/live-organization.jpeg" class="h-[300px] w-full" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
