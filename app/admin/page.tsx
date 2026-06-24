import Link from 'next/link'
import { Users, UserCheck, CalendarDays, TrendingUp, ExternalLink, Building2 } from 'lucide-react'

const mockStats = [
  { label: 'Total Partners', value: '3', icon: Users, change: '+1 this month' },
  { label: 'Total Leads', value: '47', icon: UserCheck, change: '+12 this week' },
  { label: 'Total Appointments', value: '18', icon: CalendarDays, change: '+5 this week' },
  { label: 'Monthly Revenue', value: 'RM 0', icon: TrendingUp, change: 'Commission tracking TBD' },
]

const mockPartners = [
  {
    id: '1',
    name: 'Fizan Abdullah',
    slug: 'fizan',
    status: 'Active',
    leads: 21,
    appointments: 9,
    whatsapp: '+60 11-1234 567',
  },
  {
    id: '2',
    name: 'Mohd Amin Razali',
    slug: 'amin',
    status: 'Active',
    leads: 15,
    appointments: 6,
    whatsapp: '+60 11-9876 543',
  },
  {
    id: '3',
    name: 'Raju Krishnamurthy',
    slug: 'raju',
    status: 'Active',
    leads: 11,
    appointments: 3,
    whatsapp: '+60 11-8765 432',
  },
]

const mockLeads = [
  { id: '1', name: 'Ahmad Roslan', phone: '0112345678', apartment: 'Riverine Residences', partner: 'Fizan', status: 'NEW', date: '2024-12-20' },
  { id: '2', name: 'Lim Siew Ting', phone: '0119876543', apartment: 'SkyVilla Kuching', partner: 'Amin', status: 'CONTACTED', date: '2024-12-19' },
  { id: '3', name: 'Siti Noraida', phone: '0118765432', apartment: 'Milano Eight', partner: 'Fizan', status: 'APPOINTMENT_SET', date: '2024-12-18' },
  { id: '4', name: 'Rajendran P.', phone: '0117654321', apartment: 'Riverine Residences', partner: 'Raju', status: 'CONVERTED', date: '2024-12-17' },
  { id: '5', name: 'Nurul Ain', phone: '0116543210', apartment: 'SkyVilla Kuching', partner: 'Amin', status: 'NEW', date: '2024-12-16' },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
  CONTACTED: { bg: 'rgba(234,179,8,0.15)', text: '#fde047' },
  APPOINTMENT_SET: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe' },
  VIEWING_COMPLETED: { bg: 'rgba(20,184,166,0.15)', text: '#5eead4' },
  CONVERTED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
  LOST: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' },
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h2>
        <p className="text-white/40 text-sm">KB Kuching Top Apartments — KOBIS Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map(({ label, value, icon: Icon, change }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-xs uppercase tracking-wide">{label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
              >
                <Icon size={16} style={{ color: '#c9a84c' }} />
              </div>
            </div>
            <p className="text-white text-2xl font-bold mb-1">{value}</p>
            <p className="text-white/30 text-xs">{change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Partners table */}
        <div
          className="lg:col-span-2 rounded-xl overflow-hidden"
          style={{
            backgroundColor: '#112240',
            border: '1px solid rgba(201,168,76,0.12)',
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
          >
            <h3 className="text-white font-semibold">Partners</h3>
            <Link
              href="/admin/partners"
              className="text-xs flex items-center gap-1 transition-colors"
              style={{ color: '#c9a84c' }}
            >
              View all <ExternalLink size={11} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Partner', 'Slug', 'Leads', 'Appts', 'Status', 'Action'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-medium tracking-wider uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockPartners.map((p) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
                        >
                          {p.name.charAt(0)}
                        </div>
                        <span className="text-white text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#c9a84c' }}>
                        /{p.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">{p.leads}</td>
                    <td className="px-6 py-4 text-white/70 text-sm">{p.appointments}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#86efac' }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/${p.slug}`}
                        target="_blank"
                        className="text-xs transition-colors"
                        style={{ color: '#c9a84c' }}
                      >
                        View Page →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Manage Partners', href: '/admin/partners', icon: Users },
                { label: 'View All Leads', href: '/admin/leads', icon: UserCheck },
                { label: 'Appointments', href: '/admin/appointments', icon: CalendarDays },
                { label: 'Apartments', href: '/admin/apartments', icon: Building2 },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Icon size={15} style={{ color: '#c9a84c' }} />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#112240',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <h3 className="text-white font-semibold">Recent Leads</h3>
          <Link href="/admin/leads" className="text-xs flex items-center gap-1" style={{ color: '#c9a84c' }}>
            View all <ExternalLink size={11} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Name', 'Phone', 'Apartment', 'Partner', 'Status', 'Date'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs font-medium tracking-wider uppercase"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => {
                const sc = statusColors[lead.status] || statusColors.NEW
                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-6 py-4 text-white text-sm">{lead.name}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{lead.phone}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{lead.apartment}</td>
                    <td className="px-6 py-4 text-white/60 text-sm">{lead.partner}</td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm">{lead.date}</td>
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
