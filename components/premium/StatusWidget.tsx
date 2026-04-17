'use client'

import { motion } from 'framer-motion'

const STATUS_ITEMS = [
  {
    dot: 'bg-emerald-400',
    pulse: true,
    label: 'Building',
    value: 'Transport digitization system for Ethiopia',
    color: 'text-emerald-400',
  },
  {
    dot: 'bg-blue-400',
    pulse: false,
    label: 'Experimenting',
    value: 'AI notification engine with behavioral triggers',
    color: 'text-blue-400',
  },
  {
    dot: 'bg-amber-400',
    pulse: false,
    label: 'Learning',
    value: 'MATLAB + advanced AI systems architecture',
    color: 'text-amber-400',
  },
]

export function StatusWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="inline-flex flex-col gap-0 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(11,15,26,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-500">
          Live Status
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-white/[0.04]">
        {STATUS_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3 px-4 py-2.5">
            <div className="relative shrink-0">
              <span className={`block w-2 h-2 rounded-full ${item.dot}`} />
              {item.pulse && (
                <span className={`absolute inset-0 rounded-full ${item.dot} opacity-50 animate-ping`} />
              )}
            </div>
            <span className={`text-[11px] font-semibold shrink-0 ${item.color}`}>
              {item.label}
            </span>
            <span className="text-[11px] text-zinc-400 leading-snug">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
