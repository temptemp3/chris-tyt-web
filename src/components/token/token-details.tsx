'use client'

import { useMemo } from 'react'
import type { TokenInfo } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { formatAddress } from "@/lib/utils"
import { Copy } from "lucide-react"
import { Button } from "../ui/button"

type TokenDetailsProps = {
  tokenInfo: TokenInfo
}

export function TokenDetails({ tokenInfo }: TokenDetailsProps) {
  const formattedBalance = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(tokenInfo.balance)
  }, [tokenInfo.balance])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card className="mt-6 transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Token Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="font-medium text-sm text-muted-foreground mb-1">
              Creator Wallet Address:
            </p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm break-all">
                {formatAddress(tokenInfo.walletAddress, 12)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(tokenInfo.walletAddress)}
                aria-label="Copy address"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="font-medium text-sm text-muted-foreground mb-1">
              Token ID:
            </p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm">{tokenInfo.tokenId}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => copyToClipboard(tokenInfo.tokenId)}
                aria-label="Copy Token ID"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="font-medium text-sm text-muted-foreground mb-1">
              Current Balance:
            </p>
            <p className="font-mono text-sm">
              {formattedBalance}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}