import { useQuery } from '@tanstack/react-query';

import { fetchMarketBuy, fetchMarketMatch, fetchMarketSell } from '../api/marketDetailApi';
import { TransactionsResponse, ordersResponse } from '../types';

export const useMarketDetail = (id: number) => {
  const { data: sellData } = useQuery<ordersResponse>({
    queryKey: ['MarketSell', 'id'],
    queryFn: () => fetchMarketSell(id),
  });

  const { data: buyData } = useQuery<ordersResponse>({
    queryKey: ['MarketBuy', 'id'],
    queryFn: () => fetchMarketBuy(id),
  });

  const { data: matchData } = useQuery<TransactionsResponse>({
    queryKey: ['MarketMatch', 'id'],
    queryFn: () => fetchMarketMatch(id),
  });

  return {
    sellData,
    buyData,
    matchData,
  };
};
