'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Placeholder: integrate next-auth signIn here
      // const result = await signIn('credentials', { email, password, redirect: false })
      await new Promise((r) => setTimeout(r, 800))
      // Redirect based on role
      // if (result?.ok) router.push('/dashboard')
      setError('Authentication system not yet configured. Please contact admin.')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(135deg, #071020 0%, #0a1628 50%, #071020 100%)',
      }}
    >
      {/* Logo */}
      <div className="text-center mb-10">
        <Link href="/">
          <span
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ color: '#c9a84c' }}
          >
            KOBIS
          </span>
        </Link>
        <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Property Concierge</p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          backgroundColor: '#112240',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Partner Login</h1>
          <p className="text-white/50 text-sm">
            Sign in to access your property dashboard and leads.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ backgroundColor: 'rgba(201,168,76,0.1)' }} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className="px-4 py-3 rounded text-sm"
              style={{
                backgroundColor: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded text-white text-sm outline-none transition-all"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password"
                className="w-full px-4 py-3 pr-12 rounded text-white text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
          >
            <LogIn size={16} />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Admin link */}
        <div className="mt-6 text-center">
          <p className="text-white/30 text-xs">
            Admin access?{' '}
            <Link
              href="/admin"
              className="transition-colors hover:text-white/60"
              style={{ color: '#c9a84c' }}
            >
              Go to Admin Dashboard
            </Link>
          </p>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/"
          className="text-white/30 hover:text-white/50 text-sm transition-colors"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  )
}
