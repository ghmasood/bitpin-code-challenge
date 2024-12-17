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

  return {
    marketList: data,
    isLoading,
    isFetching,
    isError,
  };
};
