<template>
  <div class="flex flex-row h-screen w-full">
    <DashboardSidebar />

    <div class="lg:pl-72 w-full">
      <!-- navbar -->
      <DashboardNavbar />

      <!-- admin content -->
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
