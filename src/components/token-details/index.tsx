'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CopyableAddress } from "@/components/ui/copyable-address"
import { formatAddress } from "@/lib/utils" // Utility to shorten the address
import { useTokenDetails } from "./useTokenDetails"
import { CONFIG } from "@/config"
import * as Tooltip from '@radix-ui/react-tooltip'
import { useWallet, WalletId } from '@txnlab/use-wallet-react'
import { Button } from "@/components/ui/button"

export function TokenDetails() {
  const { voiBalance, loading } = useTokenDetails(CONFIG.WALLET_ADDRESS)
  const { activeAccount, wallets } = useWallet()

  // Check if the connected wallet matches the creator's wallet
  const isCreatorWalletConnected = activeAccount?.address === CONFIG.WALLET_ADDRESS

  const handleConnect = async () => {
    const kibisisWallet = wallets.find((wallet) => wallet.id === WalletId.KIBISIS) // Ensure Kibisis is used
    if (kibisisWallet) {
      try {
        await kibisisWallet.connect()
      } catch (error) {
        console.error('Failed to connect:', error)
      }
    } else {
      console.error('Kibisis wallet not found')
    }
  }

  const handleDisconnect = async () => {
    const kibisisWallet = wallets.find((wallet) => wallet.id === WalletId.KIBISIS) // Ensure Kibisis is used
    if (kibisisWallet) {
      try {
        await kibisisWallet.disconnect()
      } catch (error) {
        console.error('Failed to disconnect:', error)
      }
    } else {
      console.error('Kibisis wallet not found')
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Token Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                Connected Wallet Address
              </p>
              {activeAccount ? (
                <div>
                  <CopyableAddress
                    address={formatAddress(activeAccount.address)} // Shortened address
                    variant="address"
                  />
                  {isCreatorWalletConnected ? (
                    <p className="text-xs text-green-500 mt-1">
                      This is the creator&apos;s wallet
                    </p>
                  ) : (
                    <p className="text-xs text-red-500 mt-1">
                      Wallet does not match the creator&apos;s wallet
                    </p>
                  )}
                  <Button onClick={handleDisconnect} className="mt-2">
                    Disconnect Wallet
                  </Button>
                </div>
              ) : (
                <Button onClick={handleConnect} className="mt-2">
                  Connect Wallet
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                Token ID
              </p>
              <CopyableAddress
                address={CONFIG.TOKEN_ID.toString()}
                variant="numeric"
              />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                VOI Balance
              </p>
              <p>
                {loading ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  `${voiBalance.toFixed(2)} VOI`
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tooltip.Provider>
  )
}