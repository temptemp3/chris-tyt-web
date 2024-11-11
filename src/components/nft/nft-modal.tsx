'use client'

import type { NFT } from "@/types"
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import { motion } from 'framer-motion'
import { useCachedImage } from "@/lib/cache-utils"

interface NFTModalProps {
  nft: NFT | null
  onClose: () => void
}

function renderPropertiesTable(properties: Record<string, string>) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.entries(properties).map(([key, value]) => (
        <div key={key} className="bg-muted/50 rounded p-2">
          <div className="text-sm text-muted-foreground">{key}</div>
          <div className="font-medium">{String(value)}</div>
        </div>
      ))}
    </div>
  )
}

export function NFTModal({ nft, onClose }: NFTModalProps) {
  const { cachedUrl, isLoading } = useCachedImage(
    nft ? JSON.parse(nft.metadata).image : undefined
  )

  if (!nft) return null

  const metadata = JSON.parse(nft.metadata)

  return (
    <Dialog.Root open={!!nft} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left side - Image */}
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="rounded-lg overflow-hidden bg-black/5">
                  {isLoading ? (
                    <div className="w-full h-64 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                  ) : cachedUrl && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={cachedUrl}
                      alt={metadata.name || `NFT #${nft.tokenId}`}
                      className="w-full h-auto object-contain"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right side - Metadata */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <Dialog.Title className="text-2xl font-bold">
                    {metadata.name}
                  </Dialog.Title>
                  <Dialog.Description className="text-muted-foreground mt-1">
                    {metadata.description}
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
                  <div className="font-mono">{nft.contractId}</div>
                  <div className="text-muted-foreground">Token ID</div>
                  <div className="font-mono">{nft.tokenId}</div>
                  <div className="text-muted-foreground">Collection</div>
                  <div className="font-mono">{nft.collectionName}</div>
                  <div className="text-muted-foreground">Mint Round</div>
                  <div className="font-mono">{nft['mint-round']}</div>
                </CardContent>
              </Card>

              {metadata.properties && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {renderPropertiesTable(metadata.properties)}
                  </CardContent>
                </Card>
              )}

              {metadata.image_integrity && (
                <div className="text-xs text-muted-foreground">
                  Image Integrity: <span className="font-mono">{metadata.image_integrity}</span>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}