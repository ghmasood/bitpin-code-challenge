import { type FC, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';

import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';

import { DateTime } from 'luxon';

import clsx from 'clsx';

import { useMarketDetail } from './hooks/useMarketDetails';

const MarketDetailPage: FC = () => {
  const [tab, setTab] = useState<'order' | 'match'>('order');

  const { marketId } = useParams();
  const [searchParams] = useSearchParams();
  const pair = searchParams.get('pair')?.replace('_', '/');
  const { buyData, sellData, matchData } = useMarketDetail(+(marketId ?? 0));

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
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between gap-2 text-lg font-bold [&>span]:w-1/3'>
                <span>قیمت</span>
                <span className='text-center'>مقدار معامله شده</span>
                <span className='text-end'>زمان</span>
              </div>
              {matchData?.slice(0, 10).map((item, index) => (
                <div
                  key={index}
                  className={clsx([
                    'flex justify-between [&>span]:w-1/3',
                    item.type === 'buy' ? 'text-green-500' : 'text-red-500',
                  ])}
                >
                  <span>{(+item.price).toLocaleString()}</span>
                  <span className='text-center'>{(+item.match_amount).toLocaleString()}</span>
                  <span className='text-end'>
                    {DateTime.fromSeconds(item.time).setLocale('fa').toLocaleString(DateTime.DATETIME_MED)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-8 xl:flex-row xl:gap-24'>
              <div className='flex flex-col gap-2 text-green-500 xl:w-1/2'>
                <div className='flex justify-between gap-2 text-lg font-bold [&>span]:w-1/3'>
                  <span>قیمت</span>
                  <span className='text-center'>ارزش</span>
                  <span className='text-end'>باقی‌مانده</span>
                </div>
                <div className='flex flex-col gap-2'>
                  {buyData?.orders.slice(0, 10).map((i) => (
                    <div className='flex justify-between gap-2 [&>span]:w-1/3'>
                      <span>{i.price}</span>
                      <span className='text-center'>{i.value}</span>
                      <span className='text-end'>{i.remain}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 text-red-500 xl:w-1/2'>
                <div className='flex justify-between gap-2 text-lg font-bold [&>span]:w-1/3'>
                  <span>قیمت</span>
                  <span className='text-center'>ارزش</span>
                  <span className='text-end'>باقی‌مانده</span>
                </div>
                <div className='flex flex-col gap-2'>
                  {sellData?.orders.slice(0, 10).map((i) => (
                    <div className='flex justify-between gap-2 [&>span]:w-1/3'>
                      <span>{i.price}</span>
                      <span className='text-center'>{i.value}</span>
                      <span className='text-end'>{i.remain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { MarketDetailPage };
