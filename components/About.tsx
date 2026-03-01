'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="about" ref={ref} className="py-16 px-4 md:px-6 text-center">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {PORTFOLIO.personal.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {PORTFOLIO.personal.bio}
        </p>
      </motion.div>
    </section>
  )
}
