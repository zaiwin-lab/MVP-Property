import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AIAssistant from '@/components/sections/AIAssistant'
import AppointmentForm from '@/components/sections/AppointmentForm'
import LoanEligibilityCalc from '@/components/calculators/LoanEligibilityCalc'
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc'
import ROICalc from '@/components/calculators/ROICalc'
import { MessageCircle, Home, Calculator, TrendingUp, MapPin, Star, Award } from 'lucide-react'

// Mock partner data (replace with DB query once seeded)
const MOCK_PARTNERS: Record<string, {
  id: string
  name: string
  slug: string
  whatsapp: string
  photo?: string
  bio?: string
}> = {
  fizan: {
    id: 'partner_fizan',
    name: 'Fizan Abdullah',
    slug: 'fizan',
    whatsapp: '60111234567',
    bio: 'With 8 years of experience in Kuching real estate, I specialise in helping first-time buyers and investors find the perfect apartment. Let me guide you through the process — from selection to financing to key collection.',
  },
  amin: {
    id: 'partner_amin',
    name: 'Mohd Amin Razali',
    slug: 'amin',
    whatsapp: '60119876543',
    bio: 'A trusted property consultant focused on Kuching\'s premium segment. I have helped over 200 clients secure their dream apartments and investment properties across Sarawak.',
  },
  raju: {
    id: 'partner_raju',
    name: 'Raju Krishnamurthy',
    slug: 'raju',
    whatsapp: '60118765432',
    bio: 'Investment-focused property consultant with expertise in Kuching\'s growing property market. I provide detailed ROI analysis and financing guidance to maximise your investment returns.',
  },
}

// Mock introducer data
const MOCK_INTRODUCERS: Record<string, { name: string; partnerSlug: string }> = {
  'FIZ001': { name: 'Ahmad Sufian', partnerSlug: 'fizan' },
  'FIZ002': { name: 'Nur Aisyah', partnerSlug: 'fizan' },
  'AMN001': { name: 'Tan Wei Liang', partnerSlug: 'amin' },
  'RAJ001': { name: 'Priya Suresh', partnerSlug: 'raju' },
}

const apartments = [
  {
    name: 'Riverine Residences',
    location: 'Waterfront, Kuching City',
    priceFrom: 'RM 480,000',
    description: 'Luxury waterfront living with panoramic views of Sarawak River.',
    gradient: 'linear-gradient(135deg, #1a3a5c, #0d2a45)',
    accent: '#4a9eca',
  },
  {
    name: 'SkyVilla Kuching',
    location: 'Samarahan Expressway',
    priceFrom: 'RM 550,000',
    description: 'Elevated hillside living with panoramic city and mountain views.',
    gradient: 'linear-gradient(135deg, #2d1a4a, #1a0f2e)',
    accent: '#9b59b6',
  },
  {
    name: 'Milano Eight',
    location: 'Kota Samarahan',
    priceFrom: 'RM 390,000',
    description: 'Italian-inspired contemporary living in the heart of Kota Samarahan.',
    gradient: 'linear-gradient(135deg, #3d2010, #2a1508)',
    accent: '#e67e22',
  },
]

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ ref?: string }>
}

