<template>
  <div
    ref="containerRef"
    :style="containerStyle"
    class="pointer-events-none absolute inset-0 rounded-[inherit]"
    :class="[blur > 0 && 'blur-[var(--blur)]', !glowActive && 'invisible']"
  >
    <div
      class="glow absolute inset-0 rounded-[inherit] after:content-[''] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active,0)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))] after:[-webkit-mask-clip:padding-box,border-box] after:[-webkit-mask-composite:source-in] after:[-webkit-mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
    />
  </div>
</template>

<script setup lang="ts">
import { animate } from 'motion'

const props = withDefaults(defineProps<{
  blur?: number
  inactiveZone?: number
  proximity?: number
  spread?: number
  glow?: boolean
  disabled?: boolean
  movementDuration?: number
  borderWidth?: number
}>(), {
  blur: 0,
  inactiveZone: 0.7,
  proximity: 0,
  spread: 20,
  glow: false,
  disabled: true,
  movementDuration: 0.5,
  borderWidth: 1,
})

const containerRef = ref<HTMLDivElement>()
const glowActive = ref(false)
const lastPosition = { x: 0, y: 0 }
let animationFrameId = 0

const containerStyle = computed(() => ({
  '--blur': `${props.blur}px`,
  '--spread': props.spread,
  '--start': '0',
  '--active': '0',
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

function handleMove(e?: MouseEvent | PointerEvent | { x: number; y: number }) {
  if (!containerRef.value) return

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  animationFrameId = requestAnimationFrame(() => {
    const element = containerRef.value
    if (!element) return

    const { left, top, width, height } = element.getBoundingClientRect()
    const mouseX = e?.x ?? lastPosition.x
    const mouseY = e?.y ?? lastPosition.y

    if (e) {
      lastPosition.x = mouseX
      lastPosition.y = mouseY
    }

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

    const currentAngle = parseFloat(element.style.getPropertyValue('--start')) || 0
    let targetAngle =
      (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90

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

onMounted(() => {
  if (props.disabled) return

  const handleScroll = () => handleMove()
  const handlePointerMove = (e: PointerEvent) => handleMove(e)

  window.addEventListener('scroll', handleScroll, { passive: true })
  document.body.addEventListener('pointermove', handlePointerMove, { passive: true })

  onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
    window.removeEventListener('scroll', handleScroll)
    document.body.removeEventListener('pointermove', handlePointerMove)
  })
})
</script>
