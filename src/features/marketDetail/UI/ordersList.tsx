import { toFixedSeparated } from '@/shared/lib/';

import clsx from 'clsx';

import { ordersResponse } from '../api/dto';
import strings from '../strings.json';

type OrdersListProps = {
  orders: ordersResponse['orders'];
  orderType: 'sell' | 'buy';
  pair: string;
  totalValue: number;
  totalRemain: number;
  wAvgPrice: number;
};
function OrdersList({ orderType, orders, pair, totalRemain, totalValue, wAvgPrice }: OrdersListProps) {
  const codes = pair.split('/');

  return (
    <div className={clsx(['flex flex-col gap-2', orderType === 'buy' ? 'text-green-500' : 'text-red-500'])}>
      <div className='flex text-sm font-bold text-muted-foreground [&>span]:basis-1/3'>
        <span>{strings.price}</span>
        <span className='text-center'>{`${strings.amount} (${codes[0]})`}</span>
        <span className='text-end'>{`${strings.value} (${codes[1]})`}</span>
      </div>
      <div className='flex flex-col'>
        {orders.map((i, index) => (
          <div className='flex [&>span]:basis-1/3' key={index}>
            <span>{toFixedSeparated(i.price)}</span>
            <span className='text-center'>{toFixedSeparated(i.remain)}</span>
            <span className='text-end'>{toFixedSeparated(i.value)}</span>
          </div>
        ))}
      </div>
      <div className='flex border-t pt-3 font-bold [&>span]:basis-1/3'>
        <span>{toFixedSeparated(wAvgPrice)}</span>
        <span className='text-center'>{toFixedSeparated(totalRemain)}</span>
        <span className='text-end'>{toFixedSeparated(totalValue)}</span>
      </div>
    </div>
  );
}

export default OrdersList;
