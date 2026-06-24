import Link from 'next/link'
import { Plus, ExternalLink, Edit, Power } from 'lucide-react'

const mockPartners = [
  {
    id: '1',
    name: 'Fizan Abdullah',
    slug: 'fizan',
    whatsapp: '+60 11-1234 567',
    email: 'fizan@kobis.com.my',
    status: 'Active',
    leads: 21,
    appointments: 9,
    introducers: 3,
    joinDate: '2024-10-01',
  },
  {
    id: '2',
    name: 'Mohd Amin Razali',
    slug: 'amin',
    whatsapp: '+60 11-9876 543',
    email: 'amin@kobis.com.my',
    status: 'Active',
    leads: 15,
    appointments: 6,
    introducers: 2,
    joinDate: '2024-10-15',
  },
  {
    id: '3',
    name: 'Raju Krishnamurthy',
    slug: 'raju',
    whatsapp: '+60 11-8765 432',
    email: 'raju@kobis.com.my',
    status: 'Active',
    leads: 11,
    appointments: 3,
    introducers: 2,
    joinDate: '2024-11-01',
  },
]

export default function PartnersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Partners</h2>
          <p className="text-white/40 text-sm">Manage property partner accounts</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold"
          style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
        >
          <Plus size={15} />
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockPartners.map((p) => (
          <div
            key={p.id}
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            {/* Card header */}
            <div
              className="px-5 py-4 flex items-center gap-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
              >
                {p.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">{p.name}</h3>
                <p className="text-white/40 text-xs">{p.email}</p>
              </div>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(34,197,94,0.15)',
                  color: '#86efac',
                }}
              >
                {p.status}
              </span>
            </div>

            {/* Stats */}
            <div className="px-5 py-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Leads', value: p.leads },
                  { label: 'Appts', value: p.appointments },
                  { label: 'Intros', value: p.introducers },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-white font-bold text-lg">{value}</p>
                    <p className="text-white/40 text-xs">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Page URL</span>
                  <code style={{ color: '#c9a84c' }}>/{p.slug}</code>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">WhatsApp</span>
                  <span className="text-white/60">{p.whatsapp}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Joined</span>
                  <span className="text-white/60">{p.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Link
                href={`/${p.slug}`}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium transition-all"
                style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }}
              >
                <ExternalLink size={12} />
                View Page
              </Link>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              >
                <Edit size={12} />
                Edit
              </button>
              <button
                className="px-3 py-2 rounded text-xs transition-all"
                style={{ border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}
                title="Deactivate"
              >
                <Power size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
