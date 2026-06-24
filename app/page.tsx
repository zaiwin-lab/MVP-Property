import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AIAssistant from '@/components/sections/AIAssistant'
import AppointmentForm from '@/components/sections/AppointmentForm'
import LoanEligibilityCalc from '@/components/calculators/LoanEligibilityCalc'
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc'
import ROICalc from '@/components/calculators/ROICalc'
import { Calculator, TrendingUp, Home, Play, ArrowRight, MapPin, Star, CheckCircle2 } from 'lucide-react'

const apartments = [
  {
    name: 'Riverine Residences',
    slug: 'riverine',
    location: 'Waterfront, Kuching City',
    priceFrom: 'RM 480,000',
    description:
      'Luxury waterfront living with panoramic views of Sarawak River. Premium finishes, resort-style facilities, and unmatched urban connectivity.',
    highlights: ['River View Units', 'Sky Pool', 'Private Lift Lobby', 'Smart Home'],
    bg: 'linear-gradient(160deg, #0d2540 0%, #163a5f 50%, #0a1e3a 100%)',
    accentColor: '#4a9eca',
    accentBg: 'rgba(74,158,202,0.12)',
    number: '01',
  },
  {
    name: 'SkyVilla Kuching',
    slug: 'skyvilla',
    location: 'Samarahan Expressway',
    priceFrom: 'RM 550,000',
    description:
      'Elevated hillside living with panoramic city & mountain views. Exclusive villa-style units with private gardens and round-the-clock concierge.',
    highlights: ['Hilltop Location', 'Private Garden', 'Concierge 24/7', 'EV Charging'],
    bg: 'linear-gradient(160deg, #1a0f30 0%, #2d1a52 50%, #140c28 100%)',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
    number: '02',
  },
  {
    name: 'Milano Eight',
    slug: 'milano-eight',
    location: 'Kota Samarahan',
    priceFrom: 'RM 390,000',
    description:
      'Italian-inspired contemporary living. Thoughtfully designed spaces for modern families and savvy investors seeking strong rental returns.',
    highlights: ['Italian Design', 'Piazza Garden', 'Co-Working Hub', 'Rental Ready'],
    bg: 'linear-gradient(160deg, #2a1205 0%, #3d1c08 50%, #251005 100%)',
    accentColor: '#fb923c',
    accentBg: 'rgba(251,146,60,0.12)',
    number: '03',
  },
]

