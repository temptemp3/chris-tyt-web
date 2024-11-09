export type NFT = {
    id: string
    name: string
    symbol: string
    image?: string
    bgColor: string
    width: number
    height: number
  }
  
  export type Holder = {
    address: string
    amount: number
  }
  
  export type TokenInfo = {
    walletAddress: string
    tokenId: string
    balance: number
    nfts: NFT[]
    holders: Holder[]
  }
  
  export type ChainAsset = {
    name: string
    amount: number
    symbol: string
  }
  
  export type AccountBalance = {
    voi: number
    arc200Tokens: ChainAsset[]
  }