'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { Github, ArrowUpRight, Zap, Lock, Brain, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ProjectPreview } from '@/components/ProjectPreview'
import { useThinkingMode } from '@/components/premium/ThinkingModeProvider'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const { on: thinkingOn } = useThinkingMode()

  return (
    <section id="projects" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Projects</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-end justify-between gap-4 mb-10 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Products I've <span className="gradient-text">shipped</span>
            </h2>
            <p className="text-zinc-500 text-sm">Live, deployed products — interact with them directly below.</p>
          </div>
          {/* Thinking mode hint */}
          <AnimatePresence>
            {thinkingOn && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                style={{ background: 'rgba(109,94,246,0.15)', border: '1px solid rgba(109,94,246,0.3)', color: '#a78bfa' }}
              >
                <Brain className="w-3.5 h-3.5" />
                Thinking Mode — decision logs visible
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="space-y-6">
          {PORTFOLIO.projects.map((project, i) => {
            const dl = (project as any).decisionLog
            return (
              <motion.div
                key={project.title}
                custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className={`rounded-xl overflow-hidden transition-all duration-500 ${
                  (project as any).featured
                    ? 'ring-1 ring-violet-500/25 hover:ring-violet-500/40'
                    : 'hover:border-white/10'
                } ${thinkingOn ? 'ring-1 ring-violet-500/20' : ''}`}
                style={{ background: 'rgba(11,15,26,0.6)', border: '1px solid rgba(255,255,255,0.055)' }}
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
                    <p className="text-[10px] text-violet-400 font-semibold tracking-widest uppercase mb-0.5">{project.tagline}</p>
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {project.link && (
                      <Link href={project.link} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg glass text-zinc-500 hover:text-violet-400 transition-all" aria-label="View code">
                        <Github className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="grid lg:grid-cols-[3fr_2fr]">
                  {/* Left: preview */}
                  <div className="border-r border-white/5">
                    {(project as any).mediaType === 'video' ? (
                      // Video cover — autoplay loop
                      <div className="relative h-52 lg:h-full min-h-[220px] overflow-hidden group">
                        <video
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        {project.demo && (
                          <Link href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-3 h-3" />
                            Open Live App
                          </Link>
                        )}
                      </div>
                    ) : project.demo ? (
                      <ProjectPreview url={project.demo} title={project.title} coverImage={project.image} />
                    ) : (
                      <div className="relative h-52 lg:h-full min-h-[220px] overflow-hidden group">
                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-[#070A12]/65 flex items-center justify-center">
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
                        <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-medium glass text-zinc-500">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Thinking Mode: Decision Log */}
                <AnimatePresence>
                  {thinkingOn && dl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden border-t border-violet-500/15"
                      style={{ background: 'rgba(109,94,246,0.05)' }}
                    >
                      <div className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="w-3.5 h-3.5 text-violet-400" />
                          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Decision Log</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div>
                            <p className="text-[9px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Tech Choice</p>
                            <p className="text-xs text-zinc-400 leading-relaxed">{dl.techChoice}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Trade-off</p>
                            <p className="text-xs text-zinc-400 leading-relaxed">{dl.tradeoff}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold text-zinc-600 uppercase tracking-widest mb-1">Next Step</p>
                            <p className="text-xs text-zinc-400 leading-relaxed">{dl.future}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        <motion.div custom={PORTFOLIO.projects.length + 2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-8 text-center">
          <Link href="https://github.com/teddymillion" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-violet-400 transition-colors group">
            <Github className="w-3.5 h-3.5" />
            More on GitHub
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
