<template>
  <!-- Decorative: a slowly twisting ribbon of fine light strands. It lives inside
       the page backdrop (HeroBackground), so it winds across the whole page and
       drifts with the backdrop's parallax. -->
  <canvas ref="canvas" class="ribbon" aria-hidden="true" />
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

const STRANDS = 90
const SEGMENT = 16 // px between points along a strand

onMounted(() => {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  let width = 0
  let height = 0
  let frame = 0
  let screen = 0

  // The curve is laid out in screen heights. Measure the large viewport (lvh),
  // which stays put while a mobile browser's toolbar collapses and returns;
  // window.innerHeight changes with it and would reshape the ribbon mid-scroll.
  const probe = document.createElement('div')
  probe.style.cssText = 'position:absolute;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none'
  document.body.appendChild(probe)

  function draw(ms: number) {
    const t = ms / 1000
    const root = document.documentElement
    const styles = getComputedStyle(root)
    const triplet = (name: string) => styles.getPropertyValue(name).trim().split(/\s+/).map(Number)
    // Strands blend from one colour to the other across the ribbon
    const from = triplet('--ribbon-a')
    const to = triplet('--ribbon-b')

    ctx!.clearRect(0, 0, width, height)
    ctx!.lineWidth = 1

    for (let i = 0; i < STRANDS; i++) {
      const u = i / (STRANDS - 1) - 0.5 // position across the ribbon, -0.5..0.5
      ctx!.beginPath()
      for (let y = 0; y <= height; y += SEGMENT) {
        const v = y / screen // position along the ribbon, in screen heights
        // The centre line wanders across the full width as it goes down the
        // page: right of the hero text, through the middle, over to the left and
        // back. The ribbon widens and narrows once per screen and twists along
        // its length, so strands cross where the twist passes through zero.
        const centre = width * (0.5 + 0.28 * Math.cos((v - 0.45) * 2.6) + 0.04 * Math.sin(v * 3.4 + t * 0.12))
        const spread = Math.min(width, 900) * (0.05 + 0.2 * Math.sin(v * Math.PI) ** 2)
        const twist = Math.cos(v * 4.6 - t * 0.3 + u * 2.4)
        const x = centre + u * spread * 2 * twist + Math.sin(v * 13 + i * 1.3 + t * 0.5) * 2.5
        if (y === 0) ctx!.moveTo(x, y)
        else ctx!.lineTo(x, y)
      }
      // Fine strands need a fair amount of ink on a pale page; strongest in the middle
      const alpha = 0.17 + 0.34 * (1 - Math.abs(u) * 2)
      const mix = i / (STRANDS - 1)
      const rgb = from.map((channel, c) => Math.round(channel + (to[c]! - channel) * mix))
      ctx!.strokeStyle = `rgba(${rgb},${alpha})`
      ctx!.stroke()
    }

    if (!reduceMotion) frame = requestAnimationFrame(draw)
  }

  function restart() {
    cancelAnimationFrame(frame)
    draw(performance.now())
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 1.5)
    width = el!.clientWidth
    height = el!.clientHeight
    screen = probe.offsetHeight || window.innerHeight
    el!.width = width * dpr
    el!.height = height * dpr
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    restart()
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el)

  onUnmounted(() => {
    cancelAnimationFrame(frame)
    ro.disconnect()
    probe.remove()
  })
})
</script>

<style>
/* Fades in after the first frame is drawn, so it doesn't pop onto the page */
.ribbon {
  animation: ribbonIn 1.8s ease-out 0.15s both;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 9%, #000 92%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 9%, #000 92%, transparent);
}

@media (min-width: 1024px) {
  .ribbon {
    opacity: 0.85;
  }
}

@keyframes ribbonIn {
  from { opacity: 0; }
}
</style>
