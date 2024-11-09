'use client'

import { useState } from 'react'
import type { NFT } from "@/types"
import { NFTGrid } from "./nft-grid"
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from "../ui/button"
import { XCircle } from "lucide-react"

type NFTPortfolioProps = {
  nfts: NFT[]
}

export function NFTPortfolio({ nfts }: NFTPortfolioProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <>
      <NFTGrid 
        nfts={nfts} 
        onNFTClick={setSelectedNFT} 
      />

      <Dialog.Root open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
            {selectedNFT && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-bold">
                    {selectedNFT.name}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Close"
                      className="hover:bg-red-50 hover:text-red-500"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </Dialog.Close>
                </div>
                <div 
                  className="w-full rounded-lg transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundColor: selectedNFT.bgColor,
                    aspectRatio: `${selectedNFT.width}/${selectedNFT.height}`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {selectedNFT.symbol}
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}