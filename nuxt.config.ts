const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || ''
const baseUrl = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],

  vite: {
    optimizeDeps: {
      include: ['motion'],
    },
  },

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
      const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || ''
      const title = 'Pierre-Yves | Full-Stack Developer'
      const description = 'Pierre-Yves • Guiraudet — Full-Stack Developer & Epitech Paris student. Portfolio showcasing web, systems, and game development projects.'
      const localeRedirect = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${siteUrl}/">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${siteUrl}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${siteUrl}/og-image.png">
  <link rel="canonical" href="${siteUrl}/">
  <link rel="icon" type="image/x-icon" href="${base}favicon.ico">
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
          innerHTML: `(function(){try{document.documentElement.classList.add('loading');if(localStorage.getItem('theme')==='light'){document.documentElement.classList.replace('dark','light')}var s=sessionStorage.getItem('scroll-position');if(s&&parseInt(s,10)>0){document.documentElement.classList.add('scrolled');var p=parseInt(s,10);requestAnimationFrame(function(){window.scrollTo(0,p)})}}catch(e){}})()`,
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
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
      ],
    },
  },
})
