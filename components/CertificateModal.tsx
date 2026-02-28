'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  certificateName: string
  pdfUrl: string
}

export function CertificateModal({
  isOpen,
  onClose,
  certificateName,
  pdfUrl,
}: CertificateModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleBackdropClick}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative w-full max-w-4xl bg-card rounded-lg shadow-2xl overflow-hidden">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur hover:bg-background rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-foreground" />
              </motion.button>

              {/* Certificate title */}
              <div className="px-6 py-4 bg-muted border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  {certificateName}
                </h3>
              </div>

              {/* PDF viewer */}
              <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center min-h-[500px] max-h-[70vh] overflow-auto">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-full"
                  title={certificateName}
                  allowFullScreen
                />
              </div>

              {/* Footer with download link */}
              <div className="px-6 py-4 bg-muted border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Click outside or press ESC to close
                </p>
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Download
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
