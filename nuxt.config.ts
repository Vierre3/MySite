const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || ''

// Defaults for the static redirect pages and for crawlers that don't run JS.
// The per-locale title/description are set in app.vue from the `seo.*` messages.
const title = 'Pierre-Yves Guiraudet – Full-Stack Developer'
const description = 'Portfolio of Pierre-Yves Guiraudet, full-stack developer and Epitech Paris student: web platforms, systems programming and games.'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/fonts.css'],

  // Static site: every icon is known at build time, so bundle the ones the code
  // references and never fetch from the Iconify API at runtime.
  icon: {
    provider: 'none',
    clientBundle: { scan: true },
  },

  // Inline the (small) render-blocking entry stylesheet into the prerendered
  // HTML so first paint isn't gated on a separate CSS round-trip.
  features: {
    inlineStyles: () => true,
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'fr', language: 'fr', file: 'fr.json', name: 'Francais' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    baseUrl: siteUrl || undefined,
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
      const outputDir = path.resolve('.output/public')
      const localeRedirect = `<!DOCTYPE html>
<html>
<head>
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
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <script>
    var l = '/en';
    try { if (localStorage.getItem('locale') === 'fr') l = '/fr'; } catch(e) {}
    window.location.replace(l);
  </script>
</head>
<body></body>
</html>`
      const rootRedirect = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>window.location.replace('/');</script>
</head>
<body></body>
</html>`
      fs.writeFileSync(path.join(outputDir, 'index.html'), localeRedirect)
      fs.writeFileSync(path.join(outputDir, '404.html'), rootRedirect)
    },
  },

  app: {
    head: {
      script: [
        {
          innerHTML: `(function(){try{var d=document.documentElement;d.classList.add('loading','js');var s=sessionStorage.getItem('scroll-position');if(s&&parseInt(s,10)>0){d.classList.add('scrolled');requestAnimationFrame(function(){window.scrollTo(0,parseInt(s,10))})}}catch(e){}})()`,
          tagPosition: 'head',
        },
        // Person structured data — tells Google this site IS Pierre-Yves
        // Guiraudet (name, role, school, and the social profiles it already
        // knows via sameAs), which is what earns ranking + a knowledge panel
        // on a name search.
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Pierre-Yves Guiraudet',
            givenName: 'Pierre-Yves',
            familyName: 'Guiraudet',
            url: siteUrl || 'https://vierre3.dev',
            image: `${siteUrl || 'https://vierre3.dev'}/images/profile.webp`,
            jobTitle: 'Full-Stack Developer',
            description,
            affiliation: { '@type': 'CollegeOrUniversity', name: 'Epitech' },
            sameAs: [
              'https://github.com/Vierre3',
              'https://www.linkedin.com/in/pierreyves-guiraudet/',
            ],
          }),
        },
      ],
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Pierre-Yves Guiraudet' },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Only the latin subset is preloaded: no page text needs latin-ext, and a
        // preload would download it regardless of unicode-range.
        { rel: 'preload', href: '/fonts/inter-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },
})
