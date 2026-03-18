<template>
  <div
    ref="container"
    class="block touch-none cursor-grab active:cursor-grabbing will-change-transform"
    :style="{ width: size + 'px', height: size + 'px' }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
  />
</template>

<script setup lang="ts">
import {
  WebGLRenderer, Scene, OrthographicCamera, Group,
  Points, BufferGeometry, Float32BufferAttribute, ShaderMaterial,
  LineSegments, LineLoop, Color,
} from 'three'
import { landPoints } from '~/composables/useLandPoints'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 400 })
const container = ref<HTMLDivElement>()

// --- Accent color ---
let accentR = 255, accentG = 107, accentB = 0

function readAccentColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--orange-accent').trim()
  const p = raw.split(' ')
  if (p.length === 3) { accentR = +p[0]!; accentG = +p[1]!; accentB = +p[2]! }
}

const obs = new MutationObserver(() => requestAnimationFrame(readAccentColor))
obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
readAccentColor()

// --- Rotation state ---
let rx = 0.3, ry = 0
let dragging = false, lpx = 0, lpy = 0, vx = 0, vy = 0
let disposed = false
let rendererRef: any = null

// === Mount ===
onMounted(async () => {
  await nextTick()
  const el = container.value
  if (!el) return

  try {
    const accentColor = new Color(accentR / 255, accentG / 255, accentB / 255)

    // Update color ref on theme change
    const origRead = readAccentColor
    readAccentColor = function () {
      origRead()
      accentColor.setRGB(accentR / 255, accentG / 255, accentB / 255)
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const px = Math.round(props.size * dpr)

    const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    renderer.setSize(props.size, props.size)
    renderer.setPixelRatio(dpr)
    el.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    rendererRef = renderer

    const scene = new Scene()
    const f = 1.2
    const cam = new OrthographicCamera(-f, f, f, -f, 0.1, 10)
    cam.position.z = 5

    const globe = new Group()
    scene.add(globe)

    // --- Points ---
    const n = landPoints.length
    const posArr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const lat = landPoints[i]![0], lng = landPoints[i]![1]
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      const sp = Math.sin(phi)
      posArr[i * 3] = sp * Math.cos(theta)
      posArr[i * 3 + 1] = Math.cos(phi)
      posArr[i * 3 + 2] = sp * Math.sin(theta)
    }
    const ptsGeo = new BufferGeometry()
    ptsGeo.setAttribute('position', new Float32BufferAttribute(posArr, 3))
    const ptsMat = new ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uColor: { value: accentColor }, uSize: { value: Math.max(1.5, px / 400) } },
      vertexShader: `
        uniform float uSize;
        varying float vDepth;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vDepth = world.z;
          gl_Position = projectionMatrix * viewMatrix * world;
          gl_PointSize = uSize;
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vDepth;
        void main() {
          if (vDepth < -0.05) discard;
          float alpha = smoothstep(-0.05, 0.7, vDepth) * 0.8;
          gl_FragColor = vec4(uColor, alpha);
        }`,
    })
    globe.add(new Points(ptsGeo, ptsMat))

    // --- Grid ---
    const segs: number[] = []
    const S = 30
    for (let lng = 0; lng < 360; lng += 30) {
      const t = lng * (Math.PI / 180), ct = Math.cos(t), st = Math.sin(t)
      for (let i = 0; i < S; i++) {
        for (const j of [i, i + 1]) {
          const phi = (j / S) * Math.PI, sp = Math.sin(phi)
          segs.push(sp * ct, Math.cos(phi), sp * st)
        }
      }
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (90 - lat) * (Math.PI / 180), sp = Math.sin(phi), cp = Math.cos(phi)
      for (let i = 0; i < S; i++) {
        for (const j of [i, i + 1]) {
          const t = (j / S) * Math.PI * 2
          segs.push(sp * Math.cos(t), cp, sp * Math.sin(t))
        }
      }
    }
    const gridGeo = new BufferGeometry()
    gridGeo.setAttribute('position', new Float32BufferAttribute(new Float32Array(segs), 3))
    const gridMat = new ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uColor: { value: accentColor } },
      vertexShader: `
        varying float vDepth;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vDepth = world.z;
          gl_Position = projectionMatrix * viewMatrix * world;
        }`,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vDepth;
        void main() {
          if (vDepth < 0.0) discard;
          gl_FragColor = vec4(uColor, 0.25);
        }`,
    })
    globe.add(new LineSegments(gridGeo, gridMat))

    // --- Outline ---
    const ON = 64, oPos = new Float32Array(ON * 3)
    for (let i = 0; i < ON; i++) {
      const a = (i / ON) * Math.PI * 2
      oPos[i * 3] = Math.cos(a); oPos[i * 3 + 1] = Math.sin(a); oPos[i * 3 + 2] = 0
    }
    const outGeo = new BufferGeometry()
    outGeo.setAttribute('position', new Float32BufferAttribute(oPos, 3))
    const outMat = new ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uColor: { value: accentColor } },
      vertexShader: `void main() { gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 uColor; void main() { gl_FragColor = vec4(uColor, 0.3); }`,
    })
    globe.add(new LineLoop(outGeo, outMat))

    // --- Animation loop ---
    renderer.setAnimationLoop(() => {
      if (disposed) return
      if (!dragging) {
        if (vy > 0.0001 || vy < -0.0001) { ry -= vy; vy *= 0.95 }
        else ry += 0.002
        if (vx > 0.0001 || vx < -0.0001) {
          rx -= vx; vx *= 0.95
          if (rx > 1.2) rx = 1.2; else if (rx < -1.2) rx = -1.2
        }
      }
      globe.rotation.x = rx
      globe.rotation.y = ry
      renderer.render(scene, cam)
    })

  } catch (e: any) {
    console.error('GlobeCanvas error:', e)
  }
})

// === Interaction ===
function onPointerDown(e: PointerEvent) {
  dragging = true; lpx = e.clientX; lpy = e.clientY; vx = vy = 0
  ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
}
function onPointerMove(e: PointerEvent) {
  if (!dragging) return
  vy = (e.clientX - lpx) * 0.005; vx = (e.clientY - lpy) * 0.005
  ry += vy; rx += vx
  if (rx > 1.2) rx = 1.2; else if (rx < -1.2) rx = -1.2
  lpx = e.clientX; lpy = e.clientY
}
function onPointerUp() { dragging = false }

onUnmounted(() => {
  disposed = true
  obs.disconnect()
  if (rendererRef) {
    rendererRef.setAnimationLoop(null)
    rendererRef.dispose()
    rendererRef.domElement.remove()
    rendererRef = null
  }
})
</script>
