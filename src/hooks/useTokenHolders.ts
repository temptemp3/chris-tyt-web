import { useState, useEffect } from 'react';
import { CONFIG } from '@/config';
import type { TokenBalanceResponse, TokenHolderDisplay } from '@/types';

function useTokenHolders() {
  const [holders, setHolders] = useState<TokenHolderDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const response = await fetch(
          `${CONFIG.APIS.NAUTILUS_INDEXER}/arc200/balances?contractId=${CONFIG.TOKEN_ID}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch token holders');
        }

        const data: TokenBalanceResponse = await response.json();
        
        // Filter out the creator's balance and convert string balances to numbers
        const filteredBalances = data.balances
          .filter(b => b.accountId !== CONFIG.WALLET_ADDRESS)
          .map(b => ({
            balance: parseInt(b.balance) / 1_000_000, // Assuming 6 decimal places
            address: b.accountId
          }));

        // Calculate total balance excluding creator
        const totalBalance = filteredBalances.reduce((sum, b) => sum + b.balance, 0);

        // Calculate percentages
        const holdersWithPercentages = filteredBalances.map(holder => ({
          ...holder,
          percentage: (holder.balance / totalBalance) * 100
        }));

        setHolders(holdersWithPercentages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch token holders');
      } finally {
        setLoading(false);
      }
    };

    fetchHolders();
  }, []);

  return { holders, loading, error };
}

export default useTokenHolders;