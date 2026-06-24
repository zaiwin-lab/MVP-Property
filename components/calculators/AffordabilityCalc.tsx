'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function AffordabilityCalc() {
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

    let monthlyInstalment = 0
    if (r === 0) {
      monthlyInstalment = financingAmt / n
    } else {
      // Standard mortgage formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
      monthlyInstalment = Math.round(
        (financingAmt * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
      )
    }

    const totalInterest = Math.round(monthlyInstalment * n - financingAmt)

    setResult({ monthlyInstalment, downPaymentAmt, financingAmt, totalInterest })
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
          placeholder="e.g. 500000"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            Down Payment %
          </label>
          <select
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full px-4 py-3 rounded text-white text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            {[10, 15, 20, 25, 30].map((p) => (
              <option key={p} value={p} style={{ backgroundColor: '#112240' }}>
                {p}%
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            Tenure (Years)
          </label>
          <select
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full px-4 py-3 rounded text-white text-sm outline-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          >
            {[10, 15, 20, 25, 30, 35].map((y) => (
              <option key={y} value={y} style={{ backgroundColor: '#112240' }}>
                {y} yrs
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Interest Rate (% p.a.)
        </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          step="0.1"
          placeholder="e.g. 4.5"
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
        <Calculator size={16} />
        Calculate Affordability
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
            Affordability Breakdown
          </h4>

          {[
            { label: 'Monthly Instalment', value: fmt(result.monthlyInstalment), highlight: true },
            { label: 'Down Payment Required', value: fmt(result.downPaymentAmt) },
            { label: 'Financing Amount', value: fmt(result.financingAmt) },
            { label: 'Total Interest (lifetime)', value: fmt(result.totalInterest) },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-sm">{label}</span>
                <span
                  className={highlight ? 'text-white font-bold text-lg' : 'text-white/80 font-medium'}
                  style={highlight ? { color: '#c9a84c' } : undefined}
                >
                  {value}
                </span>
              </div>
              <div className="h-px mt-3" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />
            </div>
          ))}
        </div>
      )}

      <p className="text-white/30 text-xs text-center">
        *Indicative figures only. Actual rates may vary by bank.
      </p>
    </div>
  )
}
