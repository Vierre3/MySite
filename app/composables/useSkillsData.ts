export interface Skill {
  name: string
  icon: string
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
        { name: 'Vue 3', icon: 'devicon:vuejs' },
        { name: 'Nuxt', icon: 'devicon:nuxtjs' },
        { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
        { name: 'SFML', icon: 'mdi:gamepad-variant' },
        { name: 'Raylib', icon: 'mdi:cube-outline' },
      ],
    },
    {
      key: 'backend',
      skills: [
        { name: 'Flask', icon: 'devicon:flask' },
        { name: 'Deno', icon: 'devicon:denojs' },
        { name: 'Node.js', icon: 'devicon:nodejs' },
        { name: 'MongoDB', icon: 'devicon:mongodb' },
        { name: 'REST APIs', icon: 'mdi:api' },
        { name: 'SQL', icon: 'mdi:database' },
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
        { name: 'CI/CD', icon: 'mdi:pipe' },
      ],
    },
    {
      key: 'tools',
      skills: [
        { name: 'CMake', icon: 'devicon:cmake' },
        { name: 'Makefile', icon: 'mdi:file-cog' },
        { name: 'Stack', icon: 'devicon:haskell' },
        { name: 'Electron', icon: 'devicon:electron' },
        { name: 'Arduino', icon: 'devicon:arduino' },
        { name: 'CUDA', icon: 'mdi:gpu' },
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
      key: 'other',
      skills: [
        { name: 'Networking', icon: 'mdi:lan' },
        { name: 'Cryptography', icon: 'mdi:lock' },
        { name: 'AI / ML', icon: 'mdi:brain' },
        { name: 'Game Dev', icon: 'mdi:gamepad-variant-outline' },
      ],
    },
  ]
}
