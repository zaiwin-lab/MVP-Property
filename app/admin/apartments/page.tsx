import { Edit, Home, MapPin, Eye } from 'lucide-react'

const apartments = [
  {
    id: '1',
    name: 'Riverine Residences',
    slug: 'riverine',
    location: 'Waterfront, Kuching City',
    priceFrom: 'RM 480,000',
    description:
      'Luxury waterfront living with panoramic views of Sarawak River. Premium finishes, resort-style facilities, and unmatched urban connectivity.',
    highlights: ['River View Units', 'Sky Pool', 'Private Lift Lobby', 'Smart Home System'],
    isActive: true,
    order: 1,
    gradient: 'linear-gradient(135deg, #1a3a5c, #0d2a45)',
    accent: '#4a9eca',
  },
  {
    id: '2',
    name: 'SkyVilla Kuching',
    slug: 'skyvilla',
    location: 'Samarahan Expressway',
    priceFrom: 'RM 550,000',
    description:
      'Elevated hillside living offering panoramic city and mountain views. Exclusive villa-style units with private gardens and concierge services.',
    highlights: ['Hilltop Location', 'Private Garden', 'Concierge 24/7', 'EV Charging'],
    isActive: true,
    order: 2,
    gradient: 'linear-gradient(135deg, #2d1a4a, #1a0f2e)',
    accent: '#9b59b6',
  },
  {
    id: '3',
    name: 'Milano Eight',
    slug: 'milano-eight',
    location: 'Kota Samarahan',
    priceFrom: 'RM 390,000',
    description:
      'Italian-inspired contemporary living in the heart of Kota Samarahan. Thoughtfully designed spaces perfect for modern families and investors.',
    highlights: ['Italian Architecture', 'Piazza Garden', 'Co-Working Space', 'Rental Ready'],
    isActive: true,
    order: 3,
    gradient: 'linear-gradient(135deg, #3d2010, #2a1508)',
    accent: '#e67e22',
  },
]

export default function ApartmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Apartments</h2>
          <p className="text-white/40 text-sm">Manage property listings shown on the platform</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold"
          style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
        >
          <Home size={15} />
          Add Apartment
        </button>
      </div>

      <div className="space-y-4">
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="rounded-xl overflow-hidden flex"
            style={{
              backgroundColor: '#112240',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            {/* Color block */}
            <div
              className="w-32 flex-shrink-0 flex flex-col items-center justify-center gap-2 p-4"
              style={{ background: apt.gradient }}
            >
              <Home size={24} style={{ color: apt.accent }} />
              <span className="text-white/80 text-xs text-center font-medium">{apt.name}</span>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{apt.name}</h3>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(34,197,94,0.15)',
                        color: '#86efac',
                      }}
                    >
                      {apt.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-white/30 text-xs">Order: {apt.order}</span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={12} style={{ color: '#c9a84c' }} />
                    <span className="text-white/50 text-sm">{apt.location}</span>
                  </div>

                  <p className="text-white/50 text-sm mb-3 max-w-xl">{apt.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {apt.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-white/40 mb-1">Starting from</p>
                  <p className="font-bold" style={{ color: '#c9a84c' }}>
                    {apt.priceFrom}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="w-24 flex-shrink-0 flex flex-col items-center justify-center gap-3 p-4"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              <button
                className="flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
              >
                <Edit size={16} />
                <span className="text-xs">Edit</span>
              </button>
              <button
                className="flex flex-col items-center gap-1 transition-colors"
                style={{ color: '#c9a84c' }}
              >
                <Eye size={16} />
                <span className="text-xs">Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
