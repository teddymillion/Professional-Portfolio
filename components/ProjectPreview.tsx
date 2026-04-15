'use client'

import { useState, useRef, useEffect } from 'react'
import { ExternalLink, RefreshCw, MonitorSmartphone } from 'lucide-react'
import Link from 'next/link'

interface ProjectPreviewProps {
  url: string
  title: string
}

// Sites known to block iframe embedding
const BLOCKED_DOMAINS = [
  'ai-resume-analyzer-bice-two.vercel.app',
]

function isBlocked(url: string) {
  return BLOCKED_DOMAINS.some(d => url.includes(d))
}

export function ProjectPreview({ url, title }: ProjectPreviewProps) {
  const [loaded, setLoaded] = useState(false)
  const [key, setKey] = useState(0)
  const blocked = isBlocked(url)

  const reload = () => {
    setLoaded(false)
    setKey(k => k + 1)
  }

  if (blocked) {
    return (
      <div className="flex flex-col h-full" style={{ minHeight: '280px' }}>
        {/* Browser chrome */}
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
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-zinc-700 hover:text-violet-400 hover:bg-white/5 transition-colors"
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>

        {/* Fallback body */}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#0c0c16] flex flex-col items-center justify-center gap-4 group cursor-pointer"
          style={{ minHeight: '248px' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-violet-600/15 flex items-center justify-center group-hover:bg-violet-600/25 transition-colors">
            <MonitorSmartphone className="w-5 h-5 text-violet-400" />
          </div>
          <div className="text-center px-6">
            <p className="text-sm font-semibold text-white mb-1">{title}</p>
            <p className="text-xs text-zinc-500">This app restricts embedded previews.</p>
          </div>
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-semibold group-hover:bg-violet-600/35 transition-all">
            <ExternalLink className="w-3 h-3" />
            Open Live App
          </span>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ minHeight: '280px' }}>
      {/* Browser chrome */}
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
          <button onClick={reload} className="p-1 rounded text-zinc-700 hover:text-zinc-400 hover:bg-white/5 transition-colors" aria-label="Reload">
            <RefreshCw className="w-2.5 h-2.5" />
          </button>
          <Link href={url} target="_blank" rel="noopener noreferrer" className="p-1 rounded text-zinc-700 hover:text-violet-400 hover:bg-white/5 transition-colors" aria-label="Open in new tab">
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* iframe */}
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

        {/* Click overlay — opens new tab */}
        {loaded && (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 cursor-pointer flex items-end justify-end p-2"
            aria-label={`Open ${title} in new tab`}
          >
            <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-2.5 h-2.5" />
              Open
            </span>
          </Link>
        )}

        <iframe
          key={key}
          src={url}
          title={title}
          className="w-full h-full border-0 bg-white"
          style={{ minHeight: '248px' }}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  )
}
