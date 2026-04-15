'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Stack</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          Tools I <span className="gradient-text">build with</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(PORTFOLIO.skills).map(([category, skills], i) => (
            <motion.div
              key={category}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass rounded-xl p-5 hover:border-white/10 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wide mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/4 border border-white/6 text-sm text-zinc-300 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
