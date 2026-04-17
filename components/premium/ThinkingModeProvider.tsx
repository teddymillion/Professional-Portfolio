'use client'

import { createContext, useContext, useState } from 'react'

const ThinkingModeContext = createContext<{ on: boolean; toggle: () => void }>({ on: false, toggle: () => {} })

export function ThinkingModeProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false)
  return (
    <ThinkingModeContext.Provider value={{ on, toggle: () => setOn(v => !v) }}>
      {children}
    </ThinkingModeContext.Provider>
  )
}

export const useThinkingMode = () => useContext(ThinkingModeContext)
