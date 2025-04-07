'use client'

import { useWallet, type Wallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function WalletMenu() {
  const { wallets, activeWallet } = useWallet()

  if (activeWallet) {
    return <ConnectedWallet wallet={activeWallet} />
  }

  return <WalletList wallets={wallets} />
}

function WalletList({ wallets }: { wallets: Wallet[] }) {
  return (
    <div className="wallet-list">
      <h3 className="text-lg font-medium">Connect Wallet</h3>
      <div className="wallet-options space-y-2">
        {wallets.map((wallet) => (
          <WalletOption key={wallet.id} wallet={wallet} />
        ))}
      </div>
    </div>
  )
}

function WalletOption({ wallet }: { wallet: Wallet }) {
  const [connecting, setConnecting] = useState(false)

  const handleConnect = async () => {
    setConnecting(true)
    try {
      await wallet.connect()
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={connecting}
      className="wallet-option flex items-center space-x-2"
    >
      <img
        src={wallet.metadata.icon}
        alt={wallet.metadata.name}
        width={24}
        height={24}
        className="rounded"
      />
      <span>{connecting ? 'Connecting...' : wallet.metadata.name}</span>
    </Button>
  )
}

function ConnectedWallet({ wallet }: { wallet: Wallet }) {
  return (
    <div className="connected-wallet space-y-4">
      <div className="wallet-header flex items-center space-x-2">
        <img
          src={wallet.metadata.icon}
          alt={wallet.metadata.name}
          width={32}
          height={32}
          className="rounded"
        />
        <span className="font-medium">{wallet.metadata.name}</span>
      </div>
      {wallet.accounts.length > 1 && (
        <select
          value={wallet.activeAccount?.address}
          onChange={(e) => wallet.setActiveAccount(e.target.value)}
          className="block w-full border rounded px-2 py-1"
        >
          {wallet.accounts.map((account) => (
            <option key={account.address} value={account.address}>
              {account.name}
            </option>
          ))}
        </select>
      )}
      {wallet.activeAccount && (
        <div className="account-info">
          <p className="text-sm font-medium">{wallet.activeAccount.name}</p>
          <p className="text-sm text-muted-foreground">
            {wallet.activeAccount.address}
          </p>
        </div>
      )}
      <Button onClick={wallet.disconnect} className="mt-2">
        Disconnect
      </Button>
    </div>
  )
}