'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { PORTFOLIO } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="#" className="flex items-center gap-2 font-bold text-lg mb-4 hover:text-accent transition-colors">
              <span className="text-accent">{'<'}</span>
              <span>TM</span>
              <span className="text-accent">{'/>'}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Junior Software Engineer specializing in Odoo ERP and full-stack development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {PORTFOLIO.social.map((social) => {
                const Icon = social.icon === 'github' ? Github : social.icon === 'linkedin' ? Linkedin : Mail
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-muted hover:bg-accent/20 hover:text-accent transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Copyright */}
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 mb-2">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Tewodros Million
          </p>
          <p>© {currentYear} Tewodros Million. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
