'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'

export function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" ref={ref} className="py-20 px-4 md:px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-accent">Certifications</span>
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full" />
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
          <div className="space-y-6">
            {Object.entries(PORTFOLIO.skills).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="space-y-3"
              >
                <h4 className="text-lg font-semibold text-accent">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/30 text-sm font-medium hover:bg-accent/20 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {PORTFOLIO.certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-accent/50 transition-colors"
              >
                <div className="flex gap-3 items-start">
                  <span className="text-2xl">{cert.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base mb-1 text-balance">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
