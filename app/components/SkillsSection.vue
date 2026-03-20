<template>
  <section id="skills" class="pt-24 pb-12 px-4">
    <div class="max-w-5xl mx-auto">
      <UiSectionTitle title-key="skills.title" />

      <!-- Mobile: single column, ordered by 3-col layout (col1 → col2 → col3) -->
      <div class="md:hidden space-y-6">
        <UiScrollReveal
          v-for="(category, index) in mobileOrder"
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
  const heights = data.map(c => c.skills.length + 2)
  const ideal = heights.reduce((a, b) => a + b, 0) / numCols
  const cols: (typeof skillsData)[] = []
  let i = 0
  for (let c = 0; c < numCols; c++) {
    const start = i
    let sum = 0
    while (i < data.length - (numCols - 1 - c)) {
      if (sum > 0 && sum + heights[i]! > ideal && c < numCols - 1) {
        if (sum + heights[i]! - ideal > ideal - sum) break
        i++; break
      }
      sum += heights[i++]!
    }
    cols.push(data.slice(start, Math.max(i, start + 1)))
  }
  return cols
}

const columns2 = distribute(skillsData, 2)
const columns3 = distribute(skillsData, 3)
const mobileOrder = columns3.flat()
</script>
