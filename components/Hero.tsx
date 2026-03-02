'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Brain,
  Code2,
  Database,
  Cpu,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PORTFOLIO } from '@/lib/constants'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const skills = [
    { name: 'AI & Machine Learning', icon: Brain },
    { name: 'Full Stack Development', icon: Code2 },
    { name: 'ERP & Backend Systems', icon: Database },
    { name: 'AI-Driven Automation', icon: Cpu },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
      <motion.div
        className="max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="relative w-36 h-36 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20 shadow-lg">
            <Image
              src="/tewodros-profile.jpg"
              alt="Tewodros Million"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hi, I'm <span className="text-accent">Tewodros Million</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-semibold text-accent mb-4"
        >
          {PORTFOLIO.personal.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
        >
          {PORTFOLIO.personal.tagline}
        </motion.p>

        {/* Skills with Icons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {skill.name}
              </div>
            )
          })}
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors group"
          >
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border bg-background hover:bg-muted rounded-lg font-medium transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          {PORTFOLIO.social.map((social) => {
            const Icon =
              social.icon === 'github'
                ? Github
                : social.icon === 'linkedin'
                ? Linkedin
                : Mail

            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground hover:text-accent transition-colors"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </Link>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}