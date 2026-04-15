'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { PORTFOLIO } from '@/lib/constants'
import { ShieldCheck, ChevronDown, X, ZoomIn, ExternalLink } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

const issuerColors: Record<string, string> = {
  Oracle: 'text-red-400 border-red-500/20 bg-red-500/5',
  'Oracle Cloud': 'text-red-400 border-red-500/20 bg-red-500/5',
  IBM: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
  Google: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  freeCodeCamp: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
}

type Cert = typeof PORTFOLIO.certifications[0]

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl glass-strong rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div>
              <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-0.5">{cert.issuer}</p>
              <h3 className="text-white font-bold text-base">{cert.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition-all"
              >
                <ExternalLink className="w-3 h-3" />
                Open PDF
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg glass text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full certificate image */}
          <div className="relative w-full bg-white" style={{ aspectRatio: '16/11' }}>
            <Image
              src={cert.thumbnailUrl}
              alt={cert.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-white/8 flex items-center justify-between">
            <p className="text-xs text-zinc-500 leading-relaxed max-w-lg">{cert.description}</p>
            <span className="text-xs text-zinc-600 shrink-0 ml-4">{cert.date}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CertCard({ cert, index, onOpen }: { cert: Cert; index: number; onOpen: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const colorClass = issuerColors[cert.issuer] ?? 'text-violet-400 border-violet-500/20 bg-violet-500/5'

  return (
    <motion.div
      custom={index + 2}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="glass rounded-xl overflow-hidden hover:border-white/10 transition-all duration-300 group flex flex-col"
    >
      {/* Thumbnail — click to open modal */}
      <button
        onClick={onOpen}
        className="relative aspect-video overflow-hidden w-full cursor-zoom-in"
        aria-label={`Preview ${cert.name}`}
      >
        <Image
          src={cert.thumbnailUrl}
          alt={cert.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />
        {/* Zoom hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
            <ZoomIn className="w-3.5 h-3.5" />
            View Certificate
          </div>
        </div>
      </button>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white text-sm leading-snug flex-1">{cert.name}</h3>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="text-xs text-zinc-500 leading-relaxed mb-3 overflow-hidden"
            >
              {cert.description}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-1 text-[10px] text-violet-400 hover:text-violet-300 transition-colors mb-3 w-fit"
        >
          {expanded ? 'See less' : 'See more'}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${colorClass}`}>
            {cert.issuer}
          </span>
          <span className="text-[10px] text-zinc-600">{cert.date}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeCert, setActiveCert] = useState<Cert | null>(null)

  return (
    <section id="certifications" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Credentials</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <motion.div
          custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Verified <span className="gradient-text">expertise</span>
          </h2>
          <p className="text-zinc-500 text-sm">Click any certificate to preview it in full.</p>
        </motion.div>

        {inView && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO.certifications.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onOpen={() => setActiveCert(cert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full preview modal */}
      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  )
}
