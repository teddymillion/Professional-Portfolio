'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Briefcase, GraduationCap } from 'lucide-react'

export function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="experience" ref={ref} className="py-20 px-4 md:px-6 bg-muted/30">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience & <span className="text-accent">Education</span>
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {PORTFOLIO.experience.map((exp, index) => {
            const Icon = index === 0 ? Briefcase : GraduationCap
            return (
              <motion.div
                key={`${exp.company}-${index}`}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border/50 bg-background hover:border-accent/50 transition-colors"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-accent/10 mt-1">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-accent font-medium mb-3">{exp.company}</p>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-sm text-muted-foreground flex items-start gap-3"
                        >
                          <span className="text-accent mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
