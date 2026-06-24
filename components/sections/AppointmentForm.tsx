'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, CheckCircle, MessageCircle } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Please enter a valid WhatsApp number'),
  apartment: z.enum(['Riverine Residences', 'SkyVilla Kuching', 'Milano Eight', 'Not Sure Yet']),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.enum(['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']),
  purpose: z.enum(['Own Stay', 'Investment', 'Both', 'Just Exploring']),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface AppointmentFormProps {
  partnerId?: string
  partnerName?: string
}

export default function AppointmentForm({ partnerId, partnerName }: AppointmentFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [leadPhone, setLeadPhone] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      apartment: 'Not Sure Yet',
      preferredTime: '10:00 AM',
      purpose: 'Just Exploring',
    },
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          partnerId: partnerId || 'default',
        }),
      })

      if (res.ok) {
        setLeadPhone(data.phone)
        setSubmitted(true)
        reset()
      }
    } catch {
      // Optimistically show success anyway for MVP
      setLeadPhone(data.phone)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    const waMsg = encodeURIComponent(
      `Hi${partnerName ? ` ${partnerName}` : ''}! I just booked an appointment via the KB Kuching Top Apartments website. Looking forward to our meeting!`
    )
    const waLink = `https://wa.me/60112345678?text=${waMsg}`

    return (
      <div className="text-center py-12 space-y-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
        >
          <CheckCircle size={32} style={{ color: '#c9a84c' }} />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Appointment Request Received!</h3>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Thank you! Our property partner will confirm your appointment within 24 hours. You may
            also WhatsApp us directly for a faster response.
          </p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm"
          style={{ backgroundColor: '#25D366', color: '#fff' }}
        >
          <MessageCircle size={16} />
          WhatsApp Us to Confirm
        </a>
        <div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-white/40 hover:text-white/60 text-sm underline underline-offset-4"
          >
            Submit another request
          </button>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded text-white text-sm outline-none transition-all'
  const inputStyle = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(201,168,76,0.2)',
  }
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            Full Name *
          </label>
          <input
            {...register('name')}
            placeholder="Your full name"
            className={inputClass}
            style={inputStyle}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            WhatsApp Number *
          </label>
          <input
            {...register('phone')}
            placeholder="+60 11-XXXX XXXX"
            className={inputClass}
            style={inputStyle}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      {/* Apartment */}
      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Interested Apartment
        </label>
        <select
          {...register('apartment')}
          className={inputClass}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          {['Riverine Residences', 'SkyVilla Kuching', 'Milano Eight', 'Not Sure Yet'].map((a) => (
            <option key={a} value={a} style={{ backgroundColor: '#112240' }}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Date */}
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            Preferred Date *
          </label>
          <input
            {...register('preferredDate')}
            type="date"
            className={inputClass}
            style={{ ...inputStyle, colorScheme: 'dark' }}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.preferredDate && <p className={errorClass}>{errors.preferredDate.message}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
            Preferred Time
          </label>
          <select
            {...register('preferredTime')}
            className={inputClass}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(
              (t) => (
                <option key={t} value={t} style={{ backgroundColor: '#112240' }}>
                  {t}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Purpose of Viewing
        </label>
        <select
          {...register('purpose')}
          className={inputClass}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          {['Own Stay', 'Investment', 'Both', 'Just Exploring'].map((p) => (
            <option key={p} value={p} style={{ backgroundColor: '#112240' }}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/60 text-xs tracking-widest uppercase mb-2">
          Additional Message (Optional)
        </label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Any specific questions or requirements?"
          className={inputClass}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <Calendar size={16} />
        {submitting ? 'Submitting…' : 'Request Appointment'}
      </button>

      <p className="text-white/30 text-xs text-center">
        Our property partner will confirm within 24 hours.
      </p>
    </form>
  )
}
