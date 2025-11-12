export default defineNuxtRouteMiddleware(async(to, _from) => {
  const userStore = storeToRefs(useMyUserStore());

   // check for client-side navigation if user is admin or not
  if (import.meta.client) {
    
    if (userStore.role.value !== 'admin' && to.path.startsWith('/admin')) {
      return navigateTo('/admin')
    }

    return

  }
  
   
})