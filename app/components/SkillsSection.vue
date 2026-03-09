<template>
  <section id="skills" class="py-24 px-4">
    <div class="max-w-5xl mx-auto">
      <UiSectionTitle title-key="skills.title" />

      <!-- Mobile: single column -->
      <div class="md:hidden space-y-6">
        <UiScrollReveal
          v-for="(category, index) in skillsData"
          :key="category.key"
          :delay="index * 100"
        >
          <SkillCategory
            :category-key="category.key"
            :skills="category.skills"
          />
        </UiScrollReveal>
      </div>

      <!-- Tablet: 2 columns -->
      <div class="hidden md:grid lg:hidden grid-cols-2 gap-6 items-start">
        <div v-for="(col, ci) in columns2" :key="ci" class="space-y-6">
          <UiScrollReveal
            v-for="(category, index) in col"
            :key="category.key"
            :delay="(ci + index * 2) * 100"
          >
            <SkillCategory
              :category-key="category.key"
              :skills="category.skills"
            />
          </UiScrollReveal>
        </div>
      </div>

      <!-- Desktop: 3 columns -->
      <div class="hidden lg:grid grid-cols-3 gap-6 items-start">
        <div v-for="(col, ci) in columns3" :key="ci" class="space-y-6">
          <UiScrollReveal
            v-for="(category, index) in col"
            :key="category.key"
            :delay="(ci + index * 3) * 100"
          >
            <SkillCategory
              :category-key="category.key"
              :skills="category.skills"
            />
          </UiScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillsData = useSkillsData()

function distribute(data: typeof skillsData, numCols: number) {
  const cols: (typeof skillsData)[] = Array.from({ length: numCols }, () => [])
  const heights = new Array(numCols).fill(0)
  const fullRows = Math.floor(data.length / numCols)
  const splitIndex = fullRows * numCols

  // Full rows: round-robin to keep order
  for (let i = 0; i < splitIndex; i++) {
    const col = i % numCols
    cols[col]!.push(data[i]!)
    heights[col] += data[i]!.skills.length + 2
  }

  // Remaining items: find the N shortest columns, then assign left-to-right
  const remaining = data.length - splitIndex
  if (remaining > 0) {
    const colsByHeight = Array.from({ length: numCols }, (_, i) => i)
      .sort((a, b) => heights[a]! - heights[b]!)
      .slice(0, remaining)
      .sort((a, b) => a - b) // restore left-to-right order

    for (let i = 0; i < remaining; i++) {
      cols[colsByHeight[i]!]!.push(data[splitIndex + i]!)
    }
  }

  return cols
}

const columns2 = computed(() => distribute(skillsData, 2))
const columns3 = computed(() => distribute(skillsData, 3))
</script>
