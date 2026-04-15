'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send, Loader2, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO } from '@/lib/constants'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
      })
      const result = await res.json()
      if (res.ok) {
        toast.success(result.message || "Message sent! I'll get back to you soon.")
        reset()
      } else {
        toast.error(result.error || 'Failed to send. Please try again.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400">Contact</span>
          <div className="h-px flex-1 max-w-[60px] bg-violet-500/30" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: CTA copy */}
          <div>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight"
            >
              Let's build something{' '}
              <span className="gradient-text">impactful.</span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-zinc-400 text-base leading-relaxed mb-8"
            >
              Whether you have a product idea, a technical challenge, or just want to connect — I'm always open to conversations that lead somewhere meaningful.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              <a
                href={`mailto:${PORTFOLIO.personal.email}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:border-violet-500/30 transition-all">
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-violet-400 transition-colors" />
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">{PORTFOLIO.personal.email}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
              </a>

              <div className="flex gap-3 pt-2">
                {PORTFOLIO.social.map((s) => {
                  const Icon = socialIcons[s.icon] ?? Mail
                  return (
                    <Link
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="p-3 rounded-xl glass text-zinc-400 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.form
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                {...register('name')}
                className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none transition-colors"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none transition-colors"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea
                placeholder="Tell me about your project or idea..."
                rows={5}
                {...register('message')}
                className="w-full px-4 py-3 rounded-xl bg-white/4 border border-white/8 text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none transition-colors resize-none"
              />
              {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
