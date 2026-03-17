'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Projects() {
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
    <section id="projects" ref={ref} className="py-16 px-4 md:px-6 bg-muted/30">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-900 hover:bg-white-500/20 transition-colors hover:text-blue-500">Projects</h2>

        <div className="grid md:grid-cols-1 gap-8">
          {PORTFOLIO.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full overflow-hidden shadow-lg border-border/50 hover:border-accent/50 transition-colors flex flex-col">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {project.image && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <CardTitle className="text-xl font-bold">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="mb-4 space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent mt-1">&#8226;</span>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
  {project.link && (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
    >
      <Github className="w-4 h-4" />
      View Code
    </Link>
  )}

  {project.demo && (
    <Link
      href={project.demo}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
    >
      <ExternalLink className="w-4 h-4" />
      Live Demo
    </Link>
  )}
</CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
