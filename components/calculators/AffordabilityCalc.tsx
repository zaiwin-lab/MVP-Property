'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

export default function AffordabilityCalc() {
  const { t } = useT()
  const c = t.calcAfford
  const [price, setPrice] = useState('')
  const [downPayment, setDownPayment] = useState('10')
  const [tenure, setTenure] = useState('35')
  const [interestRate, setInterestRate] = useState('4.5')
  const [result, setResult] = useState<{
    monthlyInstalment: number
    downPaymentAmt: number
    financingAmt: number
    totalInterest: number
  } | null>(null)

  const calculate = () => {
    const P = parseFloat(price) || 0
    const dp = parseFloat(downPayment) / 100
    const years = parseInt(tenure) || 35
    const r = parseFloat(interestRate) / 100 / 12
    const n = years * 12
    const downPaymentAmt = Math.round(P * dp)
    const financingAmt = Math.round(P * (1 - dp))
    const monthlyInstalment = r === 0 ? Math.round(financingAmt / n) : Math.round((financingAmt * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1))
    setResult({ monthlyInstalment, downPaymentAmt, financingAmt, totalInterest: Math.round(monthlyInstalment * n - financingAmt) })
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
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 500000" className={inputClass} style={inputStyle} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{c.downPayment}</label>
          <select value={downPayment} onChange={e => setDownPayment(e.target.value)} className={inputClass} style={inputStyle}>
            {[10, 15, 20, 25, 30].map(p => (
              <option key={p} value={p} style={{ backgroundColor: '#112240' }}>{p}%</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{c.tenure}</label>
          <select value={tenure} onChange={e => setTenure(e.target.value)} className={inputClass} style={inputStyle}>
            {[10, 15, 20, 25, 30, 35].map(y => (
              <option key={y} value={y} style={{ backgroundColor: '#112240' }}>{y} {c.years}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>{c.rate}</label>
        <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} step="0.1" placeholder="e.g. 4.5" className={inputClass} style={inputStyle} />
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <Calculator size={16} />
        {c.calculate}
      </button>

      {result && (
        <div className="rounded-lg p-5 space-y-3" style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}>
          {[
            { label: c.monthly, value: fmt(result.monthlyInstalment), highlight: true },
            { label: c.downAmt, value: fmt(result.downPaymentAmt) },
            { label: c.financing, value: fmt(result.financingAmt) },
            { label: c.totalInterest, value: fmt(result.totalInterest) },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">{label}</span>
                <span className={highlight ? 'font-bold text-lg' : 'font-medium'} style={{ color: highlight ? '#c9a84c' : 'rgba(255,255,255,0.8)' }}>
                  {value}
                </span>
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
