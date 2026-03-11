<template>
  <nav
    class="fixed top-0 left-0 right-0"
    :class="['transition-[border-color,box-shadow] duration-300', mobileVisible && mobileOpen ? 'z-[70] menu-open' : mobileVisible ? 'z-[70] menu-closing' : 'z-50', scrolled && !mobileVisible ? 'border-b border-glass-border nav-scrolled' : 'border-transparent']"
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

        <!-- Desktop Links — absolutely centered on screen -->
        <div class="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
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
        <!-- Inverted concave corners -->
        <div class="absolute -top-[0.18rem] -left-4 w-5 h-5 z-[100] inverted-corner-left" />
        <div class="absolute -top-[0.18rem] -right-4 w-5 h-5 z-[100] inverted-corner-right" />
        <div class="backdrop-blur-xl bg-[var(--nav-bg-top)] border border-glass-border rounded-b-2xl shadow-2xl shadow-black/40 overflow-hidden border-t-0">
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
const activeSection = ref('')
const { scrollToSection } = useSmoothScroll()

const onScroll = () => {
  const scrollY = window.scrollY
  const windowHeight = window.innerHeight

  scrolled.value = scrollY > 1
  document.documentElement.classList.toggle('scrolled', scrolled.value)

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

/* Registered as <color> so the browser can interpolate on theme switch */
@property --nav-bg-top {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}
@property --nav-bg-bottom {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}
.dark, .light {
  --nav-bg-top: rgb(var(--dark-bg));
  --nav-bg-bottom: rgb(var(--dark-bg) / 0.75);
}

nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--nav-bg-top), var(--nav-bg-bottom));
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  opacity: 0;
  transition: opacity 500ms ease, --nav-bg-top 300ms ease, --nav-bg-bottom 300ms ease;
  z-index: -1;
  pointer-events: none;
}
html.scrolled nav::before {
  opacity: 1;
}
nav.nav-scrolled {
  box-shadow: 0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color);
}
nav.menu-open::before {
  background: var(--nav-bg-top);
  opacity: 1;
  transition: opacity 300ms ease-out, --nav-bg-top 300ms ease, --nav-bg-bottom 300ms ease;
}
nav.menu-closing::before {
  background: var(--nav-bg-top);
  transition: opacity 200ms ease-in, --nav-bg-top 300ms ease, --nav-bg-bottom 300ms ease;
}

@property --corner-border {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}
.dark, .light {
  --corner-border: color-mix(in srgb, rgb(var(--opposite)) 10%, rgb(var(--dark-bg)));
}

.inverted-corner-left,
.inverted-corner-right {
  transition: --nav-bg-top 300ms ease, --corner-border 300ms ease;
}
.inverted-corner-left {
  background: radial-gradient(circle at 0% 100%, transparent 1rem, var(--corner-border) 1rem, var(--corner-border) calc(1rem + 1px), var(--nav-bg-top) calc(1rem + 1px));
}
.inverted-corner-right {
  background: radial-gradient(circle at 100% 100%, transparent 1rem, var(--corner-border) 1rem, var(--corner-border) calc(1rem + 1px), var(--nav-bg-top) calc(1rem + 1px));
}
</style>
