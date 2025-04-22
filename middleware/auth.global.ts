export default defineNuxtRouteMiddleware(async (to, _from) => {
  
  const authStore = useAuthStore()
  
  // If this is the first navigation or page refresh
  if (import.meta.client) {
    console.log("Auth not ready, fetching user first...")
    // Wait for auth check to complete
    await authStore.fetchUser()

    if (to.path === '/login' && authStore.isLoggedIn) {
      return navigateTo('/')
    }
    // Now check login status
    if (to.path !== '/login' && !authStore.isLoggedIn) {
      console.log("Not logged in, redirecting to login")
      return navigateTo('/login')
    }

  }
  
   
})