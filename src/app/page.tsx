'use client'

import { Welcome } from '@/components/welcome'
import { TokenDetails } from '@/components/token-details'
import { NFTPortfolio } from '@/components/nft-portfolio'
import { TokenHolders } from '@/components/token-holders'
import { RollDice } from '@/components/roll-dice'

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Welcome />
        <TokenDetails />
        <NFTPortfolio />
        <TokenHolders />
        <RollDice />
      </div>
    </main>
  )
}