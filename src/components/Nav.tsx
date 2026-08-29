import { useState } from 'react'

import type { Page, WorkCategory } from '../data/siteData'

/* ─── Nav ─────────────────────────────────────────────────────────────────── */

export function Nav({
  page,
  navigate,
  onWorkClick,
}: {
  page: Page
  navigate: (p: Page, cat?: WorkCategory) => void
  onWorkClick: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)
  const go = (p: Page) => { navigate(p); close(); window.scrollTo({ top: 0 }) }

  const navItems = [
    { label: 'Home',     action: () => go('home'),                active: page === 'home' },
    { label: 'Projects', action: () => { onWorkClick(); close() }, active: page === 'work' || page === 'project' },
    { label: 'About',    action: () => go('about'),                active: page === 'about' },
    { label: 'Contact',  action: () => go('contact'),              active: page === 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ padding: '20px 28px' }}>
      <div className="flex items-center justify-between">

        {/* Left: brand */}
        <button
          onClick={() => go('home')}
          className="text-[#f0ede8] hover:opacity-40 transition-opacity duration-300 uppercase"
          style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.1em' }}
        >
          Ali Abiyar
        </button>

        {/* Right: inline nav links + contact CTA — desktop only */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.filter((item) => item.label !== 'Contact').map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="text-[0.6rem] tracking-[0.16em] uppercase transition-colors duration-200"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 400,
                color: item.active ? '#f0ede8' : 'rgba(240,237,232,0.5)',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#f0ede8' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = item.active ? '#f0ede8' : 'rgba(240,237,232,0.5)' }}
            >
              {item.label}
            </button>
          ))}

          {/* Contact CTA */}
          <button
            onClick={() => go('contact')}
            className="text-[0.6rem] tracking-[0.16em] uppercase transition-all duration-200"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 400,
              color: page === 'contact' ? '#0c0c0b' : '#f0ede8',
              background: page === 'contact' ? '#f0ede8' : 'rgba(240,237,232,0.12)',
              border: '1px solid rgba(240,237,232,0.35)',
              padding: '5px 14px',
              borderRadius: '2px',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#f0ede8'
              el.style.color = '#0c0c0b'
              el.style.borderColor = '#f0ede8'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = page === 'contact' ? '#f0ede8' : 'rgba(240,237,232,0.12)'
              el.style.color = page === 'contact' ? '#0c0c0b' : '#f0ede8'
              el.style.borderColor = 'rgba(240,237,232,0.35)'
            }}
          >
            Contact
          </button>
        </div>

        {/* Right: hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col items-end justify-center gap-[5px]"
          style={{ width: '28px', height: '28px' }}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            style={{
              display: 'block',
              height: '1.5px',
              background: '#f0ede8',
              width: '22px',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
            }}
          />
          <span
            style={{
              display: 'block',
              height: '1.5px',
              background: '#f0ede8',
              width: '22px',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 200ms ease',
            }}
          />
          <span
            style={{
              display: 'block',
              height: '1.5px',
              background: '#f0ede8',
              width: menuOpen ? '22px' : '16px',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1), width 300ms ease',
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0px',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 350ms cubic-bezier(0.4,0,0.2,1), opacity 300ms ease',
        }}
      >
        <div
          className="flex flex-col items-start gap-1"
          style={{ paddingTop: '24px', paddingBottom: '8px' }}
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="text-left transition-colors duration-200"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: item.active ? '#f0ede8' : 'rgba(240,237,232,0.55)',
                padding: '10px 0',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
