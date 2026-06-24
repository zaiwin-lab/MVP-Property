'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'

export default function ROICalc() {
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
    const annualExpenses = e
    const annualIncome = annualRental - annualExpenses

    const grossYield = (annualRental / p) * 100
    const netYield = (annualIncome / p) * 100

    // 5-year ROI: net income + estimated 15% capital appreciation
    const capitalGain = p * 0.15
    const fiveYearIncome = annualIncome * 5
    const fiveYearROI = ((fiveYearIncome + capitalGain) / p) * 100

    setResult({
      grossYield: Math.round(grossYield * 100) / 100,
      netYield: Math.round(netYield * 100) / 100,
      annualIncome: Math.round(annualIncome),
      fiveYearROI: Math.round(fiveYearROI * 10) / 10,
      annualExpenses: Math.round(annualExpenses),
    })
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Property Price (RM)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. 600000"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Expected Monthly Rental (RM)
        </label>
        <input
          type="number"
          value={rental}
          onChange={(e) => setRental(e.target.value)}
          placeholder="e.g. 2500"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Annual Expenses (Maintenance, etc.) (RM)
        </label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="e.g. 3600"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <TrendingUp size={16} />
        Calculate ROI
      </button>

      {result && (
        <div
          className="rounded-lg p-5 space-y-3"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <h4 style={{ color: '#c9a84c' }} className="text-xs font-semibold tracking-widest uppercase mb-4">
            Investment Returns
          </h4>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div
              className="rounded-lg p-4 text-center"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
            >
              <p className="text-white/50 text-xs tracking-wide uppercase mb-1">Gross Yield</p>
              <p style={{ color: '#c9a84c' }} className="text-2xl font-bold">
                {result.grossYield}%
              </p>
            </div>
            <div
              className="rounded-lg p-4 text-center"
              style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
            >
              <p className="text-white/50 text-xs tracking-wide uppercase mb-1">Net Yield</p>
              <p style={{ color: '#c9a84c' }} className="text-2xl font-bold">
                {result.netYield}%
              </p>
            </div>
          </div>

          {[
            { label: 'Annual Net Income', value: fmt(result.annualIncome) },
            { label: 'Annual Expenses', value: fmt(result.annualExpenses) },
            { label: 'Est. 5-Year Total ROI', value: `${result.fiveYearROI}%`, note: '(incl. 15% capital gain)' },
          ].map(({ label, value, note }) => (
            <div key={label}>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">
                  {label}
                  {note && <span className="text-white/30 text-xs ml-1">{note}</span>}
                </span>
                <span className="text-white font-semibold">{value}</span>
              </div>
              <div className="h-px mt-3" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
            </div>
          ))}
        </div>
      )}

      <p className="text-white/30 text-xs text-center">
        *Projections are illustrative. Past performance is not indicative of future returns.
      </p>
    </div>
  )
}
