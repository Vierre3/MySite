<template>
  <canvas
    ref="canvas"
    class="block touch-none cursor-grab active:cursor-grabbing will-change-transform"
    :width="cSize"
    :height="cSize"
    :style="{ width: size + 'px', height: size + 'px' }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
  />
</template>

<script setup lang="ts">
import { landPoints } from '~/composables/useLandPoints'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 400 })

const canvas = ref<HTMLCanvasElement>()

// Cap DPR at 1.5 — dots don't need full retina, saves 44% pixels vs 2x
const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
const cSize = computed(() => Math.round(props.size * dpr))

// --- Cached accent color (never read getComputedStyle during animation) ---
let cr = 255, cg = 107, cb = 0

function readAccentColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--orange-accent').trim()
  const p = raw.split(' ')
  if (p.length === 3) { cr = +p[0]!; cg = +p[1]!; cb = +p[2]! }
}

let themeTimer = 0
const obs = new MutationObserver(() => {
  cancelAnimationFrame(animId)
  animId = 0
  clearTimeout(themeTimer)
  themeTimer = window.setTimeout(() => {
    readAccentColor()
    draw()
    animId = requestAnimationFrame(animate)
  }, 350)
})
obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
readAccentColor()

// --- Rotation ---
let rx = 0.3, ry = 0
let dragging = false, lpx = 0, lpy = 0, vx = 0, vy = 0, animId = 0

// --- Points as flat Float32Array ---
const n = landPoints.length
const pts = new Float32Array(n * 3)
for (let i = 0; i < n; i++) {
  const lat = landPoints[i]![0], lng = landPoints[i]![1]
  const phi = (90 - lat) * 0.017453292519943295 // Math.PI / 180
  const sp = Math.sin(phi)
  pts[i * 3] = sp * Math.cos((lng + 180) * 0.017453292519943295)
  pts[i * 3 + 1] = Math.cos(phi)
  pts[i * 3 + 2] = sp * Math.sin((lng + 180) * 0.017453292519943295)
}

// --- Grid as flat Float32Array (fewer steps: 30 instead of 60) ---
const GRID_STEPS = 30
const gridLines: Float32Array[] = []
for (let lng = 0; lng < 360; lng += 30) {
  const a = new Float32Array((GRID_STEPS + 1) * 3)
  const t = lng * 0.017453292519943295
  const ct = Math.cos(t), st = Math.sin(t)
  for (let i = 0; i <= GRID_STEPS; i++) {
    const phi = (i / GRID_STEPS) * Math.PI
    const sp = Math.sin(phi)
    a[i * 3] = sp * ct; a[i * 3 + 1] = Math.cos(phi); a[i * 3 + 2] = sp * st
  }
  gridLines.push(a)
}
for (let lat = -60; lat <= 60; lat += 30) {
  const a = new Float32Array((GRID_STEPS + 1) * 3)
  const phi = (90 - lat) * 0.017453292519943295
  const sp = Math.sin(phi), cp = Math.cos(phi)
  for (let i = 0; i <= GRID_STEPS; i++) {
    const t = (i / GRID_STEPS) * 6.283185307179586 // Math.PI * 2
    a[i * 3] = sp * Math.cos(t); a[i * 3 + 1] = cp; a[i * 3 + 2] = sp * Math.sin(t)
  }
  gridLines.push(a)
}

// --- Pre-allocated screen buffers (avoid GC pressure from bucket arrays) ---
const screenX = new Float32Array(n)
const screenY = new Float32Array(n)
const screenZ = new Float32Array(n) // depth for alpha bucketing

let ctx: CanvasRenderingContext2D | null = null

