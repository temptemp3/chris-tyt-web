'use client'

import * as React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      {children}
    </Tooltip.Provider>
  )
}