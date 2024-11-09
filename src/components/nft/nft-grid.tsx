'use client'

import type { NFT } from "@/types"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { NFTCard } from "./nft-card"
import { useOptimistic } from 'react' // New React 18.3 hooks

type NFTGridProps = {
  nfts: NFT[]
  onNFTClick: (nft: NFT) => void
}

export function NFTGrid({ nfts, onNFTClick }: NFTGridProps) {
  // Using new optimistic updates
  const [optimisticNfts, addOptimisticNft] = useOptimistic(
    nfts,
    (state: NFT[], newNft: NFT) => [...state, newNft]
  )

  return (
    <Card className="mt-6 transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>NFT Portfolio</span>
          <span className="text-sm text-muted-foreground">
            {optimisticNfts.length} NFTs
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in-50">
          {optimisticNfts.map((nft) => (
            <NFTCard 
              key={nft.id}
              nft={nft}
              onClick={onNFTClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}