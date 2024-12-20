import { type FC, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';

import { useMarketDetail } from './hooks/useMarketDetails';

import OrdersList from './UI/ordersList';
import TransactionsList from './UI/transactionsList';

const MarketDetailPage: FC = () => {
  const [tab, setTab] = useState<'order' | 'match'>('order');

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
    <div className='flex w-full flex-col gap-8 lg:flex-row'>
      <div className='flex w-full flex-col gap-4 rounded-xl bg-neutral-100 p-4 shadow dark:bg-neutral-800 lg:w-1/2'>
        <span className='text-center text-xl font-bold text-primary'>{pair}</span>
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
  );
};

export { MarketDetailPage };
