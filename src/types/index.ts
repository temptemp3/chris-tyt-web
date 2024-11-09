export type TokenDetails = {
    walletAddress: string;
    tokenId: string;
    balance: number;
  }
  
  export type NFTMetadata = {
    name: string;
    description: string;
    image?: string;
    image_integrity?: string;
    image_mimetype?: string;
    properties?: Record<string, string>;
  }
  
  export type NFT = {
    contractId: number;
    tokenId: number;
    owner: string;
    approved: string;
    metadataURI: string;
    metadata: string;
    "mint-round": number;
    isBurned: boolean;
  }
  
  export type NFTResponse = {
    currentRound: number;
    tokens: NFT[];
    "next-token": number;
  }
  
  export type Holder = {
    address: string;
    amount: number;
  }
  
  export type ChainAsset = {
    name: string;
    amount: number;
    symbol: string;
  }
  
  export type AccountBalance = {
    voi: number;
    arc200Tokens: ChainAsset[];
  }