'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const NOTES = [
  'I build systems, not features.',
  'Speed matters. Direction matters more.',
  'Africa needs builders, not copies.',
  'The best code is the code that solves the real problem.',
  'Constraints are design inputs, not obstacles.',
  'Ship it. Learn from it. Build it better.',
  'Every great product starts with a clear problem statement.',
  'AI is infrastructure. Treat it like one.',
  'Think globally. Build locally. Scale everywhere.',
  'The gap between vision and execution is just discipline.',
]

function Typewriter({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 35)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-violet-400 ml-0.5 animate-pulse align-middle" />
    </span>
  )
}

export function UnfilteredNotes() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setActive(i => (i + 1) % NOTES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section ref={ref} className="py-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-violet-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-violet-400 mb-8">Unfiltered</p>

          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-white tracking-tight"
              >
                <Typewriter text={NOTES[active]} />
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-8">
            {NOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-4 h-1.5 bg-violet-500' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
