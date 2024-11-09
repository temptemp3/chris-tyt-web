'use client'

import { useMemo } from 'react'
import type { Holder } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { formatAddress, formatNumber } from "@/lib/utils"
import { Copy, CheckCircle2 } from "lucide-react"
import { useState } from 'react'

type HoldersListProps = {
  holders: Holder[]
}

export function HoldersList({ holders }: HoldersListProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  
  const totalHoldings = useMemo(() => 
    holders.reduce((sum, holder) => sum + holder.amount, 0),
    [holders]
  )

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
    <Card className="mt-6 transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>List of Holders</span>
          <span className="text-sm text-muted-foreground">
            Total: {formatNumber(totalHoldings)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto relative rounded-md border">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Address</th>
                <th className="text-right p-2 border-b">Amount</th>
                <th className="text-right p-2 border-b w-[100px]">Share %</th>
              </tr>
            </thead>
            <tbody>
              {holders.map((holder) => (
                <tr key={holder.address} className="group hover:bg-muted/50 transition-colors">
                  <td className="p-2 border-b">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">
                        {formatAddress(holder.address)}
                      </span>
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
                    {formatNumber(holder.amount)}
                  </td>
                  <td className="p-2 border-b text-right text-muted-foreground">
                    {((holder.amount / totalHoldings) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}