'use client'

import { useEffect, useState } from 'react'
import type { TokenDetails } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatAddress, formatNumber, getVoiBalance } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import * as Tooltip from '@radix-ui/react-tooltip'

type TokenDetailsProps = {
  tokenInfo: TokenDetails
}

export function TokenDetails({ tokenInfo }: TokenDetailsProps) {
  const [voiBalance, setVoiBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  useEffect(() => {
    async function loadBalance() {
      const balance = await getVoiBalance(tokenInfo.walletAddress)
      setVoiBalance(balance)
      setLoading(false)
    }
    loadBalance()
  }, [tokenInfo.walletAddress])

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Token Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <p className="font-medium">Creator Wallet Address:</p>
              <div className="flex items-center gap-2 mt-1">
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="font-mono cursor-help">
                      {formatAddress(tokenInfo.walletAddress, 8)}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-black/90 text-white px-3 py-1.5 rounded-md text-sm font-mono"
                      sideOffset={5}
                    >
                      {tokenInfo.walletAddress}
                      <Tooltip.Arrow className="fill-black/90" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-background hover:text-primary"
                  onClick={() => copyToClipboard(tokenInfo.walletAddress)}
                  title="Copy address"
                >
                  {copiedAddress === tokenInfo.walletAddress ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <p className="font-medium">Token ID:</p>
              <p className="font-mono">{tokenInfo.tokenId}</p>
            </div>
            <div>
              <p className="font-medium">VOI Balance:</p>
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