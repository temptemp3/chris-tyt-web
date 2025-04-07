'use client'

import { WalletProvider, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-react'

const manager = new WalletManager({
  wallets: [
    {
      id: WalletId.KIBISIS, // Use Kibisis wallet only
      metadata: {
        name: 'Chris Thank You Tokens', // App name
        icon: 'https://yourdomain.com/images/chris-tyt.png', // Direct token icon URL
      },
    },
  ],
  networks: {
    [NetworkId.MAINNET]: {
      algod: {
        baseServer: 'https://mainnet-api.algonode.cloud', // Mainnet Algod API
        port: '',
        token: '',
      },
    },
    [NetworkId.TESTNET]: {
      algod: {
        baseServer: 'https://testnet-api.algonode.cloud', // Testnet Algod API
        port: '',
        token: '',
      },
    },
  },
  defaultNetwork: NetworkId.MAINNET, // Ensure the default network is set correctly
})

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return <WalletProvider manager={manager}>{children}</WalletProvider>
}