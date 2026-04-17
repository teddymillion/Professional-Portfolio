'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Layers, Cpu, Globe, Zap } from 'lucide-react'
import Image from 'next/image'
import { PORTFOLIO } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  layers: Layers,
  cpu: Cpu,
  globe: Globe,
  zap: Zap,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-6 md:mb-12"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">About</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Bio */}
          <div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
            >
              Engineer by training.{' '}
              <span className="gradient-text-purple">Builder by nature.</span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-zinc-400 text-base leading-relaxed mb-6"
            >
              {PORTFOLIO.personal.bio}
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3"
            >
              {['Python', 'Next.js', 'Node.js', 'Odoo ERP', 'OpenAI API', 'PostgreSQL', 'OCI'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg glass text-sm text-zinc-300 border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Philosophy cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PORTFOLIO.builderMindset.philosophy.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Zap
              return (
                <motion.div
                  key={item.title}
                  custom={i + 4}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="glass rounded-xl p-4 hover:border-violet-500/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-600/15 flex items-center justify-center mb-4 group-hover:bg-violet-600/25 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
