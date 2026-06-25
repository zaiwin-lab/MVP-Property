import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AIAssistant from '@/components/sections/AIAssistant'
import AppointmentForm from '@/components/sections/AppointmentForm'
import LoanEligibilityCalc from '@/components/calculators/LoanEligibilityCalc'
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc'
import ROICalc from '@/components/calculators/ROICalc'
import GoldSparkles from '@/components/GoldSparkles'
import { Calculator, TrendingUp, Home, Play, ArrowRight, MapPin, CheckCircle2, MessageSquare } from 'lucide-react'

const apartments = [
  {
    name: 'Riverine Residences',
    slug: 'riverine',
    location: 'Waterfront, Kuching City',
    priceFrom: 'RM 480,000',
    description:
      'Luxury waterfront living with panoramic views of Sarawak River. Sky pool, private lift lobby, and smart home technology across every unit.',
    highlights: ['River View', 'Sky Pool', 'Private Lift Lobby', 'Smart Home'],
    gradient: 'linear-gradient(160deg, #0d2540 0%, #0a1e3a 40%, #061428 100%)',
    accentColor: '#4a9eca',
    accentBg: 'rgba(74,158,202,0.12)',
    featured: true,
  },
  {
    name: 'SkyVilla Kuching',
    slug: 'skyvilla',
    location: 'Samarahan Expressway',
    priceFrom: 'RM 550,000',
    description:
      'Elevated hillside living with panoramic city views, private gardens, and 24/7 concierge service.',
    highlights: ['Hilltop Location', 'Private Garden', 'EV Charging'],
    gradient: 'linear-gradient(160deg, #1a0f30 0%, #140c28 100%)',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
    featured: false,
  },
  {
    name: 'Milano Eight',
    slug: 'milano-eight',
    location: 'Kota Samarahan',
    priceFrom: 'RM 390,000',
    description:
      'Italian-inspired contemporary living for modern families and savvy investors seeking strong rental returns.',
    highlights: ['Piazza Garden', 'Co-Working Hub', 'Rental Ready'],
    gradient: 'linear-gradient(160deg, #2a1205 0%, #251005 100%)',
    accentColor: '#fb923c',
    accentBg: 'rgba(251,146,60,0.12)',
    featured: false,
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ════════════════════════════════
            HERO — Cinematic full viewport
        ════════════════════════════════ */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #050d1a 0%, #0a1628 40%, #0d1f3c 70%, #071020 100%)',
          }}
        >
          {/* Gold sparkle particles */}
          <GoldSparkles />

          {/* Atmospheric glow layers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)' }}
            />
            <div
              className="absolute top-[30%] -left-64 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(74,158,202,0.04) 0%, transparent 70%)' }}
            />
            {/* Horizon gold rule */}
            <div
              className="absolute top-[42%] left-[5%] w-[20%] h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35))' }}
            />
            <div
              className="absolute top-[42%] right-[5%] w-[20%] h-px"
              style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.35))' }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48"
              style={{ background: 'linear-gradient(to top, #071020, transparent)' }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Founding programme badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10"
              style={{
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.22)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--c-gold-light)',
                textTransform: 'uppercase',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#c9a84c', boxShadow: '0 0 6px #c9a84c' }}
              />
              Founding Property Partners Programme
            </div>

            {/* Main headline — animated gold sweep */}
            <h1
              className="font-display mb-7"
              style={{
                fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                textWrap: 'balance',
              }}
            >
              <span style={{ color: '#ffffff' }}>Kuching&apos;s Finest</span>
              <br />
              <span className="font-display heading-sweep" style={{ fontStyle: 'italic' }}>
                Premium Apartments
              </span>
              <br />
              <span style={{ color: '#ffffff' }}>by Trusted Partners</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '520px',
                margin: '0 auto 2.75rem',
                lineHeight: 1.75,
                textWrap: 'pretty',
              }}
            >
              Explore Riverine, SkyVilla, and Milano Eight with AI-guided
              recommendations. Calculate affordability and book a personalised
              viewing — all in one place.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#apartments" className="btn btn-gold btn-lg">
                Explore Apartments
                <ArrowRight size={17} />
              </Link>
              <Link href="#tools" className="btn btn-outline btn-lg">
                Check Eligibility
              </Link>
              <Link href="#appointment" className="btn btn-ghost btn-lg">
                Book Consultation →
              </Link>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ opacity: 0.28 }}
          >
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', color: '#c9a84c' }}>SCROLL</span>
            <div
              className="w-px h-10"
              style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }}
            />
          </div>
        </section>

        {/* ════════════════════════════════
            APARTMENTS — Asymmetric layout
        ════════════════════════════════ */}
        <section
          id="apartments"
          className="px-6"
          style={{
            backgroundColor: '#071020',
            paddingTop: 'clamp(4rem, 8vw, 8rem)',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          <div className="max-w-7xl mx-auto">

            {/* Section heading — no eyebrow */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 600, lineHeight: 1.18, color: '#ffffff', textWrap: 'balance' }}
              >
                Three Developments.<br />
                <span className="text-gold-gradient">One Concierge.</span>
              </h2>
              <p
                style={{
                  color: 'rgba(255,255,255,0.42)',
                  maxWidth: '320px',
                  fontSize: '0.9rem',
                  lineHeight: 1.75,
                }}
              >
                Riverine, SkyVilla, and Milano Eight — each selected for lifestyle quality,
                location strength, and investment potential.
              </p>
            </div>

            {/* Asymmetric card grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

              {/* Featured card — Riverine (large, left) */}
              {(() => {
                const apt = apartments[0]
                return (
                  <div
                    key={apt.slug}
                    className="apt-card lg:col-span-3"
                    style={{ minHeight: '560px' }}
                  >
                    {/* Art-direction background */}
                    <div
                      className="apt-card-inner absolute inset-0"
                      style={{ background: apt.gradient }}
                    />
                    {/* Waterfront glow */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(74,158,202,0.18) 0%, transparent 60%)' }}
                    />
                    {/* Faux horizon line */}
                    <div
                      className="absolute left-0 right-0"
                      style={{
                        top: '42%',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(74,158,202,0.25) 30%, rgba(74,158,202,0.35) 50%, rgba(74,158,202,0.25) 70%, transparent)',
                      }}
                    />
                    {/* Reflection shimmer */}
                    <div
                      className="absolute left-0 right-0 bottom-0"
                      style={{
                        height: '45%',
                        background: 'linear-gradient(to top, rgba(74,158,202,0.08), transparent)',
                      }}
                    />

                    {/* Featured badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold tracking-wider"
                        style={{
                          background: 'rgba(201,168,76,0.12)',
                          border: '1px solid rgba(201,168,76,0.3)',
                          color: '#e4c97e',
                          letterSpacing: '0.1em',
                          fontSize: '0.62rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Editor&apos;s Choice
                      </span>
                    </div>

                    {/* Content anchored at bottom */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                      <div
                        className="inline-flex items-center gap-1.5 mb-4 w-fit px-3 py-1.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)' }}
                      >
                        <MapPin size={10} style={{ color: apt.accentColor }} />
                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em' }}>
                          {apt.location}
                        </span>
                      </div>

                      <h3
                        className="font-display mb-3"
                        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}
                      >
                        {apt.name}
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '380px' }}>
                        {apt.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {apt.highlights.map((h) => (
                          <span
                            key={h}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                            style={{ background: apt.accentBg, border: `1px solid ${apt.accentColor}30`, fontSize: '0.68rem', color: apt.accentColor }}
                          >
                            <CheckCircle2 size={9} />
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '3px' }}>
                            Starting from
                          </div>
                          <div className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#c9a84c' }}>
                            {apt.priceFrom}
                          </div>
                        </div>
                        <Link href="#appointment" className="btn btn-gold btn-sm">
                          Book Viewing
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Stack — SkyVilla + Milano Eight */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {apartments.slice(1).map((apt) => (
                  <div
                    key={apt.slug}
                    className="apt-card flex-1"
                    style={{ minHeight: '265px' }}
                  >
                    <div
                      className="apt-card-inner absolute inset-0"
                      style={{ background: apt.gradient }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse 80% 70% at 70% 20%, ${apt.accentColor}20 0%, transparent 60%)` }}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <div
                        className="inline-flex items-center gap-1.5 mb-3 w-fit px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)' }}
                      >
                        <MapPin size={9} style={{ color: apt.accentColor }} />
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>
                          {apt.location}
                        </span>
                      </div>

                      <h3
                        className="font-display mb-2"
                        style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', lineHeight: 1.2 }}
                      >
                        {apt.name}
                      </h3>

                      <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: '1rem' }}>
                        {apt.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {apt.highlights.slice(0, 2).map((h) => (
                            <span
                              key={h}
                              className="px-2 py-0.5 rounded-full"
                              style={{ background: apt.accentBg, border: `1px solid ${apt.accentColor}28`, fontSize: '0.62rem', color: apt.accentColor }}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: '#c9a84c', whiteSpace: 'nowrap' }}>
                          {apt.priceFrom}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Invitation-only note */}
            <p
              className="text-center mt-10"
              style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.04em' }}
            >
              All viewings are arranged exclusively through our Founding Property Partners.{' '}
              <Link href="#appointment" style={{ color: 'rgba(201,168,76,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                Book a consultation →
              </Link>
            </p>
          </div>
        </section>

        {/* ════════════════════════════════
            VIDEO — Cinematic showcase
        ════════════════════════════════ */}
        <section
          className="px-6"
          style={{
            backgroundColor: '#0a1628',
            paddingTop: 'clamp(4rem, 8vw, 7rem)',
            paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          }}
        >
          <div className="max-w-5xl mx-auto">

            <div className="text-center mb-14">
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#ffffff', textWrap: 'balance' }}
              >
                See Kuching Living at Its Finest
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.75, fontSize: '0.9rem' }}>
                A curated walkthrough of all three developments — lifestyle, amenities,
                and why Sarawak investors are paying attention.
              </p>
            </div>

            {/* Cinematic video frame */}
            <div
              className="relative mx-auto rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(145deg, #0d1f3c 0%, #071020 100%)',
                border: '1px solid rgba(201,168,76,0.14)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.06), inset 0 1px 0 rgba(201,168,76,0.06)',
              }}
            >
              {/* Inner atmospheric glow */}
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
              />

              {/* Grid overlay — suggests cinematic frame */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Play button */}
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #d4b568 0%, #c9a84c 60%, #8b6914 100%)',
                    boxShadow: '0 0 0 0 rgba(201,168,76,0.4)',
                    animation: 'pulse-ring 2.4s ease-out infinite',
                  }}
                >
                  <Play size={28} color="#050d1a" style={{ marginLeft: '3px' }} />
                </div>
                <p className="font-display" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', fontWeight: 500, marginBottom: '5px' }}>
                  Property Showcase
                </p>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Riverine · SkyVilla · Milano Eight
                </p>
              </div>

              {/* Corner frame accents */}
              {[
                { top: 12, left: 12 },
                { top: 12, right: 12 },
                { bottom: 12, left: 12 },
                { bottom: 12, right: 12 },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6"
                  style={{
                    ...pos,
                    borderTop: i < 2 ? '1px solid rgba(201,168,76,0.35)' : 'none',
                    borderBottom: i >= 2 ? '1px solid rgba(201,168,76,0.35)' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid rgba(201,168,76,0.35)' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid rgba(201,168,76,0.35)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            TOOLS — Financial calculators
        ════════════════════════════════ */}
        <section
          id="tools"
          className="px-6"
          style={{
            backgroundColor: '#071020',
            paddingTop: 'clamp(4rem, 8vw, 8rem)',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#ffffff' }}
              >
                Property Financial Toolkit
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.42)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.75, fontSize: '0.9rem' }}>
                Make confident decisions with calculators built specifically
                for Kuching property buyers and investors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Home,
                  title: 'Home Loan Eligibility',
                  sub: 'How much can you borrow?',
                  component: <LoanEligibilityCalc />,
                  color: '#4a9eca',
                },
                {
                  icon: Calculator,
                  title: 'Affordability Calculator',
                  sub: 'Monthly instalment estimate',
                  component: <AffordabilityCalc />,
                  color: '#c9a84c',
                },
                {
                  icon: TrendingUp,
                  title: 'Investment ROI',
                  sub: 'Rental yield & 5-year returns',
                  component: <ROICalc />,
                  color: '#4ade80',
                },
              ].map(({ icon: Icon, title, sub, component, color }) => (
                <div
                  key={title}
                  className="tool-card rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #112240 0%, #0d1f3c 100%)',
                    border: '1px solid rgba(201,168,76,0.1)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div
                    className="px-6 py-5 flex items-center gap-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#ffffff' }}>{title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>{sub}</div>
                    </div>
                  </div>
                  <div className="p-6">{component}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            AI CONCIERGE — Feature section
        ════════════════════════════════ */}
        <section
          className="px-6"
          style={{
            background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)',
            borderTop: '1px solid rgba(201,168,76,0.07)',
            borderBottom: '1px solid rgba(201,168,76,0.07)',
            paddingTop: 'clamp(4rem, 8vw, 8rem)',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

              {/* Copy */}
              <div>
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.22, textWrap: 'balance' }}
                >
                  Your Personal Property Guide,{' '}
                  <span className="text-gold-gradient font-display" style={{ fontStyle: 'italic' }}>Available 24/7</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: 1.78, fontSize: '0.92rem', marginBottom: '2rem' }}>
                  Ask anything — apartment comparisons, pricing, eligibility, investment
                  yield — and get instant, accurate answers. The AI concierge guides you
                  from first question to booked appointment.
                </p>

                <div className="flex flex-col gap-3.5 mb-8">
                  {[
                    'Compare all three apartments in one conversation',
                    'Instant answers on pricing, ROI, and loan eligibility',
                    'Book appointments directly through the chat',
                  ].map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.28)' }}
                      >
                        <CheckCircle2 size={10} style={{ color: '#c9a84c' }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', fontSize: '0.62rem', fontWeight: 800, color: '#050d1a' }}
                  >
                    AI
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
                    Tap the gold button at the bottom-right to begin
                  </p>
                </div>
              </div>

              {/* Mock chat preview */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(5,13,26,0.85)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.05)',
                }}
              >
                {/* Chat header */}
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(201,168,76,0.09)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      color: '#050d1a',
                      boxShadow: '0 0 12px rgba(201,168,76,0.35)',
                    }}
                  >
                    AI
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Property Concierge</div>
                    <div style={{ fontSize: '0.65rem', color: '#4ade80', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                      Online now
                    </div>
                  </div>
                  <div className="ml-auto">
                    <MessageSquare size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </div>
                </div>

                {/* Messages */}
                <div className="p-5 flex flex-col gap-4">
                  {/* AI */}
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] self-start"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.12)' }}
                  >
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                      Hello! I can help you explore Riverine, SkyVilla, and Milano Eight. What brings you here today?
                    </p>
                  </div>
                  {/* User */}
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] self-end"
                    style={{ background: 'rgba(201,168,76,0.14)' }}
                  >
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                      Looking under RM 500k with good rental yield
                    </p>
                  </div>
                  {/* AI */}
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] self-start"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.12)' }}
                  >
                    <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                      Milano Eight starts at RM 390,000 with strong rental yields — designed specifically for investors. Shall I walk you through the ROI numbers?
                    </p>
                  </div>

                  {/* Quick replies */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Show ROI details', 'Compare apartments', 'Book a viewing'].map((r) => (
                      <span
                        key={r}
                        className="px-3 py-1.5 rounded-full cursor-pointer"
                        style={{
                          border: '1px solid rgba(201,168,76,0.22)',
                          color: 'rgba(255,255,255,0.45)',
                          fontSize: '0.7rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            APPOINTMENT — Booking
        ════════════════════════════════ */}
        <section
          id="appointment"
          className="px-6"
          style={{
            backgroundColor: '#071020',
            paddingTop: 'clamp(4rem, 8vw, 8rem)',
            paddingBottom: 'clamp(4rem, 8vw, 8rem)',
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

              {/* Left — copy */}
              <div className="lg:col-span-2">
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25, textWrap: 'balance' }}
                >
                  Schedule Your<br />
                  <span className="text-gold-gradient font-display" style={{ fontStyle: 'italic' }}>Property Viewing</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.46)', lineHeight: 1.78, fontSize: '0.92rem', marginBottom: '2.5rem' }}>
                  Meet a trusted property partner for a personalised tour. No obligation
                  — expert guidance tailored to your goals.
                </p>

                <div className="flex flex-col gap-5">
                  {[
                    ['In-person or virtual', 'Choose the format that suits you'],
                    ['Partner consultation', 'Not a generic sales pitch'],
                    ['WhatsApp confirmation', 'Instant booking confirmation'],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-3.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.18)' }}
                      >
                        <CheckCircle2 size={14} style={{ color: '#c9a84c' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>{title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.36)' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gold divider */}
                <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.24)', lineHeight: 1.7 }}>
                    All consultations are conducted exclusively through our Founding Property Partners.
                    Each partner is carefully vetted by KOBIS Berhad.
                  </p>
                </div>
              </div>

              {/* Right — form */}
              <div
                className="lg:col-span-3 rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(180deg, #112240 0%, #0d1f3c 100%)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  boxShadow: '0 16px 60px rgba(0,0,0,0.4)',
                }}
              >
                <AppointmentForm />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <AIAssistant partnerName="" />
    </>
  )
}
