<template>
  <div
    class="min-h-screen bg-dark-bg text-text-primary font-sans antialiased transition-[background-color,color] duration-300"
    :class="{ 'skip-animations': isRestoring }"
  >
    <NavBar />
    <NuxtPage />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
const { isRestoring } = useScrollRestore()
setupScrollRestore()

useTheme()

// Save current locale to localStorage for the redirect pages (index.html, 404.html)
if (import.meta.client) {
  const { locale } = useI18n()
  localStorage.setItem('locale', locale.value)
  watch(locale, (l) => localStorage.setItem('locale', l))
}

useHead({
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
  --dark-bg: 10 10 26;
  --text-primary: 240 240 245;
  --text-secondary: 160 160 184;
}

.light {
  --orange-accent: 229 90 0;
  --orange-light: 255 138 51;
  --orange-glow: rgba(255, 107, 0, 0.15);
  --glass: rgba(0, 0, 0, 0.05);
  --glass-hover: rgba(0, 0, 0, 0.08);
  --glass-border: rgba(0, 0, 0, 0.1);
  --dark-bg: 245 245 247;
  --text-primary: 26 26 46;
  --text-secondary: 85 85 112;
}

html {
  background-color: rgb(var(--dark-bg));
}

*, *::before, *::after {
  transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease, fill 300ms ease, stroke 300ms ease;
}

body {
  overflow-x: hidden;
}

/* When restoring scroll position, skip all entrance animations */
.skip-animations .hero-fade {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}

.skip-animations .scroll-reveal {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.skip-animations nav {
  transition: none !important;
}
</style>
