'use client'

import { useState } from 'react'
import { Plus, Copy, ExternalLink, Check } from 'lucide-react'

const PARTNER_SLUG = 'fizan' // Would come from session in production

const initialIntroducers = [
  { id: '1', name: 'Ahmad Sufian', referralCode: 'FIZ001', leads: 3, isActive: true, date: '2024-10-05' },
  { id: '2', name: 'Nur Aisyah', referralCode: 'FIZ002', leads: 2, isActive: true, date: '2024-10-20' },
  { id: '3', name: 'Hamidah Rashid', referralCode: 'FIZ003', leads: 0, isActive: false, date: '2024-11-10' },
]

export default function IntroducersPage() {
  const [introducers, setIntroducers] = useState(initialIntroducers)
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copyLink = (code: string) => {
    const link = `https://kobis.com.my/${PARTNER_SLUG}?ref=${code}`
    navigator.clipboard.writeText(link).then(() => {
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const addIntroducer = () => {
    if (!newName.trim()) return
    const code = `FIZ${String(introducers.length + 1).padStart(3, '0')}`
    setIntroducers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newName.trim(),
        referralCode: code,
        leads: 0,
        isActive: true,
        date: new Date().toISOString().split('T')[0],
      },
    ])
    setNewName('')
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Introducers</h2>
          <p className="text-white/40 text-sm">
            Share referral links with your network to track leads they bring in.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold"
          style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
        >
          <Plus size={15} />
          Add Introducer
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div
          className="rounded-xl p-5"
          style={{
            backgroundColor: '#112240',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <h3 className="text-white font-semibold mb-4">Add New Introducer</h3>
          <div className="flex gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Introducer's full name"
              onKeyDown={(e) => e.key === 'Enter' && addIntroducer()}
              className="flex-1 px-4 py-2.5 rounded text-white text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            />
            <button
              onClick={addIntroducer}
              className="px-5 py-2.5 rounded text-sm font-semibold"
              style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2.5 rounded text-sm text-white/40 hover:text-white/60"
            >
              Cancel
            </button>
          </div>
          <p className="text-white/30 text-xs mt-2">
            A unique referral code will be generated automatically.
          </p>
        </div>
      )}

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Introducers', value: introducers.length },
          { label: 'Active', value: introducers.filter((i) => i.isActive).length },
          { label: 'Total Leads via Intros', value: introducers.reduce((sum, i) => sum + i.leads, 0) },
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

      {/* Introducers list */}
      <div className="space-y-3">
        {introducers.map((intro) => {
          const refLink = `https://kobis.com.my/${PARTNER_SLUG}?ref=${intro.referralCode}`

          return (
            <div
              key={intro.id}
              className="rounded-xl p-5"
              style={{
                backgroundColor: '#112240',
                border: '1px solid rgba(201,168,76,0.12)',
                opacity: intro.isActive ? 1 : 0.6,
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
                  >
                    {intro.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{intro.name}</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs" style={{ color: '#c9a84c' }}>
                        {intro.referralCode}
                      </code>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={
                          intro.isActive
                            ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#86efac' }
                            : { backgroundColor: 'rgba(239,68,68,0.15)', color: '#fca5a5' }
                        }
                      >
                        {intro.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Leads count */}
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{intro.leads}</p>
                  <p className="text-white/40 text-xs">Leads</p>
                </div>

                {/* Referral link */}
                <div
                  className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2 rounded"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <code className="text-xs text-white/50 truncate flex-1">{refLink}</code>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyLink(intro.referralCode)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium transition-all"
                    style={
                      copied === intro.referralCode
                        ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#86efac' }
                        : { border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c' }
                    }
                  >
                    {copied === intro.referralCode ? (
                      <>
                        <Check size={12} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy Link
                      </>
                    )}
                  </button>

                  <a
                    href={refLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <p className="text-white/20 text-xs mt-3">Added {intro.date}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
