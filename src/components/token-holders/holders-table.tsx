'use client'

import { CopyableAddress } from "@/components/ui/copyable-address"
import type { TokenHolderDisplay } from '@/types'

interface HoldersTableProps {
  holders: TokenHolderDisplay[]
}

export function HoldersTable({ holders }: HoldersTableProps) {
  return (
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
                <CopyableAddress 
                  address={holder.address}
                  name={holder.name}
                  variant={"name"}
                  truncateLength={8}
                />
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
  )
}