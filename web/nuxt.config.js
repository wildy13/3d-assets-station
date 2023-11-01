export default defineNuxtConfig({
  app: {
    head: {
      title: '3D Assets Station',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'true',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  devtools: { enabled: true },


  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
  ],

  colorMode: {
    preference: 'light',
  },

  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },

  auth: {
    origin: process.env.NUXT_PUBLIC_ORIGIN_URL,
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'local',
      sessionDataType: {
        id: 'string',
        name: 'string',
        email: 'string',
        role: 'string',
      },
    },
    token: {
      maxAgeInSeconds: 8 * 60 * 60,
    },
    globalAppMiddleware: true,
  },
});