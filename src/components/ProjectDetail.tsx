import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'

import type { Project } from '../data/siteData'
import { urlFor } from '../lib/projects'
import { Reveal } from './Reveal'

/* ─── Image Row ─────────────────────────────────────────────────────────── */

function ImageRow({ value }: { value: any }) {
  const images = value?.images || []

  const [ratios, setRatios] = useState<number[]>(
    images.map(() => 1)
  )

  useEffect(() => {
    setRatios(images.map(() => 1))
  }, [images.length])

  if (images.length === 0) {
    return null
  }

  const updateRatio = (index: number, img: HTMLImageElement) => {
    if (!img.naturalWidth || !img.naturalHeight) return

    const ratio = img.naturalWidth / img.naturalHeight

    setRatios((current) => {
      const next = [...current]
      next[index] = ratio
      return next
    })
  }

  return (
    <div className="px-8 md:px-16 py-2 md:py-4">
      <div
        className="flex w-full items-start"
        style={{
          gap: '8px',
        }}
      >
        {images.map((img: any, i: number) => {
          const ratio = ratios[i] || 1

          return (
            <figure
              key={i}
              style={{
                margin: 0,
                minWidth: 0,
                flex: `${ratio} 1 0`,
              }}
            >
              <img
                src={urlFor(img, 1800)}
                alt={img.caption || ''}
                loading="lazy"
                onLoad={(e) =>
                  updateRatio(
                    i,
                    e.currentTarget
                  )
                }
                className="w-full h-auto"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
              />

              {img.caption && (
                <figcaption className="text-[rgba(240,237,232,0.35)] text-[0.6rem] tracking-[0.14em] uppercase mt-2 text-center">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Portable Text renderers ────────────────────────────────────────────── */

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="px-8 md:px-16 text-[rgba(240,237,232,0.55)] text-sm leading-[1.9] font-light max-w-2xl mb-8">
        {children}
      </p>
    ),

    h3: ({ children }: any) => (
      <h3
        className="px-8 md:px-16 font-[Cormorant_Garamond] font-bold text-[#f0ede8] mb-6 mt-4"
        style={{
          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
        }}
      >
        {children}
      </h3>
    ),
  },

  types: {
    /* ── Single image ─────────────────────────────────────────────────── */

    layoutImage: ({ value }: any) => {
      const widthPct =
        value?.width &&
        value.width >= 20 &&
        value.width <= 100
          ? value.width
          : 100

      return (
        <div className="px-8 md:px-16 py-2 md:py-4 flex justify-center">
          <div
            style={{
              width: `${widthPct}%`,
              maxWidth: '100%',
            }}
          >
            <img
              src={urlFor(value, 1800)}
              alt={value.caption || ''}
              loading="lazy"
              className="w-full h-auto"
              style={{
                display: 'block',
                maxHeight: '78vh',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />

            {value.caption && (
              <p className="text-[rgba(240,237,232,0.35)] text-[0.62rem] tracking-[0.14em] uppercase mt-3 text-center">
                {value.caption}
              </p>
            )}
          </div>
        </div>
      )
    },

    /* ── Image row ────────────────────────────────────────────────────── */

    imageRow: ({ value }: any) => (
      <ImageRow value={value} />
    ),

    /* ── Video ─────────────────────────────────────────────────────────── */

    layoutVideo: ({ value }: any) => {
      if (!value?.videoUrl) return null

      return (
        <div className="px-8 md:px-16 py-2 md:py-4 flex justify-center">
          <div
            style={{
              width: '100%',
              maxWidth: '1400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <video
              src={value.videoUrl}
              controls
              playsInline
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '1400px',
                maxHeight: '84vh',
                height: 'auto',
                objectFit: 'contain',
                background: '#0f0e0d',
              }}
            />

            {value.caption && (
              <p className="text-[rgba(240,237,232,0.35)] text-[0.62rem] tracking-[0.14em] uppercase mt-3 text-center">
                {value.caption}
              </p>
            )}
          </div>
        </div>
      )
    },
  },
}

/* ─── ProjectDetail ─────────────────────────────────────────────────────── */

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
    project.category === 'Commercial'
      ? 'Confidential client'
      : project.category === 'Fashion'
        ? 'Personal / Fashion'
        : project.category === 'Portraits'
          ? 'Personal / Portrait'
          : project.category === 'Cafe & Restaurants'
            ? 'Café & Restaurant'
            : 'Personal / Video'

  const hasCustomContent =
    Array.isArray(project.content) &&
    project.content.length > 0

  const imgs =
    project.images.length > 0
      ? project.images
      : [project.cover]

  return (
    <article className="min-h-screen bg-[#0c0c0b]">

      {/* ── Header ─────────────────────────────────────────────────────── */}

      <header
        className="px-8 md:px-16 pt-32 pb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible
            ? 'none'
            : 'translateY(14px)',
          transition:
            'opacity 700ms ease, transform 700ms ease',
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

      {/* ── Divider ───────────────────────────────────────────────────── */}

      <div className="mx-8 md:mx-16 h-px bg-[rgba(240,237,232,0.06)]" />

      {/* ── Project content ────────────────────────────────────────────── */}

      {hasCustomContent ? (

        <div className="mt-10 md:mt-16">
          <PortableText
            value={project.content as any}
            components={ptComponents}
          />
        </div>

      ) : (

        <>

          {/* ── Cover image ────────────────────────────────────────────── */}

          <Reveal y={0}>
            <div
              className="w-full overflow-hidden bg-[#0f0e0d]"
              style={{
                height: 'clamp(420px, 72vh, 860px)',
              }}
            >
              <img
                src={imgs[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  display: 'block',
                }}
              />
            </div>
          </Reveal>

          {/* ── Remaining images ──────────────────────────────────────── */}

          <div className="mt-2 flex flex-col gap-2">

            {imgs.slice(1).map((src, i) => (

              <Reveal key={i} delay={50}>

                <div className="px-8 md:px-16 py-4 md:py-6">

                  <div
                    className="overflow-hidden bg-[#0f0e0d]"
                    style={{
                      aspectRatio: '4/3',
                    }}
                  >

                    <img
                      src={src}
                      alt={`${project.title} — ${i + 2}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{
                        display: 'block',
                      }}
                    />

                  </div>

                </div>

              </Reveal>

            ))}

          </div>

        </>

      )}

      {/* ── Standalone videos ─────────────────────────────────────────── */}

      {project.videos && project.videos.length > 0 && (

        <div className="mt-2 flex flex-col gap-2">

          {project.videos.map((src, i) => (

            <div
              key={i}
              className="px-8 md:px-16 py-4 md:py-6 flex justify-center"
            >

              <div
                style={{
                  width: '100%',
                  maxWidth: '1400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <video
                  src={src}
                  controls
                  playsInline
                  style={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '1400px',
                    maxHeight: '84vh',
                    height: 'auto',
                    objectFit: 'contain',
                    background: '#0f0e0d',
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ── Back to projects ───────────────────────────────────────────── */}

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
