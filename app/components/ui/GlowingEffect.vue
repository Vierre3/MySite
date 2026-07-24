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

// Shared cursor position (viewport-relative) and instance registry
// Module-level so all GlowingEffect instances share one set of global listeners
const cursor = { vx: 0, vy: 0 }
const instances = new Set<() => void>()

// A finger emits pointermove too, but never a pointerleave — on touch the glow
// would follow the tap and then stay lit at that spot forever. Only a real
// mouse arms the effect; until one is seen, handleMove() is a no-op.
let hasMouse = false

if (import.meta.client) {
  const saved = sessionStorage.getItem(CURSOR_KEY)
  // Only a mouse can have written this, so a restored position implies a mouse.
  if (saved) { const [x, y] = saved.split(','); cursor.vx = Number(x); cursor.vy = Number(y); hasMouse = true }

  let ticking = false
  document.addEventListener('pointermove', (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    hasMouse = true
    cursor.vx = e.clientX; cursor.vy = e.clientY
    if (!ticking) { ticking = true; requestAnimationFrame(() => { sessionStorage.setItem(CURSOR_KEY, `${cursor.vx + window.scrollX},${cursor.vy + window.scrollY}`); ticking = false }) }
    instances.forEach(fn => fn())
  }, { passive: true })
  document.addEventListener('scroll', () => instances.forEach(fn => fn()), { passive: true })
}

const props = withDefaults(defineProps<{
  blur?: number; proximity?: number; spread?: number
  glow?: boolean; movementDuration?: number; borderWidth?: number
}>(), { blur: 0, proximity: 0, spread: 20, glow: false, movementDuration: 0.5, borderWidth: 1 })

const containerRef = ref<HTMLDivElement>()
const glowActive = ref(false)
let frameId = 0
let anim: ReturnType<typeof animate> | null = null
let curX = 0, curY = 0
let skipNextAnim = false

const containerStyle = computed(() => ({
  '--blur': `${props.blur}px`,
  '--glowingeffect-border-width': `${props.borderWidth}px`,
  '--repeating-conic-gradient-times': '5',
  '--gradient': `radial-gradient(circle, rgba(255,107,0,0.8) 10%, transparent 20%),
    radial-gradient(circle at 40% 40%, rgba(255,140,50,0.6) 5%, transparent 15%),
    radial-gradient(circle at 60% 60%, rgba(200,80,0,0.7) 10%, transparent 20%),
    radial-gradient(circle at 40% 60%, rgba(255,120,30,0.6) 10%, transparent 20%),
    repeating-conic-gradient(from 236.84deg at 50% 50%,
      rgba(255,107,0,0.9) 0%, rgba(255,140,50,0.7) calc(25% / var(--repeating-conic-gradient-times)),
      rgba(200,80,0,0.8) calc(50% / var(--repeating-conic-gradient-times)),
      rgba(255,120,30,0.7) calc(75% / var(--repeating-conic-gradient-times)),
      rgba(255,107,0,0.9) calc(100% / var(--repeating-conic-gradient-times)))`,
}))

function handleMove() {
  if (!containerRef.value || !hasMouse) return
  if (frameId) cancelAnimationFrame(frameId)

  frameId = requestAnimationFrame(() => {
    const el = containerRef.value
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const mx = cursor.vx, my = cursor.vy

    // Distance from cursor to nearest border edge (works inside AND outside)
    const dx = Math.max(left - mx, 0, mx - left - width)
    const dy = Math.max(top - my, 0, my - top - height)
    const outside = Math.hypot(dx, dy)
    const inside = (dx === 0 && dy === 0) ? Math.min(mx - left, left + width - mx, my - top, top + height - my) : 0
    const dist = outside || inside
    const near = dist <= props.proximity

    el.style.setProperty('--active', near ? '1' : '0')
    glowActive.value = near
    if (!near) { if (anim) { anim.stop(); anim = null }; return }

    // Proximity factor: 1 at border, 0 at proximity edge
    const t = Math.max(0, Math.min(1, 1 - dist / props.proximity))

    // Nearest point on the card border (element-relative coords)
    let gx: number, gy: number
    const r = left + width, b = top + height

    if (mx >= left && mx <= r && my >= top && my <= b) {
      const dl = mx - left, dr = r - mx, dt = my - top, db = b - my
      const m = Math.min(dl, dr, dt, db)
      if (m === dl) { gx = 0; gy = my - top }
      else if (m === dr) { gx = width; gy = my - top }
      else if (m === dt) { gx = mx - left; gy = 0 }
      else { gx = mx - left; gy = height }
    } else {
      gx = Math.max(0, Math.min(mx - left, width))
      gy = Math.max(0, Math.min(my - top, height))
    }

    // Animate glow position for smooth movement along the border
    el.style.setProperty('--glow-radius', `${props.spread * (0.05 + 0.95 * t)}px`)
    if (anim) anim.stop()

    // On refresh/restore, snap instantly — no visible animation
    if (skipNextAnim) {
      skipNextAnim = false
      curX = gx; curY = gy
      el.style.setProperty('--glow-x', `${curX}px`); el.style.setProperty('--glow-y', `${curY}px`)
      return
    }

    const sx = curX, sy = curY
    anim = animate(0, 1, {
      duration: props.movementDuration, ease: [0.16, 1, 0.3, 1],
      onUpdate: (p: number) => {
        curX = sx + (gx - sx) * p; curY = sy + (gy - sy) * p
        el.style.setProperty('--glow-x', `${curX}px`); el.style.setProperty('--glow-y', `${curY}px`)
      },
    })
  })
}

const { isRestoring } = useScrollRestore()

onMounted(() => {
  if (containerRef.value) {
    for (const [k, v] of [['--glow-x', '0px'], ['--glow-y', '0px'], ['--glow-radius', '0px'], ['--active', '0']] as const)
      containerRef.value.style.setProperty(k, v)
  }

  // Only track pointer when card is visible in viewport
  let visible = false
  const io = new IntersectionObserver(([e]) => {
    const nowVisible = !!e?.isIntersecting
    if (nowVisible && !visible) instances.add(handleMove)
    if (!nowVisible && visible) {
      instances.delete(handleMove)
      if (frameId) { cancelAnimationFrame(frameId); frameId = 0 }
      if (anim) { anim.stop(); anim = null }
      glowActive.value = false
      containerRef.value?.style.setProperty('--active', '0')
    }
    visible = nowVisible
  }, { rootMargin: '50px' })

  const parent = containerRef.value?.closest('.relative') || containerRef.value
  if (parent) io.observe(parent)

  if (isRestoring.value) {
    const stop = watch(isRestoring, (r) => {
      if (!r) {
        const saved = sessionStorage.getItem(CURSOR_KEY)
        if (saved) { const [x, y] = saved.split(','); cursor.vx = Number(x) - window.scrollX; cursor.vy = Number(y) - window.scrollY }
        skipNextAnim = true
        requestAnimationFrame(() => handleMove())
      }
      stop()
    })
  } else { handleMove() }

  onUnmounted(() => {
    io.disconnect()
    if (frameId) cancelAnimationFrame(frameId)
    if (anim) anim.stop()
    instances.delete(handleMove)
  })
})
</script>
