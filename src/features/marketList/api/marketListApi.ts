import backApi from '@/shared/api/axiosInstance';

import { MarketListApiResponse } from '../types/marketListApi';

export const fetchMarketList = async (): Promise<MarketListApiResponse> => {
  const { data } = await backApi.get<MarketListApiResponse>('/v1/mkt/markets/');
  return data;
};
