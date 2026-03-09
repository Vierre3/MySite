<template>
  <div
    ref="containerRef"
    :style="containerStyle"
    class="pointer-events-none absolute inset-0 rounded-[inherit]"
    :class="[blur > 0 && 'blur-[var(--blur)]', !glowActive && 'invisible']"
  >
    <div
      class="glow absolute inset-0 rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:opacity-[var(--active,0)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))] after:[-webkit-mask-clip:padding-box,border-box] after:[-webkit-mask-composite:source-in] after:[-webkit-mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
    />
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion'

const CURSOR_KEY = 'cursor-pos'

// Shared cursor: viewport-relative (clientX/clientY) is the source of truth.
// sessionStorage stores page-relative for cross-refresh persistence.
const cursor = { vx: 0, vy: 0 }

if (import.meta.client) {
  // Restore from sessionStorage (page-relative → viewport)
  // At module load, scroll is at 0. The actual conversion happens in the
  // scroll-restore watcher (onMounted), so just store raw page coords for now.
  const saved = sessionStorage.getItem(CURSOR_KEY)
  if (saved) {
    const parts = saved.split(',')
    // Store page coords temporarily — will be converted after scroll restore
    cursor.vx = Number(parts[0])
    cursor.vy = Number(parts[1])
  }

  // Track cursor position as viewport-relative, persist as page-relative
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
  }, { passive: true })
}

const props = withDefaults(defineProps<{
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  glow?: boolean
  movementDuration?: number
  borderWidth?: number
}>(), {
  blur: 0,
  inactiveZone: 0.7,
  proximity: 0,
  spread: 20,
  glow: false,
  movementDuration: 0.5,
  borderWidth: 1,
})

const containerRef = ref<HTMLDivElement>()
const glowActive = ref(false)
let animationFrameId = 0

// Only static/prop-derived values. --active, --start, --spread are managed
// by handleMove via direct DOM manipulation to avoid Vue re-renders resetting them.
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

function handleMove(e?: PointerEvent) {
  if (!containerRef.value) return

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  // Update viewport-relative cursor position from pointer event
  if (e) {
    cursor.vx = e.clientX
    cursor.vy = e.clientY
  }

  animationFrameId = requestAnimationFrame(() => {
    const element = containerRef.value
    if (!element) return

    const { left, top, width, height } = element.getBoundingClientRect()
    // Both cursor and getBoundingClientRect are viewport-relative
    const mouseX = cursor.vx
    const mouseY = cursor.vy

    const centerX = left + width * 0.5
    const centerY = top + height * 0.5
    const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY)
    const inactiveRadius = 0.5 * Math.min(width, height) * props.inactiveZone

    if (distanceFromCenter < inactiveRadius) {
      element.style.setProperty('--active', '0')
      glowActive.value = false
      return
    }

    const isNear =
      mouseX > left - props.proximity &&
      mouseX < left + width + props.proximity &&
      mouseY > top - props.proximity &&
      mouseY < top + height + props.proximity

    element.style.setProperty('--active', isNear ? '1' : '0')
    glowActive.value = isNear

    if (!isNear) return

    // Dynamic spread: closer cursor = larger illuminated area
    const distToEdgeX = Math.max(0, Math.abs(mouseX - centerX) - width * 0.5)
    const distToEdgeY = Math.max(0, Math.abs(mouseY - centerY) - height * 0.5)
    const distToEdge = Math.hypot(distToEdgeX, distToEdgeY)
    const maxDist = props.proximity
    const minSpread = props.spread * 0.2
    const maxSpread = props.spread * 3
    const t = Math.max(0, Math.min(1, 1 - distToEdge / maxDist))
    const dynamicSpread = minSpread + (maxSpread - minSpread) * t
    element.style.setProperty('--spread', String(dynamicSpread))

    // Find the closest point on the card's border to the cursor
    // This makes the glow illuminate the nearest edge, not the cursor-to-center line
    const nearestX = Math.max(left, Math.min(mouseX, left + width))
    const nearestY = Math.max(top, Math.min(mouseY, top + height))

    const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0
    let targetAngle =
      (180 * Math.atan2(nearestY - centerY, nearestX - centerX)) / Math.PI + 90

    const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180
    const newAngle = currentAngle + angleDiff

    animate(currentAngle, newAngle, {
      duration: props.movementDuration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value: number) => {
        element.style.setProperty('--start', String(value))
      },
    })
  })
}

const { isRestoring } = useScrollRestore()

onMounted(() => {
  const handlePointerMove = (e: PointerEvent) => handleMove(e)
  const handleScroll = () => handleMove()

  document.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('pointermove', handlePointerMove, { passive: true })

  // Set initial defaults for DOM-managed CSS vars
  if (containerRef.value) {
    containerRef.value.style.setProperty('--spread', String(props.spread))
    containerRef.value.style.setProperty('--start', '0')
    containerRef.value.style.setProperty('--active', '0')
  }

  // Compute initial glow: wait for scroll restore to finish so we can
  // convert the stored page-relative cursor to correct viewport coords
  if (isRestoring.value) {
    const stop = watch(isRestoring, (restoring) => {
      if (!restoring) {
        // Now scrollY is correct — convert page coords to viewport
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
    // No restore — if we loaded saved page coords at module level,
    // scroll is 0 so page coords = viewport coords (already correct)
    handleMove()
  }

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    document.removeEventListener('scroll', handleScroll)
    document.removeEventListener('pointermove', handlePointerMove)
  })
})
</script>
