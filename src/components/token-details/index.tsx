'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CopyableAddress } from "@/components/ui/copyable-address"
import { formatAddress } from "@/lib/utils" // Utility to shorten the address
import { useTokenDetails } from "./useTokenDetails"
import { CONFIG } from "@/config"
import * as Tooltip from '@radix-ui/react-tooltip'
import { useWallet } from '@txnlab/use-wallet-react'

export function TokenDetails() {
  const { voiBalance, loading } = useTokenDetails(CONFIG.WALLET_ADDRESS)
  const { activeAccount } = useWallet()

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
              {activeAccount && activeAccount.address ? (
                <CopyableAddress
                  address={formatAddress(activeAccount.address)} // Shortened address
                  variant="address"
                />
              ) : (
                <span className="text-red-500">Not Connect</span>
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