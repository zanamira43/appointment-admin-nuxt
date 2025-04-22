export default defineNuxtPlugin(async (nuxtApp)=> {
   // Only run on client-side
   if (import.meta.client) {
    const authStore = useAuthStore()
    
    // Initialize auth before app is fully mounted
    nuxtApp.hook('app:beforeMount', async () => {
      console.log("Initializing auth state...")
      await authStore.fetchUserOnBrowserReload()
    })
  }
})

