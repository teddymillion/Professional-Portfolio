'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, ChevronDown, Code2, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CVS = [
  {
    label: 'Software Engineering CV',
    description: 'Full-stack, AI systems, ERP',
    icon: Code2,
    file: '/cv/Tewodros_Million_Software_Engineering_CV.pdf',
    filename: 'Tewodros_Million_Software_CV.pdf',
    color: 'text-violet-400',
    bg: 'hover:bg-violet-500/10',
  },
  {
    label: 'Management CV',
    description: 'Leadership, strategy, operations',
    icon: Briefcase,
    file: '/cv/Tewodros_Million_Management_CV.pdf',
    filename: 'Tewodros_Million_Management_CV.pdf',
    color: 'text-blue-400',
    bg: 'hover:bg-blue-500/10',
  },
]

export function CVDownload() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-zinc-300 text-xs font-semibold hover:bg-white/6 hover:-translate-y-px transition-all duration-300 group"
      >
        <Download className="w-3.5 h-3.5 text-violet-400 group-hover:animate-bounce" />
        Download CV
        <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2 w-64 rounded-xl overflow-hidden z-50"
            style={{
              background: 'rgba(9,12,22,0.95)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(109,94,246,0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-zinc-600 px-4 pt-3 pb-2">
              Choose version
            </p>
            {CVS.map((cv) => {
              const Icon = cv.icon
              return (
                <a
                  key={cv.label}
                  href={cv.file}
                  download={cv.filename}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 transition-all duration-150 ${cv.bg} cursor-pointer`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${cv.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{cv.label}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{cv.description}</p>
                  </div>
                  <Download className="w-3 h-3 text-zinc-600 ml-auto shrink-0" />
                </a>
              )
            })}
            <div className="px-4 py-2.5 border-t border-white/5">
              <p className="text-[9px] text-zinc-700 text-center">PDF format · Updated 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
