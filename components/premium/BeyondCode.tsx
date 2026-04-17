'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Shirt, Globe2, Music2, Timer } from 'lucide-react'

const CARDS = [
  {
    icon: Shirt,
    title: 'Style & Presentation',
    body: 'Presentation is part of communication. How you show up — in code, in person, in design — signals how you think.',
    accent: 'text-violet-400',
    bg: 'bg-violet-600/10 border-violet-500/15',
  },
  {
    icon: Globe2,
    title: 'Global Mindset',
    body: 'I think globally, not locally. Exposure to different systems, cultures, and problems sharpens how I build.',
    accent: 'text-blue-400',
    bg: 'bg-blue-600/10 border-blue-500/15',
  },
  {
    icon: Music2,
    title: 'Energy & Expression',
    body: 'I have an expressive, social side. Music, movement, and human energy keep me grounded and creative.',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-600/10 border-emerald-500/15',
  },
  {
    icon: Timer,
    title: 'Discipline',
    body: 'Deep work in the morning. Building in the afternoon. Reflection at night. Consistency compounds.',
    accent: 'text-amber-400',
    bg: 'bg-amber-600/10 border-amber-500/15',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export function BeyondCode() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="beyond" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Beyond Code</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            The person <span className="gradient-text">behind the code</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-lg">
            Great engineers are whole people. Here's what shapes how I think and build.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-xl p-5 hover:border-white/10 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${card.accent}`} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{card.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{card.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
