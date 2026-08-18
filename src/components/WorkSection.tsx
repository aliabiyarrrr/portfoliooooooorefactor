import { useState, useEffect } from 'react'

import type { Project, WorkCategory, FilterCategory } from '../data/siteData'
import { PROJECTS, WORK_CATEGORIES } from '../data/siteData'

/* ─── WorkSection ─────────────────────────────────────────────────────────── */

export function WorkSection({
  initialCategory,
  onProjectOpen,
}: {
  initialCategory: WorkCategory | null
  onProjectOpen: (p: Project) => void
}) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(
    initialCategory ?? 'All'
  )
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory)
  }, [initialCategory])

  const allTabs: FilterCategory[] = ['All', ...WORK_CATEGORIES]
  const filtered = activeCategory === 'All'
    ? [...PROJECTS].sort((a, b) => b.year - a.year || PROJECTS.indexOf(b) - PROJECTS.indexOf(a))
    : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <section className="min-h-screen bg-[#0c0c0b]">

      {/* ── Page header ── */}
      <div
        className="px-8 md:px-16 pt-28 md:pt-32 pb-10 md:pb-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(14px)',
          transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div className="flex items-end justify-between border-b border-[rgba(240,237,232,0.07)] pb-8">
          <h1
            className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Projects
          </h1>
          <p className="text-[rgba(240,237,232,0.22)] text-[0.6rem] tracking-[0.22em] uppercase hidden md:block">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Category filter — text links, no pill */}
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar mt-6">
          {allTabs.map((cat, i) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 transition-colors duration-200"
                style={{
                  paddingRight: i < allTabs.length - 1 ? '28px' : 0,
                  color: isActive ? '#f0ede8' : 'rgba(240,237,232,0.32)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Editorial project index ── */}
      <div
        className="pb-32"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1) 80ms',
        }}
      >
        {filtered.map((project, i) => (
          <EditorialEntry
            key={project.id}
            project={project}
            index={i}
            showCategory={activeCategory === 'All'}
            onClick={() => onProjectOpen(project)}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── EditorialEntry ──────────────────────────────────────────────────────── */

function EditorialEntry({
  project,
  index,
  showCategory,
  onClick,
}: {
  project: Project
  index: number
  showCategory: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const categoryLabel =
    project.category === 'Cafe & Restaurants' ? 'Café & Restaurant'
    : project.category

  const isWide = index % 2 === 0
  const imgSize = isWide ? 'w=1600&h=700' : 'w=1200&h=900'

  return (
    <article
      className="relative cursor-pointer overflow-hidden"
      style={{ borderTop: '1px solid rgba(240,237,232,0.06)', marginBottom: '2px' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="w-full overflow-hidden bg-[#0f0e0d]"
        style={{ aspectRatio: isWide ? '16/7' : '4/3' }}
      >
        <img
          src={project.cover.replace('w=800&h=800', imgSize)}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1.0)',
            opacity: hovered ? 0.68 : 0.84,
            filter: 'brightness(0.78)',
            transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Centered text overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 3 }}
      >
        {showCategory && (
          <p
            className="text-[rgba(240,237,232,0.55)] text-[0.58rem] tracking-[0.28em] uppercase mb-3"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 300 }}
          >
            {categoryLabel}
          </p>
        )}
        <h2
          className="font-[Cormorant_Garamond] font-bold text-[#f0ede8] uppercase"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
            lineHeight: 1.05,
            letterSpacing: '0.06em',
            transform: hovered ? 'translateY(-2px)' : 'none',
            transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {project.title}
        </h2>
        <p
          className="text-[rgba(240,237,232,0.4)] text-[0.58rem] tracking-[0.22em] uppercase mt-3"
          style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 300 }}
        >
          {project.year}
        </p>
      </div>
    </article>
  )
}

