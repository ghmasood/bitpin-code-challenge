export const endpoints = {
  marketList: () => ({ url: '/v1/mkt/markets/', method: 'GET' }),
  ordersList: (id: number) => ({ url: `/v2/mth/actives/${id}/`, method: 'GET' }),
  transactionsList: (id: number) => ({ url: `/v1/mth/matches/${id}/`, method: 'GET' }),
};
