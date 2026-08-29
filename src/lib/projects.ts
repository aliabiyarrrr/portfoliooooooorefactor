import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Project, WorkCategory } from '../data/siteData'

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'n0cudkfh',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-08-19',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any, width = 1400): string {
  if (!source) return ''
  try {
    return builder.image(source).width(width).url()
  } catch {
    return ''
  }
}

const CATEGORY_MAP: Record<string, WorkCategory> = {
  fashion: 'Fashion',
  commercial: 'Commercial',
  portraits: 'Portraits',
  portrait: 'Portraits',
  'cafe & restaurants': 'Cafe & Restaurants',
  'cafe-restaurants': 'Cafe & Restaurants',
  cafe: 'Cafe & Restaurants',
  restaurant: 'Cafe & Restaurants',
  restaurants: 'Cafe & Restaurants',
  videos: 'Videos',
  video: 'Videos',
}

function normalizeCategory(raw: string | undefined): WorkCategory {
  const key = (raw || '').toLowerCase().trim()
  return CATEGORY_MAP[key] || 'Commercial'
}

interface SanityProject {
  _id: string
  title?: string
  category?: string
  coverImage?: any
  description?: string
  year?: number
  gallery?: any[]
  content?: any[]
  videos?: { asset?: { url?: string } }[]
  _createdAt?: string
}

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc){
    ...,
    videos[]{
      asset->{url}
    },
    content[]{
      ...,
      _type == "layoutVideo" => { "videoUrl": asset->url },
    }
  }`

  const data: SanityProject[] = await client.fetch(query)

  return data.map((item) => ({
    id: item._id,
    title: item.title || 'Untitled',
    year:
      item.year ||
      (item._createdAt ? new Date(item._createdAt).getFullYear() : new Date().getFullYear()),
    category: normalizeCategory(item.category),
    cover: urlFor(item.coverImage),
    description: item.description || '',
    images:
      item.gallery && item.gallery.length
        ? item.gallery.map((img) => urlFor(img))
        : [urlFor(item.coverImage)],
    content: item.content || [],
    videos: (item.videos || [])
      .map((v) => v.asset?.url)
      .filter((url): url is string => Boolean(url)),
  }))
}
