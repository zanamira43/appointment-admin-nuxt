// middleware/auth.ts
export default defineNuxtRouteMiddleware(() => {
  if (process.client && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(reg => reg.unregister());
    });
  }
})