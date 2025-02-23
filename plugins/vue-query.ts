import {VueQueryPlugin, QueryClient} from '@tanstack/vue-query'


export default  defineNuxtPlugin((nuxtApp) => {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60, // 1 hour
      },
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, {queryClient})

})