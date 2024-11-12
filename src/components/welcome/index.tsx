'use client'

import Image from 'next/image'

export function Welcome() {
  return (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome!
          </h2>
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
  )
}