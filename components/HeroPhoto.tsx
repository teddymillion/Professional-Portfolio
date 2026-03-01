'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PORTFOLIO } from '@/lib/constants'

export function HeroPhoto() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
          <Image
            src={PORTFOLIO.personal.profilePhoto}
            alt={PORTFOLIO.personal.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  )
}