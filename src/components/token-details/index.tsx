'use client'

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CopyableAddress } from "@/components/ui/copyable-address"
import { formatAddress } from "@/lib/utils"
import { useTokenDetails } from "./useTokenDetails"
import { CONFIG } from "@/config"
import * as Tooltip from "@radix-ui/react-tooltip"

export function TokenDetails() {
  const { voiBalance, loading } = useTokenDetails(CONFIG.WALLET_ADDRESS)
  const [creatorVoiName, setCreatorVoiName] = useState<string | null>(null)

  useEffect(() => {
    const resolveCreatorName = async () => {
      const name = await fetchVoiName(CONFIG.WALLET_ADDRESS)
      setCreatorVoiName(name)
    }
    resolveCreatorName()
  }, [])

  return (
    <Tooltip.Provider delayDuration={300}>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Token Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                Creator Wallet
              </p>
              <CopyableAddress
                address={creatorVoiName || formatAddress(CONFIG.WALLET_ADDRESS)}
                variant="address"
              />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                Token ID
              </p>
              <CopyableAddress
                address={CONFIG.TOKEN_ID.toString()}
                variant="numeric"
              />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-sm text-muted-foreground">
                VOI Balance
              </p>
              <p>
                {loading ? (
                  <span className="text-muted-foreground">Loading...</span>
                ) : (
                  `${voiBalance.toFixed(2)} VOI`
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Tooltip.Provider>
  )
}

async function fetchVoiName(address: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.envoi.sh/api/name/${address}`)
    const data = await response.json()
    const result = data.results?.[0]?.name || null
    return result
  } catch (error) {
    console.error(`Error fetching .voi name: ${error}`)
    return null
  }
}