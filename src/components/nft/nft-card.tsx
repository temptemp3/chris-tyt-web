'use client'

import type { NFT, NFTMetadata } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useCachedImage } from "@/lib/cache-utils"

interface NFTCardProps {
  nft: NFT
  metadata: NFTMetadata
  onClick: () => void
}

export function NFTCard({ nft, metadata, onClick }: NFTCardProps) {
  const { cachedUrl, isLoading } = useCachedImage(metadata.image)

  return (
    <Card 
      className="cursor-pointer group transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative w-full pt-[100%] overflow-hidden">
          <div className="absolute inset-0">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : cachedUrl ? (
              <img 
                src={cachedUrl}
                alt={metadata.name || `NFT #${nft.tokenId}`}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 font-medium text-center truncate">
          {metadata.name || `NFT #${nft.tokenId}`}
        </p>
      </CardContent>
    </Card>
  )
}