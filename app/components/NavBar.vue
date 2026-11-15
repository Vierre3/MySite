<template>
  <nav
    class="fixed top-0 left-0 right-0 border-b nav-transitions"
    :class="[mobileVisible ? 'z-[70]' : 'z-50', mobileVisible && mobileOpen ? 'menu-open' : { 'menu-closing': mobileVisible }, scrolled && !mobileOpen ? 'nav-scrolled' : 'border-transparent']"
    :aria-label="$t('nav.main')"
  >
    <!-- Scroll progress bar, along the bar's bottom edge (over its border) — scaled by a CSS scroll-driven animation -->
    <div class="scroll-progress-bar absolute -bottom-px left-0 w-full h-[2px] bg-orange-accent/70 pointer-events-none" />

    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button
          class="text-lg font-bold text-text-primary cursor-pointer hover:text-orange-accent active:text-orange-accent active:scale-95 transition-[color,transform] duration-200"
          :aria-label="$t('nav.top')"
          @click="scrollToSection('hero')"
        >
          <span class="text-orange-accent">&lt;</span>PY<span class="text-orange-accent">/&gt;</span>
        </button>

        <!-- Desktop Links — screen-centered, pushed left by right side when tight -->
        <div class="hidden md:flex items-center gap-4 lg:gap-6 nav-links">
          <button
            v-for="section in sections"
            :key="section"
            class="text-sm transition-colors cursor-pointer whitespace-nowrap"
            :class="activeSection === section ? 'text-orange-accent font-medium' : 'text-text-secondary hover:text-text-primary active:text-text-primary'"
            :aria-current="activeSection === section ? 'true' : undefined"
            @click="scrollToSection(section)"
          >
            {{ $t(`nav.links.${section}`) }}
          </button>
        </div>

        <!-- Right side. No gap on mobile: the hamburger's 44px tap area already
             leaves 14px of air on each side of its 16px bars. -->
        <div class="flex items-center gap-0 md:gap-3">
          <LanguageToggle :show-text="mobileOpen && hasToggleSpace" />
          <!-- Mobile hamburger -->
          <button
            class="burger flex md:hidden w-11 h-11 -mr-2.5 text-text-secondary hover:text-text-primary active:text-text-primary active:scale-90 cursor-pointer transition-[color,transform] duration-200"
            :class="{ 'burger-open': mobileOpen }"
            :aria-label="mobileOpen ? $t('nav.closeMenu') : $t('nav.openMenu')"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-menu"
            @click="mobileOpen = !mobileOpen"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile menu: a sibling of the nav so the fixed bar doesn't clip it -->
  <div
    v-if="mobileVisible"
    id="mobile-menu"
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

      <!-- Nav background strip — animates with panel as one block -->
      <div class="absolute -top-16 -left-4 -right-4 h-16 z-[100] bg-dark-bg transition-[background-color] duration-300" />

      <!-- Inverted concave corners -->
      <div class="absolute -top-[0.18rem] -left-4 w-5 h-5 z-[100] inverted-corner" style="--x:0%" />
      <div class="absolute -top-[0.18rem] -right-4 w-5 h-5 z-[100] inverted-corner" style="--x:100%" />
      <div class="bg-dark-bg border border-glass-border border-t-0 rounded-b-2xl overflow-hidden transition-[background-color,border-color] duration-300" style="box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4), 8px 10px 20px -8px rgba(0,0,0,0.3), -8px 10px 20px -8px rgba(0,0,0,0.3)">
        <div class="p-4 space-y-1 overflow-y-auto max-h-[calc(100dvh-5rem)]">
          <button
            v-for="section in sections"
            :key="section"
            class="flex items-center gap-3 w-full text-left rounded-xl cursor-pointer px-5 py-3.5 text-lg font-medium hover:bg-glass active:bg-glass-hover active:scale-[0.98] transition-[color,background-color,transform] duration-200"
            :class="activeSection === section ? 'text-orange-accent' : 'text-text-secondary hover:text-text-primary active:text-text-primary'"
            @click="scrollToSection(section); mobileOpen = false"
          >
            <Icon :name="sectionIcons[section]!" class="w-5 h-5" />
            {{ $t(`nav.links.${section}`) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const sections = ['work', 'projects', 'skills', 'experience', 'about', 'contact']
const sectionIcons: Record<string, string> = {
  skills: 'mdi:code-tags', work: 'mdi:server-network', projects: 'mdi:folder-outline',
  experience: 'mdi:briefcase-outline', about: 'mdi:account-outline', contact: 'mdi:alternate-email',
}
const mobileOpen = ref(false)
const mobileVisible = ref(false)
const scrolled = ref(false)
const activeSection = ref('')
const { scrollToSection } = useSmoothScroll()
const hasToggleSpace = ref(true)

function checkToggleSpace() {
  hasToggleSpace.value = window.innerWidth >= 305
}

watch(mobileOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) mobileVisible.value = true
})

