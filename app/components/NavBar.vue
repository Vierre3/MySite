<template>
  <nav
    class="fixed top-0 left-0 right-0"
    :class="[navTransition ? 'transition-[border-color,box-shadow] duration-300' : '', mobileVisible ? 'z-[70]' : 'z-50', scrolled ? 'nav-scrolled backdrop-blur-xl border-b border-glass-border shadow-lg' : 'border-transparent']"
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
        <div class="hidden md:flex items-center gap-6">
          <template v-for="(section, index) in sections" :key="section">
            <span v-if="index > 0" class="text-orange-accent text-glass-border select-none">|</span>
            <button
              class="text-sm transition-all cursor-pointer"
              :class="activeSection === section ? 'text-orange-accent font-medium scale-110' : 'text-text-secondary hover:text-text-primary hover:scale-105 focus:text-text-primary focus:scale-105'"
              @click="scrollToSection(section)"
            >
              {{ $t(`nav.${section}`) }}
            </button>
          </template>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-3">
          <ThemeToggle :show-text="mobileOpen" />
          <LanguageToggle :show-text="mobileOpen" />
          <!-- Mobile hamburger -->
          <button
            class="md:hidden w-6 h-6 text-text-secondary hover:text-text-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :name="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu - Teleported outside nav to avoid clipping -->
  <Teleport to="body">
    <div
      v-if="mobileVisible"
      class="md:hidden fixed inset-0 z-[60]"
      :class="mobileOpen ? 'mobile-menu-enter' : 'mobile-menu-leave'"
      @animationend="onMenuAnimationEnd"
    >
      <!-- Dark overlay backdrop (click to close) -->
      <div
        class="absolute inset-0 mobile-overlay"
        @click="mobileOpen = false"
      />

      <!-- Menu panel -->
      <div class="relative mt-16 mx-4 mobile-menu-panel">
        <div class="backdrop-blur-xl bg-dark-bg border border-glass-border rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
          <div class="p-4 space-y-1">
            <button
              v-for="section in sections"
              :key="section"
              class="flex items-center gap-3 w-full text-left group hover:bg-white/5 hover:scale-[1.02] active:scale-95 rounded-xl transition-all cursor-pointer px-5 py-4 text-lg font-medium border border-transparent hover:border-orange-accent/40"
              :class="activeSection === section ? 'text-orange-accent' : 'text-text-secondary hover:text-text-primary'"
              @click="scrollToSection(section); mobileOpen = false"
            >
              <Icon
                :name="sectionIcons[section]!"
                class="w-5 h-5"
                :class="activeSection === section ? 'text-orange-accent' : 'text-text-secondary group-hover:text-text-primary'"
              />
              {{ $t(`nav.${section}`) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const sections = ['about', 'skills', 'experience', 'projects', 'contact']
const sectionIcons: Record<string, string> = {
  about: 'mdi:account-outline',
  skills: 'mdi:code-tags',
  experience: 'mdi:briefcase-outline',
  projects: 'mdi:folder-outline',
  contact: 'mdi:alternate-email',
}
const mobileOpen = ref(false)

const mobileVisible = ref(false)

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) mobileVisible.value = true
})

function onMenuAnimationEnd() {
  if (!mobileOpen.value) mobileVisible.value = false
}
const scrolled = ref(false)
const navTransition = ref(false)
const activeSection = ref('')
const { scrollToSection } = useSmoothScroll()

const onScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  scrolled.value = scrollY > 75

  if (scrollY < windowHeight * 0.3) {
    activeSection.value = ''
    return
  }

  if (scrollY + windowHeight >= document.body.scrollHeight - 20) {
    activeSection.value = sections[sections.length - 1]!
    return
  }

  const checkPoint = scrollY + windowHeight * 0.4
  let active = ''

  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i]!)
    if (!el) continue
    if (checkPoint >= el.offsetTop) {
      active = sections[i]!
      break
    }
  }
  activeSection.value = active
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  const savedY = parseInt(sessionStorage.getItem('scroll-position') || '0', 10)
  scrolled.value = savedY > 75
  navTransition.value = true

  // Detect active section after scroll restore completes
  const { isRestoring } = useScrollRestore()
  if (isRestoring.value) {
    const stop = watch(isRestoring, (restoring) => {
      if (!restoring) {
        onScroll()
        stop()
      }
    })
  } else {
    nextTick(onScroll)
  }

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<style>
/* Enter animations */
.mobile-menu-enter .mobile-overlay {
  animation: overlay-in 300ms ease-out forwards;
}
.mobile-menu-enter .mobile-menu-panel {
  animation: panel-in 300ms ease-out forwards;
}

/* Leave animations */
.mobile-menu-leave .mobile-overlay {
  animation: overlay-out 200ms ease-in forwards;
}
.mobile-menu-leave .mobile-menu-panel {
  animation: panel-out 200ms ease-in forwards;
}

@keyframes overlay-in {
  from { background-color: rgba(0,0,0,0); backdrop-filter: blur(0px); }
  to { background-color: rgba(0,0,0,0.25); backdrop-filter: blur(4px); }
}
@keyframes overlay-out {
  from { background-color: rgba(0,0,0,0.25); backdrop-filter: blur(4px); }
  to { background-color: rgba(0,0,0,0); backdrop-filter: blur(0px); }
}

@keyframes panel-in {
  from { opacity: 0; transform: translateY(-10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes panel-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(-10px) scale(0.97); }
}

/* Navbar gradient background — uses pseudo-element so opacity can transition */
nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgb(var(--dark-bg)), rgb(var(--dark-bg) / 0.75));
  opacity: 0;
  transition: opacity 300ms ease;
  z-index: -1;
  pointer-events: none;
}
nav.nav-scrolled::before {
  opacity: 1;
}
</style>
