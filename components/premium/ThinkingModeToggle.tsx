'use client'

import { useThinkingMode } from './ThinkingModeProvider'
import { Brain } from 'lucide-react'

export function ThinkingModeToggle() {
  const { on, toggle } = useThinkingMode()
  return (
    <button
      onClick={toggle}
      className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
        on
          ? 'bg-violet-600/30 border border-violet-500/40 text-violet-300'
          : 'glass text-zinc-500 hover:text-zinc-300'
      }`}
      title="Toggle Thinking Mode"
    >
      <Brain className={`w-3.5 h-3.5 ${on ? 'text-violet-400' : ''}`} />
      {on ? 'Thinking: ON' : 'Thinking Mode'}
    </button>
  )
}
