'use client';

import { useState } from 'react';
import type { NFT } from '@/types/nft';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NFTCard } from './nft-card';

interface NFTGridProps {
  nfts: NFT[];
  onNFTClick: (nft: NFT) => void;
}

export function NFTGrid({ nfts, onNFTClick }: NFTGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth >= 768 ? 12 : 4;
  const totalPages = Math.ceil(nfts.length / itemsPerPage);

  const getCurrentPageItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return nfts.slice(start, end);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>NFT Portfolio ({nfts.length})</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {getCurrentPageItems().map((nft) => {
            try {
              const metadata = JSON.parse(nft.metadata);
              return (
                <NFTCard 
                  key={`${nft.contractId}-${nft.tokenId}`}
                  nft={nft}
                  metadata={metadata}
                  onClick={() => onNFTClick(nft)}
                />
              );
            } catch (err) {
              console.error('Failed to parse NFT metadata:', err);
              return null;
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}