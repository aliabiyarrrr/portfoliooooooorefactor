import { useState, useEffect } from 'react'

import type { Project } from '../data/siteData'
import { Reveal } from './Reveal'

export function ProjectDetail({
  project,
  onBack,
  onOpenProject,
}: {
  project: Project
  onBack: () => void
  onOpenProject: (p: Project) => void
}) {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(t)
  }, [project.id])

  const clientLabel =
    project.category === 'Commercial' ? 'Confidential client'
    : project.category === 'Fashion' ? 'Personal / Fashion'
    : project.category === 'Portraits' ? 'Personal / Portrait'
    : project.category === 'Cafe & Restaurants' ? 'Café & Restaurant'
    : 'Personal / Video'

  const imgs = project.images.length > 0
    ? project.images
    : [project.cover]

  return (
    <article className="min-h-screen bg-[#0c0c0b]">

      <header
        className="px-8 md:px-16 pt-32 pb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(14px)',
          transition: 'opacity 700ms ease, transform 700ms ease',
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-14 text-[rgba(240,237,232,0.28)] hover:text-[rgba(240,237,232,0.65)] transition-colors"
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <span>←</span> All projects
        </button>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <p className="text-[rgba(240,237,232,0.3)] text-[0.6rem] tracking-[0.22em] uppercase mb-4">
              {project.category} / {project.year}
            </p>

            <h1
              className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                lineHeight: 1.08,
              }}
            >
              {project.title}
            </h1>
          </div>

          <div className="hidden md:flex flex-col gap-5 pb-1 min-w-[160px]">
            <div>
              <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-1">
                Client
              </p>
              <p className="text-[rgba(240,237,232,0.7)] text-[0.75rem]">
                {clientLabel}
              </p>
            </div>

            <div>
              <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-1">
                Year
              </p>
              <p className="text-[rgba(240,237,232,0.7)] text-[0.75rem]">
                {project.year}
              </p>
            </div>

            <div>
              <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-1">
                Medium
              </p>
              <p className="text-[rgba(240,237,232,0.7)] text-[0.75rem]">
                {project.category === 'Videos'
                  ? 'Film & Digital'
                  : 'Photography'}
              </p>
            </div>
          </div>
        </div>

        {project.description && (
          <div className="mt-10 max-w-xl">
            <p className="text-[rgba(240,237,232,0.55)] text-sm leading-[1.9] font-light">
              {project.description}
            </p>
          </div>
        )}
      </header>

      <div className="mx-8 md:mx-16 h-px bg-[rgba(240,237,232,0.06)]" />

      <Reveal y={0}>
        <div
          className="w-full overflow-hidden bg-[#0f0e0d]"
          style={{ height: 'clamp(420px, 72vh, 860px)' }}
        >
          <img
            src={imgs[0]}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.86)' }}
          />
        </div>
      </Reveal>

      <div className="mt-2 flex flex-col gap-2">
        {imgs.slice(1).map((src, i) => (
          <Reveal key={i} delay={50}>
            <div className="px-8 md:px-16 py-10 md:py-16">
              <div
                className="overflow-hidden bg-[#0f0e0d]"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={src}
                  alt={`${project.title} — ${i + 2}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-2 border-t border-[rgba(240,237,232,0.06)]">
        <button
          onClick={onBack}
          className="w-full px-8 md:px-16 py-20 text-left"
        >
          <p className="text-[rgba(240,237,232,0.3)] text-[0.6rem] tracking-[0.22em] uppercase mb-4">
            Back
          </p>

          <h2
            className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            }}
          >
            All Projects →
          </h2>
        </button>
      </div>

    </article>
  )
}
