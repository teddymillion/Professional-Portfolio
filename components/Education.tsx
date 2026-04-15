'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Star, Award } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" ref={ref} className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Education</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          Academic <span className="gradient-text">foundation</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {PORTFOLIO.education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="glass rounded-xl p-5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 shrink-0 flex items-center justify-center">
                  <Image
                    src={edu.logoUrl}
                    alt={edu.institution}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">{edu.degree}</h3>
                  <p className="text-violet-400 font-medium text-sm mt-0.5">{edu.institution}</p>
                  <p className="text-zinc-600 text-xs mt-0.5">{edu.duration}</p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-5">{edu.description}</p>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <div>
                    <p className="text-xs text-zinc-500">CGPA</p>
                    <p className="text-sm font-bold text-yellow-400">{edu.cgpa}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs text-zinc-500">Exit Exam</p>
                    <p className="text-sm font-bold text-emerald-400">{edu.neScore}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
