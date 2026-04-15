'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Rocket, Clock, Eye } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  'In Progress': { icon: Rocket, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
  Exploring: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  Vision: { icon: Eye, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
}

export function Vision() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="vision" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Vision</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
            {PORTFOLIO.vision.headline}
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            {PORTFOLIO.vision.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PORTFOLIO.vision.directions.map((dir, i) => {
            const config = statusConfig[dir.status] ?? statusConfig['Vision']
            const Icon = config.icon
            return (
              <motion.div
                key={dir.title}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="glass rounded-xl p-5 hover:border-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/15 flex items-center justify-center group-hover:bg-violet-600/25 transition-colors">
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${config.bg} ${config.color}`}>
                    {dir.status}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-3">{dir.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{dir.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
