import { CalendarDays, Clock, CheckCircle, XCircle } from 'lucide-react'

const mockAppointments = [
  {
    id: '1',
    leadName: 'Siti Noraida',
    phone: '0118765432',
    apartment: 'Milano Eight',
    partner: 'Fizan',
    date: '2024-12-22',
    time: '10:00 AM',
    purpose: 'Investment',
    status: 'CONFIRMED',
  },
  {
    id: '2',
    leadName: 'Ahmad Roslan',
    phone: '0112345678',
    apartment: 'Riverine Residences',
    partner: 'Fizan',
    date: '2024-12-23',
    time: '2:00 PM',
    purpose: 'Own Stay',
    status: 'NEW',
  },
  {
    id: '3',
    leadName: 'Lim Siew Ting',
    phone: '0119876543',
    apartment: 'SkyVilla Kuching',
    partner: 'Amin',
    date: '2024-12-24',
    time: '11:00 AM',
    purpose: 'Investment',
    status: 'NEW',
  },
  {
    id: '4',
    leadName: 'David Wong',
    phone: '0115432109',
    apartment: 'Milano Eight',
    partner: 'Fizan',
    date: '2024-12-15',
    time: '11:00 AM',
    purpose: 'Investment',
    status: 'COMPLETED',
  },
  {
    id: '5',
    leadName: 'Priya Suresh',
    phone: '0114321098',
    apartment: 'Riverine Residences',
    partner: 'Raju',
    date: '2024-12-10',
    time: '3:00 PM',
    purpose: 'Both',
    status: 'CANCELLED',
  },
]

const statusConfig: Record<string, { bg: string; text: string; Icon: React.ElementType }> = {
  NEW: { bg: 'rgba(59,130,246,0.15)', text: '#93c5fd', Icon: Clock },
  CONFIRMED: { bg: 'rgba(168,85,247,0.15)', text: '#d8b4fe', Icon: CheckCircle },
  COMPLETED: { bg: 'rgba(34,197,94,0.15)', text: '#86efac', Icon: CheckCircle },
  CANCELLED: { bg: 'rgba(239,68,68,0.15)', text: '#fca5a5', Icon: XCircle },
}

const stats = [
  { label: 'Total', value: mockAppointments.length },
  { label: 'New', value: mockAppointments.filter((a) => a.status === 'NEW').length },
  { label: 'Confirmed', value: mockAppointments.filter((a) => a.status === 'CONFIRMED').length },
  { label: 'Completed', value: mockAppointments.filter((a) => a.status === 'COMPLETED').length },
]

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">All Appointments</h2>
        <p className="text-white/40 text-sm">Viewing appointments across all partners</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
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

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#112240',
          border: '1px solid rgba(201,168,76,0.12)',
        }}
      >
        <div
          className="flex items-center gap-3 px-6 py-4"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
        >
          <CalendarDays size={16} style={{ color: '#c9a84c' }} />
          <h3 className="text-white font-semibold">Appointment Schedule</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Lead', 'Phone', 'Apartment', 'Partner', 'Date & Time', 'Purpose', 'Status'].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-medium tracking-wider uppercase"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {mockAppointments.map((appt) => {
                const sc = statusConfig[appt.status]
                const Icon = sc.Icon
                return (
                  <tr
                    key={appt.id}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  >
                    <td className="px-5 py-3.5 text-white text-sm font-medium">{appt.leadName}</td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">{appt.phone}</td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">{appt.apartment}</td>
                    <td className="px-5 py-3.5 text-sm" style={{ color: '#c9a84c' }}>
                      {appt.partner}
                    </td>
                    <td className="px-5 py-3.5 text-white/60 text-sm">
                      {appt.date}{' '}
                      <span className="text-white/30">{appt.time}</span>
                    </td>
                    <td className="px-5 py-3.5 text-white/50 text-sm">{appt.purpose}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        <Icon size={11} />
                        {appt.status}
                      </span>
                    </td>
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