function draw() {
  const cvs = canvas.value
  if (!cvs) return
  if (!ctx) ctx = cvs.getContext('2d', { alpha: true })
  if (!ctx) return

  const w = cvs.width, h = cvs.height
  const cx = w >> 1, cy = h >> 1
  const rad = w * 0.42

  ctx.clearRect(0, 0, w, h)

  // Trig once per frame
  const cRY = Math.cos(ry), sRY = Math.sin(ry)
  const cRX = Math.cos(rx), sRX = Math.sin(rx)

  // Glow
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 1.3)
  glow.addColorStop(0, `rgba(${cr},${cg},${cb},.1)`)
  glow.addColorStop(0.5, `rgba(${cr},${cg},${cb},.04)`)
  glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(cx, cy, rad * 1.3, 0, 6.283185307179586)
  ctx.fill()

  // Grid
  const gridColor = `rgba(${cr},${cg},${cb},.25)`
  ctx.lineWidth = 0.6 * dpr
  ctx.strokeStyle = gridColor
  for (let li = 0; li < gridLines.length; li++) {
    const a = gridLines[li]!
    const len = a.length / 3
    ctx.beginPath()
    let on = false
    for (let i = 0; i < len; i++) {
      const j = i * 3
      const x1 = a[j]! * cRY - a[j + 2]! * sRY
      const z1 = a[j]! * sRY + a[j + 2]! * cRY
      const yr = a[j + 1]! * cRX - z1 * sRX
      const zr = a[j + 1]! * sRX + z1 * cRX
      if (zr < 0) { on = false; continue }
      const sx = cx + x1 * rad, sy = cy - yr * rad
      if (!on) { ctx.moveTo(sx, sy); on = true } else ctx.lineTo(sx, sy)
    }
    ctx.stroke()
  }

  // Transform all points + cull backface in one pass
  let visible = 0
  for (let i = 0; i < n; i++) {
    const j = i * 3
    const x1 = pts[j]! * cRY - pts[j + 2]! * sRY
    const z1 = pts[j]! * sRY + pts[j + 2]! * cRY
    const zr = pts[j + 1]! * sRX + z1 * cRX
    if (zr < -0.05) continue
    screenX[visible] = cx + x1 * rad
    screenY[visible] = cy - (pts[j + 1]! * cRX - z1 * sRX) * rad
    screenZ[visible] = zr
    visible++
  }

  // Draw dots — 3 alpha buckets (fewer state changes)
  const ds = Math.max(1.2, w / 500)
  const dd = ds * 2
  const fill = `rgb(${cr},${cg},${cb})`
  ctx.fillStyle = fill

  // Bucket 0: far edge (z < 0.3)
  ctx.globalAlpha = 0.2
  for (let i = 0; i < visible; i++) {
    if (screenZ[i]! >= 0.3) continue
    ctx.fillRect(screenX[i]! - ds, screenY[i]! - ds, dd, dd)
  }
  // Bucket 1: mid (0.3 <= z < 0.7)
  ctx.globalAlpha = 0.5
  for (let i = 0; i < visible; i++) {
    if (screenZ[i]! < 0.3 || screenZ[i]! >= 0.7) continue
    ctx.fillRect(screenX[i]! - ds, screenY[i]! - ds, dd, dd)
  }
  // Bucket 2: front (z >= 0.7)
  ctx.globalAlpha = 0.8
  for (let i = 0; i < visible; i++) {
    if (screenZ[i]! < 0.7) continue
    ctx.fillRect(screenX[i]! - ds, screenY[i]! - ds, dd, dd)
  }
  ctx.globalAlpha = 1

  // Outline
  ctx.beginPath()
  ctx.arc(cx, cy, rad, 0, 6.283185307179586)
  ctx.strokeStyle = `rgba(${cr},${cg},${cb},.3)`
  ctx.lineWidth = 1 * dpr
  ctx.stroke()
}

function animate() {
  if (!dragging) {
    if (vy > 0.0001 || vy < -0.0001) { ry += vy; vy *= 0.95 }
    else ry += 0.002
    if (vx > 0.0001 || vx < -0.0001) {
      rx += vx; vx *= 0.95
      if (rx > 1.2) rx = 1.2; else if (rx < -1.2) rx = -1.2
    }
  }
  draw()
  animId = requestAnimationFrame(animate)
}

function onPointerDown(e: PointerEvent) {
  dragging = true; lpx = e.clientX; lpy = e.clientY; vx = vy = 0
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging) return
  vy = -(e.clientX - lpx) * 0.005; vx = (e.clientY - lpy) * 0.005
  ry += vy; rx += vx
  if (rx > 1.2) rx = 1.2; else if (rx < -1.2) rx = -1.2
  lpx = e.clientX; lpy = e.clientY
}
function onPointerUp() { dragging = false }

onMounted(() => { animId = requestAnimationFrame(animate) })
onUnmounted(() => { cancelAnimationFrame(animId); obs.disconnect() })
</script>
