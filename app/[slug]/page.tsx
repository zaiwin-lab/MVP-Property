import { notFound } from 'next/navigation'
import PartnerContent from '@/components/PartnerContent'

const MOCK_PARTNERS: Record<string, {
  id: string
  name: string
  slug: string
  whatsapp: string
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
    bio: "A trusted property consultant focused on Kuching's premium segment. I have helped over 200 clients secure their dream apartments and investment properties across Sarawak.",
  },
  raju: {
    id: 'partner_raju',
    name: 'Raju Krishnamurthy',
    slug: 'raju',
    whatsapp: '60118765432',
    bio: "Investment-focused property consultant with expertise in Kuching's growing property market. I provide detailed ROI analysis and financing guidance to maximise your investment returns.",
  },
}

const MOCK_INTRODUCERS: Record<string, { name: string; partnerSlug: string }> = {
  'FIZ001': { name: 'Ahmad Sufian', partnerSlug: 'fizan' },
  'FIZ002': { name: 'Nur Aisyah', partnerSlug: 'fizan' },
  'AMN001': { name: 'Tan Wei Liang', partnerSlug: 'amin' },
  'RAJ001': { name: 'Priya Suresh', partnerSlug: 'raju' },
}

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ ref?: string }>
}

export default async function PartnerPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { ref } = await searchParams

  const partner = MOCK_PARTNERS[slug]
  if (!partner) notFound()

  const introducer = ref ? MOCK_INTRODUCERS[ref] : null
  const validIntroducer = introducer && introducer.partnerSlug === slug ? introducer : null

  const waMessage = encodeURIComponent(
    `Hi ${partner.name}! I found your page on KB Kuching Top Apartments website. I am interested in learning more about the properties.`
  )
  const waLink = `https://wa.me/${partner.whatsapp}?text=${waMessage}`

  return (
    <PartnerContent
      partner={partner}
      introducer={validIntroducer}
      waLink={waLink}
    />
  )
}
