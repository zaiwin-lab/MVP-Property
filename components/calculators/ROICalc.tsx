'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

export default function ROICalc() {
  const { t } = useT()
  const c = t.calcROI
  const [price, setPrice] = useState('')
  const [rental, setRental] = useState('')
  const [expenses, setExpenses] = useState('')
  const [result, setResult] = useState<{
    grossYield: number
    netYield: number
    annualIncome: number
    fiveYearROI: number
    annualExpenses: number
  } | null>(null)

  const calculate = () => {
    const p = parseFloat(price) || 0
    const r = parseFloat(rental) || 0
    const e = parseFloat(expenses) || 0
    if (p === 0) return
    const annualRental = r * 12
    const annualIncome = annualRental - e
    setResult({
      grossYield: Math.round((annualRental / p) * 10000) / 100,
      netYield: Math.round((annualIncome / p) * 10000) / 100,
      annualIncome: Math.round(annualIncome),
      fiveYearROI: Math.round(((annualIncome * 5 + p * 0.15) / p) * 1000) / 10,
      annualExpenses: Math.round(e),
    })
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

  const inputClass = 'w-full px-4 py-3 rounded text-white text-sm outline-none'
  const inputStyle = { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.2)' }
  const labelClass = 'block text-white/60 text-xs tracking-widest uppercase mb-2'

  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>{c.price}</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 600000" className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label className={labelClass}>{c.rental}</label>
        <input type="number" value={rental} onChange={e => setRental(e.target.value)} placeholder="e.g. 2500" className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label className={labelClass}>{c.expenses}</label>
        <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder={c.expensesPlaceholder} className={inputClass} style={inputStyle} />
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <TrendingUp size={16} />
        {c.calculate}
      </button>

      {result && (
        <div className="rounded-lg p-5 space-y-3" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
              <p className="text-white/50 text-xs tracking-wide uppercase mb-1">{c.grossYield}</p>
              <p style={{ color: '#c9a84c' }} className="text-2xl font-bold">{result.grossYield}%</p>
            </div>
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
              <p className="text-white/50 text-xs tracking-wide uppercase mb-1">{c.netYield}</p>
              <p style={{ color: '#c9a84c' }} className="text-2xl font-bold">{result.netYield}%</p>
            </div>
          </div>

          {[
            { label: c.annualIncome, value: fmt(result.annualIncome) },
            { label: c.fiveYear, value: `${result.fiveYearROI}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">{label}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
              <div className="h-px mt-3" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
            </div>
          ))}
        </div>
      )}

      <p className="text-white/30 text-xs text-center">{c.note}</p>
    </div>
  )
}
