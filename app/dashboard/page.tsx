import Link from 'next/link'
import { UserCheck, CalendarDays, Users, TrendingUp, Plus, ExternalLink } from 'lucide-react'

const mockStats = [
  { label: 'My Leads', value: '21', icon: UserCheck, change: '+3 this week', href: '/dashboard/leads' },
  { label: 'Appointments', value: '9', icon: CalendarDays, change: '+2 this week', href: '/dashboard/appointments' },
  { label: 'Introducers', value: '3', icon: Users, change: 'Active referrers', href: '/dashboard/introducers' },
  { label: 'Conversion Rate', value: '14%', icon: TrendingUp, change: '3 converted', href: '/dashboard/leads' },
]

const mockLeads = [
  { id: '1', name: 'Ahmad Roslan', phone: '0112345678', apartment: 'Riverine Residences', budget: 'RM 500k-600k', status: 'NEW', date: '2024-12-20' },
  { id: '2', name: 'Siti Noraida', phone: '0118765432', apartment: 'Milano Eight', budget: 'RM 400k-500k', status: 'APPOINTMENT_SET', date: '2024-12-18' },
  { id: '3', name: 'David Wong', phone: '0115432109', apartment: 'Milano Eight', budget: 'RM 400k', status: 'VIEWING_COMPLETED', date: '2024-12-15' },
  { id: '4', name: 'Rajendran P.', phone: '0117654321', apartment: 'Riverine Residences', budget: 'RM 500k+', status: 'CONVERTED', date: '2024-12-17' },
  { id: '5', name: 'Farah Jasmine', phone: '0114321098', apartment: 'Riverine Residences', budget: 'RM 500k', status: 'LOST', date: '2024-12-14' },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd' },
  CONTACTED: { bg: 'rgba(234,179,8,0.15)', text: '#fde047' },
  APPOINTMENT_SET: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe' },
  VIEWING_COMPLETED: { bg: 'rgba(20,184,166,0.15)', text: '#5eead4' },
  CONVERTED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
  LOST: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5' },
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Welcome back, Fizan!</h2>
        <p className="text-white/40 text-sm">Here&apos;s your property concierge overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map(({ label, value, icon: Icon, change, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl p-5 block transition-all hover:border-gold/30"
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
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent leads */}
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
            <h3 className="text-white font-semibold">Recent Leads</h3>
            <Link href="/dashboard/leads" className="text-xs flex items-center gap-1" style={{ color: '#c9a84c' }}>
              View all <ExternalLink size={11} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Name', 'Apartment', 'Budget', 'Status', 'Date'].map((h) => (
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
                      <td className="px-6 py-4 text-white/60 text-sm">{lead.apartment}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{lead.budget}</td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: sc.bg, color: sc.text }}
                        >
                          {lead.status.replace(/_/g, ' ')}
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

        {/* Quick actions */}
        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/leads"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5 text-white/60"
              >
                <UserCheck size={15} style={{ color: '#c9a84c' }} />
                Manage Leads
              </Link>
              <Link
                href="/dashboard/appointments"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5 text-white/60"
              >
                <CalendarDays size={15} style={{ color: '#c9a84c' }} />
                View Appointments
              </Link>
              <Link
                href="/dashboard/introducers"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all hover:bg-white/5 text-white/60"
              >
                <Users size={15} style={{ color: '#c9a84c' }} />
                Manage Introducers
              </Link>
            </div>
          </div>

          {/* My page link */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            <h3 className="text-white font-semibold mb-3">My Partner Page</h3>
            <p className="text-white/40 text-xs mb-4">Share your unique link with leads and introducers.</p>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded text-xs mb-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <code style={{ color: '#c9a84c' }} className="flex-1 truncate">
                kobis.com.my/fizan
              </code>
            </div>
            <Link
              href="/fizan"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-medium"
              style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
            >
              <ExternalLink size={12} />
              Open My Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
