import { useState, useEffect, useCallback, useRef } from 'react'

import type { Page, WorkCategory } from '../data/siteData'
import { HERO_IMAGES, CATEGORY_IMAGES, WORK_CATEGORIES } from '../data/siteData'

/* ─── HomeSection ─────────────────────────────────────────────────────────── */

export function HomeSection({
  navigate,
}: {
  navigate: (p: Page, cat?: WorkCategory) => void
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCat, setHoveredCat] = useState<WorkCategory | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const [isLightBackground, setIsLightBackground] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setCurrentSlide((c) => (c + 1) % HERO_IMAGES.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 120)

    return () => clearTimeout(t)
  }, [])

  /* ─── Detect background brightness ───────────────────────────────────── */

  const bgImage = hoveredCat
    ? CATEGORY_IMAGES[hoveredCat]
    : HERO_IMAGES[currentSlide]

  useEffect(() => {
    if (!bgImage) {
      setIsLightBackground(false)
      return
    }

    const img = new Image()

    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        if (!canvasRef.current) {
          canvasRef.current = document.createElement('canvas')
        }

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
        })

        if (!ctx) return

        const sampleSize = 40

        canvas.width = sampleSize
        canvas.height = sampleSize

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize)

        const data = ctx.getImageData(
          0,
          0,
          sampleSize,
          sampleSize,
        ).data

        let totalBrightness = 0
        let pixels = 0

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const brightness =
            0.299 * r +
            0.587 * g +
            0.114 * b

          totalBrightness += brightness
          pixels++
        }

        const averageBrightness =
          totalBrightness / pixels

        /*
         * 145 is the threshold.
         * Above it = light background → dark text.
         * Below it = dark background → white text.
         */
        setIsLightBackground(averageBrightness > 145)
      } catch {
        // If the image cannot be sampled because of CORS,
        // keep the default white text.
        setIsLightBackground(false)
      }
    }

    img.onerror = () => {
      setIsLightBackground(false)
    }

    img.src = bgImage
  }, [bgImage])

  /* ─── Dynamic colors ─────────────────────────────────────────────────── */

  const mainTextColor = isLightBackground
    ? '#111111'
    : '#f0ede8'

  const normalTextColor = isLightBackground
    ? 'rgba(17,17,17,0.78)'
    : 'rgba(240,237,232,0.85)'

  const dimTextColor = isLightBackground
    ? 'rgba(17,17,17,0.35)'
    : 'rgba(240,237,232,0.3)'

  const subtleTextColor = isLightBackground
    ? 'rgba(17,17,17,0.45)'
    : 'rgba(240,237,232,0.38)'

  const iconColor = isLightBackground
    ? 'rgba(17,17,17,0.72)'
    : 'rgba(240,237,232,0.72)'

  const lineColor = isLightBackground
    ? 'rgba(17,17,17,0.45)'
    : 'rgba(240,237,232,0.4)'

  const textShadow = isLightBackground
    ? '0 1px 8px rgba(255,255,255,0.35)'
    : '0 1px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'

  const hoveredTextShadow = isLightBackground
    ? '0 1px 10px rgba(255,255,255,0.5)'
    : '0 1px 12px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)'

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-[#0c0c0b]"
      style={{
        userSelect: 'none',
      }}
    >
      {/* ─── Slideshow images ──────────────────────────────────────────── */}

      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity:
              !hoveredCat && i === currentSlide
                ? 1
                : 0,
            transition:
              'opacity 1200ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      ))}

      {/* ─── Category hover image ──────────────────────────────────────── */}

      {hoveredCat && CATEGORY_IMAGES[hoveredCat] && (
        <img
          key={hoveredCat}
          src={CATEGORY_IMAGES[hoveredCat]}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            opacity: 1,
            transition:
              'opacity 700ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      )}

      {/* ─── Category list ─────────────────────────────────────────────── */}

      <div
        className="absolute top-1/2 -translate-y-1/2 flex flex-col hidden md:flex"
        style={{
          left: 'clamp(3rem, 8vw, 7rem)',
          opacity: revealed ? 1 : 0,
          transition:
            'opacity 900ms cubic-bezier(0.4,0,0.2,1) 400ms',
        }}
      >
        {WORK_CATEGORIES.map((cat) => {
          const isHovered = hoveredCat === cat
          const isDimmed =
            hoveredCat !== null && !isHovered

          return (
            <button
              key={cat}
              onMouseEnter={() => setHoveredCat(cat)}
              onMouseLeave={() => setHoveredCat(null)}
              onClick={() => navigate('work', cat)}
              className="text-left focus:outline-none"
              style={{
                padding: '4px 20px 4px 0',
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'DM Sans', system-ui, sans-serif",

                  /* Same size as before */
                  fontSize:
                    'clamp(0.67rem, 2.1vw, 0.78rem)',

                  /* Same letter spacing as before */
                  letterSpacing: '0.22em',

                  textTransform: 'uppercase',

                  display: 'inline-block',

                  /* Only changed from 300 → 700 */
                  fontWeight: 700,

                  color: isHovered
                    ? mainTextColor
                    : isDimmed
                      ? dimTextColor
                      : normalTextColor,

                  transform: isHovered
                    ? 'translateX(4px)'
                    : 'translateX(0)',

                  transition:
                    'color 350ms cubic-bezier(0.4,0,0.2,1), transform 350ms cubic-bezier(0.4,0,0.2,1)',

                  textShadow: isHovered
                    ? hoveredTextShadow
                    : textShadow,
                }}
              >
                {cat}
              </span>

              <span
                className="block h-px"
                style={{
                  width: isHovered ? '100%' : '0%',

                  backgroundColor: lineColor,

                  transition:
                    'width 350ms cubic-bezier(0.4,0,0.2,1)',

                  marginTop: '2px',
                }}
              />
            </button>
          )
        })}
      </div>

      {/* ─── Bottom left — discipline ──────────────────────────────────── */}

      <div
        className="absolute bottom-8 left-10 md:left-14"
        style={{
          opacity: revealed ? 1 : 0,
          transition:
            'opacity 1000ms cubic-bezier(0.4,0,0.2,1) 700ms',
          zIndex: 2,
        }}
      >
        <p
          className="text-[0.58rem] tracking-[0.24em] uppercase"
          style={{
            fontFamily:
              "'DM Sans', system-ui, sans-serif",

            fontWeight: 300,

            color: subtleTextColor,

            transition:
              'color 400ms ease',

            textShadow,
          }}
        >
          Photographer &amp; Filmmaker
        </p>
      </div>

      {/* ─── Right — social icons ──────────────────────────────────────── */}

      <div
        className="absolute top-1/2 -translate-y-1/2 right-10 md:right-14 flex flex-col items-center gap-6"
        style={{
          opacity: revealed ? 1 : 0,
          transition:
            'opacity 1000ms cubic-bezier(0.4,0,0.2,1) 700ms',
          zIndex: 2,
        }}
      >
        {[
          {
            label: 'Instagram',
            href:
              'https://www.instagram.com/aliabiyar/',
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.5"
                />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.8"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            ),
          },

          {
            label: 'Telegram',
            href: 'https://t.me/aliabiyar',
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 3 3 10.5l7 1.5 2 6 3-3.5 5 3.5L21 3z" />
                <path d="M10 12 21 3" />
              </svg>
            ),
          },

          {
            label: 'WhatsApp',
            href: 'https://wa.me/989124362179',
            icon: (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => {
          const isHovered =
            hoveredSocial === label

          return (
            <div
              key={label}
              className="relative flex items-center justify-center"
              onMouseEnter={() =>
                setHoveredSocial(label)
              }
              onMouseLeave={() =>
                setHoveredSocial(null)
              }
            >
              {/* Tooltip */}

              <span
                style={{
                  position: 'absolute',

                  right: 'calc(100% + 14px)',

                  top: '50%',

                  transform: isHovered
                    ? 'translateY(-50%) translateX(0)'
                    : 'translateY(-50%) translateX(6px)',

                  opacity: isHovered ? 1 : 0,

                  pointerEvents: 'none',

                  whiteSpace: 'nowrap',

                  fontFamily:
                    "'DM Sans', system-ui, sans-serif",

                  fontSize: '0.58rem',

                  fontWeight: 300,

                  letterSpacing: '0.16em',

                  textTransform: 'uppercase',

                  color: isHovered
                    ? mainTextColor
                    : normalTextColor,

                  transition:
                    'opacity 250ms ease, transform 250ms ease, color 400ms ease',

                  textShadow:
                    isLightBackground
                      ? '0 1px 8px rgba(255,255,255,0.4)'
                      : '0 1px 8px rgba(0,0,0,0.8)',
                }}
              >
                {label}
              </span>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center transition-colors duration-300"
                style={{
                  color: isHovered
                    ? mainTextColor
                    : iconColor,

                  padding: '8px',

                  margin: '-8px',

                  transition:
                    'color 300ms ease',
                }}
              >
                {icon}
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
