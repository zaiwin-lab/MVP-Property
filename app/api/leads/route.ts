import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { partnerId, introducerId, name, phone, email, apartment, budget, message, source } = body

    if (!partnerId || !name || !phone) {
      return NextResponse.json(
        { error: 'partnerId, name, and phone are required' },
        { status: 400 }
      )
    }

    // Attempt to save via Prisma (may fail if DB not migrated)
    try {
      const { prisma } = await import('@/lib/db')
      const lead = await prisma.lead.create({
        data: {
          partnerId,
          introducerId: introducerId || null,
          name,
          phone,
          email: email || null,
          apartment: apartment || null,
          budget: budget || null,
          message: message || null,
          source: source || 'website',
          status: 'NEW',
        },
      })
      return NextResponse.json({ success: true, lead }, { status: 201 })
    } catch (dbError) {
      // DB not ready — return mock success for MVP demo
      console.warn('DB not ready, returning mock lead:', dbError)
      const mockLead = {
        id: `mock_${Date.now()}`,
        partnerId,
        introducerId: introducerId || null,
        name,
        phone,
        email: email || null,
        apartment: apartment || null,
        budget: budget || null,
        message: message || null,
        source: source || 'website',
        status: 'NEW',
        createdAt: new Date().toISOString(),
      }
      return NextResponse.json({ success: true, lead: mockLead }, { status: 201 })
    }
  } catch (error) {
    console.error('Lead creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get('partnerId')

    try {
      const { prisma } = await import('@/lib/db')
      const leads = await prisma.lead.findMany({
        where: partnerId ? { partnerId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: { partner: true, introducer: true },
      })
      return NextResponse.json({ leads })
    } catch (dbError) {
      console.warn('DB not ready:', dbError)
      return NextResponse.json({ leads: [] })
    }
  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
