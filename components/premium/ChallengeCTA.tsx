'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export function ChallengeCTA() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async () => {
    if (!message.trim()) return
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Challenge',
          email: 'challenge@portfolio.com',
          message: `CHALLENGE: ${message}`,
        }),
      })
      if (res.ok) {
        toast.success('Challenge accepted. I\'ll respond.')
        setMessage('')
        setOpen(false)
      } else {
        toast.error('Failed to send. Try emailing directly.')
      }
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-violet-500/40 text-violet-300 text-sm font-semibold hover:bg-violet-600/15 hover:border-violet-500/60 hover:-translate-y-px transition-all duration-300"
      >
        <Zap className="w-3.5 h-3.5 group-hover:text-violet-400 transition-colors" />
        Challenge Me
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md glass-strong rounded-2xl p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-white">Challenge Me</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Give me a problem. I'll tell you how I'd solve it.</p>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg glass text-zinc-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe a technical challenge, a system problem, or a product idea you want me to think through..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white text-sm placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none transition-colors resize-none"
                />
                <button
                  onClick={submit}
                  disabled={!message.trim() || sending}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Challenge</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
