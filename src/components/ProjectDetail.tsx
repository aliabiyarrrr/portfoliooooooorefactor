import { useState, useEffect } from 'react'

import type { Project } from '../data/siteData'
import { PROJECTS } from '../data/siteData'
import { Reveal } from './Reveal'

/* ─── ProjectDetail ───────────────────────────────────────────────────────── */

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
  }, [])

  const idx = PROJECTS.indexOf(project)
  const nextProject = PROJECTS[(idx + 1) % PROJECTS.length]

  const clientLabel =
    project.category === 'Commercial' ? 'Confidential client'
    : project.category === 'Fashion' ? 'Personal / Fashion'
    : project.category === 'Portraits' ? 'Personal / Portrait'
    : project.category === 'Cafe & Restaurants' ? 'Café & Restaurant'
    : 'Personal / Video'

  /* Split remaining images into layout slots */
  const imgs = project.images  /* images[0] = cover / hero */
  const extra = imgs.slice(1)  /* everything after the hero */

  return (
    <article className="min-h-screen bg-[#0c0c0b]">

      {/* ── 1. Project header ──────────────────────────────────────────── */}
      <header
        className="px-8 md:px-16 pt-32 pb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(14px)',
          transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-14 text-[rgba(240,237,232,0.28)] hover:text-[rgba(240,237,232,0.65)] transition-colors duration-300"
          style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          <span style={{ fontSize: '0.7rem' }}>←</span> All projects
        </button>

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div>
            <p className="text-[rgba(240,237,232,0.3)] text-[0.6rem] tracking-[0.22em] uppercase mb-4">
              {project.category}&ensp;/&ensp;{project.year}
            </p>
            <h1
              className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
            >
              {project.title}
            </h1>
          </div>

          {/* Meta sidebar — desktop only */}
          <div className="hidden md:flex flex-col gap-5 pb-1 min-w-[160px]">
            {[
              { label: 'Client', value: clientLabel },
              { label: 'Year', value: String(project.year) },
              { label: 'Medium', value: project.category === 'Videos' ? 'Film & Digital' : 'Photography' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-1">{m.label}</p>
                <p className="text-[rgba(240,237,232,0.7)] text-[0.75rem] font-light">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 max-w-xl">
          <p className="text-[rgba(240,237,232,0.55)] text-sm leading-[1.9] font-light">
            {project.description}
          </p>
        </div>
      </header>

      {/* Hairline rule */}
      <div className="mx-8 md:mx-16 h-px bg-[rgba(240,237,232,0.06)] mb-0" />

      {/* ── 2. Hero image — full-bleed cinematic ──────────────────────── */}
      <Reveal y={0}>
        <div
          className="w-full overflow-hidden bg-[#0f0e0d] mt-0"
          style={{ height: 'clamp(420px, 72vh, 860px)' }}
        >
          <img
            src={imgs[0].replace('w=1200&h=900', 'w=1920&h=1080')}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.86)' }}
          />
        </div>
      </Reveal>

      {/* ── 3. Image body — editorial compositions ─────────────────────── */}
      <div className="mt-2 flex flex-col gap-2">

        {/* Slot A: if ≥1 extra image — large inset portrait with caption space */}
        {extra[0] && (
          <Reveal delay={60}>
            <div className="px-8 md:px-16 py-12 md:py-16 grid md:grid-cols-[2fr_1fr] gap-6 items-start">
              <div className="overflow-hidden bg-[#0f0e0d]" style={{ aspectRatio: '4/3' }}>
                <img
                  src={extra[0].replace('w=1200&h=900', 'w=1400&h=1050')}
                  alt={`${project.title} — 2`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.85)' }}
                />
              </div>
              <div className="hidden md:flex flex-col justify-end h-full pb-2">
                <div
                  className="h-px mb-6"
                  style={{ background: 'rgba(240,237,232,0.06)' }}
                />
                <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-2">
                  {project.category}
                </p>
                <p className="font-[Cormorant_Garamond] font-bold text-[rgba(240,237,232,0.55)] italic"
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', lineHeight: 1.5, letterSpacing: '-0.01em' }}
                >
                  {project.title}
                </p>
                <p className="text-[rgba(240,237,232,0.2)] text-[0.6rem] tracking-[0.22em] uppercase mt-4">
                  {project.year}
                </p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Slot B: if ≥2 extra images — full-width image */}
        {extra[1] && (
          <Reveal delay={40}>
            <div className="overflow-hidden bg-[#0f0e0d] aspect-[4/3] md:aspect-[16/7]">
              <img
                src={extra[1].replace('w=1200&h=900', 'w=1920&h=840')}
                alt={`${project.title} — 3`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.84)' }}
              />
            </div>
          </Reveal>
        )}

        {/* Slot C: if ≥3 extra — two-image asymmetric row */}
        {extra[2] && (
          <Reveal delay={60}>
            <div className="px-8 md:px-16 py-12 md:py-16">
              <div className="grid md:grid-cols-[3fr_2fr] gap-4 items-start">
                {/* Left: landscape */}
                <div className="overflow-hidden bg-[#0f0e0d]" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={extra[2].replace('w=1200&h=900', 'w=1200&h=900')}
                    alt={`${project.title} — 4`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.85)' }}
                  />
                </div>
                {/* Right: portrait offset down */}
                {extra[3] && (
                  <div
                    className="overflow-hidden bg-[#0f0e0d] md:mt-12"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img
                      src={extra[3].replace('w=1200&h=900', 'w=900&h=1200')}
                      alt={`${project.title} — 5`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.85)' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Remaining images — alternating single-inset layouts */}
        {extra.slice(4).map((src, i) => {
          const isOdd = i % 2 === 0
          return (
            <Reveal key={i} delay={50}>
              <div
                className={`px-8 md:px-16 py-10 ${isOdd ? 'md:pr-[28%]' : 'md:pl-[28%]'}`}
              >
                <div className="overflow-hidden bg-[#0f0e0d]" style={{ aspectRatio: '3/2' }}>
                  <img
                    src={src}
                    alt={`${project.title} — ${i + 6}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.85)' }}
                  />
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* ── 4. Next project ────────────────────────────────────────────── */}
      <Reveal y={16} delay={80}>
        <div
          className="mt-2 border-t border-[rgba(240,237,232,0.06)]"
        >
          <button
            onClick={() => { onOpenProject(nextProject); window.scrollTo({ top: 0 }) }}
            className="w-full group relative overflow-hidden"
          >
            {/* Background preview image */}
            <div
              className="absolute inset-0 bg-[#0a0909] overflow-hidden"
              style={{ opacity: 0.38 }}
            >
              <img
                src={nextProject.cover.replace('w=800&h=800', 'w=1920&h=600')}
                alt=""
                aria-hidden
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.6) saturate(0.7)',
                  transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(10,9,9,0.88) 0%, rgba(10,9,9,0.55) 100%)' }}
            />

            {/* Content */}
            <div className="relative px-8 md:px-16 py-20 flex items-end justify-between">
              <div className="text-left">
                <p className="text-[rgba(240,237,232,0.3)] text-[0.6rem] tracking-[0.22em] uppercase mb-4">
                  Next project
                </p>
                <h2
                  className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    lineHeight: 1.1,
                    transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  {nextProject.title}
                </h2>
                <p className="text-[rgba(240,237,232,0.3)] text-[0.6rem] tracking-[0.2em] uppercase mt-3">
                  {nextProject.category}&ensp;·&ensp;{nextProject.year}
                </p>
              </div>
              <span
                className="text-[rgba(240,237,232,0.38)] text-[0.6rem] tracking-[0.22em] uppercase group-hover:text-[rgba(240,237,232,0.75)] group-hover:translate-x-1 transition-all duration-300"
              >
                Open →
              </span>
            </div>
          </button>
        </div>
      </Reveal>

    </article>
  )
}

