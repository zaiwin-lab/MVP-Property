'use client'

import { useState } from 'react'
import { Calculator, MessageCircle, Calendar } from 'lucide-react'

function pvifa(rate: number, n: number): number {
  // Present Value Interest Factor of Annuity
  const r = rate / 12 / 100
  if (r === 0) return n
  return (1 - Math.pow(1 + r, -n)) / r
}

export default function LoanEligibilityCalc() {
  const [salary, setSalary] = useState('')
  const [commitments, setCommitments] = useState('')
  const [tenure, setTenure] = useState('35')
  const [result, setResult] = useState<{
    eligibleLoan: number
    monthlyPayment: number
    propertyBudget: number
  } | null>(null)

  const calculate = () => {
    const s = parseFloat(salary) || 0
    const c = parseFloat(commitments) || 0
    const t = parseInt(tenure) || 35
    const interestRate = 4.0

    // DSR formula: Max monthly payment = (Salary - Commitments) * 0.7
    const maxMonthly = (s - c) * 0.7
    if (maxMonthly <= 0) {
      setResult({ eligibleLoan: 0, monthlyPayment: 0, propertyBudget: 0 })
      return
    }

    // Eligible loan = max monthly payment * PVIFA(4%, tenure years)
    const pv = pvifa(interestRate, t * 12)
    const eligibleLoan = Math.round(maxMonthly * pv)
    const propertyBudget = Math.round(eligibleLoan / 0.9) // loan is 90%, buyer puts 10% down

    setResult({
      eligibleLoan,
      monthlyPayment: Math.round(maxMonthly),
      propertyBudget,
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
          Gross Monthly Salary (RM)
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="e.g. 5000"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Monthly Commitments (RM)
        </label>
        <input
          type="number"
          value={commitments}
          onChange={(e) => setCommitments(e.target.value)}
          placeholder="e.g. 1000"
          className="w-full px-4 py-3 rounded text-white text-sm outline-none"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Loan Tenure (Years)
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
              {y} years
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={calculate}
        className="w-full py-3 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <Calculator size={16} />
        Calculate Eligibility
      </button>

      {result && (
        <div
          className="rounded-lg p-5 space-y-4 mt-2"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
          }}
        >
          <h4 style={{ color: '#c9a84c' }} className="text-xs font-semibold tracking-widest uppercase">
            Your Estimated Eligibility
          </h4>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Eligible Loan Amount</span>
              <span className="text-white font-bold text-lg">{fmt(result.eligibleLoan)}</span>
            </div>
            <div
              className="h-px"
              style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
            />
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Max Monthly Payment</span>
              <span style={{ color: '#c9a84c' }} className="font-semibold">
                {fmt(result.monthlyPayment)}
              </span>
            </div>
            <div
              className="h-px"
              style={{ backgroundColor: 'rgba(201,168,76,0.15)' }}
            />
            <div className="flex justify-between items-center">
              <span className="text-white/60 text-sm">Property Budget (incl. 10% DP)</span>
              <span style={{ color: '#c9a84c' }} className="font-semibold">
                {fmt(result.propertyBudget)}
              </span>
            </div>
          </div>

          {result.eligibleLoan > 0 && (
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <a
                href="https://wa.me/60112345678?text=I%20checked%20my%20loan%20eligibility%20and%20would%20like%20to%20discuss%20further."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-medium"
                style={{ backgroundColor: '#25D366', color: '#fff' }}
              >
                <MessageCircle size={14} />
                Talk to Partner
              </a>
              <a
                href="#appointment"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-medium"
                style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#c9a84c' }}
              >
                <Calendar size={14} />
                Book Appointment
              </a>
            </div>
          )}
        </div>
      )}

      <p className="text-white/30 text-xs text-center">
        *Estimated based on DSR formula at 4% p.a. Consult a licensed banker for accuracy.
      </p>
    </div>
  )
}
