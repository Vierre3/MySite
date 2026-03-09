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

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'fr', file: 'fr.json', name: 'Francais' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix',
    detectBrowserLanguage: false,
  },

  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/en', '/fr'],
      crawlLinks: false,
    },
  },

  hooks: {
    'nitro:build:public-assets'() {
      const fs = require('node:fs')
      const path = require('node:path')
      const base = process.env.NUXT_APP_BASE_URL || '/'
      const outputDir = path.resolve('.output/public')
      const localeRedirect = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    var l = 'en';
    try { if (localStorage.getItem('locale') === 'fr') l = 'fr'; } catch(e) {}
    window.location.replace('${base}' + l);
  </script>
</head>
<body></body>
</html>`
      const rootRedirect = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>window.location.replace('${base}');</script>
</head>
<body></body>
</html>`
      fs.writeFileSync(path.join(outputDir, 'index.html'), localeRedirect)
      fs.writeFileSync(path.join(outputDir, '404.html'), rootRedirect)
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { class: 'dark' },
      script: [
        {
          innerHTML: `(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.replace('dark','light')}var s=sessionStorage.getItem('scroll-position');if(s&&parseInt(s,10)>0){document.documentElement.classList.add('scrolled')}}catch(e){}})()`,
          tagPosition: 'head',
        },
      ],
      title: 'Pierre-Yves | Full-Stack Developer',
      meta: [
        { name: 'description', content: 'Pierre-Yves • Guiraudet — Full-Stack Developer & Epitech Paris student. Portfolio showcasing web, systems, and game development projects.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:title', content: 'Pierre-Yves | Full-Stack Developer' },
        { property: 'og:description', content: 'Pierre-Yves • Guiraudet — Full-Stack Developer & Epitech Paris student. Portfolio showcasing web, systems, and game development projects.' },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pierre-Yves | Full-Stack Developer' },
        { name: 'twitter:description', content: 'Pierre-Yves • Guiraudet — Full-Stack Developer & Epitech Paris student. Portfolio showcasing web, systems, and game development projects.' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      ],
    },
  },
})
