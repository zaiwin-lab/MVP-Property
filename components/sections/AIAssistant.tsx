'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Calendar, Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIAssistantProps {
  partnerName?: string
  partnerId?: string
}

export default function AIAssistant({ partnerName, partnerId }: AIAssistantProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const assistantName = partnerName ? `${partnerName}'s AI Assistant` : 'AI Property Assistant'

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi! I'm ${assistantName} for KB Kuching Top Apartments. I'm here to help you explore Riverine, SkyVilla, and Milano Eight — three of Kuching's finest apartment developments.\n\nMay I start with your name?`,
        },
      ])
    }
  }, [open, messages.length, assistantName])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          partnerId,
          partnerName,
        }),
      })

      if (!response.ok) {
        throw new Error('API error')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content || ''
                assistantMessage += content
                setMessages((prev) => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage,
                  }
                  return updated
                })
              } catch {}
            }
          }
        }
      }

      // Check if enough info collected to flag lead capture
      const allText = [...messages, { role: 'user', content: userMessage }]
        .map((m) => m.content)
        .join(' ')
        .toLowerCase()

      if (
        allText.includes('whatsapp') ||
        allText.includes('phone') ||
        allText.includes('contact') ||
        messages.length > 8
      ) {
        setLeadCaptured(true)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'I apologise — I\'m having a brief technical issue. Please WhatsApp us directly or fill in the appointment form below and we\'ll be in touch shortly!',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: '#c9a84c',
          boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
        }}
        aria-label="Open AI Assistant"
      >
        {open ? (
          <X size={22} color="#0a1628" />
        ) : (
          <MessageCircle size={22} color="#0a1628" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl flex flex-col overflow-hidden slide-up"
          style={{
            backgroundColor: '#0d1f3c',
            border: '1px solid rgba(201,168,76,0.2)',
            maxHeight: '520px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: 'linear-gradient(135deg, #112240, #0d1f3c)',
              borderBottom: '1px solid rgba(201,168,76,0.15)',
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: '#c9a84c', color: '#0a1628' }}
            >
              AI
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{assistantName}</p>
              <p className="text-white/40 text-xs">KB Kuching Top Apartments</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/40 text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === 'user'
                      ? { backgroundColor: '#c9a84c', color: '#0a1628' }
                      : {
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: 'rgba(255,255,255,0.9)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                  }
                >
                  {msg.content || (loading && i === messages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-3 py-2 flex items-center gap-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Loader2 size={14} className="animate-spin text-white/50" />
                  <span className="text-white/50 text-sm">Thinking…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Lead CTA */}
          {leadCaptured && (
            <div
              className="px-4 py-2"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              <a
                href="#appointment"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-medium"
                style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}
              >
                <Calendar size={13} />
                Book an Appointment
              </a>
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              className="flex-1 text-sm text-white outline-none bg-transparent placeholder-white/30"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: input.trim() && !loading ? '#c9a84c' : 'rgba(201,168,76,0.2)',
                color: input.trim() && !loading ? '#0a1628' : 'rgba(201,168,76,0.5)',
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
