'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Briefcase } from 'lucide-react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
    <section id="experience" ref={ref} className="py-16 px-4 md:px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900 hover:bg-white-500/20 transition-colors hover:text-blue-500">Experience</h2>

        <div className="space-y-8">
          {PORTFOLIO.experience.map((exp, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden shadow-lg border-border/50 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden mt-1 shrink-0">
                      <Image
                        src="/projects/alta.jpg"
                        alt="Alta Computec Logo"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                      <p className="text-md text-accent font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{exp.description}</CardDescription>
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent mt-1">&#8226;</span>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

