'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useNFTPortfolio } from '@/components/nft-portfolio/useNFTPortfolio'
import { useTokenHolders } from '@/components/token-holders/useTokenHolders'
import type { NFT, TokenHolderDisplay } from "@/types"

interface DataContextValue {
  nfts: NFT[]
  holders: TokenHolderDisplay[]
  loading: boolean
  error: string | null
  refreshData: () => void
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const { 
    nfts,
    loading: nftsLoading,
    error: nftsError,
    refreshData: refreshNFTs
  } = useNFTPortfolio()

  const {
    holders,
    loading: holdersLoading,
    error: holdersError,
    refreshData: refreshHolders
  } = useTokenHolders()

  const value = {
    nfts,
    holders,
    loading: nftsLoading || holdersLoading,
    error: nftsError || holdersError,
    refreshData: () => {
      refreshNFTs()
      refreshHolders()
    }
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}