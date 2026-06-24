import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      partnerId,
      name,
      phone,
      email,
      apartment,
      preferredDate,
      preferredTime,
      purpose,
      message,
    } = body

    if (!name || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'name, phone, preferredDate, and preferredTime are required' },
        { status: 400 }
      )
    }

    const resolvedPartnerId = partnerId || 'default_partner'

    try {
      const { prisma } = await import('@/lib/db')

      // Create or find lead first
      let lead = await prisma.lead.findFirst({
        where: { phone, partnerId: resolvedPartnerId },
      })

      if (!lead) {
        lead = await prisma.lead.create({
          data: {
            partnerId: resolvedPartnerId,
            name,
            phone,
            email: email || null,
            apartment: apartment || null,
            purpose: purpose || null,
            message: message || null,
            source: 'appointment_form',
            status: 'APPOINTMENT_SET',
          },
        })
      } else {
        lead = await prisma.lead.update({
          where: { id: lead.id },
          data: { status: 'APPOINTMENT_SET' },
        })
      }

      // Create appointment
      const appointment = await prisma.appointment.create({
        data: {
          leadId: lead.id,
          partnerId: resolvedPartnerId,
          preferredDate,
          preferredTime,
          purpose: purpose || null,
          notes: message || null,
          status: 'NEW',
        },
      })

      return NextResponse.json({ success: true, appointment, lead }, { status: 201 })
    } catch (dbError) {
      console.warn('DB not ready, returning mock appointment:', dbError)
      const mockAppt = {
        id: `mock_appt_${Date.now()}`,
        leadId: `mock_lead_${Date.now()}`,
        partnerId: resolvedPartnerId,
        name,
        phone,
        apartment,
        preferredDate,
        preferredTime,
        purpose,
        status: 'NEW',
        createdAt: new Date().toISOString(),
      }
      return NextResponse.json({ success: true, appointment: mockAppt }, { status: 201 })
    }
  } catch (error) {
    console.error('Appointment creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const partnerId = searchParams.get('partnerId')

    try {
      const { prisma } = await import('@/lib/db')
      const appointments = await prisma.appointment.findMany({
        where: partnerId ? { partnerId } : undefined,
        orderBy: { createdAt: 'desc' },
        include: { lead: true, partner: true },
      })
      return NextResponse.json({ appointments })
    } catch (dbError) {
      console.warn('DB not ready:', dbError)
      return NextResponse.json({ appointments: [] })
    }
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
