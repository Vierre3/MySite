<template>
  <section id="projects" class="py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <UiSectionTitle title-key="projects.title" />

      <!-- Filter tabs -->
      <div class="flex justify-center gap-2 mb-12 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter.value"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
          :class="activeFilter === filter.value
            ? 'bg-orange-accent text-white'
            : 'bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:border-glass-border-hover'"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiScrollReveal
          v-for="(project, index) in filteredProjects"
          :key="project.key"
          :delay="index * 80"
        >
          <ProjectCard :project="project" />
        </UiScrollReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projectsData = useProjectsData()
const activeFilter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Epitech', value: 'epitech' },
  { label: 'EIP', value: 'eip' },
  { label: 'Personal', value: 'personal' },
  { label: 'Hackathons', value: 'hackathon' },
  { label: 'Game Jams', value: 'jam' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projectsData
  return projectsData.filter(p => p.type === activeFilter.value)
})
</script>