export default async function PartnerPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { ref } = await searchParams

  const partner = MOCK_PARTNERS[slug]

  if (!partner) {
    notFound()
  }

  const introducer = ref ? MOCK_INTRODUCERS[ref] : null
  const validIntroducer =
    introducer && introducer.partnerSlug === slug ? introducer : null

  const waMessage = encodeURIComponent(
    `Hi ${partner.name}! I found your page on KB Kuching Top Apartments website. I am interested in learning more about the properties.`
  )
  const waLink = `https://wa.me/${partner.whatsapp}?text=${waMessage}`

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ─── PARTNER HERO ─── */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #071020 0%, #0a1628 40%, #0d1f3c 70%, #071020 100%)',
          }}
        >
          {/* Background decoratives */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute top-1/4 left-0 w-1/3 h-px opacity-20"
              style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }}
            />
            <div
              className="absolute top-1/4 right-0 w-1/3 h-px opacity-20"
              style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5"
              style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Introducer badge */}
            {validIntroducer && (
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    border: '1px solid rgba(201,168,76,0.4)',
                    color: '#c9a84c',
                    backgroundColor: 'rgba(201,168,76,0.08)',
                  }}
                >
                  <Star size={12} />
                  Introduced by {validIntroducer.name}
                </div>
              </div>
            )}

            {/* Partner avatar */}
            <div
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #a88630)',
                color: '#0a1628',
              }}
            >
              {partner.name.charAt(0)}
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-4"
              style={{
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#c9a84c',
              }}
            >
              <Award size={11} />
              Verified Property Partner
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Meet {partner.name}
            </h1>
            <p className="text-lg" style={{ color: '#c9a84c' }}>
              Your Property Concierge for Selected Kuching Apartments
            </p>

            <div className="w-24 h-px mx-auto my-6" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />

            {/* Bio */}
            <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
              {partner.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-sm"
                style={{ backgroundColor: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={18} />
                WhatsApp {partner.name.split(' ')[0]}
              </a>
              <a
                href="#appointment"
                className="px-8 py-4 rounded font-semibold text-sm"
                style={{ border: '1px solid rgba(201,168,76,0.5)', color: '#c9a84c' }}
              >
                Book Appointment
              </a>
            </div>
          </div>
        </section>

        {/* ─── APARTMENTS ─── */}
        <section
          id="apartments"
          className="py-24 px-4"
          style={{ backgroundColor: '#071020' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#c9a84c' }}>
                Available Properties
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">
                {partner.name.split(' ')[0]}&apos;s Property Portfolio
              </h2>
              <p className="text-white/50 max-w-lg mx-auto">
                Curated selection of Kuching&apos;s finest apartments available through {partner.name.split(' ')[0]}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {apartments.map((apt) => (
                <div
                  key={apt.name}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: '#112240',
                    border: '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  <div
                    className="h-44 flex flex-col items-center justify-center"
                    style={{ background: apt.gradient }}
                  >
                    <Home size={28} style={{ color: apt.accent }} className="mb-2" />
                    <h3 className="text-white font-bold">{apt.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} style={{ color: apt.accent }} />
                      <span className="text-white/60 text-xs">{apt.location}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-wider mb-2" style={{ color: '#c9a84c' }}>
                      From {apt.priceFrom}
                    </p>
                    <p className="text-white/60 text-sm mb-4">{apt.description}</p>
                    <a
                      href="#appointment"
                      className="block text-center py-2.5 rounded text-sm font-semibold"
                      style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
                    >
                      Book Viewing with {partner.name.split(' ')[0]}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINANCIAL TOOLS ─── */}
        <section
          id="tools"
          className="py-24 px-4"
          style={{ backgroundColor: '#0a1628' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#c9a84c' }}>
                Smart Tools
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">Property Financial Calculators</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { icon: Home, title: 'Loan Eligibility', comp: <LoanEligibilityCalc /> },
                { icon: Calculator, title: 'Affordability', comp: <AffordabilityCalc /> },
                { icon: TrendingUp, title: 'Investment ROI', comp: <ROICalc /> },
              ].map(({ icon: Icon, title, comp }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: '#112240',
                    border: '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}
                    >
                      <Icon size={20} style={{ color: '#c9a84c' }} />
                    </div>
                    <h3 className="text-white font-semibold">{title}</h3>
                  </div>
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── APPOINTMENT ─── */}
        <section
          id="appointment"
          className="py-24 px-4"
          style={{ backgroundColor: '#071020' }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#c9a84c' }}>
                Book a Viewing
              </p>
              <h2 className="text-3xl font-bold text-white mb-4">
                Meet {partner.name}
              </h2>
              <p className="text-white/50">
                Schedule a personal consultation with {partner.name.split(' ')[0]} to explore your ideal apartment.
              </p>
            </div>

            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: '#112240',
                border: '1px solid rgba(201,168,76,0.12)',
              }}
            >
              <AppointmentForm
                partnerId={partner.id}
                partnerName={partner.name}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant partnerName={partner.name} partnerId={partner.id} />
    </>
  )
}
