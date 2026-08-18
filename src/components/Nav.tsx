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
    { label: 'Services', action: () => go('services'),             active: page === 'services' },
    { label: 'About',    action: () => go('about'),                active: page === 'about' },
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

        {/* Right: inline nav links + contact CTA */}
        <div className="flex items-center gap-7">
          {navItems.map((item) => (
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
      </div>
    </nav>
  )
}

