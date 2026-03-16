<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { role, first_name, last_name } = useMyUserStore();
const authStore = useAuthStore();

const sidebarStore = useSidebarStore();

const { isOpen } = storeToRefs(sidebarStore);

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

    {
      label: $t("time_table"),
      icon: "healthicons:calendar",
      to: "/admin/time-tables",
    },
    {
      label: $t("two_month_plan"),
      icon: "material-symbols:planner-review",
      to: "/admin/two-month-plan",
    },
    {
      label: $t("setting"),
      icon: "material-symbols:settings",
      to: "/admin/settings",
    },
  ];

  // Only push the 'user' menu if the role is 'admin'
  if (role === "admin") {
    baseItems.splice(1, 0, {
      label: $t("user"),
      icon: "i-heroicons-users-solid",
      to: "/admin/users",
    });

    // only push the 'notebook' menu if the role is 'admin'
    baseItems.splice(1, 0, {
      label: $t("note_book"),
      icon: "mdi:notebook",
      to: "/admin/notebooks",
    });
  }

  return [baseItems]; // Keep nested structure for UNavigationMenu
});

const profileItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: first_name + " " + last_name,
      slot: $t("account"),
      disabled: true,
    },
  ],
  [
    {
      label: $t("profile"),
      icon: "i-heroicons-user-circle",
      to: "/admin/profile",
    },
  ],

  [
    {
      label: $t("logout"),
      icon: "i-heroicons-arrow-left-on-rectangle",
      onSelect() {
        authStore.logout();
      },
    },
  ],
]);
</script>
<template>
  <!-- Static sidebar for desktop -->
  <!-- src="https://avatars.githubusercontent.com/u/739984?v=4" -->
  <div
    :class="`${
      isOpen ? 'fixed inset-y-0 z-50 overflow-y-auto w-72 h-screen flex' : 'hidden'
    } lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col *:bg-gray-900`"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 relative"
    >
      <UButton
        variant="link"
        class="w-full text-white right-62 top-1 absolute lg:hidden"
        @click="sidebarStore.toggleSidebar()"
        size="xl"
        icon="material-symbols-light:cancel-outline-rounded"
      ></UButton>
      <div class="flex mt-8 shrink-0 justify-center items-center">
        <UAvatar src="/live-organization.jpeg" alt="Avatar" size="2xl" class="p-1" />
      </div>

      <USeparator />

      <div class="mt-10">
        <UNavigationMenu orientation="vertical" :items="items" class="text-xl">
        </UNavigationMenu>
      </div>


      <div class="md:hidden flex flex-col justify-end items-center h-full">
          <!-- Profile dropdown -->
          <UDropdownMenu
            :items="profileItems"
            class="md:hidden flex"
            :content="{
              align: 'center',
              side: 'top',
              sideOffset: 8
            }"
            :ui="{
              content: 'w-60'
            }"
          >
            <UButton 
              :avatar="{
                src: '/live-organization.jpeg',
                loading: 'lazy'
              }"

              :ui="{
                leadingAvatarSize: 'lg',
                leadingAvatar: 'border border-slate-300'
              }"
              
              class="w-full p-2 bg-white text-black hover:bg-mauve-300 border border-mauve-800" 
              
            >
             {{ $t('profile') }}
            </UButton>

            <template #account="{ item }">
              <div class="text-left">
                <p>{{ $t("account") }}</p>
                <p class="truncate font-medium text-gray-900 dark:text-white">
                  {{ item }}
                </p>
              </div>
            </template>

            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>

              <UIcon
                :name="item.icon"
                class="shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
              />
            </template>
          </UDropdownMenu>
      </div>
    </div>
  </div>
</template>