const stats = [
  { value: '3', label: 'Premium Developments', suffix: '' },
  { value: '10', label: 'Founding Partners', suffix: '' },
  { value: '100', label: 'Introducers per Partner', suffix: '+' },
  { value: '24', label: 'AI Availability', suffix: '/7' },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">

        {/* ═══════════════════════════════════════════════════
            HERO — Full viewport, cinematic
        ═══════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #050d1a 0%, #0a1628 35%, #0d1f3c 65%, #071020 100%)',
          }}
        >
          {/* Background glow orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div
              className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.04] animate-glow-pulse"
              style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }}
            />
            <div
              className="absolute -bottom-60 -right-60 w-[800px] h-[800px] rounded-full opacity-[0.03]"
              style={{ background: 'radial-gradient(circle, #4a9eca, transparent 70%)' }}
            />
            {/* Horizontal gold rule lines */}
            <div
              className="absolute top-[38%] left-0 w-[30%] h-px opacity-30"
              style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }}
            />
            <div
              className="absolute top-[38%] right-0 w-[30%] h-px opacity-30"
              style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }}
            />
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-40"
              style={{ background: 'linear-gradient(to top, #0a1628, transparent)' }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Founding badge */}
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-up">
              <div className="badge badge-gold">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-gold"
                  style={{ backgroundColor: '#c9a84c' }}
                />
                Founding Property Partners Programme
              </div>
            </div>

            {/* Main headline — serif */}
            <h1
              className="font-display mb-6 animate-fade-up delay-100"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.12,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              Find Your Ideal{' '}
              <span
                className="font-display"
                style={{
                  background: 'linear-gradient(135deg, #e4c97e 0%, #c9a84c 50%, #8b6914 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontStyle: 'italic',
                }}
              >
                Apartment
              </span>
              <br />in Kuching
            </h1>

            <p
              className="mb-10 animate-fade-up delay-200"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '580px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              Explore selected premium apartments, calculate affordability, and book a
              personalised consultation with a trusted property partner — all in one place.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-up delay-300">
              <Link href="#apartments" className="btn btn-gold btn-lg">
                Explore Apartments
                <ArrowRight size={18} />
              </Link>
              <Link href="#tools" className="btn btn-outline btn-lg">
                Check Eligibility
              </Link>
              <Link href="#appointment" className="btn btn-ghost btn-lg">
                Book Consultation →
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 pt-10 animate-fade-up delay-400"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-display mb-1"
                    style={{ fontSize: '2rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}
                  >
                    {s.value}{s.suffix}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a84c' }}>SCROLL</span>
            <div
              className="w-px h-8"
              style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            APARTMENTS — Premium card grid
        ═══════════════════════════════════════════════════ */}
        <section
          id="apartments"
          className="section-pad px-6"
          style={{ backgroundColor: '#071020' }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <p className="label-gold mb-3">Featured Properties</p>
                <h2
                  className="font-display"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2, color: '#ffffff' }}
                >
                  Selected Premium<br />
                  <span className="gold-gradient">Kuching Apartments</span>
                </h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '340px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Three carefully selected developments offering the best combination of lifestyle,
                location, and investment potential in Sarawak.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {apartments.map((apt) => (
                <div
                  key={apt.slug}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    minHeight: '520px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: apt.bg,
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  />

                  {/* Decorative mesh */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 20%, ${apt.accentColor}22 0%, transparent 50%)`,
                    }}
                  />

                  {/* Number watermark */}
                  <div
                    className="absolute top-6 right-6 font-display opacity-10"
                    style={{ fontSize: '6rem', fontWeight: 700, color: apt.accentColor, lineHeight: 1 }}
                  >
                    {apt.number}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    {/* Location pill */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 w-fit"
                      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
                    >
                      <MapPin size={11} style={{ color: apt.accentColor }} />
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em' }}>
                        {apt.location}
                      </span>
                    </div>

                    <h3
                      className="font-display mb-3"
                      style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}
                    >
                      {apt.name}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                      {apt.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {apt.highlights.map((h) => (
                        <span
                          key={h}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                          style={{ background: apt.accentBg, border: `1px solid ${apt.accentColor}30`, fontSize: '0.68rem', color: apt.accentColor, letterSpacing: '0.04em' }}
                        >
                          <CheckCircle2 size={10} />
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Starting from
                        </div>
                        <div
                          className="font-display"
                          style={{ fontSize: '1.25rem', fontWeight: 700, color: '#c9a84c' }}
                        >
                          {apt.priceFrom}
                        </div>
                      </div>
                      <Link
                        href="#appointment"
                        className="btn btn-gold btn-sm"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Book Viewing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            VIDEO — Cinematic showcase
        ═══════════════════════════════════════════════════ */}
        <section
          className="section-pad px-6"
          style={{ backgroundColor: '#0a1628' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="label-gold mb-3">Property Tour</p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: '#ffffff' }}
              >
                See the Properties in Action
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
                Watch our curated walkthrough of all three developments — lifestyle,
                amenities, and why Kuching investors are paying attention.
              </p>
            </div>

            {/* Video container */}
            <div
              className="relative rounded-3xl overflow-hidden mx-auto"
              style={{
                background: 'linear-gradient(135deg, #0d1f3c, #112240)',
                border: '1px solid rgba(201,168,76,0.15)',
                aspectRatio: '16/9',
                boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
              }}
            >
              {/* Glow behind video */}
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'radial-gradient(ellipse at center, #c9a84c20, transparent 70%)' }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 cursor-pointer animate-pulse-gold"
                  style={{
                    background: 'linear-gradient(135deg, #d4b568, #c9a84c)',
                    boxShadow: '0 0 40px rgba(201,168,76,0.4)',
                  }}
                >
                  <Play size={28} color="#050d1a" style={{ marginLeft: '3px' }} />
                </div>
                <p className="font-display" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px' }}>
                  Property Showcase Video
                </p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                  Riverine · SkyVilla · Milano Eight
                </p>
              </div>
              {/* Replace with actual YouTube embed when ready:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
            </div>

            {/* Trust signals below video */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 pt-10"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              {[
                { icon: Star, text: '3 Premium Developments' },
                { icon: CheckCircle2, text: 'Trusted Property Partners' },
                { icon: Home, text: 'AI-Powered Guidance' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 justify-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(201,168,76,0.1)' }}
                  >
                    <Icon size={15} style={{ color: '#c9a84c' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            TOOLS — Three calculators
        ═══════════════════════════════════════════════════ */}
        <section
          id="tools"
          className="section-pad px-6"
          style={{ backgroundColor: '#071020' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="label-gold mb-3">Smart Tools</p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 600, color: '#ffffff' }}
              >
                Property Financial Toolkit
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
                Make confident decisions with our suite of financial calculators — built
                specifically for Kuching property buyers and investors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Home,
                  title: 'Home Loan Eligibility',
                  sub: 'Find how much you can borrow',
                  component: <LoanEligibilityCalc />,
                  color: '#4a9eca',
                },
                {
                  icon: Calculator,
                  title: 'Affordability Calculator',
                  sub: 'Calculate your monthly instalment',
                  component: <AffordabilityCalc />,
                  color: '#c9a84c',
                },
                {
                  icon: TrendingUp,
                  title: 'Investment ROI',
                  sub: 'Estimate your rental yield & returns',
                  component: <ROICalc />,
                  color: '#4ade80',
                },
              ].map(({ icon: Icon, title, sub, component, color }) => (
                <div
                  key={title}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(180deg, #112240 0%, #0d1f3c 100%)',
                    border: '1px solid rgba(201,168,76,0.1)',
                    transition: 'border-color 0.3s ease',
                  }}
                >
                  {/* Tool header */}
                  <div
                    className="px-6 py-5 flex items-center gap-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>{title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{sub}</div>
                    </div>
                  </div>

                  {/* Calculator body */}
                  <div className="p-6">{component}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            AI CONCIERGE — Feature callout
        ═══════════════════════════════════════════════════ */}
        <section
          className="section-pad px-6"
          style={{
            background: 'linear-gradient(135deg, #0d1f3c 0%, #112240 50%, #0d1f3c 100%)',
            borderTop: '1px solid rgba(201,168,76,0.08)',
            borderBottom: '1px solid rgba(201,168,76,0.08)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Left — text */}
              <div>
                <p className="label-gold mb-4">AI Property Concierge</p>
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25 }}
                >
                  Your Personal Property<br />
                  <span className="gold-gradient">Guide, Available 24/7</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2rem' }}>
                  Our AI assistant answers your property questions, helps you explore apartments,
                  and guides you through the consultation process — available any hour of the day.
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {[
                    'Explore all three apartments with one conversation',
                    'Get instant answers on pricing, ROI & eligibility',
                    'Book appointments directly through the chat',
                  ].map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
                      >
                        <CheckCircle2 size={11} style={{ color: '#c9a84c' }} />
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)' }}>{feat}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
                  Click the gold button at the bottom-right corner to start →
                </p>
              </div>

              {/* Right — example chat preview */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(5,13,26,0.8)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Chat header */}
                <div
                  className="px-5 py-4 flex items-center gap-3"
                  style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse-gold"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', fontSize: '0.7rem', fontWeight: 700, color: '#050d1a' }}
                  >
                    AI
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Property Concierge</div>
                    <div style={{ fontSize: '0.68rem', color: '#4ade80', letterSpacing: '0.06em' }}>● Online now</div>
                  </div>
                </div>

                {/* Mock messages */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="chat-bubble-ai">
                    Hello! I&apos;m your AI Property Concierge. I can help you explore Riverine, SkyVilla, and Milano Eight. What are you looking for today?
                  </div>
                  <div className="chat-bubble-user">
                    I&apos;m looking for something under RM 500k with good rental yield
                  </div>
                  <div className="chat-bubble-ai">
                    Great choice! Milano Eight starts from RM 390,000 and is rental-ready with strong yields. Shall I walk you through the details and help you book a viewing?
                  </div>

                  {/* Quick replies */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {['Tell me more', 'Check ROI', 'Book viewing'].map((r) => (
                      <span
                        key={r}
                        className="px-3 py-1.5 rounded-full cursor-pointer"
                        style={{ border: '1px solid rgba(201,168,76,0.25)', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}
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

        {/* ═══════════════════════════════════════════════════
            APPOINTMENT — Booking form
        ═══════════════════════════════════════════════════ */}
        <section
          id="appointment"
          className="section-pad px-6"
          style={{ backgroundColor: '#071020' }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left — copy */}
              <div className="lg:col-span-2">
                <p className="label-gold mb-4">Book a Consultation</p>
                <h2
                  className="font-display mb-5"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.25 }}
                >
                  Schedule Your<br />
                  <span className="gold-gradient">Property Viewing</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                  Meet with a trusted property partner for a personalised tour. No obligation —
                  just an expert consultation tailored to your goals.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    ['In-person or virtual viewing', 'Choose what suits you'],
                    ['Expert partner consultation', 'Not a generic sales pitch'],
                    ['WhatsApp confirmation', 'Instant booking confirmation'],
                  ].map(([title, sub]) => (
                    <div key={title} className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
                      >
                        <CheckCircle2 size={14} style={{ color: '#c9a84c' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>{title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — form */}
              <div
                className="lg:col-span-3 rounded-2xl p-8"
                style={{
                  background: 'linear-gradient(180deg, #112240 0%, #0d1f3c 100%)',
                  border: '1px solid rgba(201,168,76,0.12)',
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
