'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  drift: number
  phase: number
  type: 'dot' | 'cross'
}

export default function GoldSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 28 : 55

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.15,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
      type: Math.random() > 0.65 ? 'cross' : 'dot',
    }))

    let frame: number
    let t = 0

    const drawCross = (x: number, y: number, r: number, angle: number, alpha: number) => {
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.strokeStyle = '#e4c97e'
      ctx.lineWidth = r * 0.45
      ctx.lineCap = 'round'
      ctx.translate(x, y)
      ctx.rotate(angle)
      // Long axis
      ctx.beginPath()
      ctx.moveTo(0, -r * 3.2)
      ctx.lineTo(0, r * 3.2)
      ctx.stroke()
      // Short axis
      ctx.globalAlpha = alpha * 0.6
      ctx.lineWidth = r * 0.3
      ctx.beginPath()
      ctx.moveTo(-r * 1.8, 0)
      ctx.lineTo(r * 1.8, 0)
      ctx.stroke()
      // Center dot
      ctx.globalAlpha = alpha
      ctx.fillStyle = '#f5e9c4'
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      t++

      for (const p of particles) {
        const twinkle = (Math.sin(t * 0.04 + p.phase) + 1) / 2
        const alpha = p.opacity * (0.4 + twinkle * 0.6)

        if (p.type === 'cross') {
          drawCross(p.x, p.y, p.size, t * 0.015 + p.phase, alpha * 0.9)
        } else {
          // Glowing dot
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
          grd.addColorStop(0, `rgba(245, 233, 196, ${alpha})`)
          grd.addColorStop(0.4, `rgba(201, 168, 76, ${alpha * 0.7})`)
          grd.addColorStop(1, `rgba(139, 105, 20, 0)`)
          ctx.fillStyle = grd
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Drift upward
        p.y -= p.speed
        p.x += p.drift + Math.sin(t * 0.025 + p.phase) * 0.15

        if (p.y < -12) { p.y = h + 12; p.x = Math.random() * w }
        if (p.x < -12) p.x = w + 12
        if (p.x > w + 12) p.x = -12
      }

      ctx.globalAlpha = 1
      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
