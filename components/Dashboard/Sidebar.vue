<script setup lang="ts">
const links = [
  [
    {
      label: "Dashboard",
      icon: "i-heroicons-home",
      to: "/admin",
    },
    {
      label: "New Patient",
      icon: "i-heroicons-plus-solid",
      to: "/admin/new-patient/",
    },
    {
      label: "Users",
      icon: "i-heroicons-users-solid",
      to: "/admin/users",
    },
  ],
];
</script>
<template>
  <!-- Static sidebar for desktop -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col *:bg-gray-900"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
    >
      <div class="flex mt-8 shrink-0 justify-center items-center">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
          size="2xl"
        />
      </div>

      <UDivider />

      <div class="mt-10">
        <UVerticalNavigation :links="links">
          <template #default="{ link }">
            <span class="group-hover:text-gray-500 text-gray-500 relative py-1">
              {{ link.label }}</span
            >
          </template>
        </UVerticalNavigation>
      </div>
    </div>
  </div>
</template>
