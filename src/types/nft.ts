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