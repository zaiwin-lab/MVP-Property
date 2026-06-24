'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'

const mockLeads = [
  { id: '1', name: 'Ahmad Roslan', phone: '0112345678', email: null, apartment: 'Riverine Residences', budget: 'RM 500k-600k', partner: 'Fizan', introducer: 'Ahmad Sufian', status: 'NEW', source: 'website', date: '2024-12-20' },
  { id: '2', name: 'Lim Siew Ting', phone: '0119876543', email: 'lim@email.com', apartment: 'SkyVilla Kuching', budget: 'RM 550k-700k', partner: 'Amin', introducer: null, status: 'CONTACTED', source: 'ai_chat', date: '2024-12-19' },
  { id: '3', name: 'Siti Noraida', phone: '0118765432', email: null, apartment: 'Milano Eight', budget: 'RM 400k-500k', partner: 'Fizan', introducer: 'Nur Aisyah', status: 'APPOINTMENT_SET', source: 'referral', date: '2024-12-18' },
  { id: '4', name: 'Rajendran P.', phone: '0117654321', email: 'raje@email.com', apartment: 'Riverine Residences', budget: 'RM 500k+', partner: 'Raju', introducer: 'Priya Suresh', status: 'CONVERTED', source: 'website', date: '2024-12-17' },
  { id: '5', name: 'Nurul Ain', phone: '0116543210', email: null, apartment: 'SkyVilla Kuching', budget: 'RM 550k', partner: 'Amin', introducer: null, status: 'NEW', source: 'ai_chat', date: '2024-12-16' },
  { id: '6', name: 'David Wong', phone: '0115432109', email: 'david@email.com', apartment: 'Milano Eight', budget: 'RM 400k', partner: 'Fizan', introducer: null, status: 'VIEWING_COMPLETED', source: 'website', date: '2024-12-15' },
  { id: '7', name: 'Farah Jasmine', phone: '0114321098', email: null, apartment: 'Riverine Residences', budget: 'RM 500k', partner: 'Amin', introducer: 'Tan Wei Liang', status: 'LOST', source: 'referral', date: '2024-12-14' },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
  CONTACTED: { bg: 'rgba(234,179,8,0.15)', text: '#fde047' },
  APPOINTMENT_SET: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe' },
  VIEWING_COMPLETED: { bg: 'rgba(20,184,166,0.15)', text: '#5eead4' },
  CONVERTED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
  LOST: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' },
}

const partners = ['All Partners', 'Fizan', 'Amin', 'Raju']
const statuses = ['All Status', 'NEW', 'CONTACTED', 'APPOINTMENT_SET', 'VIEWING_COMPLETED', 'CONVERTED', 'LOST']

export default function LeadsPage() {
  const [partnerFilter, setPartnerFilter] = useState('All Partners')
  const [statusFilter, setStatusFilter] = useState('All Status')

  const filtered = mockLeads.filter((l) => {
    if (partnerFilter !== 'All Partners' && l.partner !== partnerFilter) return false
    if (statusFilter !== 'All Status' && l.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">All Leads</h2>
        <p className="text-white/40 text-sm">Leads across all property partners</p>
      </div>

      {/* Filters */}
      <div
        className="flex flex-wrap items-center gap-4 p-4 rounded-xl"
        style={{ backgroundColor: '#112240', border: '1px solid rgba(201,168,76,0.12)' }}
      >
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Filter size={15} style={{ color: '#c9a84c' }} />
          Filters:
        </div>

        <select
          value={partnerFilter}
          onChange={(e) => setPartnerFilter(e.target.value)}
          className="px-3 py-1.5 rounded text-sm text-white outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          {partners.map((p) => (
            <option key={p} value={p} style={{ backgroundColor: '#112240' }}>
              {p}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded text-sm text-white outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          {statuses.map((s) => (
            <option key={s} value={s} style={{ backgroundColor: '#112240' }}>
              {s.replace('_', ' ')}
            </option>
          ))}
        </select>

        <span className="text-white/30 text-sm ml-auto">
          {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#112240',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Name', 'Phone', 'Apartment', 'Budget', 'Partner', 'Introducer', 'Status', 'Source', 'Date'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-medium tracking-wider uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const sc = statusColors[lead.status] || statusColors.NEW
                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td className="px-5 py-3.5 text-white text-sm font-medium">{lead.name}</td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">{lead.phone}</td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">{lead.apartment}</td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">{lead.budget}</td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: '#c9a84c' }}>{lead.partner}</td>
                    <td className="px-5 py-3.5 text-white/40 text-sm">{lead.introducer || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {lead.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-white/30 text-xs">{lead.source}</td>
                    <td className="px-5 py-3.5 text-white/40 text-sm">{lead.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
