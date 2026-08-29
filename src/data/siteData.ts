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
  'https://cdn.sanity.io/images/n0cudkfh/production/c67558eff06bf1620d9151d47120cf40caf689ff-7008x4672.jpg?w=1800',
  'https://cdn.sanity.io/images/n0cudkfh/production/ffa5b0b397db6e41221ca9377b816e0e098e8bd7-8974x5048.jpg?w=1800',
  'https://cdn.sanity.io/images/n0cudkfh/production/4f42c8afdb1933dc6bf3c995a0862d27a51851a0-6490x4327.jpg?w=1800',
  'https://cdn.sanity.io/images/n0cudkfh/production/8b9ef32c6551a359ea0ab416ac39974dd0c47715-7008x4672.jpg?w=1800',
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
    cover:
      'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=800&h=800&fit=crop&auto=format',
    description:
      'A study of contrast and presence. Shot over two days in a studio in Tehran, this series explores the tension between stillness and motion in contemporary fashion.',
    images: [
      'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1731589802397-6a1088d63630?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1575354196644-9de51010f481?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'noir-study',
    title: 'Noir Study',
    year: 2024,
    category: 'Fashion',
    cover:
      'https://images.unsplash.com/photo-1575354196644-9de51010f481?w=800&h=800&fit=crop&auto=format',
    description:
      'An editorial collaboration exploring minimal silhouettes against architectural backdrops. The palette is reduced to black, white, and shadow.',
    images: [
      'https://images.unsplash.com/photo-1575354196644-9de51010f481?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1731589802956-b4693dae884b?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610765431323-d88c88a2b2c8?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'monologue',
    title: 'Monologue',
    year: 2023,
    category: 'Fashion',
    cover:
      'https://images.unsplash.com/photo-1731589802956-b4693dae884b?w=800&h=800&fit=crop&auto=format',
    description:
      'Portrait series shot in natural evening light. Each frame is a single take — no retouching, no direction beyond placement.',
    images: [
      'https://images.unsplash.com/photo-1731589802956-b4693dae884b?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1610765431323-d88c88a2b2c8?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'rosehip-campaign',
    title: 'Rosehip Campaign',
    year: 2024,
    category: 'Commercial',
    cover:
      'https://images.unsplash.com/photo-1779228900994-5b055597a0ec?w=800&h=800&fit=crop&auto=format',
    description:
      'Product campaign for a natural skincare brand. Shot on textured surfaces with directional daylight to draw out material quality.',
    images: [
      'https://images.unsplash.com/photo-1779228900994-5b055597a0ec?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1611149974482-764b0c2a211a?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770319810923-2944895fb5cb?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'studio-session',
    title: 'Studio Session',
    year: 2023,
    category: 'Commercial',
    cover:
      'https://images.unsplash.com/photo-1759308553474-ce2c768a6b7c?w=800&h=800&fit=crop&auto=format',
    description:
      'Behind the lens documentation of a full commercial shoot. A study of process as much as result.',
    images: [
      'https://images.unsplash.com/photo-1759308553474-ce2c768a6b7c?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1576280314550-773c50583407?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'night-city',
    title: 'Night City',
    year: 2024,
    category: 'Portraits',
    cover:
      'https://images.unsplash.com/photo-1722153023306-a0618a3340c6?w=800&h=800&fit=crop&auto=format',
    description:
      'A personal series walking Tehran after midnight. The city empties and something else takes its place.',
    images: [
      'https://images.unsplash.com/photo-1722153023306-a0618a3340c6?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1501396358880-2d8f6ace3fc7?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1523820193903-f8a04a20ac6f?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1685466235531-c340828b8944?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'faces',
    title: 'Faces',
    year: 2023,
    category: 'Portraits',
    cover:
      'https://images.unsplash.com/photo-1568038479111-87bf80659645?w=800&h=800&fit=crop&auto=format',
    description:
      'An ongoing portrait archive — strangers met briefly, photographed with permission. No names, no context.',
    images: [
      'https://images.unsplash.com/photo-1568038479111-87bf80659645?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1675726205553-4e348f24da2c?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770896687186-895de50a4123?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'the-hearth',
    title: 'The Hearth',
    year: 2024,
    category: 'Cafe & Restaurants',
    cover:
      'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=800&h=800&fit=crop&auto=format',
    description:
      'Interior documentation of a new restaurant in north Tehran. Warm light, brick, and the feeling of an evening settling in.',
    images: [
      'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1785766077822-be7490cf3906?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1728761390316-935ffeb3fbcc?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1685602729695-0664ea4e5c06?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'morning-shift',
    title: 'Morning Shift',
    year: 2024,
    category: 'Cafe & Restaurants',
    cover:
      'https://images.unsplash.com/photo-1583354608715-177553a4035e?w=800&h=800&fit=crop&auto=format',
    description:
      'A cafe series shot before opening hours. Tables, chairs, light through glass — the quiet before service.',
    images: [
      'https://images.unsplash.com/photo-1583354608715-177553a4035e?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1728761390316-935ffeb3fbcc?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'between-frames',
    title: 'Between Frames',
    year: 2024,
    category: 'Videos',
    cover:
      'https://images.unsplash.com/photo-1576280314550-773c50583407?w=800&h=800&fit=crop&auto=format',
    description:
      'A short film about process — the pauses, the reframes, the moments before the shot. 12 minutes, single channel.',
    images: [
      'https://images.unsplash.com/photo-1576280314550-773c50583407?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1759308553474-ce2c768a6b7c?w=1200&h=900&fit=crop&auto=format',
    ],
  },
  {
    id: 'latitude',
    title: 'Latitude',
    year: 2023,
    category: 'Videos',
    cover:
      'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=800&h=800&fit=crop&auto=format',
    description:
      'Travel documentary following a single road from coast to mountain. Shot on 16mm and digital, edited into a 28-minute film.',
    images: [
      'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1576280314550-773c50583407?w=1200&h=900&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1501396358880-2d8f6ace3fc7?w=1200&h=900&fit=crop&auto=format',
    ],
  },
]

/* ─── services data ───────────────────────────────────────────────────────── */

export const SERVICES = [
  {
    num: '01',
    title: 'Fashion Photography',
    desc: 'Editorial and lookbook work for designers, brands, and independent labels. From studio to location — built around the garment, the body, and the light.',
    image:
      'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=900&h=600&fit=crop&auto=format',
  },
  {
    num: '02',
    title: 'Commercial
