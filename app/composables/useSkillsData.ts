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
      key: 'frontend',
      skills: [
        { name: 'Vue.js', icon: 'devicon:vuejs' },
        { name: 'Nuxt', icon: 'devicon:nuxt' },
        { name: 'Pinia', icon: 'mdi:store', mono: true },
        { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
        { name: 'SFML', icon: 'devicon:sfml' },
        { name: 'Raylib', icon: 'mdi:cube-outline', mono: true },
      ],
    },
    {
      key: 'backend',
      skills: [
        { name: 'FastAPI', icon: 'devicon:fastapi' },
        { name: 'Flask', icon: 'devicon:flask' },
        { name: 'Deno', icon: 'devicon:denojs' },
        { name: 'Node.js', icon: 'devicon:nodejs' },
        { name: 'REST APIs', icon: 'mdi:api', mono: true },
        { name: 'SQLAlchemy', icon: 'devicon:sqlalchemy' },
        { name: 'PostgreSQL', icon: 'devicon:postgresql' },
        { name: 'MongoDB', icon: 'devicon:mongodb' },
        { name: 'SQLite', icon: 'devicon:sqlite' },
        { name: 'InfluxDB', icon: 'devicon:influxdb' },
        { name: 'RabbitMQ', icon: 'devicon:rabbitmq' },
        { name: 'Keycloak', icon: 'mdi:shield-key-outline', mono: true },
      ],
    },
    {
      key: 'devops',
      skills: [
        { name: 'Docker', icon: 'devicon:docker' },
        { name: 'Jenkins', icon: 'devicon:jenkins' },
        { name: 'GitHub Actions', icon: 'devicon:githubactions' },
        { name: 'GitLab CI', icon: 'devicon:gitlab' },
        { name: 'Git', icon: 'devicon:git' },
        { name: 'Linux', icon: 'devicon:linux' },
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
      key: 'other',
      skills: [
        { name: 'Network', icon: 'mdi:lan', mono: true },
        { name: 'Virtualization', icon: 'mdi:server-network', mono: true },
        { name: 'Cryptography', icon: 'mdi:lock', mono: true },
        { name: 'AI / ML', icon: 'mdi:brain', mono: true },
      ],
    },
    {
      key: 'soft',
      skills: [
        { name: 'Autonomy', icon: 'mdi:account-check', mono: true },
        { name: 'Teamwork', icon: 'mdi:account-group', mono: true },
        { name: 'Communication', icon: 'mdi:message-text-outline', mono: true },
        { name: 'Flexibility', icon: 'mdi:swap-horizontal', mono: true },
        { name: 'Troubleshooting', icon: 'mdi:lightbulb-outline', mono: true },
      ],
    },
  ]
}
