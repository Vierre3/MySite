<template>
  <section id="projects" class="pt-24 pb-12 px-4">
    <div class="max-w-6xl mx-auto">
      <UiSectionTitle title-key="projects.title" />

      <!-- Filter tabs -->
      <div class="flex justify-center gap-2 mb-12 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter"
          class="px-4 py-2 min-w-24 border rounded-lg text-sm font-medium cursor-pointer transition-all duration-300"
          :class="activeFilter === filter
            ? 'bg-orange-accent border-transparent text-white scale-105 hover:border-white/40 active:border-white/40'
            : 'bg-glass border-glass-border text-text-secondary hover:scale-105 hover:text-text-primary hover:border-orange-accent/40 hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] active:scale-105 active:text-text-primary active:border-orange-accent/40 active:shadow-[0_0_20px_rgba(255,107,0,0.2)]'"
          @click="toggleFilter(filter)"
        >
          {{ $t(`projects.types.${filter}`) }}
        </button>
      </div>

      <!-- Projects grouped by year -->
      <div v-for="group in groupedByYear" :key="`${activeFilter}-${group.year}`">
        <!-- Year separator (skip for current year) -->
        <UiScrollReveal v-if="group.year !== currentYear" :key="`${activeFilter}-sep-${group.year}`">
          <div class="flex items-center gap-4 mb-6 mt-12">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-glass-border to-transparent" />
            <span class="text-text-secondary text-sm font-medium tracking-wider">{{ group.year }}</span>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          </div>
        </UiScrollReveal>

        <!-- Projects grid for this year -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiScrollReveal
            v-for="(project, index) in group.projects"
            :key="`${activeFilter}-${project.key}`"
            :delay="index * 80"
          >
            <ProjectCard :project="project" />
          </UiScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projectsData = useProjectsData()
const activeFilter = ref<string | null>(null)
const currentYear = new Date().getFullYear()
const filters = ['all', 'epitech', 'personal', 'hackathon', 'jam']

function toggleFilter(filter: string) {
  activeFilter.value = activeFilter.value === filter ? null : filter
}

const filteredProjects = computed(() => {
  if (activeFilter.value === null) return projectsData.filter(p => p.featured)
  if (activeFilter.value === 'all') return projectsData
  return projectsData.filter(p => p.type === activeFilter.value)
})

const groupedByYear = computed(() => {
  const groups = new Map<number, typeof projectsData>()
  for (const p of filteredProjects.value) groups.set(p.year, [...(groups.get(p.year) || []), p])
  return [...groups].sort(([a], [b]) => b - a).map(([year, projects]) => ({ year, projects }))
})
</script>
