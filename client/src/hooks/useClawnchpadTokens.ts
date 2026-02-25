import { useState, useEffect, useCallback } from 'react';
import { getTopClawnchTokens, ClawnchpadToken } from '@/lib/clawnchpadApi';

/**
 * Hook untuk fetch live token data dari Clawnchpad
 */
export const useClawnchpadTokens = (refreshInterval: number = 30000) => {
  const [tokens, setTokens] = useState<ClawnchpadToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const tokensList = await getTopClawnchTokens(5);
      setTokens(tokensList);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Setup refresh interval
  useEffect(() => {
    const interval = setInterval(fetchTokens, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchTokens, refreshInterval]);

  return {
    tokens,
    isLoading,
    error,
    refetch: fetchTokens,
  };
};
