'use client'

import Image from 'next/image'
import { color, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Certifications() {
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
    <section id="certifications" ref={ref} className="py-16 px-4 md:px-6">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden shadow-lg border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition-colors flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={cert.thumbnailUrl}
                      alt={cert.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
                <div className="flex flex-col flex-grow p-4">
                  <CardTitle className="text-md font-bold flex-grow">{cert.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">{cert.issuer}</CardDescription>
                </div>
                <CardFooter className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}