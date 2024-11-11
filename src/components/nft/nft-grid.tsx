'use client'

import { useState, useEffect } from 'react'
import type { NFT } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NFTCard } from "./nft-card"

interface NFTGridProps {
  nfts: NFT[]
  onNFTClick: (nft: NFT) => void
}

export function NFTGrid({ nfts, onNFTClick }: NFTGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 4)
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(nfts.length / itemsPerPage)

  // Reset to first page when collection changes
  useEffect(() => {
    setCurrentPage(1)
  }, [nfts])

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return nfts.slice(start, end)
  }

  if (nfts.length <= itemsPerPage) {
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
        {getCurrentPageItems().map((nft) => {
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
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}