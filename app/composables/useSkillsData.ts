export interface Skill {
  name: string
  icon: string
  mono?: boolean
}

export interface SkillCategory {
  key: string
  skills: Skill[]
}

export function useSkillsData(): SkillCategory[] {
  return [
    {
      key: 'languages',
      skills: [
        { name: 'C', icon: 'devicon:c' },
        { name: 'C#', icon: 'devicon:csharp' },
        { name: 'C++', icon: 'devicon:cplusplus' },
        { name: 'Python', icon: 'devicon:python' },
        { name: 'Haskell', icon: 'devicon:haskell' },
        { name: 'TypeScript', icon: 'devicon:typescript' },
        { name: 'JavaScript', icon: 'devicon:javascript' },
        { name: 'Rust', icon: 'devicon:rust' },
        { name: 'Groovy', icon: 'devicon:groovy' },
      ],
    },
    {
      key: 'frontend',
      skills: [
        { name: 'Vue.js', icon: 'devicon:vuejs' },
        { name: 'Nuxt', icon: 'devicon:nuxt' },
        { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
        { name: 'SFML', icon: 'devicon:sfml' },
        { name: 'Raylib', icon: 'mdi:cube-outline', mono: true },
      ],
    },
    {
      key: 'creative',
      skills: [
        { name: 'Godot', icon: 'devicon:godot' },
        { name: 'Unity', icon: 'devicon:unity' },
        { name: 'Blender', icon: 'devicon:blender' },
        { name: 'Canva', icon: 'devicon:canva' },
      ],
    },
    {
      key: 'tools',
      skills: [
        { name: 'CMake', icon: 'devicon:cmake' },
        { name: 'Makefile', icon: 'mdi:file-cog', mono: true },
        { name: 'Stack', icon: 'devicon:haskell' },
        { name: 'Electron', icon: 'devicon:electron' },
        { name: 'Arduino', icon: 'devicon:arduino' },
        { name: 'CUDA', icon: 'mdi:gpu', mono: true },
      ],
    },
    {
      key: 'backend',
      skills: [
        { name: 'Flask', icon: 'devicon:flask' },
        { name: 'Deno', icon: 'devicon:denojs' },
        { name: 'Node.js', icon: 'devicon:nodejs' },
        { name: 'MongoDB', icon: 'devicon:mongodb' },
        { name: 'REST APIs', icon: 'mdi:api', mono: true },
        { name: 'SQLite', icon: 'devicon:sqlite' },
      ],
    },
    {
      key: 'other',
      skills: [
        { name: 'Networking', icon: 'mdi:lan', mono: true },
        { name: 'Game Dev', icon: 'mdi:gamepad-variant-outline', mono: true },
        { name: 'Cryptography', icon: 'mdi:lock', mono: true },
        { name: 'AI / ML', icon: 'mdi:brain', mono: true },
      ],
    },
        {
      key: 'devops',
      skills: [
        { name: 'Docker', icon: 'devicon:docker' },
        { name: 'Jenkins', icon: 'devicon:jenkins' },
        { name: 'GitHub Actions', icon: 'devicon:githubactions' },
        { name: 'Git', icon: 'devicon:git' },
        { name: 'Linux', icon: 'devicon:linux' },
        { name: 'CI/CD', icon: 'mdi:pipe', mono: true },
      ],
    },
    {
      key: 'soft',
      skills: [
        { name: 'Autonomy', icon: 'mdi:account-check', mono: true },
        { name: 'Teamwork', icon: 'mdi:account-group', mono: true },
        { name: 'Team Lead', icon: 'mdi:account-star', mono: true },
        { name: 'Adaptability', icon: 'mdi:swap-horizontal', mono: true },
        { name: 'Problem Solving', icon: 'mdi:lightbulb-outline', mono: true },
        { name: 'Communication', icon: 'mdi:message-text-outline', mono: true },
      ],
    },
  ]
}
