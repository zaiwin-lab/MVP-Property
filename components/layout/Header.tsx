'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        background: scrolled
          ? 'rgba(7, 16, 32, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: '#c9a84c',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                KOBIS
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginTop: '3px',
                }}
                className="hidden sm:block"
              >
                Property Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Apartments', href: '/#apartments' },
              { label: 'Smart Tools', href: '/#tools' },
              { label: 'Book Viewing', href: '/#appointment' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLAnchorElement).style.color = '#ffffff'
                  ;(e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)'
                  ;(e.target as HTMLAnchorElement).style.background = 'transparent'
                }}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/login"
              style={{
                marginLeft: '12px',
                padding: '9px 22px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                border: '1px solid rgba(201,168,76,0.4)',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#c9a84c'
                el.style.color = '#050d1a'
                el.style.borderColor = '#c9a84c'
                el.style.boxShadow = '0 4px 16px rgba(201,168,76,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.color = '#c9a84c'
                el.style.borderColor = 'rgba(201,168,76,0.4)'
                el.style.boxShadow = 'none'
              }}
            >
              Partner Login
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(5, 13, 26, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
          className="md:hidden"
        >
          {[
            { label: 'Apartments', href: '/#apartments' },
            { label: 'Smart Tools', href: '/#tools' },
            { label: 'Book Viewing', href: '/#appointment' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '14px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #d4b568, #c9a84c)',
                color: '#050d1a',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Partner Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
