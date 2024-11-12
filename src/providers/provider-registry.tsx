'use client'

import { ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { DataProvider } from './data-provider'

const providers = [
  // Order matters - outermost provider first
  (children: ReactNode) => (
    <Tooltip.Provider delayDuration={300}>
      {children}
    </Tooltip.Provider>
  ),
  (children: ReactNode) => <DataProvider>{children}</DataProvider>
]

/**
 * Composes multiple providers into a single provider component
 */
export function ProviderRegistry({ children }: { children: ReactNode }) {
  return providers.reduceRight((child, Provider) => Provider(child), children)
}