'use client'

import type { NFT } from "@/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NFTCard } from "./nft-card"

interface NFTGridProps {
  nfts: NFT[]
  onNFTClick: (nft: NFT) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function NFTGrid({ 
  nfts, 
  onNFTClick, 
  currentPage, 
  totalPages,
  onPageChange 
}: NFTGridProps) {
  if (totalPages <= 1) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => {
          try {
            const metadata = JSON.parse(nft.metadata)
            return (
              <NFTCard 
                key={`${nft.contractId}-${nft.tokenId}`}
                nft={nft}
                metadata={metadata}
                onClick={() => onNFTClick(nft)}
              />
            )
          } catch (err) {
            console.error('Failed to parse NFT metadata:', err)
            return null
          }
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => {
          try {
            const metadata = JSON.parse(nft.metadata)
            return (
              <NFTCard 
                key={`${nft.contractId}-${nft.tokenId}`}
                nft={nft}
                metadata={metadata}
                onClick={() => onNFTClick(nft)}
              />
            )
          } catch (err) {
            console.error('Failed to parse NFT metadata:', err)
            return null
          }
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm min-w-[100px] text-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}