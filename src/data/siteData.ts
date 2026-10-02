// Static site content: types, categories, projects, services

export type WorkCategory =
  | 'Fashion'
  | 'Commercial'
  | 'Portraits'
  | 'Cafe & Restaurants'
  | 'Videos'

export type Page =
  | 'home'
  | 'work'
  | 'project'
  | 'contact'
  | 'about'
  | 'services'

export type FilterCategory = 'All' | WorkCategory

/* ─── hero images ─────────────────────────────────────────────────────────── */

export const HERO_IMAGES = [
  '/l11.jpg',
  '/l13.jpg',
  '/l15.jpg',
  '/l16.jpg',
  '/l5.jpg',
  '/l6.jpg',
  '/l7.jpg',
  '/l8.jpg',
  '/l9.jpg',
  '/DSC01743 copy.jpg',
]

/* ─── category preview images ─────────────────────────────────────────────── */

export const CATEGORY_IMAGES: Record<WorkCategory, string> = {
  Fashion: '/1fashion.jpg',
  Commercial: '/1commercial .jpg',
  Portraits: '/1Portraits.jpg',
  'Cafe & Restaurants': '/1cafe.jpg',
  Videos: '',
}

export const WORK_CATEGORIES: WorkCategory[] = [
  'Fashion',
  'Commercial',
  'Portraits',
  'Cafe & Restaurants',
  'Videos',
]

/* ─── project data ────────────────────────────────────────────────────────── */

export interface Project {
  id: string
  title: string
  year: number
  category: WorkCategory
  cover: string
  description: string
  images: string[]
  content?: any[]
  videos?: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'red-season',
    title: 'Red Season',
    year: 2024,
    category: 'Fashion',
    cover: '/1fashion.jpg',
    description:
      'A study of contrast and presence. Shot over two days in a studio in Tehran, this series explores the tension between stillness and motion in contemporary fashion.',
    images: [
      '/1fashion.jpg',
    ],
  },
  {
    id: 'noir-study',
    title: 'Noir Study',
    year: 2024,
    category: 'Fashion',
    cover: '/1fashion.jpg',
    description:
      'An editorial collaboration exploring minimal silhouettes against architectural backdrops. The palette is reduced to black, white, and shadow.',
    images: [
      '/1fashion.jpg',
    ],
  },
  {
    id: 'monologue',
    title: 'Monologue',
    year: 2023,
    category: 'Fashion',
    cover: '/1fashion.jpg',
    description:
      'Portrait series shot in natural evening light. Each frame is a single take — no retouching, no direction beyond placement.',
    images: [
      '/1fashion.jpg',
    ],
  },
  {
    id: 'rosehip-campaign',
    title: 'Rosehip Campaign',
    year: 2024,
    category: 'Commercial',
    cover: '/1commercial .jpg',
    description:
      'Product campaign for a natural skincare brand. Shot on textured surfaces with directional daylight to draw out material quality.',
    images: [
      '/1commercial .jpg',
    ],
  },
  {
    id: 'studio-session',
    title: 'Studio Session',
    year: 2023,
    category: 'Commercial',
    cover: '/1commercial .jpg',
    description:
      'Behind the lens documentation of a full commercial shoot. A study of process as much as result.',
    images: [
      '/1commercial .jpg',
    ],
  },
  {
    id: 'night-city',
    title: 'Night City',
    year: 2024,
    category: 'Portraits',
    cover: '/1Portraits.jpg',
    description:
      'A personal series walking Tehran after midnight. The city empties and something else takes its place.',
    images: [
      '/1Portraits.jpg',
    ],
  },
  {
    id: 'faces',
    title: 'Faces',
    year: 2023,
    category: 'Portraits',
    cover: '/1Portraits.jpg',
    description:
      'An ongoing portrait archive — strangers met briefly, photographed with permission. No names, no context.',
    images: [
      '/1Portraits.jpg',
    ],
  },
  {
    id: 'the-hearth',
    title: 'The Hearth',
    year: 2024,
    category: 'Cafe & Restaurants',
    cover: '/1cafe.jpg',
    description:
      'Interior documentation of a new restaurant in north Tehran. Warm light, brick, and the feeling of an evening settling in.',
    images: [
      '/1cafe.jpg',
    ],
  },
  {
    id: 'morning-shift',
    title: 'Morning Shift',
    year: 2024,
    category: 'Cafe & Restaurants',
    cover: '/1cafe.jpg',
    description:
      'A cafe series shot before opening hours. Tables, chairs, light through glass — the quiet before service.',
    images: [
      '/1cafe.jpg',
    ],
  },
  {
    id: 'between-frames',
    title: 'Between Frames',
    year: 2024,
    category: 'Videos',
    cover: '/DSC01743 copy.jpg',
    description:
      'A short film about process — the pauses, the reframes, the moments before the shot. 12 minutes, single channel.',
    images: [
      '/DSC01743 copy.jpg',
    ],
  },
  {
    id: 'latitude',
    title: 'Latitude',
    year: 2023,
    category: 'Videos',
    cover: '/DSC01743 copy.jpg',
    description:
      'Travel documentary following a single road from coast to mountain. Shot on 16mm and digital, edited into a 28-minute film.',
    images: [
      '/DSC01743 copy.jpg',
    ],
  },
]

/* ─── services data ───────────────────────────────────────────────────────── */

export const SERVICES = [
  {
    num: '01',
    title: 'Fashion Photography',
    desc: 'Editorial and lookbook work for designers, brands, and independent labels. From studio to location — built around the garment, the body, and the light.',
    image: '/1fashion.jpg',
  },
  {
    num: '02',
    title: 'Commercial Photography',
    desc: 'Campaign and product imagery for brands that take visual identity seriously. Precise, considered, and made to last longer than a single season.',
    image: '/1commercial .jpg',
  },
  {
    num: '03',
    title: 'Food & Hospitality',
    desc: 'Interior, atmosphere, and cuisine documentation for restaurants, cafés, and hospitality spaces. Honest light, real texture, no artifice.',
    image: '/1cafe.jpg',
  },
  {
    num: '04',
    title: 'Creative Direction',
    desc: 'Concept development and visual strategy for campaigns, shoots, and brand identities. Available as a collaborator or lead creative on selected projects.',
    image: '/1Portraits.jpg',
  },
  {
    num: '05',
    title: 'Content Production',
    desc: 'Short-form film, behind-the-scenes documentation, and motion content. Single-channel and multi-format delivery for digital and print.',
    image: '/DSC01743 copy.jpg',
  },
]

/* ─── contact form options ────────────────────────────────────────────────── */

export const PROJECT_TYPES = [
  'Fashion Photography',
  'Commercial Photography',
  'Food & Hospitality',
  'Personal Project',
  'Creative Direction',
  'Content Production',
  'Other',
]
