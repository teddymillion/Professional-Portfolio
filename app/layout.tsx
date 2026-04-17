import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { ThinkingModeProvider } from '@/components/premium/ThinkingModeProvider'
import { AiChat } from '@/features/ai-chat/AiChat'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Tewodros Million — Software Engineer & Builder',
  description: 'Building intelligent systems, scalable products, and AI-driven solutions. Software Engineer, AI Systems Builder, and Startup Founder in progress.',
  keywords: ['Software Engineer', 'AI Systems', 'Full Stack Developer', 'Startup Founder', 'Ethiopia', 'Odoo ERP', 'Next.js'],
  openGraph: {
    title: 'Tewodros Million — Software Engineer & Builder',
    description: 'Building intelligent systems, scalable products, and AI-driven solutions.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#080810] text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <ThinkingModeProvider>
            {children}
            <AiChat />
          </ThinkingModeProvider>
          <Analytics />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
