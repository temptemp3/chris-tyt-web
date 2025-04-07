'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dice6, Trophy } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import type { NFT, TokenHolderDisplay } from "@/types"
import { CopyableAddress } from "@/components/ui/copyable-address"
import { useData } from '@/providers/data-provider'
import { fetchVoiName } from '@/lib/utils'
import { CONFIG } from "@/config"
import { useWallet } from '@txnlab/use-wallet-react'

interface Winner {
  holder: TokenHolderDisplay
  nft: NFT
  metadata: {
    name: string
    image: string
  }
  voiName?: string | null
}

export function RollDice() {
  const { holders, nfts, loading } = useData()
  const { activeAccount } = useWallet() 
  const [winner, setWinner] = useState<Winner | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const selectWinner = async () => {
    if (!holders || holders.length === 0 || !nfts || nfts.length === 0) return

    setIsRolling(true)

    const totalTokens = holders.reduce((sum, holder) => sum + holder.balance, 0)

    const randomPoint = Math.random() * totalTokens

    let accumulator = 0
    let selectedHolder = holders[0]

    for (const holder of holders) {
      accumulator += holder.balance
      if (randomPoint <= accumulator) {
        selectedHolder = holder
        break
      }
    }

    const randomNFT = nfts[Math.floor(Math.random() * nfts.length)]
    const metadata = JSON.parse(randomNFT.metadata)

    const voiName = await fetchVoiName(selectedHolder.address)

    setTimeout(() => {
      setWinner({
        holder: selectedHolder,
        nft: randomNFT,
        metadata: {
          name: metadata.name,
          image: metadata.image
        },
        voiName 
      })
      setIsRolling(false)
    }, 2000)
  }

  const handleTransfer = () => {
    if (winner) {
      console.log(`Transferring NFT to ${winner.holder.address}`)
    }
  }

  if (!holders || holders.length === 0 || !nfts || nfts.length === 0) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dice6 className="h-5 w-5" />
          Roll them Dice
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-muted-foreground">
            Press the button below to show an example of randomly selecting a winner from the token holders.
            The chance of winning is proportional to the amount of tokens they hold -
            the more tokens they have, the better their chances!
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={selectWinner}
              disabled={isRolling}
              className="relative overflow-hidden"
            >
              {isRolling ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Dice6 className="h-5 w-5" />
                </motion.div>
              ) : (
                <>
                  <Dice6 className="h-5 w-5 mr-2" />
                  Roll the Dice
                </>
              )}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {winner && !isRolling && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
                  </motion.div>

                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Winner Selected!</div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Wallet Address:
                      </div>
                      <div className="flex justify-center">
                        {winner.voiName ? (
                          <span className="font-medium">{winner.voiName}</span>
                        ) : (
                          <CopyableAddress 
                            address={winner.holder.address}
                            variant="address"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Prize NFT:
                      </div>
                      <div className="font-medium">
                        {winner.metadata.name}
                      </div>
                      <div className="mt-4">
                        <img
                          src={winner.metadata.image}
                          alt={winner.metadata.name}
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <Button onClick={handleTransfer} className="mt-4">
                      Transfer to Winner
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}