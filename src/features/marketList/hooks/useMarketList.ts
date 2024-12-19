import { useQuery } from '@tanstack/react-query';
import { fetchMarketList } from '../api/marketListApi';
import { MarketListApiResponse } from '../types/marketListApi';

export const useMarketList = () => {
  //Fetch Market List
  const { data, isLoading, isError, isFetching } =
    useQuery<MarketListApiResponse>({
      queryKey: ['MarketList'],
      queryFn: fetchMarketList,
    });

  const USDTMarket =
    data?.results.filter((market) => market.currency2.code === 'USDT') ?? [];

  const IRTMarket =
    data?.results.filter((market) => market.currency2.code === 'IRT') ?? [];

  return {
    USDTMarket,
    IRTMarket,
    isLoading,
    isFetching,
    isError,
  };
};
