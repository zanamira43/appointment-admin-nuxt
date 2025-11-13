import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: [
   '@nuxt/ui',
   '@nuxt/icon',
   '@pinia/nuxt',
   '@vee-validate/nuxt',
   '@nuxt/image',
   '@vite-pwa/nuxt',
   '@nuxtjs/i18n',
   "@nuxtjs/google-fonts",
  ],
  css: [`~/assets/css/main.css`],
  
  runtimeConfig: {  
    public: {  
      APIURL: import.meta.env.VITE_API_BASE_URL
    }
  },
  plugins: ['~/plugins/vue-query.ts',  '~/plugins/app-startup.ts'],



  pwa: {
    registerType: 'autoUpdate',
    includeAssets: [
      // add any additional static assets you want precached
      'favicon.ico',
      'apple-touch-icon.jpeg',
      'robots.txt',
      'index.html'
    ],
    manifest: {
      "name": "RawezhkarAso",
      "short_name": "R-Aso",
      "icons": [
        {
          "src": "icons/icon-48x48.png",
          "sizes": "48x48",
          "type": "image/png"
        },
        {
          "src": "icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png"
        },
        {
          "src": "icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        },
        {
          "src": "icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        },
        {
          "src": "icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        },
        {
          "src": "icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "icons/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        },
        {
          "src": "icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png"
        },
        {
          "src": "icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#000000"
    },
    workbox: {
      // common sensible defaults; adjust to your needs
      navigateFallback: '/index.html',
      navigateFallbackAllowlist: [/^\/$/],
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,jpeg,jpg}'],
      globIgnores: ['**/.*','**/node_modules/**'],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      // runtime caching rules
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/api\.rawezhkaraso\.com\/api/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 // 1 hour
            }
          }
        }
      ]
    },
    client: {
      // show install prompt helper events and SW update events in client
      installPrompt: true
    },
    devOptions: {
      enabled: true, // enables SW in dev for local testing
      suppressWarnings: true,
      type: 'module'
    }
  },


 // i18n configuration for Kurdish language
  i18n: {
    locales: [
      {
        code: 'ckb',
        name: 'کوردی سۆرانی',
        file: 'ckb.json',
        dir: 'rtl' // Sorani Kurdish
      }
    ],
    defaultLocale: 'ckb',
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'

    },
    vueI18n: './i18n.config.ts',
  },
})