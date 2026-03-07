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
      key: 'thosewholisten',
      techTags: ['Python', 'PyTorch', 'OpenVoice', 'Voice Cloning', 'Nuxt'],
      type: 'epitech',
      current: true,
    },
    {
      key: 'locode',
      techTags: ['Nuxt 4', 'Vue 3', 'Monaco', 'Electron', 'SSH'],
      type: 'personal',
      current: true,
    },
    {
      key: 'glados',
      techTags: ['Haskell', 'Compiler', 'Bytecode VM'],
      type: 'epitech',
    },
    {
      key: 'rtype',
      techTags: ['C++', 'SFML 3', 'ECS', 'Networking'],
      type: 'epitech',
    },
    {
      key: 'zappy',
      techTags: ['C', 'C++', 'Python', 'Raylib', 'Networking'],
      type: 'epitech',
    },
    {
      key: 'shell42',
      techTags: ['C', 'UNIX', 'Parsing', 'System Programming'],
      type: 'epitech',
    },
    {
      key: 'arcade',
      techTags: ['C++', 'Plugins', 'Dynamic Loading'],
      type: 'epitech',
    },
    {
      key: 'raytracer',
      techTags: ['C++', 'CMake', 'CUDA', '3D Graphics'],
      type: 'epitech',
    },
    {
      key: 'crypto',
      techTags: ['Python', 'AES', 'RSA', 'PGP'],
      type: 'epitech',
    },
    {
      key: 'neuralnet',
      techTags: ['Python', 'ML', 'Backpropagation'],
      type: 'epitech',
    },
    {
      key: 'survivor',
      techTags: ['Nuxt', 'Vue', 'Deno', 'MongoDB', 'Docker'],
      type: 'epitech',
    },
    {
      key: 'gomoku',
      techTags: ['C++', 'Game AI', 'Strategy'],
      type: 'epitech',
    },
    {
      key: 'rpg',
      techTags: ['C', 'CSFML', '2D Game', 'Sprites'],
      type: 'epitech',
    },
    {
      key: 'marvin',
      techTags: ['Jenkins', 'Groovy', 'Docker', 'CI/CD'],
      type: 'epitech',
    },
    {
      key: 'vueling',
      techTags: ['Node.js', 'Nuxt', 'AI', 'Real-time'],
      type: 'hackathon',
    },
    {
      key: 'discoveryweek',
      techTags: ['Python', 'Flask', 'Ollama', 'SQLite'],
      type: 'hackathon',
    },
    {
      key: 'flameyourmind',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'eventhorizon',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'lostinspace',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
    {
      key: 'robbersandcat',
      techTags: ['Godot 4', 'GDScript', 'Game Design'],
      type: 'jam',
    },
  ]
}