function onMenuAnimationEnd() {
  if (!mobileOpen.value) mobileVisible.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileOpen.value = false
}

// Which section is under the 40% viewport checkpoint ('' above the first one)
function currentSection(y: number, h: number) {
  if (y < h * 0.3) return ''
  if (y + h >= document.body.scrollHeight - 20) return sections.at(-1)!
  const check = y + h * 0.4
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i]!)
    if (el && check >= el.offsetTop) return sections[i]!
  }
  return ''
}

// Detect scrolled state and which section is active
const onScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 0
  document.documentElement.classList.toggle('scrolled', scrolled.value)
  activeSection.value = currentSection(y, window.innerHeight)
}

onMounted(() => {
  checkToggleSpace()
  window.addEventListener('resize', checkToggleSpace, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  // Run onScroll immediately to pick up current scroll position
  onScroll()
  // Also wait for scroll restore to complete for accurate active section
  const { isRestoring } = useScrollRestore()
  if (isRestoring.value) {
    const stop = watch(isRestoring, (r) => { if (!r) { onScroll(); stop() } })
  }
  onUnmounted(() => {
    window.removeEventListener('resize', checkToggleSpace)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKeydown)
  })
})
</script>

<style>
/* Mobile hamburger → cross. Three bars; on open the outer two translate to the
   centre and rotate into an X while the middle bar fades out. Bars use
   currentColor so they inherit the button's text-colour hover/active states. */
/* Display is controlled by the `flex md:hidden` utilities on the element so the
   button stays hidden on desktop; this only supplies the bar layout. */
.burger {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
.burger span {
  display: block;
  width: 16px;
  height: 1.5px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
}
.burger-open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
.burger-open span:nth-child(2) { opacity: 0; }
.burger-open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

/* Desktop links — screen-centered via absolute, flex fallback when tight */
@media (min-width: 768px) {
  .nav-links {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  /* When viewport is too narrow for absolute centering, fall back to flex */
  @media (max-width: 888px) {
    .nav-links {
      position: static;
      transform: none;
      flex: 1;
      justify-content: center;
      min-width: 0;
    }
  }
}

/* Enter animations */
.mobile-menu-enter .mobile-overlay {
  animation: overlay-in 300ms ease forwards;
}
.mobile-menu-enter .mobile-menu-panel {
  animation: panel-in 300ms ease-out forwards;
}

/* Leave animations */
.mobile-menu-leave .mobile-overlay {
  animation: overlay-out 200ms ease forwards;
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

/* Registered as <color> so the gradient can be transitioned */
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
:root {
  --nav-bg-top: rgb(var(--dark-bg));
  --nav-bg-bottom: rgb(var(--dark-bg) / 0.75);
}

nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--nav-bg-top), var(--nav-bg-bottom));
  opacity: 0;
  transition: opacity 500ms ease, backdrop-filter 500ms ease, -webkit-backdrop-filter 500ms ease, --nav-bg-top 300ms ease, --nav-bg-bottom 300ms ease;
  z-index: -1;
  pointer-events: none;
}

html.scrolled nav::before {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  opacity: 1;
}
/* Pre-hydration only: border/shadow via html.loading.scrolled; after mount Vue uses .nav-scrolled */
html.loading.scrolled nav, .nav-scrolled {
  border-color: var(--glass-border);
  box-shadow: 0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color);
}

/* Decorative: hidden where scroll-driven animations aren't supported or motion
   is reduced. Scales on the compositor instead of animating width. */
.scroll-progress-bar {
  display: none;
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    .scroll-progress-bar {
      display: block;
      transform-origin: 0 50%;
      animation: scroll-progress auto linear;
      animation-timeline: scroll(root);
    }
  }
}

@keyframes scroll-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.nav-transitions {
  transition: border-color 500ms ease, box-shadow 500ms ease;
}
.menu-open {
  transition: border-color 300ms ease, box-shadow 300ms ease;
}
.menu-closing {
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.menu-open::before,
.menu-closing::before {
  transition: --nav-bg-top 300ms ease, --nav-bg-bottom 300ms ease;
}

@property --corner-border {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}
:root {
  --corner-border: color-mix(in srgb, rgb(var(--opposite)) 10%, rgb(var(--dark-bg)));
}

.inverted-corner {
  background: radial-gradient(circle at var(--x) 100%, transparent 1rem, var(--corner-border) 1rem, var(--corner-border) calc(1rem + 1px), var(--nav-bg-top) calc(1rem + 1px));
}
</style>
