import { useState, useEffect } from 'react'
import { getVoiBalance } from "@/lib/utils"

export function useTokenDetails(walletAddress: string) {
  const [voiBalance, setVoiBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBalance() {
      const balance = await getVoiBalance(walletAddress)
      setVoiBalance(balance)
      setLoading(false)
    }
    loadBalance()
  }, [walletAddress])

  return {
    voiBalance,
    loading
  }
}