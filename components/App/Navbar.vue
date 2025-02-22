<template>
  <nav class="w-full h-auto bg-gray-800 text-zinc-200">
    <div class="flex flex-row justify-between items-center px-10 py-2">
      <div class="w-full px-2 py-2">
        <NuxtLink to="/" class="text-xl font-bold">Therapy Clinic</NuxtLink>
      </div>

      <div>
        <UButton
          icon="i-heroicons-arrow-right-on-rectangle"
          square
          variant="soft"
          class="text-white bg-orange-500 hover:bg-orange-800"
          @click="`${navigateTo('/login')}`"
          >Login</UButton
        >
      </div>
    </div>
  </nav>
</template>
