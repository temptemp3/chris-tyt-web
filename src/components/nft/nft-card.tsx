'use client'

import type { NFT } from "@/types"
import { Card, CardContent } from "../ui/card"
import { useId } from "react"

type NFTCardProps = {
  nft: NFT
  onClick: (nft: NFT) => void
}

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const uniqueId = useId()

  return (
    <Card 
      className="cursor-pointer group transition-all duration-300 hover:shadow-lg"
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
              className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
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
        <p className="mt-2 font-medium text-center group-hover:text-primary transition-colors duration-300">
          {nft.name}
        </p>
      </CardContent>
    </Card>
  )
}