'use client'

import { useState } from 'react'
import useTokenHolders from '@/hooks/useTokenHolders'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/utils"
import { Copy, CheckCircle2 } from "lucide-react"
import * as Tooltip from '@radix-ui/react-tooltip'

export function HoldersList() {
  const { holders, loading, error } = useTokenHolders()
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(address)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-8 text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    )
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Token Holders</span>
            <span className="text-sm text-muted-foreground">
              Total Holders: {holders.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Address</th>
                  <th className="text-right p-2 border-b">Balance</th>
                  <th className="text-right p-2 border-b">Share %</th>
                </tr>
              </thead>
              <tbody>
                {holders.map((holder) => (
                  <tr key={holder.address} className="group hover:bg-muted/50">
                    <td className="p-2 border-b">
                      <div className="flex items-center gap-2">
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <span className="font-mono cursor-help">
                              {formatAddress(holder.address, 8)}
                            </span>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-black/90 text-white px-3 py-1.5 rounded-md text-sm font-mono"
                              sideOffset={5}
                            >
                              {holder.address}
                              <Tooltip.Arrow className="fill-black/90" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-background hover:text-primary"
                          onClick={() => copyToClipboard(holder.address)}
                          title="Copy address"
                        >
                          {copiedAddress === holder.address ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                    <td className="p-2 border-b text-right">
                      {holder.balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                      })}
                    </td>
                    <td className="p-2 border-b text-right text-muted-foreground">
                      {holder.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Tooltip.Provider>
  )
}