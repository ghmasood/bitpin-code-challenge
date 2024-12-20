import { type FC, useState } from 'react';

import { Button } from '@/shared/UI/button';
import { Input } from '@/shared/UI/input';
import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';

import clsx from 'clsx';

import { useMarketDetail } from './hooks/useMarketDetails';

import OrdersList from './UI/ordersList';
import TransactionsList from './UI/transactionsList';

const MarketDetailPage: FC = () => {
  const [tab, setTab] = useState<'order' | 'match'>('order');
  const [side, setSide] = useState<'sell' | 'buy'>('buy');
  const [percent, setPercent] = useState(0);

  const {
    buyList,
    sellList,
    matchList,
    pair,
    buyTotalRemain,
    buyTotalValue,
    buyWAvgPrice,
    sellTotalRemain,
    sellTotalValue,
    sellWAvgPrice,
  } = useMarketDetail();

  return (
    <div className='flex flex-col gap-4'>
      <span className='text-red text-center text-xl font-bold'>{pair}</span>
      <div className='flex w-full flex-col items-start gap-8 lg:flex-row'>
        <div className='flex w-full flex-col gap-4 rounded-xl bg-neutral-100 p-4 shadow dark:bg-neutral-800 lg:w-1/2'>
          <Tabs value={side} onValueChange={(e) => setSide(e as 'sell' | 'buy')} className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white' value='sell'>
                فروش
              </TabsTrigger>
              <TabsTrigger className='data-[state=active]:bg-green-500 data-[state=active]:text-white' value='buy'>
                خرید
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <label className='relative mt-4'>
            <span className='absolute -top-3 start-2 bg-neutral-100 px-1 text-sm font-medium text-ring dark:bg-neutral-800'>
              مقدار سفارش (٪)
            </span>
            <Input
              type='number'
              min={0}
              max={100}
              step={0.01}
              value={percent}
              onChange={(e) => (+e.target.value > 100 ? setPercent(100) : setPercent(+e.target.value))}
            />
          </label>

          <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
            <span>حجم مورد سفارش ({pair.split('/')[0]}) :</span>
            <span>{side === 'buy' ? (percent * buyTotalRemain) / 100 : (percent * sellTotalRemain) / 100}</span>
          </div>

          <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
            <span>میانگین قیمت ({pair.split('/')[1]}) :</span>
            <span>{side === 'buy' ? buyWAvgPrice : sellWAvgPrice}</span>
          </div>

          <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
            <span>مبلغ قابل پرداخت ({pair.split('/')[1]}) :</span>
            <span>
              {side === 'buy'
                ? (buyWAvgPrice * (percent * buyTotalRemain)) / 100
                : (sellWAvgPrice * (percent * sellTotalRemain)) / 100}
            </span>
          </div>

          <Button className={clsx([side === 'buy' ? 'bg-green-500' : 'bg-red-500', 'text-lg font-black text-white'])}>
            سفارش
          </Button>
        </div>

        <div className='flex h-full w-full flex-col items-center gap-8 rounded-xl bg-neutral-100 p-4 shadow dark:bg-neutral-800 lg:w-1/2'>
          <div className='flex w-full justify-center'>
            <Tabs value={tab} onValueChange={(e) => setTab(e as 'order' | 'match')} className='w-full'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='match'>لیست معاملات</TabsTrigger>
                <TabsTrigger value='order'>لیست سفارش‌ها</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className='flex w-full flex-col gap-3'>
            {tab === 'match' ? (
              <TransactionsList matchData={matchList} />
            ) : (
              <div className='flex flex-col gap-8 xl:flex-row xl:gap-24'>
                <OrdersList
                  orders={sellList}
                  orderType='sell'
                  pair={pair}
                  totalValue={sellTotalValue}
                  totalRemain={sellTotalRemain}
                  wAvgPrice={sellWAvgPrice}
                />
                <OrdersList
                  orders={buyList}
                  orderType='buy'
                  pair={pair}
                  totalValue={buyTotalValue}
                  totalRemain={buyTotalRemain}
                  wAvgPrice={buyWAvgPrice}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketDetailPage };
