'use client'

import type { NFT } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useId } from "react" // New React 18 hook for unique IDs
// import { motion } from "framer-motion" // If we add framer-motion

type NFTCardProps = {
  nft: NFT
  onClick: (nft: NFT) => void
}

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const uniqueId = useId()

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all group"
      onClick={() => onClick(nft)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(nft)
        }
      }}
    >
      <CardContent className="p-4">
        <div className="relative w-full pt-[100%] overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <div 
              className="w-full h-full flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                backgroundColor: nft.bgColor,
                fontSize: '2rem',
              }}
              role="img"
              aria-label={nft.name}
            >
              {nft.symbol}
            </div>
          </div>
        </div>
        <p className="mt-2 font-medium text-center group-hover:text-primary transition-colors">
          {nft.name}
        </p>
      </CardContent>
    </Card>
  )
}