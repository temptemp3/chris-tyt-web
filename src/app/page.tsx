'use client'

import dynamic from 'next/dynamic'
import { Welcome } from '@/components/welcome'
import { TokenDetails } from '@/components/token-details'
import { NFTPortfolio } from '@/components/nft-portfolio'
import { TokenHolders } from '@/components/token-holders'
import { RollDice } from '@/components/roll-dice'

const AppBarNoSSR = dynamic(
  () => import('@/components/ui/AppBar').then((mod) => mod.AppBar),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <AppBarNoSSR /> 
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