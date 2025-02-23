// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  // ui:{
  //   global: true,
  //   primary: 'orange',
  //   gray: 'cool' 
  // },

  runtimeConfig: {  
    public: {  
      APIURL: process.env.API_URL
    }
  },
  plugins: ['~/plugins/vue-query.ts', '~/plugins/api-client.ts'],
})
