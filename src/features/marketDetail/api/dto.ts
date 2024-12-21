export type TransactionsResponse = {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: 'sell' | 'buy';
  match_id: string;
}[];

export type ordersResponse = {
  volume: string;
  orders: {
    amount: string;
    price: string;
    remain: string;
    value: string;
  }[];
};
