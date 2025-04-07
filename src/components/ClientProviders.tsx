'use client'

import { ProviderRegistry } from '@/providers/provider-registry'
import { WalletProviderWrapper } from '@/providers/WalletProvider'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProviderRegistry>
      <WalletProviderWrapper>
        {children}
      </WalletProviderWrapper>
    </ProviderRegistry>
  )
}