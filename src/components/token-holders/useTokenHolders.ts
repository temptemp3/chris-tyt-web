import { useState, useEffect, useCallback } from 'react'
import { CONFIG } from '@/config'
import type { TokenHolderDisplay, TokenBalanceResponse } from '@/types'

export function useTokenHolders() {
  const [holders, setHolders] = useState<TokenHolderDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchHolders = useCallback(async () => {
    try {
      const response = await fetch(
        `${CONFIG.APIS.NAUTILUS_INDEXER}/arc200/balances?contractId=${CONFIG.TOKEN_ID}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch token holders')
      }

      const data: TokenBalanceResponse = await response.json()
      
      // Filter out creator wallet and calculate percentages
      const holdersData = data.balances
        .filter(b => b.accountId !== CONFIG.WALLET_ADDRESS)
        .map(b => ({
          balance: parseInt(b.balance) / 1_000_000,
          address: b.accountId,
          percentage: 0
        }))
        .sort((a, b) => b.balance - a.balance)

      const totalBalance = holdersData.reduce((sum, b) => sum + b.balance, 0)
      
      return holdersData.map(holder => ({
        ...holder,
        percentage: (holder.balance / totalBalance) * 100
      }))
    } catch (error) {
      throw new Error('Failed to fetch token holders')
    }
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const holdersData = await fetchHolders()
      setHolders(holdersData)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      setHolders([])
    } finally {
      setLoading(false)
    }
  }, [fetchHolders])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { 
    holders, 
    loading, 
    error, 
    lastRefresh,
    refreshData: fetchData 
  }
}