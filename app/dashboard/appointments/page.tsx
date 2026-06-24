'use client'

import { useState } from 'react'
import { Calendar, MessageCircle, CheckCircle, XCircle, Clock } from 'lucide-react'

const mockAppointments = [
  {
    id: '1',
    leadName: 'Siti Noraida',
    phone: '60118765432',
    apartment: 'Milano Eight',
    date: '2024-12-22',
    time: '10:00 AM',
    purpose: 'Investment',
    status: 'CONFIRMED',
    notes: 'Looking for 2-bed unit for rental purposes.',
  },
  {
    id: '2',
    leadName: 'Ahmad Roslan',
    phone: '60112345678',
    apartment: 'Riverine Residences',
    date: '2024-12-23',
    time: '2:00 PM',
    purpose: 'Own Stay',
    status: 'NEW',
    notes: 'Wants river view unit, budget RM 550k.',
  },
  {
    id: '3',
    leadName: 'David Wong',
    phone: '60115432109',
    apartment: 'Milano Eight',
    date: '2024-12-15',
    time: '11:00 AM',
    purpose: 'Investment',
    status: 'COMPLETED',
    notes: 'Viewed 2 units. Very interested.',
  },
  {
    id: '4',
    leadName: 'Nor Azizah',
    phone: '60113210987',
    apartment: 'SkyVilla Kuching',
    date: '2024-12-10',
    time: '3:00 PM',
    purpose: 'Both',
    status: 'CANCELLED',
    notes: 'Rescheduled to January.',
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd', icon: <Clock size={13} /> },
  CONFIRMED: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe', icon: <CheckCircle size={13} /> },
  COMPLETED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac', icon: <CheckCircle size={13} /> },
  CANCELLED: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5', icon: <XCircle size={13} /> },
}

const statusOptions = ['NEW', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    )
  }

  const upcoming = appointments.filter((a) => ['NEW', 'CONFIRMED'].includes(a.status))
  const past = appointments.filter((a) => ['COMPLETED', 'CANCELLED'].includes(a.status))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Appointments</h2>
        <p className="text-white/40 text-sm">Manage your property viewing schedule</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: appointments.length },
          { label: 'Upcoming', value: upcoming.length },
          { label: 'Completed', value: appointments.filter((a) => a.status === 'COMPLETED').length },
          { label: 'Cancelled', value: appointments.filter((a) => a.status === 'CANCELLED').length },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl px-5 py-4"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <p className="text-white text-2xl font-bold">{value}</p>
            <p className="text-white/40 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Calendar size={16} style={{ color: '#c9a84c' }} />
            Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {upcoming.map((appt) => {
              const sc = statusColors[appt.status]
              return (
                <div
                  key={appt.id}
                  className="rounded-xl p-5"
                  style={{
                    backgroundColor: '#112240',
                    border: '1px solid rgba(201,168,76,0.15)',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-semibold">{appt.leadName}</h4>
                        <span
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {sc.icon}
                          {appt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} style={{ color: '#c9a84c' }} />
                          {appt.date} at {appt.time}
                        </span>
                        <span>{appt.apartment}</span>
                        <span>{appt.purpose}</span>
                      </div>
                      {appt.notes && (
                        <p className="text-white/40 text-xs mt-2 italic">{appt.notes}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <select
                        value={appt.status}
                        onChange={(e) => updateStatus(appt.id, e.target.value)}
                        className="px-2 py-1.5 rounded text-xs text-white outline-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(201,168,76,0.2)',
                        }}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} style={{ backgroundColor: '#112240' }}>
                            {s}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`https://wa.me/${appt.phone}?text=${encodeURIComponent(`Hi ${appt.leadName}, confirming our appointment on ${appt.date} at ${appt.time} for ${appt.apartment} viewing.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                        style={{ backgroundColor: '#25D366', color: '#fff' }}
                      >
                        <MessageCircle size={12} />
                        Confirm via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 text-white/60">Past Appointments</h3>
          <div className="space-y-2">
            {past.map((appt) => {
              const sc = statusColors[appt.status]
              return (
                <div
                  key={appt.id}
                  className="rounded-xl px-5 py-3 flex flex-wrap items-center gap-4"
                  style={{
                    backgroundColor: 'rgba(17,34,64,0.5)',
                    border: '1px solid rgba(201,168,76,0.07)',
                    opacity: 0.7,
                  }}
                >
                  <span className="text-white/60 text-sm font-medium">{appt.leadName}</span>
                  <span className="text-white/30 text-sm">{appt.date}</span>
                  <span className="text-white/40 text-sm">{appt.apartment}</span>
                  <span
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    {sc.icon}
                    {appt.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
