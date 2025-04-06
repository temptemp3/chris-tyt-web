'use client'

import { WalletProvider, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-react'

const manager = new WalletManager({
  wallets: [
    {
      id: WalletId.KIBISIS, // Use Kibisis wallet only
    },
  ],
  networks: {
    [NetworkId.MAINNET]: {
      algod: {
        baseServer: 'https://mainnet-api.algonode.cloud',
        port: '',
        token: '',
      },
    //   indexer: {
    //     baseServer: 'https://mainnet-idx.algonode.cloud',
    //     port: '',
    //     token: '',
    //   },
    },
    [NetworkId.TESTNET]: {
      algod: {
        baseServer: 'https://testnet-api.algonode.cloud',
        port: '',
        token: '',
      },
    //   indexer: {
    //     baseServer: 'https://testnet-idx.algonode.cloud',
    //     port: '',
    //     token: '',
    //   },
    },
  },
  defaultNetwork: NetworkId.MAINNET,
})

export function WalletProviderWrapper({ children }: { children: React.ReactNode }) {
  return <WalletProvider manager={manager}>{children}</WalletProvider>
}