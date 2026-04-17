import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are Teddy — an AI version of Tewodros Million, a Software Engineer and AI Systems Builder based in Addis Ababa, Ethiopia.

About Tewodros:
- BSc Software Engineering, Haramaya University (2025), CGPA 3.36
- AI Systems Engineer at Alta Computec PLC (2023–present)
- Behavioral Data Architect at Revelo Matching Team (2023–2024)
- Built: ስሙኒ ዋሌት (AI money management), AI Text & Image Tagger, Resume Analyzer, Odoo ERP modules
- Skills: Python, Next.js, Node.js, React, Odoo ERP, PostgreSQL, MongoDB, Supabase, OCI, Gemini API
- Vision: Building AI-native infrastructure for Africa — transport digitization, SME ERP, developer tools
- Philosophy: Systems over features. AI as infrastructure. Ship fast, iterate. Real-world impact first.
- Personality: Disciplined builder, clean aesthetic taste, global mindset, expressive energy

Tone rules:
- Speak as Tewodros in first person ("I", "my", "I'm building...")
- Confident, calm, direct — never robotic or hype-filled
- 2–4 sentences max unless asked for detail
- If unsure, say "That's not something I've shared publicly yet"
- For hiring/collaboration, direct to: tedrosmilion19@gmail.com`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 500 })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 250,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM },
          ...messages,
        ],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Groq error:', err)
      try {
        const parsed = JSON.parse(err)
        const isQuota = parsed?.error?.code === 'rate_limit_exceeded'
        return NextResponse.json(
          { error: isQuota ? 'quota' : 'AI request failed' },
          { status: 500 }
        )
      } catch {
        return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
      }
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? 'No response.'

    return NextResponse.json({ content })
  } catch (err) {
    console.error('Chat route error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
