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
const { theme } = useTheme()

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
    { name: 'theme-color', content: theme.value === 'light' ? '#f5f5f7' : '#0a0a1a' },
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

.dark {
  --orange-accent: 255 107 0;
  --orange-light: 255 138 51;
  --on-accent: 25 12 0;
  --glass: rgba(255, 255, 255, 0.05);
  --glass-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --opposite: 245 245 247;
  --dark-bg: 10 10 26;
  --text-primary: 240 240 245;
  --text-secondary: 160 160 184;
  --shadow-color: rgba(120, 120, 200, 0.1);
}

/* Light accent is a deeper orange so orange text and white-on-orange buttons
   keep a 4.5:1 contrast on the pale background. The second orange (tag text,
   button hover) goes a shade darker here for the same reason; on the dark theme
   it is the original lighter, yellower orange. */
.light {
  --orange-accent: 194 72 0;
  --orange-light: 176 64 0;
  --on-accent: 255 255 255;
  --glass: rgba(0, 0, 0, 0.05);
  --glass-hover: rgba(0, 0, 0, 0.08);
  --glass-border: rgba(0, 0, 0, 0.1);
  --opposite: 10 10 26;
  --dark-bg: 245 245 247;
  --text-primary: 26 26 46;
  --text-secondary: 85 85 112;
  --shadow-color: rgba(0, 0, 0, 0.1);
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

/* Theme transition — only active during theme switch to avoid permanent GPU overhead */
html.theme-switching * {
  transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease, fill 300ms ease, stroke 300ms ease;
}
html.theme-switching .inverted-corner {
  transition: --nav-bg-top 300ms ease, --corner-border 300ms ease;
}

/* When restoring scroll position, skip all entrance animations */
.skip-animations .scroll-reveal {
  transform: none !important;
  transition: none !important;
}

.skip-animations nav,
.skip-animations nav::before {
  transition: none !important;
}

/* Pre-hydration only: don't offset revealed content before Vue mounts */
html.loading.scrolled .scroll-reveal {
  transform: none !important;
  transition: none !important;
}
</style>
