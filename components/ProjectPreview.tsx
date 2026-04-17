'use client'

import { useState } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectPreviewProps {
  url: string
  title: string
  coverImage?: string
}

const BLOCKED_DOMAINS = ['ai-resume-analyzer-bice-two.vercel.app', 'ai-text-image-tagger.vercel.app']

function isBlocked(url: string) {
  return BLOCKED_DOMAINS.some(d => url.includes(d))
}

function ChromeBar({ url, onReload, showReload }: { url: string; onReload?: () => void; showReload?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#0c0c16] border-b border-white/5 shrink-0">
      <div className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
      </div>
      <div className="flex-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/4 border border-white/5 mx-2">
        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
        <span className="text-[10px] text-zinc-600 truncate font-mono">{url.replace('https://', '')}</span>
      </div>
      <div className="flex items-center gap-0.5">
        {showReload && onReload && (
          <button onClick={onReload} className="p-1 rounded text-zinc-700 hover:text-zinc-400 hover:bg-white/5 transition-colors" aria-label="Reload">
            <RefreshCw className="w-2.5 h-2.5" />
          </button>
        )}
        <Link href={url} target="_blank" rel="noopener noreferrer"
          className="p-1 rounded text-zinc-700 hover:text-violet-400 hover:bg-white/5 transition-colors" aria-label="Open in new tab">
          <ExternalLink className="w-2.5 h-2.5" />
        </Link>
      </div>
    </div>
  )
}

export function ProjectPreview({ url, title, coverImage }: ProjectPreviewProps) {
  const [loaded, setLoaded] = useState(false)
  const [key, setKey] = useState(0)
  const blocked = isBlocked(url)

  const reload = () => { setLoaded(false); setKey(k => k + 1) }

  if (blocked) {
    return (
      <div className="flex flex-col h-full" style={{ minHeight: '280px' }}>
        <ChromeBar url={url} />
        <Link href={url} target="_blank" rel="noopener noreferrer"
          className="flex-1 relative overflow-hidden group cursor-pointer" style={{ minHeight: '248px' }}>
          {coverImage ? (
            <>
              <Image src={coverImage} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#070A12]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/80 backdrop-blur-sm text-white text-xs font-semibold">
                  <ExternalLink className="w-3 h-3" />
                  Open Live App
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-[#0c0c16] flex flex-col items-center justify-center gap-3">
              <p className="text-xs text-zinc-500 text-center px-6">This app restricts embedded previews.</p>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold group-hover:bg-violet-600/35 transition-all">
                <ExternalLink className="w-3 h-3" />
                Open Live App
              </span>
            </div>
          )}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ minHeight: '280px' }}>
      <ChromeBar url={url} onReload={reload} showReload />
      <div className="relative flex-1 overflow-hidden group" style={{ minHeight: '248px' }}>
        {!loaded && (
          <div className="absolute inset-0 bg-[#0c0c16] flex flex-col items-center justify-center gap-2.5 z-10">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <span className="text-[10px] text-zinc-700">Loading {title}...</span>
          </div>
        )}
        {loaded && (
          <Link href={url} target="_blank" rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer flex items-end justify-end p-2"
            aria-label={`Open ${title} in new tab`}>
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-2.5 h-2.5" />
              Open
            </span>
          </Link>
        )}
        <iframe key={key} src={url} title={title} className="w-full h-full border-0 bg-white"
          style={{ minHeight: '248px' }} onLoad={() => setLoaded(true)} loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
      </div>
    </div>
  )
}
