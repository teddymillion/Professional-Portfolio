'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Experience</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          Where I've <span className="gradient-text">built</span>
        </motion.h2>

        <div className="space-y-5">
          {PORTFOLIO.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass rounded-xl p-6 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0 bg-violet-600/15 flex items-center justify-center">
                  {exp.image ? (
                    <Image src={exp.image} alt={exp.company} fill className="object-cover" />
                  ) : (
                    <span className="text-violet-400 font-bold text-sm">{exp.company.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-xs text-zinc-500 glass px-3 py-1 rounded-full">{exp.duration}</span>
                  </div>
                  <p className="text-violet-400 font-medium mt-0.5">{exp.company}</p>
                </div>
              </div>

              <p className="text-zinc-400 mb-6 leading-relaxed">{exp.description}</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {exp.highlights.map((h, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-400">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
