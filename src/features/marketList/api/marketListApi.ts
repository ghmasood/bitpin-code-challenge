import { api, endpoints } from '@/shared/api/';

import { MarketListApiResponse } from './dto';

export const fetchMarketList = async (): Promise<MarketListApiResponse> => {
  const { data } = await api<MarketListApiResponse>({ ...endpoints.marketList() });
  return data;
};
