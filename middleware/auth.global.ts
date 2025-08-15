export default defineNuxtRouteMiddleware(async(to, _from) => {
  const authStore = storeToRefs(useAuthStore());

  // If this is the first navigation or page refresh
  if (import.meta.client) {
    console.log(authStore.isLoggedIn)
    
    if (authStore.isLoggedIn && to.path !== '/') {
       return
    }

    // Now check login status
    if (!authStore.isLoggedIn && to.path !== '/') {
      console.log("Not logged in, redirecting to login")
      return await navigateTo('/')
    }

    return

  }
  
   
})