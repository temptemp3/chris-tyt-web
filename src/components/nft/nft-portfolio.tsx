'use client'

import { useState } from 'react'
import type { NFT } from "@/types/nft"
import { NFTGrid } from "./nft-grid"
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { XCircle } from "lucide-react"

type NFTPortfolioProps = {
  nfts: NFT[]
}

export function NFTPortfolio({ nfts }: NFTPortfolioProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  const handleClose = () => setSelectedNFT(null)

  const renderPropertiesTable = (properties: Record<string, string>) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(properties).map(([key, value]) => (
          <div key={key} className="bg-primary/5 rounded-lg p-3">
            <div className="text-xs text-muted-foreground uppercase">{key}</div>
            <div className="font-medium truncate">{value}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <NFTGrid 
        nfts={nfts} 
        onNFTClick={setSelectedNFT} 
      />

      <Dialog.Root open={!!selectedNFT} onOpenChange={() => setSelectedNFT(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
            {selectedNFT && selectedNFT.metadata && (
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left side - Image */}
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div className="rounded-lg overflow-hidden bg-black/5">
                      <img
                        src={JSON.parse(selectedNFT.metadata).image}
                        alt={JSON.parse(selectedNFT.metadata).name || `NFT #${selectedNFT.tokenId}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Right side - Metadata */}
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Dialog.Title className="text-2xl font-bold">
                        {JSON.parse(selectedNFT.metadata).name}
                      </Dialog.Title>
                      <Dialog.Description className="text-muted-foreground mt-1">
                        {JSON.parse(selectedNFT.metadata).description}
                      </Dialog.Description>
                    </div>
                    <Dialog.Close asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        aria-label="Close"
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </Dialog.Close>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-muted-foreground">Contract ID</div>
                      <div className="font-mono">{selectedNFT.contractId}</div>
                      <div className="text-muted-foreground">Token ID</div>
                      <div className="font-mono">{selectedNFT.tokenId}</div>
                      <div className="text-muted-foreground">Mint Round</div>
                      <div className="font-mono">{selectedNFT['mint-round']}</div>
                    </CardContent>
                  </Card>

                  {JSON.parse(selectedNFT.metadata).properties && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Properties</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderPropertiesTable(JSON.parse(selectedNFT.metadata).properties)}
                      </CardContent>
                    </Card>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Image Integrity: <span className="font-mono">{JSON.parse(selectedNFT.metadata).image_integrity}</span>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}