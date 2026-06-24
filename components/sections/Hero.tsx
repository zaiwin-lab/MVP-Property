import Link from 'next/link'

interface HeroButton {
  label: string
  href: string
  variant: 'gold' | 'outline' | 'ghost'
}

interface HeroProps {
  title: string
  subtitle: string
  buttons: HeroButton[]
  partnerName?: string
  badge?: string
}

export default function Hero({ title, subtitle, buttons, partnerName, badge }: HeroProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #071020 0%, #0a1628 40%, #0d1f3c 70%, #071020 100%)',
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Gold accent lines */}
        <div
          className="absolute top-1/4 left-0 w-1/3 h-px opacity-20"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }}
        />
        <div
          className="absolute top-1/4 right-0 w-1/3 h-px opacity-20"
          style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-1/4 h-px opacity-10"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }}
        />
        <div
          className="absolute bottom-1/3 right-0 w-1/4 h-px opacity-10"
          style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }}
        />
        {/* Subtle radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 mb-6">
            <div
              className="px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#c9a84c',
                backgroundColor: 'rgba(201,168,76,0.08)',
              }}
            >
              {badge}
            </div>
          </div>
        )}

        {/* Partner intro */}
        {partnerName && (
          <p className="text-white/50 text-sm tracking-widest uppercase mb-4">
            Presented by{' '}
            <span style={{ color: '#c9a84c' }}>{partnerName}</span>
          </p>
        )}

        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: '#c9a84c' }}
        >
          {subtitle}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c9a84c' }} />
          <div className="w-16 h-px" style={{ backgroundColor: 'rgba(201,168,76,0.3)' }} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className="px-8 py-4 rounded font-semibold text-sm tracking-wide transition-all duration-200"
              style={
                btn.variant === 'gold'
                  ? { backgroundColor: '#c9a84c', color: '#0a1628' }
                  : btn.variant === 'outline'
                  ? {
                      border: '1px solid rgba(201,168,76,0.5)',
                      color: '#c9a84c',
                      backgroundColor: 'transparent',
                    }
                  : {
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.7)',
                      backgroundColor: 'transparent',
                    }
              }
            >
              {btn.label}
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
          <p className="text-white text-xs tracking-widest uppercase">Scroll to Explore</p>
          <div className="w-px h-12 animate-pulse" style={{ backgroundColor: '#c9a84c' }} />
        </div>
      </div>
    </section>
  )
}
