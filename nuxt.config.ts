const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || ''

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'fr', file: 'fr.json', name: 'Francais' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
  },

  ssr: true,
  nitro: {
    preset: 'github-pages',
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Pierre-Yves | Full-Stack Developer',
      meta: [
        { name: 'description', content: 'Pierre-Yves • Guiraudet Portfolio | Epitech Paris' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Pierre-Yves | Full-Stack Developer' },
        { property: 'og:description', content: 'Pierre-Yves • Guiraudet Portfolio | Epitech Paris' },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pierre-Yves | Full-Stack Developer' },
        { name: 'twitter:description', content: 'Pierre-Yves • Guiraudet Portfolio | Epitech Paris' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      ],
    },
  },
})
