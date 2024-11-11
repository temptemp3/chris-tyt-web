'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { NFT, ContractGroup } from "@/types"
import { NFTGrid } from "./nft-grid"
import { NFTModal } from "./nft-modal"
import { CollectionTabs } from "./collection-tabs"

interface NFTPortfolioProps {
  nfts: NFT[]
}

export function NFTPortfolio({ nfts }: NFTPortfolioProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [activeContractId, setActiveContractId] = useState<number | null>(null)

  const groupedNfts = useMemo(() => {
    const grouped = nfts.reduce((acc: { [key: number]: ContractGroup }, nft) => {
      if (!acc[nft.contractId]) {
        const metadata = JSON.parse(nft.metadata)
        acc[nft.contractId] = {
          contractId: nft.contractId,
          collectionName: nft.collectionName,
          description: metadata.description,
          nfts: []
        }
      }
      acc[nft.contractId].nfts.push(nft)
      return acc
    }, {})

    return Object.values(grouped).sort((a, b) => 
      a.collectionName.localeCompare(b.collectionName)
    )
  }, [nfts])

  useEffect(() => {
    if (groupedNfts.length > 0 && !activeContractId) {
      setActiveContractId(groupedNfts[0].contractId)
    }
  }, [groupedNfts, activeContractId])

  const activeGroup = groupedNfts.find(group => group.contractId === activeContractId)

  return (
    <Card>
      <CardHeader className="space-y-0 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>NFT Portfolio</CardTitle>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
              {nfts.length} NFTs
            </span>
          </div>
        </div>
      </CardHeader>

      <CollectionTabs
        collections={groupedNfts}
        activeContractId={activeContractId}
        onSelect={setActiveContractId}
      />

      <CardContent className="pt-6">
        {activeGroup && (
          <NFTGrid 
            nfts={activeGroup.nfts}
            onNFTClick={setSelectedNFT}
          />
        )}
      </CardContent>

      <NFTModal 
        nft={selectedNFT} 
        onClose={() => setSelectedNFT(null)} 
      />
    </Card>
  )
}