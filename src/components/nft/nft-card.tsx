'use client';

import type { NFT, NFTMetadata } from "@/types/nft";
import { Card, CardContent } from "../ui/card";

interface NFTCardProps {
  nft: NFT;
  metadata: NFTMetadata;
  onClick: () => void;
}

export function NFTCard({ nft, metadata, onClick }: NFTCardProps) {
  return (
    <Card 
      className="cursor-pointer group transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="relative w-full pt-[100%] overflow-hidden">
          <div className="absolute inset-0">
            {metadata.image ? (
              <img 
                src={metadata.image}
                alt={metadata.name || `NFT #${nft.tokenId}`}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-2xl">🖼️</span>
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 font-medium text-center truncate">
          {metadata.name || `NFT #${nft.tokenId}`}
        </p>
      </CardContent>
    </Card>
  );
}