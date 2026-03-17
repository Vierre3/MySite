<template>
  <div
    class="min-h-screen bg-dark-bg text-text-primary font-sans antialiased transition-[background-color,color] duration-300"
    :class="{ 'skip-animations': isRestoring }"
  >
    <HeroBackground />
    <NavBar />
    <NuxtPage />
    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const { isRestoring } = useScrollRestore()
setupScrollRestore()
useTheme()

// Remove pre-hydration loading class now that Vue is in control
onMounted(() => document.documentElement.classList.remove('loading'))

// Save current locale to localStorage for the redirect pages (index.html, 404.html)
const { locale } = useI18n()

if (import.meta.client) {
  localStorage.setItem('locale', locale.value)
  watch(locale, (l) => localStorage.setItem('locale', l))
}

const siteUrl = useRuntimeConfig().public.siteUrl as string
const canonicalUrl = computed(() => `${siteUrl}/${locale.value}`)

useHead({
  htmlAttrs: { lang: locale },
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'theme-color', content: computed(() => useTheme().theme.value === 'light' ? '#f5f5f7' : '#0a0a1a') },
  ],
})
</script>

<style>
@import '~/assets/css/animations.css';

.dark {
  --orange-accent: 255 107 0;
  --orange-light: 255 138 51;
  --orange-glow: rgba(255, 107, 0, 0.3);
  --glass: rgba(255, 255, 255, 0.05);
  --glass-hover: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.1);
  --opposite: 255 255 255;
  --dark-bg: 10 10 26;
  --text-primary: 240 240 245;
  --text-secondary: 160 160 184;
  --shadow-color: rgba(120, 120, 200, 0.1);
}

.light {
  --orange-accent: 229 90 0;
  --orange-light: 255 138 51;
  --orange-glow: rgba(255, 107, 0, 0.15);
  --glass: rgba(0, 0, 0, 0.05);
  --glass-hover: rgba(0, 0, 0, 0.08);
  --glass-border: rgba(0, 0, 0, 0.1);
  --opposite: 0 0 0;
  --dark-bg: 245 245 247;
  --text-primary: 26 26 46;
  --text-secondary: 85 85 112;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

html {
  background-color: rgb(var(--dark-bg));
}

/* Theme transition — excludes pseudo-elements (glow effect, decorative borders) */
* {
  transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease, fill 300ms ease, stroke 300ms ease;
}
canvas, .globe-wrap, .globe-wrap * {
  transition: none !important;
}

body {
  overflow-x: hidden;
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

/* Pre-hydration only: prevent scroll-reveal opacity:0 flash before Vue mounts */
html.loading.scrolled .scroll-reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}
</style>
