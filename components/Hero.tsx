'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PORTFOLIO } from '@/lib/constants'
import { StatusWidget } from '@/components/premium/StatusWidget'
import { ChallengeCTA } from '@/components/premium/ChallengeCTA'
import { CVDownload } from '@/components/premium/CVDownload'

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export function Hero() {
  // Easter egg: console message
  useEffect(() => {
    console.log(
      '%c👋 Hey, you found the console.',
      'color: #a78bfa; font-size: 14px; font-weight: bold;'
    )
    console.log(
      '%cIf you\'re reading this, you should probably work with Teddy.\n→ tedrosmilion19@gmail.com',
      'color: #6d28d9; font-size: 12px;'
    )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-700/8 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-blue-700/8 blur-[130px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-zinc-400 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for collaboration
              <span className="text-zinc-600">·</span>
              <MapPin className="w-3 h-3" />
              {PORTFOLIO.personal.location}
            </motion.div>

            {/* Mobile profile photo */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="flex lg:hidden items-center gap-4 mb-6"
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-1 ring-violet-500/30 shrink-0"
                style={{ boxShadow: '0 0 20px rgba(109,94,246,0.25)' }}>
                <Image src="/tewodros-profile.jpg" alt="Tewodros Million" fill className="object-cover object-top" priority />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{PORTFOLIO.personal.name}</p>
                <p className="text-xs text-violet-400 mt-0.5">{PORTFOLIO.personal.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-zinc-500">Available · {PORTFOLIO.personal.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-sm font-semibold tracking-[0.15em] uppercase text-violet-400 mb-3"
            >
              {PORTFOLIO.personal.name}
            </motion.p>

            <motion.h1
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5"
            >
              <span className="gradient-text">{PORTFOLIO.personal.heroHeadline}</span>
            </motion.h1>

            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base md:text-lg text-zinc-400 mb-3 font-medium"
            >
              {PORTFOLIO.personal.heroSubheadline}
            </motion.p>

            <motion.p
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="text-sm md:text-base text-zinc-500 mb-8 max-w-xl leading-relaxed"
            >
              {PORTFOLIO.personal.tagline}
            </motion.p>

            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-wrap gap-2 mb-8"
            >
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_24px_rgba(139,92,246,0.45)] hover:-translate-y-px"
              >
                View Projects
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass text-zinc-300 text-sm font-semibold hover:bg-white/6 hover:-translate-y-px transition-all duration-300"
              >
                Work With Me
              </Link>
              <ChallengeCTA />
              <CVDownload />
            </motion.div>

            <motion.div
              custom={6} variants={fadeUp} initial="hidden" animate="visible"
              className="flex gap-2 mb-8"
            >
              {PORTFOLIO.social.map((s) => {
                const Icon = socialIcons[s.icon] ?? Mail
                return (
                  <Link
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-2.5 rounded-lg glass text-zinc-500 hover:text-violet-400 hover:border-violet-500/25 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </motion.div>

            <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
              <StatusWidget />
            </motion.div>
          </div>

          {/* RIGHT: Profile photo */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative float">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-violet-600/25 via-blue-600/15 to-violet-600/25 blur-2xl" />
              <div className="relative animated-border rounded-2xl">
                <div className="relative w-60 h-72 rounded-2xl overflow-hidden">
                  <Image
                    src="/tewodros-profile.jpg"
                    alt="Tewodros Million"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/50 via-transparent to-transparent" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-12 top-10 glass rounded-xl px-3 py-2 text-center shadow-lg"
              >
                <p className="text-base font-bold text-white">3.36</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">CGPA</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-12 bottom-14 glass rounded-xl px-3 py-2 text-center shadow-lg"
              >
                <p className="text-base font-bold gradient-text-purple">5+</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">Products</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass rounded-xl px-4 py-1.5 whitespace-nowrap shadow-lg"
              >
                <p className="text-xs text-zinc-400 font-medium">
                  <span className="text-violet-400">AI</span> · ERP · Full Stack
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] text-zinc-700 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
