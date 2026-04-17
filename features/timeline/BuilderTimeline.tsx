'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TIMELINE = [
  {
    year: '2021',
    phase: 'Freshman Year',
    label: 'Exploration Phase',
    built: 'Started university at Haramaya University with curiosity, not direction. Exploring how software actually works beyond theory.',
    thinking: 'At that time, I didn\'t understand systems. I was just trying to understand logic itself.',
    dot: 'bg-zinc-500',
    glow: 'rgba(113,113,122,0.3)',
  },
  {
    year: '2022',
    phase: 'Software Engineering',
    label: 'Foundation Phase',
    built: 'Began formal software engineering studies. Built first real projects using HTML, CSS, and JavaScript. The builder mindset started forming.',
    thinking: 'Software became real to me. Not code — but structured thinking made visible.',
    dot: 'bg-blue-500',
    glow: 'rgba(59,130,246,0.3)',
  },
  {
    year: '2023',
    phase: 'Full-Stack Transition',
    label: 'System Thinking Phase',
    built: 'Moved into React, Node.js, and MongoDB. Built TaskFlow — learning how components connect into full products.',
    thinking: 'I stopped thinking in pages. I started thinking in systems and flows.',
    dot: 'bg-indigo-500',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    year: '2024',
    phase: 'Internship',
    label: 'Enterprise Exposure Phase',
    built: 'Worked in a government innovation environment at Ministry of Innovation and Technology. Built real-world solutions under constraints, scale, and impact requirements.',
    thinking: 'Constraints stopped being limitations. They became design inputs.',
    dot: 'bg-violet-500',
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    year: '2025',
    phase: 'Graduation + Industry',
    label: 'Execution Phase',
    built: 'Graduated BSc Software Engineering from Haramaya University. Joined Alta Computec PLC as AI Systems Engineer. Shipped ስሙኒ ዋሌት, AI Tagger, Resume Analyzer. Shifted toward Africa-scale infrastructure thinking.',
    thinking: 'I stopped building features. I started building products with intent.',
    dot: 'bg-emerald-500',
    glow: 'rgba(34,197,94,0.3)',
    ships: ['ስሙኒ ዋሌት', 'AI Tagger', 'Resume Analyzer'],
  },
  {
    year: '2026',
    phase: 'Founder Mode',
    label: 'Now',
    built: 'Focused on transport digitization systems, AI-native infrastructure tools, and scalable SaaS for real-world problems. Transitioning from engineer → system builder → founder.',
    thinking: 'The question is no longer "can I build this?" — it\'s "should this exist, and who is it for?"',
    dot: 'bg-violet-400',
    glow: 'rgba(167,139,250,0.4)',
    active: true,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export function BuilderTimeline() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04 })

  return (
    <section id="timeline" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-violet-600/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Journey</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            How I <span className="gradient-text">evolved</span>
          </h2>
          <p className="text-zinc-500 text-sm">Not just what I built — how my thinking changed.</p>
        </motion.div>

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-zinc-700 via-violet-500/30 to-violet-500/60" />

          <div className="space-y-6">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="flex gap-5"
              >
                {/* Node */}
                <div className="relative shrink-0 flex flex-col items-center" style={{ width: 32 }}>
                  <div
                    className={`w-8 h-8 rounded-full ${item.active ? 'bg-violet-600' : 'bg-[#0B0F1A] border border-white/10'} flex items-center justify-center z-10 relative shrink-0`}
                    style={item.active ? { boxShadow: `0 0 16px ${item.glow}` } : {}}
                  >
                    {item.active && <span className="absolute inset-0 rounded-full bg-violet-500/25 animate-ping" />}
                    <span className={`w-2 h-2 rounded-full ${item.dot} z-10 relative`} />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl p-5 mb-1 transition-all duration-300 ${
                  item.active
                    ? 'bg-[#0f0d1f] border border-violet-500/25 shadow-[0_0_30px_rgba(139,92,246,0.08)]'
                    : 'glass hover:border-white/10'
                }`}>
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-white">{item.year}</span>
                        <span className="text-zinc-700">·</span>
                        <span className="text-xs font-semibold text-violet-400">{item.phase}</span>
                      </div>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-widest">{item.label}</p>
                    </div>
                    {item.active && (
                      <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 font-semibold">
                        Now
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.built}</p>

                  {/* Shipped products */}
                  {item.ships && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.ships.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Thinking quote */}
                  <div className="flex gap-2 items-start">
                    <span className="text-violet-500/50 text-lg leading-none mt-0.5 shrink-0">"</span>
                    <p className="text-xs text-zinc-500 italic leading-relaxed">{item.thinking}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
