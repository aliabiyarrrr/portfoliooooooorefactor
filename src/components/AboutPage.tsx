import { useState, useEffect, useRef } from 'react'

/* ─── AboutPage ──────────────────────────────────────────────────────────── */

export function AboutPage() {
  const [headerIn, setHeaderIn] = useState(false)
  const bioRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [bioIn, setBioIn] = useState(false)
  const [infoIn, setInfoIn] = useState(false)
  const [footerIn, setFooterIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeaderIn(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const pairs: [
      React.RefObject<HTMLDivElement | null>,
      (v: boolean) => void
    ][] = [
      [bioRef, setBioIn],
      [infoRef, setInfoIn],
      [footerRef, setFooterIn],
    ]

    const observers = pairs.map(([ref, setter]) => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setter(true)
            obs.disconnect()
          }
        },
        { threshold: 0.08 }
      )

      if (ref.current) obs.observe(ref.current)

      return obs
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const reveal = (shown: boolean, delay = 0) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? 'none' : 'translateY(14px)',
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  })

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/aliabiyar',
      handle: '@aliabiyar',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/aliabiyar',
      handle: '@aliabiyar',
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/989124362179',
      handle: '+98 912 436 2179',
    },
    {
      label: 'Email',
      href: 'mailto:contact@aliabiyar.com',
      handle: 'contact@aliabiyar.com',
    },
  ]

  return (
    <section className="min-h-screen bg-[#0c0c0b]">

      {/* ── 1. Page label + opening statement ── */}
      <div
        className="px-8 md:px-16 pt-32 pb-20"
        style={reveal(headerIn)}
      >
        <p className="text-[rgba(240,237,232,0.22)] text-[0.6rem] tracking-[0.22em] uppercase mb-10">
          About
        </p>

        <blockquote
          className="font-[Cormorant_Garamond] font-bold text-[#f0ede8] max-w-3xl"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
          }}
        >
          Different projects.{' '}
          <em style={{ color: 'rgba(240,237,232,0.55)' }}>
            Same attention to detail.
          </em>
        </blockquote>
      </div>

      {/* Hairline */}
      <div className="mx-8 md:mx-16 h-px bg-[rgba(240,237,232,0.06)]" />

      {/* ── 2. Portrait + biography ── */}
      <div
        ref={bioRef}
        className="grid md:grid-cols-[5fr_6fr] gap-0"
        style={reveal(bioIn, 60)}
      >

        {/* Left: portrait */}
        <div
          className="overflow-hidden bg-[#0f0e0d] w-full"
          style={{ aspectRatio: '4 / 5' }}
        >
          <img
            src="/DSC01972.jpg"
            alt="Ali Abiyar — photographer and filmmaker"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.82) saturate(0.9)',
              objectPosition: 'center center',
            }}
          />
        </div>

        {/* Right: bio text */}
        <div className="px-8 md:px-14 py-12 md:py-16 flex flex-col justify-center">
          <div className="flex flex-col gap-6 max-w-md">

            <p className="text-[rgba(240,237,232,0.62)] text-sm leading-[1.9] font-light">
              I’m Ali Abiyar, a photographer and filmmaker based in Tehran, Iran.
            </p>

            <p className="text-[rgba(240,237,232,0.62)] text-sm leading-[1.9] font-light">
              I started photography in 2009, and since 2018, photography,
              filmmaking, and content creation have been my full-time work.
            </p>

            <p className="text-[rgba(240,237,232,0.62)] text-sm leading-[1.9] font-light">
              Fashion is where I feel most at home, but I enjoy taking on new
              challenges and working across different kinds of projects. What
              I like most is the whole process — from the first idea and
              moodboard to the shoot, editing, and final delivery.
            </p>

            <p className="text-[rgba(240,237,232,0.62)] text-sm leading-[1.9] font-light">
              I care about clean, considered work and getting the best out of
              every project, whatever the subject or field.
            </p>

            <p className="text-[rgba(240,237,232,0.62)] text-sm leading-[1.9] font-light">
              Based in Tehran. Available worldwide.
            </p>

          </div>
        </div>
      </div>

      {/* ── 3. Facts grid ── */}
      <div
        ref={infoRef}
        className="grid md:grid-cols-2 border-t border-[rgba(240,237,232,0.06)]"
        style={reveal(infoIn, 80)}
      >

        {/* Based in */}
        <div className="px-8 md:px-16 py-10 md:py-14 border-b md:border-b-0 border-r-0 md:border-r border-[rgba(240,237,232,0.06)]">
          <p className="text-[rgba(240,237,232,0.22)] text-[0.6rem] tracking-[0.22em] uppercase mb-5">
            Based in
          </p>

          <p className="font-[Cormorant_Garamond] font-bold text-[#f0ede8] text-lg">
            Tehran, Iran
          </p>
        </div>

        {/* Selected services */}
        <div className="px-8 md:px-16 py-10 md:py-14">
          <p className="text-[rgba(240,237,232,0.22)] text-[0.6rem] tracking-[0.22em] uppercase mb-5">
            Selected services
          </p>

          <ul className="flex flex-col gap-2">
            {[
              'Fashion',
              'Commercial',
              'Food & Hospitality',
              'Portraits',
            ].map((s) => (
              <li
                key={s}
                className="text-[rgba(240,237,232,0.55)] text-[0.78rem] font-light"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── 4. Social links footer ── */}
      <div
        ref={footerRef}
        className="border-t border-[rgba(240,237,232,0.06)] px-8 md:px-16 py-14"
        style={reveal(footerIn, 60)}
      >
        <p className="text-[rgba(240,237,232,0.28)] text-[0.6rem] tracking-[0.22em] uppercase mb-8">
          Reach me
        </p>

        <div className="flex flex-wrap gap-x-10 gap-y-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-1"
            >
              <span
                className="text-[0.6rem] tracking-[0.22em] uppercase transition-colors duration-300"
                style={{
                  color: 'rgba(240,237,232,0.25)',
                }}
              >
                {s.label}
              </span>

              <span
                className="text-sm font-light transition-colors duration-300 group-hover:text-[rgba(240,237,232,0.9)]"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: 'rgba(240,237,232,0.55)',
                }}
              >
                {s.handle}
              </span>
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
