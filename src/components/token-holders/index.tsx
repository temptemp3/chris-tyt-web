'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HoldersTable } from "./holders-table"
import { useTokenHolders } from "./useTokenHolders"
import { LoadingCard, ErrorCard } from '@/components/ui/status-cards'

export function TokenHolders() {
  const { 
    holders, 
    loading, 
    error, 
    setSearchTerm // Expose setSearchTerm for search functionality
  } = useTokenHolders()

  if (loading) {
    return <LoadingCard />
  }

  if (error) {
    return <ErrorCard message={error} />
  }

  return (
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
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search holders..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <HoldersTable holders={holders} />
      </CardContent>
    </Card>
  )
}