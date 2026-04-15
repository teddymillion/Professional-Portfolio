'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { PORTFOLIO } from '@/lib/constants'

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white">
            TM<span className="text-violet-500">.</span>
          </span>
          <span className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Tewodros Million
          </span>
        </div>

        <p className="text-zinc-600 text-sm text-center">
          Building systems that scale — from Addis Ababa to the world.
        </p>

        <div className="flex gap-3">
          {PORTFOLIO.social.map((s) => {
            const Icon = socialIcons[s.icon] ?? Mail
            return (
              <Link
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="p-2 rounded-lg text-zinc-600 hover:text-violet-400 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
