'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ClipboardCheck } from 'lucide-react'

export function Education() {
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
    <section id="education" ref={ref} className="py-16 px-4 md:px-6">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900 hover:bg-white-500/20 transition-colors hover:text-blue-500">
          Education
        </h2>
        <div className="space-y-8">
          {PORTFOLIO.education.map((edu, index) => (
            <motion.div key={index} variants={variants}>
              <Card className="overflow-hidden shadow-lg border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Logo container */}
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={edu.logoUrl}
                        alt={`${edu.institution} logo`}
                        className="object-contain"
                        fill
                      />
                    </div>

                    {/* Education details */}
                    <div className="flex flex-col flex-1">
                      <h3 className="text-xl md:text-2xl font-bold">{edu.degree}</h3>
                      <p className="text-md md:text-lg text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm md:text-md text-muted-foreground mt-1">{edu.description}</p>

                      {/* CGPA and National Exit Exam */}
                      <div className="flex items-center gap-6 mt-4">
                        {/* CGPA */}
                        <div className="flex items-center gap-2">
                          <Star className="w-7 h-7 text-yellow-500" />
                          <span className="text-md font-medium text-muted-foreground">{edu.cgpa}</span>
                        </div>

                        {/* National Exit Exam */}
                        <div className="flex items-center gap-2">
                          <ClipboardCheck className="w-7 h-7 text-green-500" />
                          <span className="text-md font-medium text-muted-foreground">{edu.neScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}