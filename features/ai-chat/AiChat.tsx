'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'How do you approach building systems?',
  'What are you building right now?',
  'Why Africa-focused tech?',
  "What's your engineering philosophy?",
]

export function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text: string) => {
    if (!text.trim() || streaming) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setStreaming(true)
    // show typing indicator
    setMessages(m => [...m, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        const msg = data.error === 'quota'
          ? 'I\'m at my request limit right now. Try again in a minute or email tedrosmilion19@gmail.com'
          : 'I\'m temporarily unavailable. Reach out directly at tedrosmilion19@gmail.com'
        throw new Error(msg)
      }

      setMessages(m => {
        const updated = [...m]
        updated[updated.length - 1] = { role: 'assistant', content: data.content }
        return updated
      })
    } catch (err: any) {
      setMessages(m => {
        const updated = [...m]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: err?.message ?? 'I\'m temporarily unavailable. Reach out at tedrosmilion19@gmail.com',
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-12 h-12 rounded-2xl overflow-hidden transition-all duration-300 group"
        style={{
          boxShadow: open
            ? '0 0 0 2px rgba(109,94,246,0.5), 0 0 32px rgba(109,94,246,0.4)'
            : '0 0 0 1px rgba(109,94,246,0.3), 0 0 20px rgba(109,94,246,0.2)',
        }}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Talk to Teddy"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6D5EF6, #4f46e5)' }}
            >
              <X style={{ width: 18, height: 18, color: 'white' }} />
            </motion.div>
          ) : (
            <motion.div key="photo"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="w-full h-full relative"
            >
              <Image src="/teddy.png" alt="Talk to Teddy" width={48} height={48} className="object-cover w-full h-full" />
              {/* AI hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'rgba(109,94,246,0.85)' }}
              >
                <span className="text-[10px] font-bold text-white tracking-widest">AI</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip label */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ delay: 1.5, duration: 0.3 }}
            className="fixed bottom-7 right-[68px] z-50 pointer-events-none hidden sm:block"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl whitespace-nowrap"
              style={{
                background: 'rgba(9,12,22,0.92)',
                border: '1px solid rgba(109,94,246,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] text-zinc-300 font-medium">Talk to Teddy</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold text-violet-300"
                style={{ background: 'rgba(109,94,246,0.2)', border: '1px solid rgba(109,94,246,0.3)' }}
              >AI</span>
            </div>
            {/* Arrow */}
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
              style={{ background: 'rgba(9,12,22,0.92)', borderRight: '1px solid rgba(109,94,246,0.25)', borderTop: '1px solid rgba(109,94,246,0.25)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-[340px] md:w-[370px] flex flex-col overflow-hidden"
            style={{
              bottom: '72px',
              maxHeight: '500px',
              background: 'rgba(9, 12, 22, 0.92)',
              backdropFilter: 'blur(48px)',
              WebkitBackdropFilter: 'blur(48px)',
              border: '1px solid rgba(109,94,246,0.2)',
              borderRadius: '16px',
              boxShadow: '0 0 0 1px rgba(109,94,246,0.1), 0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(109,94,246,0.08)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <div className="w-7 h-7 rounded-xl overflow-hidden shrink-0 ring-1 ring-violet-500/30">
                <Image src="/teddy.png" alt="Teddy" width={28} height={28} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-white leading-none">Talk to Teddy</p>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-bold text-violet-300"
                    style={{ background: 'rgba(109,94,246,0.2)', border: '1px solid rgba(109,94,246,0.3)' }}
                  >AI</span>
                </div>
                <p className="text-[10px] text-zinc-600 mt-0.5">Ask me anything about my work</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-zinc-600">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 180 }}>
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] text-zinc-600 text-center leading-relaxed">
                    Ask me about my work, how I think, or what I'm building.
                  </p>
                  <div className="space-y-1.5">
                    {SUGGESTED.map(s => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="w-full text-left text-[11px] px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-300 transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[88%] px-3 py-2 rounded-xl text-[11px] leading-relaxed"
                    style={m.role === 'user'
                      ? { background: 'rgba(109,94,246,0.2)', border: '1px solid rgba(109,94,246,0.25)', color: '#e4e4f0' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#a1a1aa' }
                    }
                  >
                    {m.content || (
                      <span className="flex gap-1 py-0.5">
                        {[0, 1, 2].map(j => (
                          <span key={j} className="w-1 h-1 rounded-full bg-zinc-600 animate-bounce"
                            style={{ animationDelay: `${j * 0.15}s` }} />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/[0.05]">
              <form onSubmit={e => { e.preventDefault(); send(input) }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  disabled={streaming}
                  className="flex-1 text-[11px] text-white placeholder:text-zinc-700 focus:outline-none disabled:opacity-40 bg-transparent"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  style={{ background: 'linear-gradient(135deg, #6D5EF6, #4f46e5)' }}
                >
                  {streaming
                    ? <Loader2 style={{ width: 13, height: 13, color: 'white' }} className="animate-spin" />
                    : <Send style={{ width: 13, height: 13, color: 'white' }} />
                  }
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
