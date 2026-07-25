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

// Split the categories into `numCols` contiguous columns while minimising the
// tallest column (so the columns end at roughly the same height). Contiguous =
// categories keep their data order, which is what the mobile single-column
// order relies on (columns3.flat()). Height ≈ skills + 2 for the card header.
// DP: dp[k][i] = smallest achievable max-column-height when the first i
// categories are packed into k columns; par records where the last column began.
function distribute(data: typeof skillsData, numCols: number) {
  const n = data.length
  if (n <= numCols) {
    return Array.from({ length: numCols }, (_, c) => (c < n ? [data[c]!] : [])) as (typeof skillsData)[]
  }

  const h = data.map(c => c.skills.length + 2)
  const prefix = [0]
  for (const x of h) prefix.push(prefix[prefix.length - 1]! + x)
  const seg = (a: number, b: number) => prefix[b]! - prefix[a]! // height of [a, b)

  const dp = Array.from({ length: numCols + 1 }, () => new Array(n + 1).fill(Infinity))
  const par = Array.from({ length: numCols + 1 }, () => new Array(n + 1).fill(0))
  dp[0]![0] = 0
  for (let k = 1; k <= numCols; k++) {
    for (let i = k; i <= n; i++) {
      for (let j = k - 1; j < i; j++) {
        const cost = Math.max(dp[k - 1]![j]!, seg(j, i))
        if (cost < dp[k]![i]!) { dp[k]![i] = cost; par[k]![i] = j }
      }
    }
  }

  const cols: (typeof skillsData)[] = []
  let end = n
  for (let k = numCols; k >= 1; k--) {
    const start = par[k]![end]!
    cols.unshift(data.slice(start, end))
    end = start
  }
  return cols
}

const columns2 = distribute(skillsData, 2)
const columns3 = distribute(skillsData, 3)
const mobileOrder = columns3.flat()
</script>
