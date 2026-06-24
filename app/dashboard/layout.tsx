import Link from 'next/link'
import {
  LayoutDashboard,
  UserCheck,
  CalendarDays,
  Users,
  LogOut,
  MessageCircle,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/leads', label: 'My Leads', icon: UserCheck },
  { href: '/dashboard/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/dashboard/introducers', label: 'Introducers', icon: Users },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // In production: fetch real partner from session
  const partnerName = 'Fizan Abdullah'
  const partnerInitial = 'F'

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#071020' }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col"
        style={{
          backgroundColor: '#0a1628',
          borderRight: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        {/* Logo */}
        <div
          className="px-6 py-5"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <span style={{ color: '#c9a84c' }} className="text-xl font-bold tracking-widest">
            KOBIS
          </span>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">Partner Portal</p>
        </div>

        {/* Partner info */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
          >
            {partnerInitial}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{partnerName}</p>
            <p className="text-white/30 text-xs">Property Partner</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3">
          <p className="text-white/20 text-xs tracking-widest uppercase px-3 mb-3">Navigation</p>
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <Icon size={16} style={{ color: '#c9a84c' }} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* WhatsApp quick action */}
          <div className="mt-6 px-3">
            <a
              href="https://wa.me/60112345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
              style={{ backgroundColor: 'rgba(37,211,102,0.1)', color: '#25D366' }}
            >
              <MessageCircle size={14} />
              Open WhatsApp
            </a>
          </div>
        </nav>

        {/* Logout */}
        <div
          className="px-3 py-4"
          style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          <Link
            href="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-8"
          style={{
            backgroundColor: '#0a1628',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">Partner Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/fizan`}
              target="_blank"
              className="text-xs px-3 py-1.5 rounded transition-all"
              style={{
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#c9a84c',
              }}
            >
              View My Page →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
