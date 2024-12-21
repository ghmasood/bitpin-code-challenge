import { api, endpoints } from '@/shared/api';

import { TransactionsResponse, ordersResponse } from './dto';

export const fetchMarketSell = async (id: number): Promise<ordersResponse> => {
  const { data } = await api<ordersResponse>({
    ...endpoints.ordersList(id),
    params: { type: 'sell' },
  });
  return data;
};

export const fetchMarketBuy = async (id: number): Promise<ordersResponse> => {
  const { data } = await api<ordersResponse>({
    ...endpoints.ordersList(id),
    params: { type: 'buy' },
  });
  return data;
};

export const fetchMarketMatch = async (id: number): Promise<TransactionsResponse> => {
  const { data } = await api<TransactionsResponse>({
    ...endpoints.transactionsList(id),
  });
  return data;
};
