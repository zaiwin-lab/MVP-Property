'use client'

import { useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'

const mockLeads = [
  { id: '1', name: 'Ahmad Roslan', phone: '60112345678', apartment: 'Riverine Residences', budget: 'RM 500k-600k', status: 'NEW', introducer: 'Ahmad Sufian', date: '2024-12-20', message: 'Looking for a 3-bedroom unit with river view.' },
  { id: '2', name: 'Siti Noraida', phone: '60118765432', apartment: 'Milano Eight', budget: 'RM 400k-500k', status: 'APPOINTMENT_SET', introducer: 'Nur Aisyah', date: '2024-12-18', message: 'Investment purpose, want to rent out.' },
  { id: '3', name: 'David Wong', phone: '60115432109', apartment: 'Milano Eight', budget: 'RM 400k', status: 'VIEWING_COMPLETED', introducer: null, date: '2024-12-15', message: 'Liked the Italian concept.' },
  { id: '4', name: 'Rajendran P.', phone: '60117654321', apartment: 'Riverine Residences', budget: 'RM 500k+', status: 'CONVERTED', introducer: 'Priya Suresh', date: '2024-12-17', message: 'Ready to proceed with purchase.' },
  { id: '5', name: 'Farah Jasmine', phone: '60114321098', apartment: 'Riverine Residences', budget: 'RM 500k', status: 'LOST', introducer: null, date: '2024-12-14', message: 'Budget does not fit.' },
  { id: '6', name: 'Nor Azizah', phone: '60113210987', apartment: 'SkyVilla Kuching', budget: 'RM 550k', status: 'CONTACTED', introducer: null, date: '2024-12-13', message: 'Interested in hilltop view.' },
]

const statusOptions = ['NEW', 'CONTACTED', 'APPOINTMENT_SET', 'VIEWING_COMPLETED', 'CONVERTED', 'LOST']
const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
  CONTACTED: { bg: 'rgba(234,179,8,0.15)', text: '#fde047' },
  APPOINTMENT_SET: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe' },
  VIEWING_COMPLETED: { bg: 'rgba(20,184,166,0.15)', text: '#5eead4' },
  CONVERTED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
  LOST: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' },
}

export default function MyLeadsPage() {
  const [leads, setLeads] = useState(mockLeads)
  const [expanded, setExpanded] = useState<string | null>(null)

  const updateStatus = (id: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">My Leads</h2>
        <p className="text-white/40 text-sm">{leads.length} total leads — manage and update their status</p>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => {
          const sc = statusColors[lead.status] || statusColors.NEW
          const isExpanded = expanded === lead.id

          return (
            <div
              key={lead.id}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                backgroundColor: '#112240',
                border: isExpanded
                  ? '1px solid rgba(201,168,76,0.3)'
                  : '1px solid rgba(201,168,76,0.12)',
              }}
            >
              {/* Main row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                onClick={() => setExpanded(isExpanded ? null : lead.id)}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                >
                  {lead.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{lead.name}</p>
                  <p className="text-white/40 text-xs">{lead.apartment} · {lead.budget}</p>
                </div>

                {lead.introducer && (
                  <span className="text-xs text-white/30 hidden sm:block">via {lead.introducer}</span>
                )}

                <span
                  className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ backgroundColor: sc.bg, color: sc.text }}
                >
                  {lead.status.replace(/_/g, ' ')}
                </span>

                <span className="text-white/30 text-xs hidden md:block">{lead.date}</span>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div
                  className="px-5 pb-5 space-y-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {lead.message && (
                    <p className="text-white/50 text-sm mt-4 italic">&quot;{lead.message}&quot;</p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-1">Phone</p>
                      <p className="text-white/70 text-sm">{lead.phone}</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-1">Apartment</p>
                      <p className="text-white/70 text-sm">{lead.apartment}</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-1">Budget</p>
                      <p className="text-white/70 text-sm">{lead.budget}</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-wide mb-1">Introducer</p>
                      <p className="text-white/70 text-sm">{lead.introducer || 'Direct'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Status update */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-xs">Update status:</span>
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className="px-2 py-1 rounded text-xs text-white outline-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(201,168,76,0.2)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s} style={{ backgroundColor: '#112240' }}>
                            {s.replace(/_/g, ' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Actions */}
                    <a
                      href={`https://wa.me/${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}, I am following up on your enquiry about ${lead.apartment}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                      style={{ backgroundColor: '#25D366', color: '#fff' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle size={12} />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:+${lead.phone}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                      style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={12} />
                      Call
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
