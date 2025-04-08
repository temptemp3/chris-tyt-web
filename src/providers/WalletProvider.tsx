'use client'

import { WalletProvider, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-react'

const manager = new WalletManager({
  wallets: [
    {
      id: WalletId.KIBISIS,
      metadata: {
        name: 'KIBISIS',
        icon: '../images/kibisis.png', // Update with the correct icon path
      },
    },
    {
      id: WalletId.LUTE,
      options: {
        siteName: 'Your Site Name', // Required for LUTE
      },
      metadata: {
        name: 'LUTE',
        icon: '../images/lute.png', // Update with the correct icon path
      },
    },
    {
      id: WalletId.BIATEC,
      options: {
        projectId: 'your-biatec-project-id', // Replace with a valid project ID for BIATEC
      },
      metadata: {
        name: 'BIATEC',
        icon: '../images/biatec.png', // Update with the correct icon path
      },
    },
    {
      id: WalletId.WALLETCONNECT,
      options: {
        projectId: 'your-walletconnect-project-id', // Replace with your WalletConnect project ID
        metadata: {
          name: 'WALLET CONNECT',
          description: 'Connect with any WalletConnect-compatible wallet',
          url: 'https://yourwebsite.com', // Update with your site URL
          icons: ['../images/walletconnect.png'], // Update with the correct icon path
        },
      },
    },
  ],
  networks: {
    [NetworkId.MAINNET]: {
      algod: {
        baseServer: 'https://mainnet-api.voi.nodely.dev', // Voi mainnet
        port: '', // Adapt as needed
        token: '', // Adapt as needed
      },
    },
    [NetworkId.TESTNET]: {
      algod: {
        baseServer: 'https://testnet-api.algonode.cloud',
        port: '',
        token: '',
      },
    },
  },
  defaultNetwork: NetworkId.MAINNET, // Defaults to Voi mainnet
})

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return <WalletProvider manager={manager}>{children}</WalletProvider>
}