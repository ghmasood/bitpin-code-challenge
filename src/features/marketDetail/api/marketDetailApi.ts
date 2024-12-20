import backApi from '@/shared/api/axiosInstance';
import type { ordersResponse, TransactionsResponse } from '../types';

export const fetchMarketSell = async (id: number): Promise<ordersResponse> => {
  const { data } = await backApi.get<ordersResponse>(
    `/v2/mth/actives/${id}/?type=sell`
  );
  return data;
};

export const fetchMarketBuy = async (id: number): Promise<ordersResponse> => {
  const { data } = await backApi.get<ordersResponse>(
    `/v2/mth/actives/${id}/?type=buy`
  );
  return data;
};

export const fetchMarketMatch = async (
  id: number
): Promise<TransactionsResponse> => {
  const { data } = await backApi.get<TransactionsResponse>(
    `/v1/mth/matches/${id}/`
  );
  return data;
};
