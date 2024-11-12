// 'use client'

// import { createContext, useContext, ReactNode } from 'react'
// import { useNFTPortfolio } from '@/components/nft-portfolio/useNFTPortfolio'
// import { useTokenHolders } from '@/components/token-holders/useTokenHolders'
// import type { NFT, TokenHolderDisplay } from "@/types"

// interface AppContextType {
//   nfts: NFT[]
//   holders: TokenHolderDisplay[]
//   loading: boolean
//   error: string | null
//   refreshData: () => void
// }

// const AppContext = createContext<AppContextType | undefined>(undefined)

// export function AppProvider({ children }: { children: ReactNode }) {
//   const { 
//     nfts,
//     loading: nftsLoading,
//     error: nftsError,
//     refreshData: refreshNFTs
//   } = useNFTPortfolio()

//   const {
//     holders,
//     loading: holdersLoading,
//     error: holdersError,
//     refreshData: refreshHolders
//   } = useTokenHolders()

//   const value = {
//     nfts,
//     holders,
//     loading: nftsLoading || holdersLoading,
//     error: nftsError || holdersError,
//     refreshData: () => {
//       refreshNFTs()
//       refreshHolders()
//     }
//   }

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   )
// }

// export function useAppContext() {
//   const context = useContext(AppContext)
//   if (undefined === context) {
//     throw new Error('useAppContext must be used within an AppProvider')
//   }
//   return context
// }