'use client'

import { useState, use } from 'react'
import { TokenDetails } from '@/components/token/token-details'
import { NFTGrid } from '@/components/nft/nft-grid'
import { HoldersList } from '@/components/token/holders-list'
import type { NFT, TokenInfo } from '@/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

// In Next.js 15, we can use async components more effectively
async function getTokenData(): Promise<TokenInfo> {
  return {
    walletAddress: 'THANKYOUJE4LVRECDJOBPYZXFEVOXF3VQ6QEAXB3BFZWXDFJWE27URFZ3Q',
    tokenId: 'ABCD1234',
    balance: 10.5,
    nfts: [
      { id: '1', name: 'Landscape NFT', symbol: '🌄', bgColor: '#FFE4E1', width: 800, height: 400 },
      { id: '2', name: 'Portrait NFT', symbol: '👤', bgColor: '#E6E6FA', width: 400, height: 800 },
      { id: '3', name: 'Square NFT', symbol: '⬛', bgColor: '#F0FFF0', width: 600, height: 600 },
      { id: '4', name: 'Wide NFT', symbol: '🌅', bgColor: '#F0F8FF', width: 1200, height: 400 },
    ],
    holders: [
      { address: '0x123...', amount: 5 },
      { address: '0x456...', amount: 3 },
      { address: '0x789...', amount: 2.5 },
    ],
  }
}

export default function Home() {
  // Using the new data fetching pattern
  const tokenData = use(getTokenData())
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-primary/10 p-8 flex items-center justify-center">
              <div className="w-48 md:w-64 h-48 md:h-64 rounded-lg bg-white flex items-center justify-center text-4xl">
                🎫
              </div>
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Chris Thank You Tokens
              </h1>
              <p className="mb-4">
                Hello, my name is Chris Swenor and I created a token that I can give to people to signify my{' '}
                <b>appreciation</b> of them. The tokens have <i>no monetary value</i>, so please don&apos;t 
                expect anything from holding them.
              </p>
              <p>
                I might from time to time do something like give away an NFT or do an airdrop of a cool 
                new meme token. There are <b>no guarantees</b> so don&apos;t get mad if you get nothing 
                other than these tokens.
              </p>
            </div>
          </div>
        </div>

        <TokenDetails tokenInfo={tokenData} />
        <NFTGrid 
          nfts={tokenData.nfts} 
          onNFTClick={setSelectedNFT} 
        />
        <HoldersList holders={tokenData.holders} />

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
                        <X className="h-4 w-4" />
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
      </div>
    </main>
  )
}