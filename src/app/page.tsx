import Image from 'next/image'
import { TokenDetails } from '@/components/token/token-details'
import { NFTPortfolio } from '@/components/nft/nft-portfolio'
import { HoldersList } from '@/components/token/holders-list'
import type { TokenInfo } from '@/types'

// This is now a Server Component
async function getTokenData(): Promise<TokenInfo> {
  // In production, this would be an actual API call
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

export default async function Home() {
  const tokenData = await getTokenData()

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#FF8C29]/10 p-8 flex items-center justify-center">
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

        <TokenDetails tokenInfo={tokenData} />
        <NFTPortfolio nfts={tokenData.nfts} />
        <HoldersList holders={tokenData.holders} />
      </div>
    </main>
  )
}