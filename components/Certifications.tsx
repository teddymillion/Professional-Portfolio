'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CertificateModal } from './CertificateModal'
import { CERTIFICATIONS } from '@/lib/constants'

export function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof CERTIFICATIONS)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCertificateClick = (cert: (typeof CERTIFICATIONS)[0]) => {
    setSelectedCertificate(cert)
    setIsModalOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="certifications" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications demonstrating my commitment to continuous learning and expertise in cloud, AI, and web design technologies.
          </p>
        </motion.div>

        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <Image
              src="/tewodros-profile.jpg"
              alt="Tewodros Million"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.button
              key={cert.id}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => handleCertificateClick(cert)}
              className="group relative h-80 bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/50 text-left"
            >
              {/* Certificate Image/Preview */}
              <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {/* Certificate Thumbnail Image */}
                {cert.thumbnailUrl && (
                  <Image
                    src={cert.thumbnailUrl}
                    alt={cert.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                {/* PDF Preview Placeholder (fallback) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent/10">
                  <div className="text-5xl mb-3 text-primary/60">📄</div>
                  <div className="w-24 h-32 bg-white/10 rounded border-2 border-primary/20 mb-3" />
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex flex-col justify-end p-4">
                <motion.div
                  variants={hoverVariants}
                  className="space-y-2"
                >
                  <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-accent font-medium">
                    {cert.date}
                  </p>
                </motion.div>
              </div>

              {/* Hover indicator */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-white font-semibold mb-2">Click to View</p>
                  <p className="text-white/80 text-xs">Full Certificate</p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl p-6 md:p-8 border border-border"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">
            All Certifications
          </h3>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleCertificateClick(cert)}
              >
                <div className="text-2xl">✓</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-accent mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                <div className="text-primary font-medium text-sm">View</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certificateName={selectedCertificate.name}
          pdfUrl={selectedCertificate.pdfUrl}
        />
      )}
    </section>
  )
}
