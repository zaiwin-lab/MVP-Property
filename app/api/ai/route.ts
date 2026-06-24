import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const SYSTEM_PROMPT = `You are a professional property concierge AI assistant for KB Kuching Top Apartments. You help visitors explore three premium apartment developments in Kuching, Sarawak:

1. **Riverine Residences** — Luxury waterfront living with Sarawak River views. Starting from RM 480,000. Highlights: Sky Pool, Smart Home, Private Lift Lobby.
2. **SkyVilla Kuching** — Exclusive hillside living with panoramic views. Starting from RM 550,000. Highlights: Private Garden, Concierge 24/7, EV Charging.
3. **Milano Eight** — Italian-inspired living in Kota Samarahan. Starting from RM 390,000. Highlights: Piazza Garden, Co-Working Space, Rental Ready.

Your role:
- Be warm, professional, and helpful — like a private banker or luxury concierge
- Guide users to understand the properties based on their needs and budget
- Naturally collect: their name, WhatsApp number, apartment interest, and budget range
- After collecting their contact info, encourage them to book an appointment
- If asked about financing, provide general guidance and suggest our loan eligibility calculator
- Keep responses concise (2-4 sentences max) unless more detail is needed
- Never be pushy — be genuinely helpful

When you have collected the visitor's name AND WhatsApp number, include at the end of your message (on a new line): [LEAD_CAPTURED]`

export async function POST(request: NextRequest) {
  try {
    const { messages, partnerName, partnerId } = await request.json()

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages array required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      // Friendly fallback when no API key
      const fallbackMessage =
        "I'm your AI Property Assistant for KB Kuching Top Apartments. I can help you explore Riverine, SkyVilla, and Milano Eight. However, I'm currently in offline mode. Please WhatsApp us directly or use the appointment form below to connect with a property partner!"

      return new Response(
        `data: ${JSON.stringify({
          choices: [{ delta: { content: fallbackMessage } }],
        })}\n\ndata: [DONE]\n\n`,
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          },
        }
      )
    }

    const openai = new OpenAI({ apiKey })

    const systemPrompt =
      partnerName
        ? SYSTEM_PROMPT + `\n\nYou are assisting on behalf of ${partnerName}, a verified property partner.`
        : SYSTEM_PROMPT

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    })

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk)
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('AI route error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
