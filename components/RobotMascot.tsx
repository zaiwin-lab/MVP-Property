'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const messages = [
  { text: 'AI Got Your Back!', emoji: '🤖' },
  { text: 'Ask me anything — I\'m here 24/7!', emoji: '✨' },
  { text: 'Check your loan eligibility now!', emoji: '💰' },
  { text: 'Your dream home is one chat away!', emoji: '🏠' },
  { text: 'Riverine, SkyVilla or Milano Eight?', emoji: '🌟' },
  { text: 'I\'ll help you find the perfect fit!', emoji: '🎯' },
  { text: 'Investing in Kuching? Smart move!', emoji: '📈' },
  { text: 'Book a viewing in under 2 minutes!', emoji: '📅' },
]

export default function RobotMascot() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    // First bubble appears after 3s
    const firstShow = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(firstShow)
  }, [])

  useEffect(() => {
    if (!visible) return

    // Hide after 4s, then cycle to next and show again
    const hideTimer = setTimeout(() => {
      if (!hovered) {
        setVisible(false)
        setTimeout(() => {
          setMsgIndex(i => (i + 1) % messages.length)
          setVisible(true)
        }, 1200)
      }
    }, 4500)

    return () => clearTimeout(hideTimer)
  }, [visible, msgIndex, hovered])

  const msg = messages[msgIndex]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0px',
        pointerEvents: 'none',
      }}
    >
      {/* Speech bubble */}
      <div
        style={{
          marginBottom: '6px',
          marginLeft: '16px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.92)',
          transition: 'opacity 0.4s cubic-bezier(0.34,1.56,0.64,1), transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0d1f3c, #112240)',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: '16px 16px 16px 4px',
            padding: '10px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1)',
            backdropFilter: 'blur(12px)',
            maxWidth: '220px',
            position: 'relative',
          }}
        >
          {/* Tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              left: '18px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '8px solid #112240',
            }}
          />
          {/* Tail border */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '17px',
              width: '0',
              height: '0',
              borderLeft: '9px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '10px solid rgba(201,168,76,0.35)',
              zIndex: -1,
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1rem' }}>{msg.emoji}</span>
            <span
              style={{
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: '0.01em',
              }}
            >
              {msg.text}
            </span>
          </div>
        </div>
      </div>

      {/* Robot image */}
      <div
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: hovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
        }}
        onMouseEnter={() => {
          setHovered(true)
          setVisible(true)
        }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setMsgIndex(i => (i + 1) % messages.length)
          setVisible(true)
        }}
        title="Click me!"
      >
        <Image
          src="/mascot-robot.png"
          alt="AI Property Concierge Robot"
          width={110}
          height={110}
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 24px rgba(59,130,246,0.4)) drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
            transition: 'filter 0.3s ease',
          }}
          priority
        />
      </div>
    </div>
  )
}
