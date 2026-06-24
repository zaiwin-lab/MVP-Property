'use client'

import Link from 'next/link'
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#050d1a',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse at center bottom, rgba(201,168,76,0.04), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* Top — CTA bar */}
        <div
          style={{
            padding: '48px 0',
            borderBottom: '1px solid rgba(201,168,76,0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '8px',
              }}
            >
              Limited Slots Available
            </p>
            <h3
              className="font-display"
              style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}
            >
              Join as a Founding Property Partner
            </h3>
          </div>
          <a
            href="https://wa.me/60112345678?text=Hello%20KOBIS%2C%20I%20am%20interested%20in%20joining%20as%20a%20Founding%20Property%20Partner."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            <MessageCircle size={16} />
            Enquire on WhatsApp
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Middle — grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '48px',
            padding: '56px 0',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '16px' }}>
              <span
                className="font-display"
                style={{ color: '#c9a84c', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.15em', display: 'block' }}
              >
                KOBIS
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '4px',
                }}
              >
                Property Concierge
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '20px' }}>
              Kuching&apos;s first AI-powered property concierge platform — connecting investors
              with trusted partners for Sarawak&apos;s finest developments.
            </p>
            <div
              style={{
                height: '1px',
                background: 'linear-gradient(to right, rgba(201,168,76,0.3), transparent)',
                marginBottom: '20px',
              }}
            />
            <a
              href="https://wa.me/60112345678"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#4ade80',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'background 0.2s ease',
              }}
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>

          {/* Properties */}
          <div>
            <h4
              style={{
                color: '#c9a84c',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Properties
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Riverine Residences', 'SkyVilla Kuching', 'Milano Eight'].map((p) => (
                <li key={p}>
                  <Link
                    href="/#apartments"
                    style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#ffffff')}
                    onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4
              style={{
                color: '#c9a84c',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Smart Tools
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Loan Eligibility Calculator', 'Affordability Calculator', 'Investment ROI Calculator'].map((t) => (
                <li key={t}>
                  <Link
                    href="/#tools"
                    style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#ffffff')}
                    onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: '#c9a84c',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              Contact
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={13} style={{ color: '#c9a84c', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.5 }}>Kuching, Sarawak, Malaysia</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={13} style={{ color: '#c9a84c' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>+60 11-2345 6789</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={13} style={{ color: '#c9a84c' }} />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>hello@kobis.com.my</span>
              </li>
            </ul>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Partner Access
              </p>
              <Link
                href="/login"
                style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#c9a84c')}
                onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(201,168,76,0.6)')}
              >
                Partner Login →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(201,168,76,0.08)',
            padding: '24px 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>
            © 2026 KOBIS Property Concierge. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              }}
            />
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Founding Property Partners Programme — By Invitation Only
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
