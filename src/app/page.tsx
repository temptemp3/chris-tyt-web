'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TokenDetails } from '@/components/token/token-details'
import { NFTPortfolio } from '@/components/nft/nft-portfolio'
import { HoldersList } from '@/components/token/holders-list'
import { RollDice } from '@/components/token/roll-dice'
import { useNFTs } from '@/hooks/useNFTs'
import useTokenData from '@/hooks/useTokenHolders'
import type { NFT } from '@/types'
import { Card, CardContent } from "@/components/ui/card"
import { CONFIG } from '@/config'

export default function Home() {
  const { nfts, loading: nftsLoading, error: nftsError } = useNFTs(CONFIG.WALLET_ADDRESS)
  const { holders, loading: holdersLoading, error: holdersError } = useTokenData()

  const loading = nftsLoading || holdersLoading
  const error = nftsError || holdersError

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-primary/10 p-8 flex items-center justify-center">
              <Image
                src="/images/chris-tyt.png"
                alt="Chris Thank You Token"
                width={256}
                height={256}
                className="rounded-lg"
                priority
              />
            </div>
            <div className="p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Chris Thank You Tokens
              </h1>
              <p className="mb-4">
                Hello, my name is Chris Swenor and I created a token that I can give to people to signify my <b>appreciation</b> of them. The tokens have <i>no monetary value</i>, so please don&apos;t 
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

        <TokenDetails tokenInfo={{ 
          walletAddress: CONFIG.WALLET_ADDRESS, 
          tokenId: CONFIG.TOKEN_ID.toString()
        }} />
        
        {nftsLoading ? (
          <Card className="mt-6">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            </CardContent>
          </Card>
        ) : nftsError ? (
          <Card className="mt-6">
            <CardContent className="p-8 text-center text-red-500">
              {nftsError}
            </CardContent>
          </Card>
        ) : (
          <NFTPortfolio nfts={nfts} />
        )}

        <HoldersList holders={holders} loading={holdersLoading} error={holdersError} />

        {!loading && !error && nfts.length > 0 && holders.length > 0 && (
          <RollDice holders={holders} nfts={nfts} />
        )}
      </div>
    </main>
  )
}