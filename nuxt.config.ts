import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/image'
  ],
  css: [`~/assets/css/main.css`],
  
  runtimeConfig: {  
    public: {  
      APIURL: import.meta.env.VITE_API_BASE_URL
    }
  },
  plugins: ['~/plugins/vue-query.ts',  '~/plugins/app-startup.ts'],

  ssr: false,

  // devServer: {
  //   port: 3000,
  //   https: {
  //     key: fs.readFileSync('./localhost-key.pem', 'utf-8'),
  //     cert: fs.readFileSync('./localhost.pem','utf-8'),
  //   }
  // }

  
})