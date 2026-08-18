import { useState, useEffect, useRef } from 'react'

import { SERVICES } from '../data/siteData'

function ServiceRow({
  service,
  index,
  onContact,
}: {
  service: typeof SERVICES[0]
  index: number
  onContact: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid rgba(240,237,232,0.07)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'none' : 'translateY(14px)',
        transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${index * 60}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${index * 60}ms`,
      }}
    >
      {/* Hover image — absolutely positioned, right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[38%] overflow-hidden pointer-events-none hidden md:block"
        style={{
          opacity: hovered ? 1 : 0,
          transition: 'opacity 350ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <img
          src={service.image}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.72) saturate(0.85)',
            transform: hovered ? 'scale(1.0)' : 'scale(1.03)',
            transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        {/* Edge fade so image bleeds into the dark background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(12,12,11,0.85) 0%, rgba(12,12,11,0.1) 40%, rgba(12,12,11,0.1) 100%)' }}
        />
      </div>

      {/* Row content */}
      <div className="relative px-8 md:px-16 py-10 md:py-12 items-start">
        {/* Mobile: number + title inline; desktop: three-column grid */}
        <div className="flex items-baseline gap-4 md:grid md:grid-cols-[5rem_1fr_1fr] md:gap-12">
          {/* Number */}
          <span
            className="font-[Cormorant_Garamond] font-bold shrink-0"
            style={{
              fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
              lineHeight: 1,
              color: hovered ? 'rgba(240,237,232,0.18)' : 'rgba(240,237,232,0.08)',
              transition: 'color 350ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {service.num}
          </span>

          {/* Title */}
          <h3
            className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              transform: hovered ? 'translateX(4px)' : 'none',
              transition: 'transform 350ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {service.title}
          </h3>

          {/* Description — hidden on mobile, shown in grid on desktop */}
          <p
            className="hidden md:block text-sm font-light leading-[1.9] md:max-w-xs"
            style={{
              color: hovered ? 'rgba(240,237,232,0.65)' : 'rgba(240,237,232,0.42)',
              transition: 'color 350ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {service.desc}
          </p>
        </div>

        {/* Description — mobile only, below title */}
        <p
          className="md:hidden text-sm font-light leading-[1.9] mt-3 pl-0"
          style={{ color: 'rgba(240,237,232,0.45)' }}
        >
          {service.desc}
        </p>
      </div>
    </div>
  )
}

export function ServicesPage({ onContact }: { onContact: () => void }) {
  const [headerVisible, setHeaderVisible] = useState(false)
  const lastRef = useRef<HTMLDivElement>(null)
  const [ctaVisible, setCtaVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = lastRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCtaVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="min-h-screen bg-[#0c0c0b] pb-0">

      {/* ── Header ── */}
      <div
        className="px-8 md:px-16 pt-32 pb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(14px)',
          transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p className="text-[rgba(240,237,232,0.25)] text-[0.6rem] tracking-[0.22em] uppercase mb-6">
          What I do
        </p>
        <h1
          className="font-[Cormorant_Garamond] font-bold text-[#f0ede8] max-w-lg"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
        >
          Craft over
          <br />
          <em>quantity.</em>
        </h1>
      </div>

      {/* ── Service rows ── */}
      <div style={{ borderBottom: '1px solid rgba(240,237,232,0.07)' }}>
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.num} service={s} index={i} onContact={onContact} />
        ))}
      </div>

      {/* ── CTA footer ── */}
      <div
        ref={lastRef}
        className="px-8 md:px-16 py-24 md:py-32"
        style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'none' : 'translateY(14px)',
          transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1) 80ms, transform 700ms cubic-bezier(0.4,0,0.2,1) 80ms',
        }}
      >
        <div className="max-w-2xl">
          <p
            className="font-[Cormorant_Garamond] font-bold text-[#f0ede8] mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.2, letterSpacing: '-0.015em' }}
          >
            Available for selected
            <br />
            <em style={{ color: 'rgba(240,237,232,0.55)' }}>commissions worldwide.</em>
          </p>

          <div className="flex items-center gap-10">
            <button
              onClick={onContact}
              className="flex items-center gap-4 group"
            >
              <span
                className="text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-[rgba(240,237,232,0.55)]"
                style={{ color: '#f0ede8' }}
              >
                Start a project
              </span>
              <span
                className="block h-px transition-all duration-300 group-hover:w-12"
                style={{ width: '2.5rem', background: 'rgba(240,237,232,0.4)' }}
              />
              <span
                className="text-[rgba(240,237,232,0.4)] text-xs transition-all duration-300 group-hover:text-[rgba(240,237,232,0.7)] group-hover:translate-x-1"
              >
                →
              </span>
            </button>

            <div className="h-4 w-px bg-[rgba(240,237,232,0.1)] hidden md:block" />

            <p className="text-[rgba(240,237,232,0.22)] text-[0.6rem] tracking-[0.2em] uppercase hidden md:block">
              Tehran&ensp;·&ensp;Available globally
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

