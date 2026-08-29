import { useState, useEffect, useMemo } from 'react'
import { PortableText } from '@portabletext/react'

import type { Project } from '../data/siteData'
import { urlFor } from '../lib/projects'
import { Reveal } from './Reveal'

/* ─── Gallery Types ───────────────────────────────────────────────────────── */

type GalleryItem =
  | {
      type: 'image'
      src: string
      caption?: string
    }
  | {
      type: 'video'
      src: string
      caption?: string
    }

/* ─── Image Row ─────────────────────────────────────────────────────────── */

function ImageRow({
  value,
  onImageClick,
}: {
  value: any
  onImageClick: (src: string, caption?: string) => void
}) {
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

  const updateRatio = (
    index: number,
    img: HTMLImageElement
  ) => {
    if (!img.naturalWidth || !img.naturalHeight) return

    const ratio =
      img.naturalWidth / img.naturalHeight

    setRatios((current) => {
      const next = [...current]
      next[index] = ratio
      return next
    })
  }

  return (
    <div className="px-4 md:px-16 py-2 md:py-4">
      <div
        className="flex w-full items-start flex-col md:flex-row"
        style={{
          gap: '8px',
        }}
      >
        {images.map((img: any, i: number) => {
          const ratio = ratios[i] || 1
          const src = urlFor(img, 1800)

          return (
            <figure
              key={i}
              style={{
                margin: 0,
                minWidth: 0,
                flex: `${ratio} 1 0`,
              }}
              className="w-full md:w-auto cursor-pointer"
              onClick={() =>
                onImageClick(
                  src,
                  img.caption || ''
                )
              }
            >
              <img
                src={src}
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

function createPTComponents(
  onImageClick: (
    src: string,
    caption?: string
  ) => void,
  onVideoClick: (
    src: string,
    caption?: string
  ) => void
) {
  return {
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
            fontSize:
              'clamp(1.4rem, 2.5vw, 2rem)',
          }}
        >
          {children}
        </h3>
      ),
    },

    types: {
      /* ── Single image ─────────────────────────────────────────────── */

      layoutImage: ({ value }: any) => {
        const widthPct =
          value?.width &&
          value.width >= 20 &&
          value.width <= 100
            ? value.width
            : 100

        const src = urlFor(value, 1800)

        return (
          <div className="px-4 md:px-16 py-2 md:py-4 flex justify-center">
            <div
              className="w-full md:w-[var(--desktop-image-width)]"
              style={{
                '--desktop-image-width': `${Math.min(
                  widthPct,
                  92
                )}%`,
                maxWidth: '1200px',
              } as React.CSSProperties}
            >
              <img
                src={src}
                alt={value.caption || ''}
                loading="lazy"
                className="w-full h-auto cursor-pointer"
                style={{
                  display: 'block',
                }}
                onClick={() =>
                  onImageClick(
                    src,
                    value.caption || ''
                  )
                }
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

      /* ── Image row ────────────────────────────────────────────────── */

      imageRow: ({ value }: any) => (
        <ImageRow
          value={value}
          onImageClick={onImageClick}
        />
      ),

      /* ── Video ────────────────────────────────────────────────────── */

      layoutVideo: ({ value }: any) => {
        if (!value?.videoUrl) return null

        return (
          <div className="px-8 md:px-16 py-2 md:py-4 flex justify-center">
            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <video
                src={value.videoUrl}
                controls
                playsInline
                onClick={() =>
                  onVideoClick(
                    value.videoUrl,
                    value.caption || ''
                  )
                }
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '1200px',
                  maxHeight: '78vh',
                  height: 'auto',
                  objectFit: 'contain',
                  background: '#0f0e0d',
                  cursor: 'pointer',
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
}

/* ─── Fullscreen Gallery ─────────────────────────────────────────────────── */

function FullscreenGallery({
  items,
  currentIndex,
  onClose,
  onChange,
}: {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onChange: (index: number) => void
}) {
  const [touchStartX, setTouchStartX] =
    useState<number | null>(null)

  const item = items[currentIndex]

  const goNext = () => {
    if (items.length <= 1) return

    onChange(
      (currentIndex + 1) % items.length
    )
  }

  const goPrevious = () => {
    if (items.length <= 1) return

    onChange(
      (currentIndex - 1 + items.length) %
        items.length
    )
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }

      if (e.key === 'ArrowRight') {
        goNext()
      }

      if (e.key === 'ArrowLeft') {
        goPrevious()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [currentIndex, items.length])

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow =
        previousOverflow
    }
  }, [])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0c0c0b]"
      onTouchStart={(e) => {
        setTouchStartX(
          e.touches[0].clientX
        )
      }}
      onTouchEnd={(e) => {
        if (touchStartX === null) return

        const endX =
          e.changedTouches[0].clientX

        const difference =
          touchStartX - endX

        if (Math.abs(difference) > 50) {
          if (difference > 0) {
            goNext()
          } else {
            goPrevious()
          }
        }

        setTouchStartX(null)
      }}
    >
      {/* ── Top controls ─────────────────────────────────────────────── */}

      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-8 py-5">
        <div className="text-[rgba(240,237,232,0.45)] text-[0.6rem] tracking-[0.2em] uppercase">
          {currentIndex + 1} / {items.length}
        </div>

        <button
          onClick={onClose}
          className="text-[#f0ede8] text-2xl leading-none opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close gallery"
        >
          ×
        </button>
      </div>

      {/* ── Previous ────────────────────────────────────────────────── */}

      {items.length > 1 && (
        <button
          onClick={goPrevious}
          className="absolute left-0 top-0 bottom-0 z-10 w-[18%] hidden md:flex items-center justify-start px-8 text-[#f0ede8] opacity-0 hover:opacity-70 transition-opacity"
          aria-label="Previous"
        >
          <span className="text-3xl font-light">
            ←
          </span>
        </button>
      )}

      {/* ── Next ─────────────────────────────────────────────────────── */}

      {items.length > 1 && (
        <button
          onClick={goNext}
          className="absolute right-0 top-0 bottom-0 z-10 w-[18%] hidden md:flex items-center justify-end px-8 text-[#f0ede8] opacity-0 hover:opacity-70 transition-opacity"
          aria-label="Next"
        >
          <span className="text-3xl font-light">
            →
          </span>
        </button>
      )}

      {/* ── Main media ───────────────────────────────────────────────── */}

      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-16 pt-16 pb-16">
        {item.type === 'image' ? (
          <img
            key={item.src}
            src={item.src}
            alt={item.caption || ''}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
        ) : (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* ── Caption ──────────────────────────────────────────────────── */}

      {item.caption && (
        <div className="absolute bottom-5 left-0 right-0 z-20 px-8 text-center">
          <p className="text-[rgba(240,237,232,0.45)] text-[0.6rem] tracking-[0.14em] uppercase">
            {item.caption}
          </p>
        </div>
      )}

      {/* ── Mobile navigation ────────────────────────────────────────── */}

      {items.length > 1 && (
        <div className="absolute bottom-5 left-0 right-0 z-20 flex md:hidden items-center justify-center gap-8">
          <button
            onClick={goPrevious}
            className="text-[#f0ede8] text-xl opacity-70"
            aria-label="Previous"
          >
            ←
          </button>

          <button
            onClick={goNext}
            className="text-[#f0ede8] text-xl opacity-70"
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
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
  const [headerVisible, setHeaderVisible] =
    useState(false)

  const [galleryOpen, setGalleryOpen] =
    useState(false)

  const [galleryIndex, setGalleryIndex] =
    useState(0)

  useEffect(() => {
    const t = setTimeout(
      () => setHeaderVisible(true),
      80
    )

    return () => clearTimeout(t)
  }, [project.id])

  const clientLabel =
    project.category === 'Commercial'
      ? 'Confidential client'
      : project.category === 'Fashion'
        ? 'Personal / Fashion'
        : project.category === 'Portraits'
          ? 'Personal / Portrait'
          : project.category ===
              'Cafe & Restaurants'
            ? 'Café & Restaurant'
            : 'Personal / Video'

  const hasCustomContent =
    Array.isArray(project.content) &&
    project.content.length > 0

  const imgs =
    project.images.length > 0
      ? project.images
      : [project.cover]

  /* ── Build gallery in exact project order ── */

  const galleryItems = useMemo<GalleryItem[]>(
    () => {
      const items: GalleryItem[] = []

      if (hasCustomContent) {
        for (const block of project.content || []) {
          if (block?._type === 'layoutImage') {
            items.push({
              type: 'image',
              src: urlFor(block, 1800),
              caption: block.caption || '',
            })
          }

          if (block?._type === 'imageRow') {
            const rowImages =
              block.images || []

            rowImages.forEach((img: any) => {
              items.push({
                type: 'image',
                src: urlFor(img, 1800),
                caption: img.caption || '',
              })
            })
          }

          if (
            block?._type === 'layoutVideo' &&
            block.videoUrl
          ) {
            items.push({
              type: 'video',
              src: block.videoUrl,
              caption: block.caption || '',
            })
          }
        }
      } else {
        imgs.forEach((src) => {
          items.push({
            type: 'image',
            src,
          })
        })

        if (
          project.videos &&
          project.videos.length > 0
        ) {
          project.videos.forEach((src) => {
            items.push({
              type: 'video',
              src,
            })
          })
        }
      }

      return items
    },
    [
      project.id,
      project.content,
      project.videos,
      project.images,
      project.cover,
      hasCustomContent,
    ]
  )

  /* ── Open gallery ── */

  const openGallery = (
    src: string,
    type: 'image' | 'video' = 'image'
  ) => {
    const index = galleryItems.findIndex(
      (item) =>
        item.src === src &&
        item.type === type
    )

    if (index === -1) return

    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
  }

  return (
    <>
      <article className="min-h-screen bg-[#0c0c0b]">

        {/* ── Header ───────────────────────────────────────────────── */}

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
                {project.category} /{' '}
                {project.year}
              </p>

              <h1
                className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
                style={{
                  fontSize:
                    'clamp(2.4rem, 5.5vw, 4.2rem)',
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
                  {project.category ===
                  'Videos'
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

        {/* ── Divider ───────────────────────────────────────────────── */}

        <div className="mx-8 md:mx-16 h-px bg-[rgba(240,237,232,0.06)]" />

        {/* ── Project content ───────────────────────────────────────── */}

        {hasCustomContent ? (

          <div className="mt-10 md:mt-16">
            <PortableText
              value={project.content as any}
              components={createPTComponents(
                (src, caption) =>
                  openGallery(
                    src,
                    'image'
                  ),
                (src, caption) =>
                  openGallery(
                    src,
                    'video'
                  )
              )}
            />
          </div>

        ) : (

          <>

            {/* ── Cover image ─────────────────────────────────────── */}

            <Reveal y={0}>
              <div
                className="w-full overflow-hidden bg-[#0f0e0d] cursor-pointer"
                style={{
                  height:
                    'clamp(420px, 72vh, 860px)',
                }}
                onClick={() =>
                  openGallery(
                    imgs[0],
                    'image'
                  )
                }
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

            {/* ── Remaining images ──────────────────────────────── */}

            <div className="mt-2 flex flex-col gap-2">

              {imgs
                .slice(1)
                .map((src, i) => (

                  <Reveal
                    key={i}
                    delay={50}
                  >

                    <div className="px-8 md:px-16 py-4 md:py-6">

                      <div
                        className="overflow-hidden bg-[#0f0e0d] cursor-pointer"
                        style={{
                          aspectRatio: '4/3',
                        }}
                        onClick={() =>
                          openGallery(
                            src,
                            'image'
                          )
                        }
                      >

                        <img
                          src={src}
                          alt={`${project.title} — ${
                            i + 2
                          }`}
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

        {/* ── Standalone videos ───────────────────────────────────── */}

        {project.videos &&
          project.videos.length > 0 && (

            <div className="mt-2 flex flex-col gap-2">

              {project.videos.map(
                (src, i) => (

                  <div
                    key={i}
                    className="px-8 md:px-16 py-4 md:py-6 flex justify-center"
                  >

                    <div
                      style={{
                        width: '100%',
                        maxWidth: '1200px',
                        display: 'flex',
                        justifyContent:
                          'center',
                        alignItems: 'center',
                      }}
                    >

                      <video
                        src={src}
                        controls
                        playsInline
                        onClick={() =>
                          openGallery(
                            src,
                            'video'
                          )
                        }
                        style={{
                          display: 'block',
                          width: '100%',
                          maxWidth:
                            '1200px',
                          maxHeight:
                            '78vh',
                          height: 'auto',
                          objectFit:
                            'contain',
                          background:
                            '#0f0e0d',
                          cursor: 'pointer',
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        {/* ── Back to projects ────────────────────────────────────── */}

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
                fontSize:
                  'clamp(1.8rem, 3.5vw, 2.8rem)',
              }}
            >
              All Projects →
            </h2>

          </button>

        </div>

      </article>

      {/* ── Fullscreen Gallery ─────────────────────────────────────── */}

      {galleryOpen &&
        galleryItems.length > 0 && (
          <FullscreenGallery
            items={galleryItems}
            currentIndex={galleryIndex}
            onClose={closeGallery}
            onChange={setGalleryIndex}
          />
        )}
    </>
  )
}
