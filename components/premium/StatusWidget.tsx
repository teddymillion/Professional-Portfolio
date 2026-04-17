'use client'

import { motion } from 'framer-motion'
import { PERSONAL_CONTEXT } from '@/data/personal-context'

const STATUS_ITEMS = [
  { emoji: '🟢', label: 'Building', value: PERSONAL_CONTEXT.currentWork.building },
  { emoji: '🧪', label: 'Experimenting', value: PERSONAL_CONTEXT.currentWork.experimenting },
  { emoji: '📚', label: 'Learning', value: PERSONAL_CONTEXT.currentWork.learning },
]

export function StatusWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="glass rounded-xl p-3 max-w-xs"
    >
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-zinc-600 mb-2">Current Status</p>
      <div className="space-y-1.5">
        {STATUS_ITEMS.map(item => (
          <div key={item.label} className="flex items-start gap-2">
            <span className="text-xs shrink-0 mt-px">{item.emoji}</span>
            <div className="min-w-0">
              <span className="text-[10px] text-zinc-500 font-medium">{item.label}: </span>
              <span className="text-[10px] text-zinc-300">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
