'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, CheckCircle, MessageCircle } from 'lucide-react'
import { useT } from '@/lib/i18n/context'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  apartment: z.enum(['Riverine Residences', 'SkyVilla Kuching', 'Milano Eight', 'Not Sure Yet']),
  preferredDate: z.string().min(1),
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
  const { t } = useT()
  const f = t.form
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
        body: JSON.stringify({ ...data, partnerId: partnerId || 'default' }),
      })
      if (res.ok) { setSubmitted(true); reset() }
    } catch {
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
          <h3 className="text-white text-xl font-semibold mb-2">{f.successTitle}</h3>
          <p className="text-white/60 text-sm max-w-md mx-auto">{f.successSub}</p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm"
          style={{ backgroundColor: '#25D366', color: '#fff' }}
        >
          <MessageCircle size={16} />
          {f.whatsappConfirm}
        </a>
        <div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-white/40 hover:text-white/60 text-sm underline underline-offset-4"
          >
            {f.another}
          </button>
        </div>
      </div>
    )
  }

  const inputClass = 'w-full px-4 py-3 rounded text-white text-sm outline-none transition-all'
  const inputStyle = { backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }
  const labelClass = 'block text-white/60 text-xs tracking-widest uppercase mb-2'
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{f.name} *</label>
          <input {...register('name')} placeholder={f.namePlaceholder} className={inputClass} style={inputStyle} />
          {errors.name && <p className={errorClass}>{f.nameError}</p>}
        </div>
        <div>
          <label className={labelClass}>{f.phone} *</label>
          <input {...register('phone')} placeholder={f.phonePlaceholder} className={inputClass} style={inputStyle} />
          {errors.phone && <p className={errorClass}>{f.phoneError}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{f.apartment}</label>
        <select {...register('apartment')} className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }}>
          {(['Riverine Residences', 'SkyVilla Kuching', 'Milano Eight'] as const).map(a => (
            <option key={a} value={a} style={{ backgroundColor: '#112240' }}>{a}</option>
          ))}
          <option value="Not Sure Yet" style={{ backgroundColor: '#112240' }}>{f.notSure}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{f.date} *</label>
          <input
            {...register('preferredDate')}
            type="date"
            className={inputClass}
            style={{ ...inputStyle, colorScheme: 'dark' }}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.preferredDate && <p className={errorClass}>{f.dateError}</p>}
        </div>
        <div>
          <label className={labelClass}>{f.time}</label>
          <select {...register('preferredTime')} className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }}>
            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(t => (
              <option key={t} value={t} style={{ backgroundColor: '#112240' }}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>{f.purpose}</label>
        <select {...register('purpose')} className={inputClass} style={{ ...inputStyle, cursor: 'pointer' }}>
          {(['Own Stay', 'Investment', 'Both', 'Just Exploring'] as const).map((val, i) => (
            <option key={val} value={val} style={{ backgroundColor: '#112240' }}>{f.purposes[i]}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{f.message}</label>
        <textarea {...register('message')} rows={3} placeholder={f.messagePlaceholder} className={inputClass} style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
      >
        <Calendar size={16} />
        {submitting ? f.submitting : f.submit}
      </button>

      <p className="text-white/30 text-xs text-center">{f.confirmNote}</p>
    </form>
  )
}
