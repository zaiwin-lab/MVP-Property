import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  CalendarDays,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/partners', label: 'Partners', icon: Users },
  { href: '/admin/apartments', label: 'Apartments', icon: Building2 },
  { href: '/admin/leads', label: 'Leads', icon: UserCheck },
  { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
          <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">Admin Portal</p>
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
          <h1 className="text-white font-semibold">KOBIS Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <div
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(201,168,76,0.1)',
                color: '#c9a84c',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            >
              Super Admin
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
