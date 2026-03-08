<template>
  <nav
    class="fixed top-0 left-0 right-0 transition-all duration-300"
    :class="[mobileOpen ? 'z-[70]' : 'z-50', scrolled ? 'backdrop-blur-xl bg-dark-bg/80 border-b border-glass-border shadow-lg' : 'border-transparent']"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button
          class="text-lg font-bold text-text-primary cursor-pointer hover:text-orange-accent hover:scale-105 active:scale-95 transition-all"
          @click="scrollToSection('hero')"
        >
          <span class="text-orange-accent">&lt;</span>PY<span class="text-orange-accent">/&gt;</span>
        </button>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="section in sections"
            :key="section"
            class="text-sm text-text-secondary hover:text-orange-accent hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
            class="md:hidden text-text-secondary hover:text-text-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6 mt-1.5" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu - Teleported outside nav to avoid clipping -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden fixed inset-0 z-[60]"
      >
        <!-- Dark overlay backdrop (click to close) -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="mobileOpen = false" />

        <!-- Menu panel -->
        <div class="relative mt-16 mx-4">
          <div class="backdrop-blur-xl bg-dark-bg/95 border border-glass-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            <div class="p-4 space-y-1">
              <button
                v-for="section in sections"
                :key="section"
                class="flex items-center gap-3 w-full text-left text-text-secondary hover:text-orange-accent hover:bg-white/5 hover:scale-[1.02] active:scale-95 rounded-xl transition-all cursor-pointer px-5 py-4 text-lg font-medium border border-transparent hover:border-orange-accent/20"
                @click="scrollToSection(section); mobileOpen = false"
              >
                <Icon :name="sectionIcons[section] ?? 'mdi:circle-outline'" class="w-5 h-5 text-orange-accent/70" />
                {{ $t(`nav.${section}`) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const sections = ['about', 'skills', 'experience', 'projects', 'contact']
const sectionIcons: Record<string, string> = {
  about: 'mdi:account-outline',
  skills: 'mdi:code-tags',
  experience: 'mdi:briefcase-outline',
  projects: 'mdi:folder-outline',
  contact: 'mdi:email-outline',
}
const mobileOpen = ref(false)

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
const scrolled = ref(false)
const { scrollToSection } = useSmoothScroll()

onMounted(() => {
  scrolled.value = window.scrollY > 75
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 75
  })
})
</script>
