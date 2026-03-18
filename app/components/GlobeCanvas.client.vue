<template>
  <canvas ref="cvs" class="absolute inset-0 w-full h-full z-[1] block pointer-events-none globe-fade-in" style="-webkit-mask-image: linear-gradient(to bottom, black 88%, transparent 100%); mask-image: linear-gradient(to bottom, black 88%, transparent 100%);" />
</template>

<script setup lang="ts">
import { landPoints } from '~/composables/useLandPoints'

const cvs = ref<HTMLCanvasElement>()
let initialized = false

watch(cvs, (canvas) => {
  if (!canvas || initialized) return
  initialized = true
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  /* ── theme color ── */
  let cr = 255, cg = 107, cb = 0

  function readColors() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--orange-accent').trim()
    const p = raw.split(/[\s,]+/)
    if (p.length >= 3) { cr = +p[0]!; cg = +p[1]!; cb = +p[2]! }
  }

  readColors()
  const obs = new MutationObserver(() => requestAnimationFrame(readColors))
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  /* ── dots from real continent coordinates ── */
  const DEG2RAD = Math.PI / 180
  const dots: { x: number; y: number; z: number; phase: number; baseSize: number }[] = []

  for (let i = 0; i < landPoints.length; i++) {
    const [lat, lng] = landPoints[i]!
    const phi = lat * DEG2RAD
    const lam = lng * DEG2RAD
    const cosPhi = Math.cos(phi)
    dots.push({
      x: cosPhi * Math.cos(lam),
      y: Math.sin(phi),
      z: -cosPhi * Math.sin(lam),
      phase: Math.random() * Math.PI * 2,
      baseSize: 0.8 + Math.random() * 0.5
    })
  }

  /* ── projection ── */
  const TILT = 0.33
  const cosTilt = Math.cos(TILT)
  const sinTilt = Math.sin(TILT)

  function project(x: number, y: number, z: number, rotY: number) {
    const cosR = Math.cos(rotY)
    const sinR = Math.sin(rotY)
    const rx = x * cosR - z * sinR
    const rz = x * sinR + z * cosR
    return { x: rx, y: y * cosTilt - rz * sinTilt, z: y * sinTilt + rz * cosTilt }
  }

  let width = 0, height = 0, cx = 0, cy = 0, radius = 0, dpr = 1, dotScale = 1
  let rafId = 0


  function resize() {
    const w = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
    const h = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
    if (!w || !h) return
    dpr = window.devicePixelRatio || 1
    width = w
    height = h
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx = width * 0.68
    cy = height * 0.52
    radius = Math.min(width, height) * 0.42
    dotScale = radius / 250
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  let time = 0

  // pause when off-screen
  let visible = true
  let skipFrame = false
  const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting }, { threshold: 0 })
  io.observe(canvas)

  /* ── grid ── */
  function drawGrid(rotation: number) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.clip()
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.1)`
    ctx.lineWidth = dotScale

    for (let i = 0; i < 16; i++) {
      const lon = (i / 16) * Math.PI * 2
      ctx.beginPath()
      let started = false
      for (let j = 0; j <= 50; j++) {
        const lat = Math.PI * (j / 50 - 0.5)
        const cosLat = Math.cos(lat)
        const p = project(cosLat * Math.cos(lon), Math.sin(lat), cosLat * Math.sin(lon), rotation)
        if (p.z < -0.02) { started = false; continue }
        const px = cx + p.x * radius
        const py = cy - p.y * radius
        if (!started) { ctx.moveTo(px, py); started = true }
        else ctx.lineTo(px, py)
      }
      ctx.stroke()
    }

    for (let i = 1; i < 12; i++) {
      const lat = Math.PI * (i / 12 - 0.5)
      const cosLat = Math.cos(lat)
      const sinLat = Math.sin(lat)
      ctx.beginPath()
      let started = false
      for (let j = 0; j <= 80; j++) {
        const lon = (j / 80) * Math.PI * 2
        const p = project(cosLat * Math.cos(lon), sinLat, cosLat * Math.sin(lon), rotation)
        if (p.z < -0.02) { started = false; continue }
        const px = cx + p.x * radius
        const py = cy - p.y * radius
        if (!started) { ctx.moveTo(px, py); started = true }
        else ctx.lineTo(px, py)
      }
      ctx.stroke()
    }

    ctx.restore()
  }

  /* ── main loop ── */
  function animate() {
    if (!width || !height) { resize(); rafId = requestAnimationFrame(animate); return }
    // skip frames when off-screen
    if (!visible) { rafId = requestAnimationFrame(animate); return }
    // 30fps: skip every other frame
    skipFrame = !skipFrame
    if (skipFrame) { rafId = requestAnimationFrame(animate); return }

    ctx.clearRect(0, 0, width, height)
    time += 0.001

    // outer glow — tight and subtle
    const glow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.15)
    glow.addColorStop(0, `rgba(${cr},${cg},${cb},0.045)`)
    glow.addColorStop(0.5, `rgba(${cr},${cg},${cb},0.015)`)
    glow.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2)
    ctx.fill()

    // sphere fill — very subtle interior shading
    const sf = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.22, 0, cx, cy, radius)
    sf.addColorStop(0, `rgba(${cr},${cg},${cb},0.05)`)
    sf.addColorStop(0.55, `rgba(${cr},${cg},${cb},0.02)`)
    sf.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = sf
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fill()

    drawGrid(time)

    // project & sort dots
    const projected = new Array(dots.length)
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i]!
      const p = project(d.x, d.y, d.z, time)
      projected[i] = { px: cx + p.x * radius, py: cy - p.y * radius, pz: p.z, phase: d.phase, baseSize: d.baseSize }
    }
    projected.sort((a: any, b: any) => a.pz - b.pz)

    // dots
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.clip()

    const t8 = time * 8
    for (let i = 0; i < projected.length; i++) {
      const d = projected[i]!
      const twinkle = 0.72 + 0.28 * Math.sin(t8 + d.phase)
      if (d.pz < 0) {
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.03 + twinkle * 0.035).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(d.px, d.py, d.baseSize * 0.65 * dotScale, 0, Math.PI * 2)
        ctx.fill()
      } else {
        const alpha = 0.28 + twinkle * 0.38
        const size = (d.baseSize + twinkle * 0.65) * dotScale
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(d.px, d.py, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.restore()

    // outline
    ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.13)`
    ctx.lineWidth = 1.1 * dotScale
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.stroke()

    rafId = requestAnimationFrame(animate)
  }

  rafId = requestAnimationFrame(animate)

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    obs.disconnect()
    ro.disconnect()
    io.disconnect()
  })
})
</script>

<style>
.globe-fade-in {
  animation: globeFadeIn 1.5s ease-in forwards;
}

@keyframes globeFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
