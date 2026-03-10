<template>
  <div
    ref="containerRef"
    :style="containerStyle"
    class="pointer-events-none absolute inset-0 rounded-[inherit]"
    :class="[blur > 0 && 'blur-[var(--blur)]', !glowActive && 'invisible']"
  >
    <div
      class="glow absolute inset-0 rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:opacity-[var(--active,0)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),radial-gradient(circle_at_var(--glow-x)_var(--glow-y),#fff,#0000_var(--glow-radius))] after:[-webkit-mask-clip:padding-box,border-box] after:[-webkit-mask-composite:source-in] after:[-webkit-mask-image:linear-gradient(#0000,#0000),radial-gradient(circle_at_var(--glow-x)_var(--glow-y),#fff,#0000_var(--glow-radius))]"
    />
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion'

const CURSOR_KEY = 'cursor-pos'

// Shared cursor position (viewport-relative) and instance registry.
// Module-level so all GlowingEffect instances share one set of global listeners.
const cursor = { vx: 0, vy: 0 }
const instances = new Set<() => void>()

if (import.meta.client) {
  const saved = sessionStorage.getItem(CURSOR_KEY)
  if (saved) {
    const parts = saved.split(',')
    cursor.vx = Number(parts[0])
    cursor.vy = Number(parts[1])
  }

  let ticking = false
  document.addEventListener('pointermove', (e: PointerEvent) => {
    cursor.vx = e.clientX
    cursor.vy = e.clientY
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      sessionStorage.setItem(CURSOR_KEY, `${cursor.vx + window.scrollX},${cursor.vy + window.scrollY}`)
      ticking = false
    })
    instances.forEach(fn => fn())
  }, { passive: true })

  document.addEventListener('scroll', () => {
    instances.forEach(fn => fn())
  }, { passive: true })
}

const props = withDefaults(defineProps<{
  blur?: number
  proximity?: number
  spread?: number
  glow?: boolean
  movementDuration?: number
  borderWidth?: number
}>(), {
  blur: 0,
  proximity: 0,
  spread: 20,
  glow: false,
  movementDuration: 0.5,
  borderWidth: 1,
})

const containerRef = ref<HTMLDivElement>()
const glowActive = ref(false)
let animationFrameId = 0
let activeAnimation: ReturnType<typeof animate> | null = null
let currentGlowX = 0
let currentGlowY = 0

const containerStyle = computed(() => ({
  '--blur': `${props.blur}px`,
  '--glowingeffect-border-width': `${props.borderWidth}px`,
  '--repeating-conic-gradient-times': '5',
  '--gradient': `radial-gradient(circle, rgba(255,107,0,0.8) 10%, transparent 20%),
    radial-gradient(circle at 40% 40%, rgba(255,140,50,0.6) 5%, transparent 15%),
    radial-gradient(circle at 60% 60%, rgba(200,80,0,0.7) 10%, transparent 20%),
    radial-gradient(circle at 40% 60%, rgba(255,120,30,0.6) 10%, transparent 20%),
    repeating-conic-gradient(
      from 236.84deg at 50% 50%,
      rgba(255,107,0,0.9) 0%,
      rgba(255,140,50,0.7) calc(25% / var(--repeating-conic-gradient-times)),
      rgba(200,80,0,0.8) calc(50% / var(--repeating-conic-gradient-times)),
      rgba(255,120,30,0.7) calc(75% / var(--repeating-conic-gradient-times)),
      rgba(255,107,0,0.9) calc(100% / var(--repeating-conic-gradient-times))
    )`,
}))

function handleMove() {
  if (!containerRef.value) return

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    const element = containerRef.value
    if (!element) return

    const { left, top, width, height } = element.getBoundingClientRect()
    const mouseX = cursor.vx
    const mouseY = cursor.vy

    // Distance from cursor to the nearest border edge (works inside AND outside)
    const dx = Math.max(left - mouseX, 0, mouseX - (left + width))
    const dy = Math.max(top - mouseY, 0, mouseY - (top + height))
    const outside = Math.hypot(dx, dy)
    const inside = (dx === 0 && dy === 0)
      ? Math.min(mouseX - left, left + width - mouseX, mouseY - top, top + height - mouseY)
      : 0
    const distToBorder = outside || inside

    const isNear = distToBorder <= props.proximity

    element.style.setProperty('--active', isNear ? '1' : '0')
    glowActive.value = isNear

    if (!isNear) {
      if (activeAnimation) { activeAnimation.stop(); activeAnimation = null }
      return
    }

    // Proximity factor: 1 at border, 0 at proximity edge
    const t = Math.max(0, Math.min(1, 1 - distToBorder / props.proximity))

    // Nearest point on the card border (element-relative coords)
    let glowX: number, glowY: number
    const r_ = left + width
    const b_ = top + height

    if (mouseX >= left && mouseX <= r_ && mouseY >= top && mouseY <= b_) {
      const dLeft = mouseX - left
      const dRight = r_ - mouseX
      const dTop = mouseY - top
      const dBottom = b_ - mouseY
      const minD = Math.min(dLeft, dRight, dTop, dBottom)
      if (minD === dLeft) { glowX = 0; glowY = mouseY - top }
      else if (minD === dRight) { glowX = width; glowY = mouseY - top }
      else if (minD === dTop) { glowX = mouseX - left; glowY = 0 }
      else { glowX = mouseX - left; glowY = height }
    } else {
      glowX = Math.max(0, Math.min(mouseX - left, width))
      glowY = Math.max(0, Math.min(mouseY - top, height))
    }

    // Radius scales purely with proximity — uniform circle, always shrinks when leaving
    const glowRadius = props.spread * (0.15 + 0.85 * t)
    element.style.setProperty('--glow-radius', `${glowRadius}px`)

    // Animate glow position for smooth movement along the border
    const startX = currentGlowX
    const startY = currentGlowY

    if (activeAnimation) activeAnimation.stop()
    activeAnimation = animate(0, 1, {
      duration: props.movementDuration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (progress: number) => {
        currentGlowX = startX + (glowX - startX) * progress
        currentGlowY = startY + (glowY - startY) * progress
        element.style.setProperty('--glow-x', `${currentGlowX}px`)
        element.style.setProperty('--glow-y', `${currentGlowY}px`)
      },
    })
  })
}

const { isRestoring } = useScrollRestore()

onMounted(() => {
  // Register this instance with the global listener
  instances.add(handleMove)

  // Set initial defaults for DOM-managed CSS vars
  if (containerRef.value) {
    containerRef.value.style.setProperty('--glow-x', '0px')
    containerRef.value.style.setProperty('--glow-y', '0px')
    containerRef.value.style.setProperty('--glow-radius', '0px')
    containerRef.value.style.setProperty('--active', '0')
  }

  if (isRestoring.value) {
    const stop = watch(isRestoring, (restoring) => {
      if (!restoring) {
        const saved = sessionStorage.getItem(CURSOR_KEY)
        if (saved) {
          const parts = saved.split(',')
          cursor.vx = Number(parts[0]) - window.scrollX
          cursor.vy = Number(parts[1]) - window.scrollY
        }
        requestAnimationFrame(() => handleMove())
      }
      stop()
    })
  } else {
    handleMove()
  }

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    if (activeAnimation) activeAnimation.stop()
    instances.delete(handleMove)
  })
})
</script>
