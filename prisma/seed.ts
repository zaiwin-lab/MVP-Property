import { PrismaClient } from '../app/generated/prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: dbPath })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  console.log('Seeding database...')

  // ─── Admin User ───
  const adminPasswordHash = await bcrypt.hash('Admin@Kobis2024!', 12)
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@kobis.com.my' },
    update: {},
    create: {
      email: 'admin@kobis.com.my',
      passwordHash: adminPasswordHash,
      name: 'Super Admin',
    },
  })
  console.log('Admin created:', admin.email)

  // ─── Partners ───
  const partnerPasswordHash = await bcrypt.hash('Partner@2024!', 12)

  const fizan = await prisma.partner.upsert({
    where: { slug: 'fizan' },
    update: {},
    create: {
      name: 'Fizan Abdullah',
      slug: 'fizan',
      whatsapp: '60111234567',
      email: 'fizan@kobis.com.my',
      passwordHash: partnerPasswordHash,
      bio: 'With 8 years of experience in Kuching real estate, I specialise in helping first-time buyers and investors find the perfect apartment. Let me guide you through the process — from selection to financing to key collection.',
      isActive: true,
    },
  })

  const amin = await prisma.partner.upsert({
    where: { slug: 'amin' },
    update: {},
    create: {
      name: 'Mohd Amin Razali',
      slug: 'amin',
      whatsapp: '60119876543',
      email: 'amin@kobis.com.my',
      passwordHash: partnerPasswordHash,
      bio: 'A trusted property consultant focused on Kuching\'s premium segment. I have helped over 200 clients secure their dream apartments and investment properties across Sarawak.',
      isActive: true,
    },
  })

  const raju = await prisma.partner.upsert({
    where: { slug: 'raju' },
    update: {},
    create: {
      name: 'Raju Krishnamurthy',
      slug: 'raju',
      whatsapp: '60118765432',
      email: 'raju@kobis.com.my',
      passwordHash: partnerPasswordHash,
      bio: 'Investment-focused property consultant with expertise in Kuching\'s growing property market. I provide detailed ROI analysis and financing guidance to maximise your investment returns.',
      isActive: true,
    },
  })

  console.log('Partners created:', fizan.slug, amin.slug, raju.slug)

  // ─── Apartments ───
  const riverine = await prisma.apartment.upsert({
    where: { slug: 'riverine' },
    update: {},
    create: {
      name: 'Riverine Residences',
      slug: 'riverine',
      location: 'Waterfront, Kuching City',
      description: 'Luxury waterfront living with panoramic views of Sarawak River. Premium finishes, resort-style facilities, and unmatched urban connectivity.',
      priceFrom: 'RM 480,000',
      highlights: 'River View Units,Sky Pool,Private Lift Lobby,Smart Home System',
      isActive: true,
      order: 1,
    },
  })

  const skyvilla = await prisma.apartment.upsert({
    where: { slug: 'skyvilla' },
    update: {},
    create: {
      name: 'SkyVilla Kuching',
      slug: 'skyvilla',
      location: 'Samarahan Expressway',
      description: 'Elevated hillside living offering panoramic city and mountain views. Exclusive villa-style units with private gardens and concierge services.',
      priceFrom: 'RM 550,000',
      highlights: 'Hilltop Location,Private Garden,Concierge 24/7,EV Charging',
      isActive: true,
      order: 2,
    },
  })

  const milano = await prisma.apartment.upsert({
    where: { slug: 'milano-eight' },
    update: {},
    create: {
      name: 'Milano Eight',
      slug: 'milano-eight',
      location: 'Kota Samarahan',
      description: 'Italian-inspired contemporary living in the heart of Kota Samarahan. Thoughtfully designed spaces perfect for modern families and investors.',
      priceFrom: 'RM 390,000',
      highlights: 'Italian Architecture,Piazza Garden,Co-Working Space,Rental Ready',
      isActive: true,
      order: 3,
    },
  })

  console.log('Apartments created:', riverine.slug, skyvilla.slug, milano.slug)

  // ─── Introducers ───
  const fizanIntros = await Promise.all([
    prisma.introducer.upsert({
      where: { referralCode: 'FIZ001' },
      update: {},
      create: { partnerId: fizan.id, name: 'Ahmad Sufian', referralCode: 'FIZ001', isActive: true },
    }),
    prisma.introducer.upsert({
      where: { referralCode: 'FIZ002' },
      update: {},
      create: { partnerId: fizan.id, name: 'Nur Aisyah', referralCode: 'FIZ002', isActive: true },
    }),
    prisma.introducer.upsert({
      where: { referralCode: 'FIZ003' },
      update: {},
      create: { partnerId: fizan.id, name: 'Hamidah Rashid', referralCode: 'FIZ003', isActive: false },
    }),
  ])

  const aminIntros = await Promise.all([
    prisma.introducer.upsert({
      where: { referralCode: 'AMN001' },
      update: {},
      create: { partnerId: amin.id, name: 'Tan Wei Liang', referralCode: 'AMN001', isActive: true },
    }),
    prisma.introducer.upsert({
      where: { referralCode: 'AMN002' },
      update: {},
      create: { partnerId: amin.id, name: 'Lee Mei Shan', referralCode: 'AMN002', isActive: true },
    }),
  ])

  const rajuIntros = await Promise.all([
    prisma.introducer.upsert({
      where: { referralCode: 'RAJ001' },
      update: {},
      create: { partnerId: raju.id, name: 'Priya Suresh', referralCode: 'RAJ001', isActive: true },
    }),
    prisma.introducer.upsert({
      where: { referralCode: 'RAJ002' },
      update: {},
      create: { partnerId: raju.id, name: 'Velan Nair', referralCode: 'RAJ002', isActive: true },
    }),
  ])

  console.log('Introducers created:', fizanIntros.length, aminIntros.length, rajuIntros.length)

  // ─── Sample Leads ───
  const lead1 = await prisma.lead.create({
    data: {
      partnerId: fizan.id,
      introducerId: fizanIntros[0].id,
      name: 'Ahmad Roslan',
      phone: '0112345678',
      apartment: 'Riverine Residences',
      budget: 'RM 500k-600k',
      purpose: 'Own Stay',
      message: 'Looking for a 3-bedroom unit with river view.',
      status: 'NEW',
      source: 'referral',
    },
  })

  const lead2 = await prisma.lead.create({
    data: {
      partnerId: amin.id,
      name: 'Lim Siew Ting',
      phone: '0119876543',
      email: 'lim@email.com',
      apartment: 'SkyVilla Kuching',
      budget: 'RM 550k-700k',
      purpose: 'Investment',
      status: 'CONTACTED',
      source: 'ai_chat',
    },
  })

  const lead3 = await prisma.lead.create({
    data: {
      partnerId: fizan.id,
      introducerId: fizanIntros[1].id,
      name: 'Siti Noraida',
      phone: '0118765432',
      apartment: 'Milano Eight',
      budget: 'RM 400k-500k',
      purpose: 'Investment',
      message: 'Investment purpose, want to rent out.',
      status: 'APPOINTMENT_SET',
      source: 'referral',
    },
  })

  const lead4 = await prisma.lead.create({
    data: {
      partnerId: raju.id,
      introducerId: rajuIntros[0].id,
      name: 'Rajendran P.',
      phone: '0117654321',
      email: 'raje@email.com',
      apartment: 'Riverine Residences',
      budget: 'RM 500k+',
      purpose: 'Investment',
      status: 'CONVERTED',
      source: 'referral',
    },
  })

  const lead5 = await prisma.lead.create({
    data: {
      partnerId: amin.id,
      name: 'Nurul Ain',
      phone: '0116543210',
      apartment: 'SkyVilla Kuching',
      budget: 'RM 550k',
      purpose: 'Own Stay',
      status: 'NEW',
      source: 'website',
    },
  })

  console.log('Leads created:', [lead1, lead2, lead3, lead4, lead5].map((l) => l.name).join(', '))

  // ─── Sample Appointment ───
  await prisma.appointment.create({
    data: {
      leadId: lead3.id,
      partnerId: fizan.id,
      preferredDate: '2024-12-22',
      preferredTime: '10:00 AM',
      purpose: 'Investment viewing',
      status: 'CONFIRMED',
      notes: 'Looking for 2-bed unit for rental purposes.',
    },
  })

  console.log('Appointment created')

  // ─── Site Config ───
  await Promise.all([
    prisma.siteConfig.upsert({
      where: { key: 'site_title' },
      update: {},
      create: { key: 'site_title', value: 'KB Kuching Top Apartments' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'whatsapp_main' },
      update: {},
      create: { key: 'whatsapp_main', value: '60112345678' },
    }),
    prisma.siteConfig.upsert({
      where: { key: 'email_main' },
      update: {},
      create: { key: 'email_main', value: 'hello@kobis.com.my' },
    }),
  ])

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
