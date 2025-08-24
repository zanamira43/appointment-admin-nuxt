<template>
  <div class="flex flex-row h-screen w-full">
    <AdminSidebar />

    <div class="lg:pl-72 w-full">
      <!-- navbar -->
      <AdminNavbar />

      <!-- admin content -->
      <div class="mt-10 px-5">
        <slot />
      </div>
    </div>
  </div>
</template>
