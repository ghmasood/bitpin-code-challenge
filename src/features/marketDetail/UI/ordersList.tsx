import clsx from 'clsx';

import type { ordersResponse } from '../types';

type OrdersListProps = {
  orders: ordersResponse['orders'];
  orderType: 'sell' | 'buy';
  pair: string;
  totalValue: number;
  totalRemain: number;
  wAvgPrice: number;
};
function OrdersList({ orderType, orders, pair, totalRemain, totalValue, wAvgPrice }: OrdersListProps) {
  //
  const codes = pair.split('/');

  return (
    <div className={clsx(['flex flex-col gap-2 xl:w-1/2', orderType === 'buy' ? 'text-green-500' : 'text-red-500'])}>
      <div className='flex justify-between gap-2 text-sm font-bold text-muted-foreground [&>span]:w-1/3'>
        <span>قیمت</span>
        <span className='text-center'>{`مقدار (${codes[0]})`}</span>
        <span className='text-end'>{`ارزش (${codes[1]})`}</span>
      </div>
      <div className='flex flex-col gap-2'>
        {orders.map((i) => (
          <div className='flex justify-between gap-2 [&>span]:w-1/3'>
            <span>{i.price}</span>
            <span className='text-center'>{i.remain}</span>
            <span className='text-end'>{i.value}</span>
          </div>
        ))}
      </div>
      <div className='flex justify-between gap-2 border-t pt-3 text-lg font-bold [&>span]:w-1/3'>
        <span>{wAvgPrice.toLocaleString(undefined, { minimumFractionDigits: 3 })}</span>
        <span className='text-center'>{totalRemain.toLocaleString(undefined, { minimumFractionDigits: 3 })}</span>
        <span className='text-end'>{totalValue.toLocaleString(undefined, { minimumFractionDigits: 3 })}</span>
      </div>
    </div>
  );
}

export default OrdersList;
