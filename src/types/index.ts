/**
 * Base Types
 */
export interface ChainAsset {
    name: string
    amount: number
    symbol: string
  }
  
  export interface AccountBalance {
    voi: number
    arc200Tokens: ChainAsset[]
  }
  
  /**
   * Token Related Types
   */
  export interface TokenDetails {
    walletAddress: string
    tokenId: string
  }
  
  export interface TokenBalance {
    accountId: string
    contractId: number
    balance: string
  }
  
  export interface TokenBalanceResponse {
    "current-round": number
    balances: TokenBalance[]
    "next-token": null
  }
  
  export interface TokenHolderDisplay {
    address: string
    name: string
    balance: number
    percentage: number
  }
  
  export interface Holder {
    address: string
    amount: number
  }
  
  /**
   * NFT Related Types
   */
  export interface NFTMetadata {
    name: string
    description: string
    image?: string
    image_integrity?: string
    image_mimetype?: string
    properties?: Record<string, string>
  }
  
  export interface NFT {
    contractId: number
    tokenId: number
    owner: string
    approved: string
    metadataURI: string
    metadata: string
    "mint-round": number
    collectionName: string
    isBurned: boolean
  }
  
  export interface NFTResponse {
    currentRound: number
    tokens: NFT[]
    "next-token": number
  }
  
  export interface ContractGroup {
    contractId: number
    collectionName: string
    description?: string
    nfts: NFT[]
  }
  
  /**
   * API Response Types
   */
  export type APIResponse<T> = {
    data?: T
    error?: string
    currentRound?: number
  }
  
  /**
   * Utility Types
   */
  export type ParsedNFT = Omit<NFT, 'metadata'> & {
    metadata: NFTMetadata
  }
  
  export type ContractGroupWithParsedNFTs = Omit<ContractGroup, 'nfts'> & {
    nfts: ParsedNFT[]
  }