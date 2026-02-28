'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PORTFOLIO } from '@/lib/constants'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send, Loader2 } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.')
        reset()
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
    <section id="contact" ref={ref} className="py-20 px-4 md:px-6">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-accent">Connect</span>
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register('name')}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-accent outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-accent outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              placeholder="Your message..."
              rows={5}
              {...register('message')}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border/50 focus:border-accent outline-none transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Direct Contact Info */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground mb-4">
            Or reach out directly:
          </p>
          <a
            href={`mailto:${PORTFOLIO.personal.email}`}
            className="text-lg font-medium text-accent hover:text-accent/80 transition-colors"
          >
            {PORTFOLIO.personal.email}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
