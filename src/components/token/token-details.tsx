'use client'

import type { TokenDetails } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatAddress } from "@/lib/utils"

type TokenDetailsProps = {
  tokenInfo: TokenDetails
}

export function TokenDetails({ tokenInfo }: TokenDetailsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Token Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="font-medium">Creator Wallet Address:</p>
            <p className="font-mono break-all">
              {formatAddress(tokenInfo.walletAddress, 12)}
            </p>
          </div>
          <div>
            <p className="font-medium">Token ID:</p>
            <p className="font-mono">{tokenInfo.tokenId}</p>
          </div>
          <div>
            <p className="font-medium">Current Balance:</p>
            <p>{tokenInfo.balance.toLocaleString(undefined, { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            })}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}