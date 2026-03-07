<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'backdrop-blur-xl bg-dark-bg/80 border-b border-glass-border shadow-lg' : 'border-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button
          class="text-lg font-bold text-text-primary cursor-pointer hover:text-orange-accent transition-colors"
          @click="scrollToSection('hero')"
        >
          <span class="text-orange-accent">&lt;</span>PY<span class="text-orange-accent">/&gt;</span>
        </button>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="section in sections"
            :key="section"
            class="text-sm text-text-secondary hover:text-orange-accent transition-colors cursor-pointer"
            @click="scrollToSection(section)"
          >
            {{ $t(`nav.${section}`) }}
          </button>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-3">
          <LanguageToggle />
          <!-- Mobile hamburger -->
          <button
            class="md:hidden text-text-secondary hover:text-text-primary cursor-pointer"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden backdrop-blur-xl bg-dark-bg/95 border-b border-glass-border"
      >
        <div class="px-4 py-4 space-y-3">
          <button
            v-for="section in sections"
            :key="section"
            class="block w-full text-left text-text-secondary hover:text-orange-accent transition-colors cursor-pointer py-2"
            @click="scrollToSection(section); mobileOpen = false"
          >
            {{ $t(`nav.${section}`) }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const sections = ['about', 'skills', 'experience', 'projects', 'contact']
const mobileOpen = ref(false)
const scrolled = ref(false)
const { scrollToSection } = useSmoothScroll()

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 50
  })
})
</script>
