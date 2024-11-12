'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { NFTGrid } from "./nft-grid"
import { NFTModal } from "./nft-modal"
import { CollectionTabs } from "./collection-tabs"
import { useNFTPortfolio } from "./useNFTPortfolio"
import { LoadingCard, ErrorCard } from "@/components/ui/status-cards"

export function NFTPortfolio() {
  const {
    loading,
    error,
    nfts,
    selectedNFT,
    setSelectedNFT,
    activeContractId,
    setActiveContractId,
    groupedNfts,
    currentPage,
    setCurrentPage,
    totalPages,
    currentPageItems
  } = useNFTPortfolio()

  if (loading) return <LoadingCard />
  if (error) return <ErrorCard message={error} />

  return (
    <Card className="mt-6">
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
        <NFTGrid 
          nfts={currentPageItems}
          onNFTClick={setSelectedNFT}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>

      <NFTModal 
        nft={selectedNFT} 
        onClose={() => setSelectedNFT(null)} 
      />
    </Card>
  )
}