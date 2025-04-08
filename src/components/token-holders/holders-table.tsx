'use client'

import React, { useState, useEffect } from 'react'
import { CopyableAddress } from '@/components/ui/copyable-address'
import { formatAddress } from '@/lib/utils'
import { fetchVoiName } from '@/lib/utils'
import { CONFIG } from '@/config' // Import CONFIG for creator's wallet
import type { TokenHolderDisplay } from '@/types'

interface ExtendedHolder extends TokenHolderDisplay {
  voiName?: string | null
}

interface HoldersTableProps {
  holders: TokenHolderDisplay[]
}

export function HoldersTable({ holders }: HoldersTableProps) {
  const [extendedHolders, setExtendedHolders] = useState<ExtendedHolder[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  useEffect(() => {
    async function enrichHolders() {
      const results = await Promise.all(
        holders
          .filter((holder) => holder.address !== CONFIG.WALLET_ADDRESS) // Exclude creator's wallet
          .map(async (holder) => {
            const voiName = await fetchVoiName(holder.address)
            return { ...holder, voiName }
          })
      )
      setExtendedHolders(results)
    }
    enrichHolders()
  }, [holders])

  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedHolders = extendedHolders.slice(startIndex, startIndex + rowsPerPage)
  const totalPages = Math.ceil(extendedHolders.length / rowsPerPage)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr>
            <th className="text-left p-2 border-b">Address</th>
            <th className="text-right p-2 border-b">Balance</th>
            <th className="text-right p-2 border-b">Share %</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHolders.map((holder) => (
            <tr key={holder.address} className="group hover:bg-muted/50">
              <td className="p-2 border-b">
                {holder.voiName ? (
                  <span className="font-medium">{holder.voiName}</span>
                ) : (
                  <CopyableAddress address={formatAddress(holder.address, 8)} variant="address" />
                )}
              </td>
              <td className="p-2 border-b text-right">
                {holder.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}
              </td>
              <td className="p-2 border-b text-right text-muted-foreground">
                {holder.percentage.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}