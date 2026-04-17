'use client'

import { useThinkingMode } from './ThinkingModeProvider'
import { Brain } from 'lucide-react'

export function ThinkingModeToggle() {
  const { on, toggle } = useThinkingMode()

  return (
    <button
      onClick={toggle}
      title={on ? 'Hide architecture decisions' : 'Show how I made technical decisions on each project'}
      className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
        on
          ? 'text-violet-300'
          : 'glass text-zinc-500 hover:text-zinc-300'
      }`}
      style={on ? {
        background: 'rgba(109,94,246,0.2)',
        border: '1px solid rgba(109,94,246,0.4)',
        boxShadow: '0 0 12px rgba(109,94,246,0.15)',
      } : {}}
    >
      <Brain className={`w-3.5 h-3.5 transition-colors ${on ? 'text-violet-400' : ''}`} />
      {on ? 'Thinking: ON' : 'Thinking Mode'}
    </button>
  )
}
