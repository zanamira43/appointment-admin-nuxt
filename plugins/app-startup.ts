export default defineNuxtPlugin(async (nuxtApp)=> {
  const authStore = useAuthStore()
   // Only run on client-side
  if (import.meta.client) {
    
    // Initialize auth before app is fully mounted
    nuxtApp.hook('app:beforeMount', async () => {
      await authStore.fetchUserOnBrowserReload()
      console.log("Initializing auth state...", authStore.isLoggedIn)
    })
  }
})

