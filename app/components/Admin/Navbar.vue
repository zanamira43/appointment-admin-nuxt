<script setup>
const { first_name, last_name } = useMyUserStore();

const authStore = useAuthStore();
const { toggleSidebar } = useSidebarStore();

const items = [
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
];

// get search store
const searchStore = useSearchStore();

const searchQuery = ref("");

searchQuery.value = searchStore.query;

watch(searchQuery, (newSearch) => {
  searchStore.SetSearch(newSearch);
});

const refreshingPage = ref(false);
const refreshPage = () => {
  setTimeout(() => {
    window.location.reload();
    refreshingPage.value = true;
  }, 500);

  refreshingPage.value = false;
};
</script>
<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 w-full"
  >
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 lg:hidden cursor-pointer"
      @click="toggleSidebar()"
    >
      <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Separator -->
    <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

    <div
      class="flex flex-1 justify-between items-center gap-x-4 self-stretch lg:gap-x-6 w-full"
    >
      <!-- Search Bar -->
      <UFormField class="w-[500px]">
        <UInput
          :placeholder="` ${$t('search')} ...`"
          icon="heroicons:magnifying-glass"
          iconPosition="left"
          v-model="searchQuery"
          size="lg"
        />
      </UFormField>

      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <!-- reolad page button -->
        <UButton
          icon="material-symbols:directory-sync"
          color="secondary"
          square
          variant="link"
          size="xl"
          @click="refreshPage"
          :class="`${refreshingPage ? 'animate-spin' : ''}`"
        />

        <!-- notification button icon -->
        <UButton
          icon="i-heroicons-bell-20-solid"
          color="gray"
          square
          variant="link"
          size="xl"
        />

        <!-- notification button icon -->
        <UTooltip :text="`${$t('logout')}`">
          <UButton
            icon="streamline-flex:logout-1-solid"
            color="gray"
            square
            variant="link"
            size="xl"
            @click="authStore.logout"
            :ui="{
              base: 'cursor-pointer',
            }"
          />
        </UTooltip>

        <!-- Separator -->
        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

        <!-- Profile dropdown -->

        <UDropdownMenu
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <!-- <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" /> -->
          <UAvatar class="border border-gray-200" src="/live-organization.jpeg" />

          <template #account="{ item }">
            <div class="text-left">
              <p>{{ $t("account") }}</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
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
