import { useParams, useSearchParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { fetchMarketBuy, fetchMarketMatch, fetchMarketSell } from '../api/marketDetailApi';
import { TransactionsResponse, ordersResponse } from '../types';

export const useMarketDetail = () => {
  const [searchParams] = useSearchParams();
  const pair = searchParams.get('pair')?.replace('_', '/') ?? '/';

  const { marketId } = useParams();

  const { data: sellData } = useQuery<ordersResponse>({
    queryKey: ['MarketSell', marketId],
    queryFn: () => fetchMarketSell(+(marketId ?? 0)),
  });

  const { data: buyData } = useQuery<ordersResponse>({
    queryKey: ['MarketBuy', marketId],
    queryFn: () => fetchMarketBuy(+(marketId ?? 0)),
  });

  const { data: matchData } = useQuery<TransactionsResponse>({
    queryKey: ['MarketMatch', marketId],
    queryFn: () => fetchMarketMatch(+(marketId ?? 0)),
  });

  const sellList = sellData?.orders.slice(0, 10) ?? [];
  const buyList = buyData?.orders.slice(0, 10) ?? [];
  const matchList = matchData?.slice(0, 10) ?? [];

  const sellTotalValue = sellList?.reduce((acc, current) => acc + +current.value, 0);
  const sellTotalRemain = sellList?.reduce((acc, current) => acc + +current.remain, 0);
  const sellWAvgPrice = sellList?.reduce((acc, current) => acc + +current.remain * +current.price, 0) / sellTotalRemain;

  const buyTotalValue = buyList?.reduce((acc, current) => acc + +current.value, 0);
  const buyTotalRemain = buyList?.reduce((acc, current) => acc + +current.remain, 0);
  const buyWAvgPrice = buyList?.reduce((acc, current) => acc + +current.remain * +current.price, 0) / buyTotalRemain;

  return {
    sellList,
    buyList,
    matchList,
    pair,
    sellTotalRemain,
    sellTotalValue,
    sellWAvgPrice,
    buyTotalValue,
    buyTotalRemain,
    buyWAvgPrice,
  };
};
