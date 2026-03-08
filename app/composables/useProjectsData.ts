export interface Project {
  key: string
  techTags: string[]
  type: 'personal' | 'epitech' | 'hackathon' | 'jam'
  current?: boolean
  github?: string
}

export function useProjectsData(): Project[] {
  return [
    {
      key: 'Those Who Listen',
      techTags: ['Python', 'PyTorch', 'OpenVoice', 'Voice Cloning', 'Nuxt'],
      type: 'epitech',
      current: true,
    },
    {
      key: 'LoCode',
      techTags: ['Nuxt 4', 'Vue 3', 'Monaco', 'Electron', 'SSH'],
      type: 'personal',
      current: true,
    },
    {
      key: 'Glados',
      techTags: ['Haskell', 'Compiler', 'Bytecode VM'],
      type: 'epitech',
    },
    {
      key: 'R-Type',
      techTags: ['C++', 'SFML 3', 'ECS', 'Networking'],
      type: 'epitech',
    },
    {
      key: 'Zappy',
      techTags: ['C', 'C++', 'Python', 'Raylib', 'Networking'],
      type: 'epitech',
    },
    {
      key: '42sh',
      techTags: ['C', 'UNIX', 'Parsing', 'System Programming'],
      type: 'epitech',
    },
    {
      key: 'Arcade',
      techTags: ['C++', 'Plugins', 'Dynamic Loading'],
      type: 'epitech',
    },
    {
      key: 'Raytracer',
      techTags: ['C++', 'CMake', 'CUDA', '3D Graphics'],
      type: 'epitech',
    },
    {
      key: 'Cryptography',
      techTags: ['Python', 'AES', 'RSA', 'PGP'],
      type: 'epitech',
    },
    {
      key: 'Neural Network',
      techTags: ['Python', 'ML', 'Backpropagation'],
      type: 'epitech',
    },
    {
      key: 'JEB Incubator',
      techTags: ['Nuxt', 'Vue', 'Deno', 'MongoDB', 'Docker'],
      type: 'epitech',
    },
    {
      key: 'Gomoku AI',
      techTags: ['C++', 'Game AI', 'Strategy'],
      type: 'epitech',
    },
    {
      key: 'RPG',
      techTags: ['C', 'CSFML', '2D Game', 'Sprites'],
      type: 'epitech',
    },
    {
      key: 'MyMarvin',
      techTags: ['Jenkins', 'Groovy', 'Docker', 'CI/CD'],
      type: 'epitech',
    },
    {
      key: 'Vueling Hackathon',
      techTags: ['Node.js', 'Nuxt', 'AI', 'Real-time'],
      type: 'hackathon',
    },
    {
      key: 'IREP ChatBot',
      techTags: ['Python', 'Flask', 'Ollama', 'SQLite'],
      type: 'hackathon',
    },
    {
      key: 'FlameYourMind',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'Event Horizon 5min',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'Lost In Space',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'Robbers And Cat',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
  ]
}
