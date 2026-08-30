import { useState, useEffect } from 'react'

import { PROJECT_TYPES } from '../data/siteData'

/* ─── ContactPage ─────────────────────────────────────────────────────────── */

const dmSans = { fontFamily: "'DM Sans', system-ui, sans-serif" }

const WEB3FORMS_ACCESS_KEY = '5274a2f5-bbb8-4e48-b8f4-a44fe875dcbd'

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSending(true)
    setError('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Project inquiry from ${form.name}${
            form.projectType ? ` — ${form.projectType}` : ''
          }`,
          name: form.name,
          email: form.email,
          project_type: form.projectType,
          message: form.message,
        }),
      })

      const result = await res.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(
          'Something went wrong. Please try again or email me directly.'
        )
      }
    } catch {
      setError(
        'Something went wrong. Please try again or email me directly.'
      )
    } finally {
      setSending(false)
    }
  }

  const fadeIn = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(12px)',
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms,
      transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  })

  const lineField =
    'w-full bg-transparent border-b border-[rgba(240,237,232,0.22)] pt-2 pb-3 text-[#f0ede8] text-sm font-light placeholder:text-[rgba(240,237,232,0.38)] outline-none focus-visible:border-[rgba(240,237,232,0.7)] transition-colors duration-300'

  const contactItems = [
    {
      label: 'Phone',
      value: '+98 912 436 2179',
      href: 'tel:+989124362179',
    },
    {
      label: 'Email',
      value: 'contact@aliabiyar.com',
      href: 'mailto:contact@aliabiyar.com',
    },
  ]

  const socialItems = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/aliabiyar/',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/aliabiyar',
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/989124362179',
    },
  ]

  return (
    <section className="min-h-screen bg-[#0c0c0b]">

      {/* ── Editorial header ── */}
      <div
        className="px-8 md:px-16 pt-32 pb-14 border-b border-[rgba(240,237,232,0.06)]"
        style={fadeIn(0)}
      >
        <p
          style={{
            ...dmSans,
            fontSize: '0.58rem',
            letterSpacing: '0.28em',
            color: 'rgba(240,237,232,0.55)',
            textTransform: 'uppercase',
            marginBottom: '2.4rem',
          }}
        >
          Contact
        </p>

        <h1
          className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.015em',
            marginBottom: '1rem',
          }}
        >
          Let's work together.
        </h1>

        <p
          className="font-[Cormorant_Garamond] font-bold"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
            fontStyle: 'italic',
            color: 'rgba(240,237,232,0.65)',
            letterSpacing: '-0.005em',
          }}
        >
          Have a project in mind? Tell me about it.
        </p>
      </div>

      {/* ── Two-column main content ── */}
      <div
        className="flex flex-col md:flex-row"
        style={fadeIn(120)}
      >

        {/* ── LEFT: Contact information ── */}
        <div
          className="w-full md:w-[40%] px-8 md:px-16 py-14 md:py-20 flex flex-col gap-12 border-b md:border-b-0 border-[rgba(240,237,232,0.06)]"
          style={{
            borderRight: '1px solid rgba(240,237,232,0.06)',
          }}
        >
          <p
            style={{
              ...dmSans,
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              color: 'rgba(240,237,232,0.55)',
              textTransform: 'uppercase',
            }}
          >
            Get in touch
          </p>

          {/* Phone + Email */}
          <div className="flex flex-col gap-8">
            {contactItems.map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.56rem',
                    letterSpacing: '0.24em',
                    color: 'rgba(240,237,232,0.52)',
                    textTransform: 'uppercase',
                    marginBottom: '0.55rem',
                  }}
                >
                  {item.label}
                </p>

                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 transition-colors duration-300"
                  style={{
                    color: 'rgba(240,237,232,0.9)',
                    ...dmSans,
                    fontSize: '0.95rem',
                    fontWeight: 300,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f0ede8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'rgba(240,237,232,0.9)'
                  }}
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[rgba(240,237,232,0.1)]" />

          {/* Social */}
          <div>
            <p
              style={{
                ...dmSans,
                fontSize: '0.56rem',
                letterSpacing: '0.24em',
                color: 'rgba(240,237,232,0.52)',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
              }}
            >
              Social
            </p>

            <div className="flex flex-col gap-4">
              {socialItems.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-300 w-fit"
                  style={{
                    color: 'rgba(240,237,232,0.85)',
                    ...dmSans,
                    fontSize: '0.92rem',
                    fontWeight: 300,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f0ede8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      'rgba(240,237,232,0.85)'
                  }}
                >
                  {s.label}

                  <span
                    style={{
                      fontSize: '0.65rem',
                      opacity: 0.7,
                    }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Location footnote */}
          <p
            style={{
              ...dmSans,
              fontSize: '0.56rem',
              letterSpacing: '0.2em',
              color: 'rgba(240,237,232,0.42)',
              textTransform: 'uppercase',
              marginTop: 'auto',
            }}
          >
            Tehran&ensp;—&ensp;Available globally
          </p>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="w-full md:w-[60%] px-8 md:px-14 lg:px-20 py-14 md:py-20">

          <p
            style={{
              ...dmSans,
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              color: 'rgba(240,237,232,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Start a project
          </p>

          <p
            className="font-[Cormorant_Garamond] font-bold"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
              fontStyle: 'italic',
              color: 'rgba(240,237,232,0.65)',
              marginBottom: '3rem',
              letterSpacing: '-0.005em',
            }}
          >
            Tell me a little about your project.
          </p>

          {submitted ? (
            <div className="py-8">

              <p
                className="font-[Cormorant_Garamond] font-bold text-[#f0ede8]"
                style={{
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  marginBottom: '1rem',
                }}
              >
                Your message is on its way.
              </p>

              <p
                style={{
                  ...dmSans,
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  color: 'rgba(240,237,232,0.4)',
                  lineHeight: 1.9,
                }}
              >
                Thanks for reaching out — I'll get back to you soon.
              </p>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-0 max-w-lg"
            >

              {/* Name */}
              <div className="mb-8">
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.54rem',
                    letterSpacing: '0.24em',
                    color: 'rgba(240,237,232,0.52)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Name
                </p>

                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className={lineField}
                  style={dmSans}
                />
              </div>

              {/* Email */}
              <div className="mb-8">
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.54rem',
                    letterSpacing: '0.24em',
                    color: 'rgba(240,237,232,0.52)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Email
                </p>

                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className={lineField}
                  style={dmSans}
                />
              </div>

              {/* Project type */}
              <div className="mb-8 relative">
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.54rem',
                    letterSpacing: '0.24em',
                    color: 'rgba(240,237,232,0.52)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Project type
                </p>

                <select
                  value={form.projectType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      projectType: e.target.value,
                    })
                  }
                  className={`${lineField} appearance-none cursor-pointer pr-6`}
                  style={{
                    ...dmSans,
                    color: form.projectType
                      ? '#f0ede8'
                      : 'rgba(240,237,232,0.22)',
                  }}
                >
                  <option value="" disabled>
                    Select a category
                  </option>

                  {PROJECT_TYPES.map((t) => (
                    <option
                      key={t}
                      value={t}
                      style={{
                        background: '#0c0c0b',
                        color: '#f0ede8',
                      }}
                    >
                      {t}
                    </option>
                  ))}
                </select>

                <span className="absolute right-0 bottom-3 pointer-events-none text-[rgba(240,237,232,0.2)] text-[0.65rem]">
                  ↕
                </span>
              </div>

              {/* Message */}
              <div className="mb-12">
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.54rem',
                    letterSpacing: '0.24em',
                    color: 'rgba(240,237,232,0.52)',
                    textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                  }}
                >
                  Message
                </p>

                <textarea
                  required
                  placeholder="Tell me about your project — timeline, budget, what you have in mind."
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className={`${lineField} resize-none`}
                  style={dmSans}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  style={{
                    ...dmSans,
                    fontSize: '0.75rem',
                    color: 'rgba(230,120,110,0.85)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="group flex items-center gap-4 w-fit transition-all duration-300"
                style={{
                  opacity: sending ? 0.5 : 1,
                  cursor: sending ? 'default' : 'pointer',
                }}
              >
                <span
                  style={{
                    ...dmSans,
                    fontSize: '0.6rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#f0ede8',
                    transition: 'color 300ms',
                  }}
                  className="group-hover:text-[rgba(240,237,232,0.5)]"
                >
                  {sending ? 'Sending...' : 'Send inquiry'}
                </span>

                <span
                  className="block h-px transition-all duration-300 group-hover:w-12"
                  style={{
                    width: '2.5rem',
                    background: 'rgba(240,237,232,0.3)',
                  }}
                />

                <span
                  className="text-[rgba(240,237,232,0.35)] text-sm transition-all duration-300 group-hover:text-[rgba(240,237,232,0.65)] group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

            </form>
          )}

        </div>
      </div>

    </section>
  )
}
