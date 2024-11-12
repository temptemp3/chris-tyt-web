'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CopyableAddress } from "@/components/ui/copyable-address"
import { formatNumber } from "@/lib/utils"
import { useTokenDetails } from "./useTokenDetails"
import { CONFIG } from "@/config"
import * as Tooltip from '@radix-ui/react-tooltip'

export function TokenDetails() {
  const { voiBalance, loading } = useTokenDetails(CONFIG.WALLET_ADDRESS)

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
                Creator Wallet Address
              </p>
              <CopyableAddress
                address={CONFIG.WALLET_ADDRESS}
                variant="address"
              />
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
                  `${formatNumber(voiBalance)} VOI`
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tooltip.Provider>
  )
}