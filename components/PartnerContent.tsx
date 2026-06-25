'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AIAssistant from '@/components/sections/AIAssistant'
import AppointmentForm from '@/components/sections/AppointmentForm'
import LoanEligibilityCalc from '@/components/calculators/LoanEligibilityCalc'
import AffordabilityCalc from '@/components/calculators/AffordabilityCalc'
import ROICalc from '@/components/calculators/ROICalc'
import GoldSparkles from '@/components/GoldSparkles'
import { MessageCircle, Home, Calculator, TrendingUp, MapPin, Star, Award } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

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

interface Props {
  partner: {
    id: string
    name: string
    slug: string
    whatsapp: string
    bio?: string
  }
  introducer: { name: string } | null
  waLink: string
}

export default function PartnerContent({ partner, introducer, waLink }: Props) {
  const { t } = useT()
  const pt = t.partner
  const firstName = partner.name.split(' ')[0]

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Partner Hero */}
        <section
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #071020 0%, #0a1628 40%, #0d1f3c 70%, #071020 100%)' }}
        >
          <GoldSparkles />
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-0 w-1/3 h-px opacity-20" style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
            <div className="absolute top-1/4 right-0 w-1/3 h-px opacity-20" style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {introducer && (
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide"
                  style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c', backgroundColor: 'rgba(201,168,76,0.08)' }}
                >
                  <Star size={12} />
                  {pt.introducedBy} {introducer.name}
                </div>
              </div>
            )}

            <div
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #a88630)', color: '#0a1628' }}
            >
              {partner.name.charAt(0)}
            </div>

            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-4"
              style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
            >
              <Award size={11} />
              {pt.verified}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              {pt.meetPartner} {partner.name}
            </h1>
            <p className="text-lg" style={{ color: '#c9a84c' }}>{pt.concierge}</p>

            <div className="w-24 h-px mx-auto my-6" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />

            <p className="text-white/60 max-w-xl mx-auto leading-relaxed mb-8">{partner.bio}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-semibold text-sm"
                style={{ backgroundColor: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={18} />
                WhatsApp {firstName}
              </a>
              <Link
                href="#appointment"
                className="px-8 py-4 rounded font-semibold text-sm"
                style={{ border: '1px solid rgba(201,168,76,0.5)', color: '#c9a84c' }}
              >
                {pt.bookAppt}
              </Link>
            </div>
          </div>
        </section>

        {/* Apartments */}
        <section id="apartments" className="py-24 px-4" style={{ backgroundColor: '#071020' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                {firstName}{pt.portfolio}
              </h2>
              <p className="text-white/50 max-w-lg mx-auto">
                {pt.portDesc} {firstName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {apartments.map(apt => (
                <div
                  key={apt.name}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: '#112240', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <div className="h-44 flex flex-col items-center justify-center" style={{ background: apt.gradient }}>
                    <Home size={28} style={{ color: apt.accent }} className="mb-2" />
                    <h3 className="text-white font-bold">{apt.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={11} style={{ color: apt.accent }} />
                      <span className="text-white/60 text-xs">{apt.location}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-wider mb-2" style={{ color: '#c9a84c' }}>
                      {t.apartments.startingFrom} {apt.priceFrom}
                    </p>
                    <p className="text-white/60 text-sm mb-4">{apt.description}</p>
                    <Link
                      href="#appointment"
                      className="block text-center py-2.5 rounded text-sm font-semibold"
                      style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
                    >
                      {pt.bookWith} {firstName}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Tools */}
        <section id="tools" className="py-24 px-4" style={{ backgroundColor: '#0a1628' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-white mb-4">{pt.financialCalc}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { icon: Home, title: t.tools.loan.title, comp: <LoanEligibilityCalc /> },
                { icon: Calculator, title: t.tools.afford.title, comp: <AffordabilityCalc /> },
                { icon: TrendingUp, title: t.tools.roi.title, comp: <ROICalc /> },
              ].map(({ icon: Icon, title, comp }) => (
                <div key={title} className="rounded-2xl p-6" style={{ backgroundColor: '#112240', border: '1px solid rgba(201,168,76,0.12)' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(201,168,76,0.12)' }}>
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

        {/* Appointment */}
        <section id="appointment" className="py-24 px-4" style={{ backgroundColor: '#071020' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-white mb-4">{pt.meetPartner} {partner.name}</h2>
              <p className="text-white/50">
                {pt.schedule} {firstName} {pt.scheduleSub}
              </p>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#112240', border: '1px solid rgba(201,168,76,0.12)' }}>
              <AppointmentForm partnerId={partner.id} partnerName={partner.name} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant partnerName={partner.name} partnerId={partner.id} />
    </>
  )
}
