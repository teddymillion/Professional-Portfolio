'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Github, ArrowUpRight, Zap, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ProjectPreview } from '@/components/ProjectPreview'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="projects" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Projects</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Products I've <span className="gradient-text">shipped</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl">
            Live, deployed products — interact with them directly below.
          </p>
        </motion.div>

        <div className="space-y-6">
          {PORTFOLIO.projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className={`glass rounded-xl overflow-hidden transition-all duration-500 ${
                (project as any).featured
                  ? 'ring-1 ring-violet-500/25 hover:ring-violet-500/40'
                  : 'hover:border-white/10'
              }`}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/5">
                <div>
                  {(project as any).featured && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-[10px] font-semibold text-violet-300 mb-1.5">
                      <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />
                      Flagship Project
                    </div>
                  )}
                  <p className="text-[10px] text-violet-400 font-semibold tracking-widest uppercase mb-0.5">
                    {project.tagline}
                  </p>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg glass text-zinc-500 hover:text-violet-400 hover:border-violet-500/30 transition-all"
                      aria-label="View code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Body: iframe + details */}
              <div className="grid lg:grid-cols-[3fr_2fr]">
                {/* Left: live preview or image */}
                <div className="border-r border-white/5">
                  {project.demo ? (
                    <ProjectPreview url={project.demo} title={project.title} />
                  ) : (
                    <div className="relative h-52 lg:h-full min-h-[220px] overflow-hidden group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#080810]/65 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-zinc-400 text-xs">
                          <Lock className="w-3.5 h-3.5" />
                          Enterprise / Private Deployment
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: case study */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
                    <p className="text-[10px] font-semibold text-red-400 uppercase tracking-widest mb-1">Problem</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{project.problem}</p>
                  </div>

                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                    <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-1">Solution</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{project.solution}</p>
                  </div>

                  <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-violet-500/8 border border-violet-500/15">
                    <Zap className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-violet-300 font-medium leading-snug">{project.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-medium glass text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={PORTFOLIO.projects.length + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-8 text-center"
        >
          <Link
            href="https://github.com/teddymillion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-violet-400 transition-colors group"
          >
            <Github className="w-3.5 h-3.5" />
            More on GitHub
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
