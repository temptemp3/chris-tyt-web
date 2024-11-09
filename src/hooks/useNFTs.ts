import { useState, useEffect } from 'react';
import type { NFT, NFTResponse } from '@/types/nft';

export const useNFTs = (walletAddress: string) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await fetch(
          `https://mainnet-idx.nautilus.sh/nft-indexer/v1/tokens?owner=${walletAddress}&include=all`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch NFTs');
        }

        const data: NFTResponse = await response.json();
        setNfts(data.tokens);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch NFTs');
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchNFTs();
    }
  }, [walletAddress]);

  return { nfts, loading, error };
};