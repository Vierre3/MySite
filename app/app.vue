<template>
  <div
    class="relative min-h-screen bg-dark-bg text-text-primary font-sans antialiased transition-[background-color,color] duration-300"
    :class="{ 'skip-animations': isRestoring }"
  >
    <HeroBackground />
    <NavBar />
    <NuxtPage />
    <main class="relative z-10">
      <HeroSection />
      <CaseStudySection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const { isRestoring } = useScrollRestore()
setupScrollRestore()

// Remove pre-hydration loading class now that Vue is in control
onMounted(() => document.documentElement.classList.remove('loading'))

// Save current locale to localStorage for the redirect pages (index.html, 404.html)
const { locale, t } = useI18n()

if (import.meta.client) {
  localStorage.setItem('locale', locale.value)
  watch(locale, (l) => localStorage.setItem('locale', l))
}

// lang attribute, canonical, hreflang alternates and og:locale for the current locale
const localeHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: [
    ...(localeHead.value.meta || []),
    { name: 'theme-color', content: '#f6f1e8' },
  ],
}))

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
})
</script>

<style>
@import '~/assets/css/animations.css';

/* One theme: warm paper, ink text, and two colours with separate jobs.
   Orange is brand and action (logo, buttons, active states, "In progress");
   teal carries information (tags, meta lines, company names).
   Colours are RGB triplets so Tailwind can apply opacity (tailwind.config.ts).
   Token names are historical: `dark-bg` is the page colour and `glass*` the card
   surface and its border. */
:root {
  --dark-bg: 246 241 232;
  --opposite: 24 32 48;
  --text-primary: 24 32 48;
  --text-secondary: 84 92 108;
  --glass: rgb(255 253 248);
  --glass-hover: rgb(250 246 238);
  --glass-border: rgba(24, 32, 48, 0.12);
  --shadow-color: rgba(24, 32, 48, 0.1);
  --orange-accent: 190 62 6;
  --orange-light: 168 54 4;
  --on-accent: 255 255 255;
  --teal: 12 98 104;
  /* The ribbon blends from one colour to the other across its strands */
  --ribbon-a: 205 78 14;
  --ribbon-b: 12 98 104;
}

html {
  background-color: rgb(var(--dark-bg));
  /* Kill the default grey tap-flash on mobile — press feedback comes from the
     :active states on buttons/links instead. */
  -webkit-tap-highlight-color: transparent;
  /* No scroll anchoring: when the project list changes length, the browser would
     otherwise shift the page to hold a later section still, moving the filter
     tabs away from under the pointer. */
  overflow-anchor: none;
}

body {
  overflow-x: hidden;
}

:focus-visible {
  outline: 2px solid rgb(var(--orange-accent));
  outline-offset: 2px;
}

::selection {
  background: rgb(var(--teal) / 0.28);
}

/* When restoring scroll position, skip all entrance animations */
.skip-animations .scroll-reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.skip-animations nav,
.skip-animations nav::before {
  transition: none !important;
}

/* Pre-hydration only: content restored mid-page must be visible before Vue mounts */
html.loading.scrolled .scroll-reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
</style>
