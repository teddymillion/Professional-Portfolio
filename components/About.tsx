'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'

export function About() {
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
    <section id="about" ref={ref} className="py-20 px-4 md:px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {PORTFOLIO.personal.bio}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My passion lies in solving complex problems through clean, maintainable code and leveraging modern technologies. I'm particularly interested in ERP systems, backend development, and how technology can streamline business processes.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              { label: 'Companies', value: '1+' },
              { label: 'Projects', value: '3+' },
              { label: 'Certifications', value: '5' },
              { label: 'Years Exp.', value: '<1' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="text-2xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
