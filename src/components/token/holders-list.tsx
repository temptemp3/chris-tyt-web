'use client'

import { useMemo } from 'react'
import type { Holder } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatAddress, formatNumber } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type HoldersListProps = {
  holders: Holder[]
}

export function HoldersList({ holders }: HoldersListProps) {
  const totalHoldings = useMemo(() => 
    holders.reduce((sum, holder) => sum + holder.amount, 0),
    [holders]
  )

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Address</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right w-[100px]">Share %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holders.map((holder) => (
                <TableRow key={holder.address} className="group">
                  <TableCell className="font-mono group-hover:bg-muted/50">
                    {formatAddress(holder.address)}
                  </TableCell>
                  <TableCell className="text-right group-hover:bg-muted/50">
                    {formatNumber(holder.amount)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground group-hover:bg-muted/50">
                    {((holder.amount / totalHoldings) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}