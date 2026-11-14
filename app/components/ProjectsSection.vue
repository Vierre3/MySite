<template>
  <UiSection id="projects" title-key="projects.title">
    <!-- Filter tabs -->
    <div class="flex justify-center gap-2 mb-10 flex-wrap">
      <button
        v-for="filter in filters"
        :key="filter"
        class="px-4 py-2 min-w-24 rounded-lg text-sm font-medium"
        :class="activeFilter === filter
          ? 'border border-transparent bg-orange-accent text-on-accent cursor-pointer'
          : 'btn-ghost'"
        :aria-pressed="activeFilter === filter"
        @click="activeFilter = filter"
      >
        {{ $t(`projects.filters.${filter}`) }}
      </button>
    </div>

    <!-- Projects grouped by year -->
    <div v-for="(group, groupIndex) in groupedByYear" :key="`${activeFilter}-${group.year}`">
      <UiScrollReveal v-if="group.year && group.year !== latestYear">
        <div class="flex items-center gap-4 mb-6" :class="groupIndex > 0 && 'mt-12'">
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          <span class="text-text-secondary text-sm font-medium tracking-wider">{{ group.year }}</span>
          <div class="h-px flex-1 bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>
      </UiScrollReveal>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiScrollReveal
          v-for="(project, index) in group.projects"
          :key="project.key"
          :delay="index * 50"
        >
          <ProjectCard :project="project" />
        </UiScrollReveal>
      </div>
    </div>
  </UiSection>
</template>

<script setup lang="ts">
const projectsData = useProjectsData()
// Tabs group the project types shown on the cards: both schools together, and
// hackathons with game jams, so the row stays short.
const filterTypes: Record<string, string[]> = {
  school: ['epitech', 'rotterdam'],
  personal: ['personal'],
  events: ['hackathon', 'jam'],
}
const filters = ['featured', 'all', ...Object.keys(filterTypes)]
const activeFilter = ref('featured')

// The newest year gets no heading: the list simply starts with the latest work.
// Taken from the data rather than today's date so the static HTML never goes stale.
const latestYear = Math.max(...projectsData.map(p => p.year))

const filteredProjects = computed(() => {
  if (activeFilter.value === 'featured') return projectsData.filter(p => p.featured)
  if (activeFilter.value === 'all') return projectsData
  return projectsData.filter(p => filterTypes[activeFilter.value]!.includes(p.type))
})

// The featured selection is one curated grid; every other view is grouped by year.
const groupedByYear = computed(() => {
  if (activeFilter.value === 'featured') return [{ year: 0, projects: filteredProjects.value }]
  const groups = new Map<number, typeof projectsData>()
  for (const p of filteredProjects.value) groups.set(p.year, [...(groups.get(p.year) || []), p])
  return [...groups].sort(([a], [b]) => b - a).map(([year, projects]) => ({ year, projects }))
})
</script>
