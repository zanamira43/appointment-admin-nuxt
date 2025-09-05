<script setup lang="ts">
const { role } = useMyUserStore();
// const items = ref([
//   [
//     {
//       label: $t("dashboard"),
//       icon: "i-heroicons-home",
//       to: "/admin",
//     },
//     {
//       label: $t("patient"),
//       icon: "healthicons:outpatient",
//       to: "/admin/patients",
//     },
//     {
//       label: $t("user"),
//       icon: "i-heroicons-users-solid",
//       to: "/admin/users",
//     },
//   ],
// ]);

const items = computed(() => {
  const baseItems = [
    {
      label: $t("dashboard"),
      icon: "i-heroicons-home",
      to: "/admin",
    },
    {
      label: $t("patient"),
      icon: "healthicons:outpatient",
      to: "/admin/patients",
    },
  ];

  // Only push the 'user' menu if the role is 'admin'
  if (role === "admin") {
    baseItems.push({
      label: $t("user"),
      icon: "i-heroicons-users-solid",
      to: "/admin/users",
    });
  }

  return [baseItems]; // Keep nested structure for UNavigationMenu
});
</script>
<template>
  <!-- Static sidebar for desktop -->
  <!-- src="https://avatars.githubusercontent.com/u/739984?v=4" -->
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col *:bg-gray-900"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4"
    >
      <div class="flex mt-8 shrink-0 justify-center items-center">
        <UAvatar src="/live-organization.jpeg" alt="Avatar" size="2xl" class="p-1" />
      </div>

      <USeparator />

      <div class="mt-10">
        <UNavigationMenu orientation="vertical" :items="items" class="text-xl">
        </UNavigationMenu>
      </div>
    </div>
  </div>
</template>
