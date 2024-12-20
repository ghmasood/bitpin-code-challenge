import { useState, type FC } from 'react';
import { useParams } from 'react-router';
import { useMarketDetail } from './hooks/useMarketDetails';
import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';
import clsx from 'clsx';
import { DateTime } from 'luxon';

const MarketDetailPage: FC = () => {
  const { marketId } = useParams();
  const { buyData, sellData, matchData } = useMarketDetail(+(marketId ?? 0));

  const [tab, setTab] = useState<'order' | 'match'>('match');

  return (
    <div className='flex flex-col lg:flex-row gap-12 w-full'>
      <div className='w-1/2 bg-neutral-100 dark:bg-neutral-800 shadow p-4 rounded-xl'>
        a
      </div>

      <div className='flex flex-col gap-8 items-center rounded-xl shadow h-full w-1/2 bg-neutral-100 dark:bg-neutral-800 p-4'>
        <div className='w-full flex justify-center'>
          <Tabs
            value={tab}
            onValueChange={(e) => setTab(e as 'order' | 'match')}
            className='w-full'
          >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='order'>لیست سفارش‌ها</TabsTrigger>
              <TabsTrigger value='match'>لیست معاملات</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          {tab === 'match' ? (
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 justify-between font-bold  [&>span]:w-1/3 text-lg'>
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
                  <span className='text-center'>
                    {(+item.match_amount).toLocaleString()}
                  </span>
                  <span className='text-end'>
                    {DateTime.fromSeconds(item.time)
                      .setLocale('fa')
                      .toLocaleString(DateTime.DATETIME_MED)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col xl:flex-row gap-8 xl:gap-24'>
              <div className='flex flex-col gap-2 text-green-500 xl:w-1/2'>
                <div className='flex gap-2 justify-between font-bold  [&>span]:w-1/3 text-lg'>
                  <span>قیمت</span>
                  <span className='text-center'>ارزش</span>
                  <span className='text-end'>باقی‌مانده</span>
                </div>
                <div className='flex flex-col gap-2 '>
                  {buyData?.orders.slice(0, 10).map((i) => (
                    <div className='flex gap-2 justify-between   [&>span]:w-1/3 '>
                      <span>{i.price}</span>
                      <span className='text-center'>{i.value}</span>
                      <span className='text-end'>{i.remain}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-2 text-red-500 xl:w-1/2'>
                <div className='flex gap-2 justify-between font-bold  [&>span]:w-1/3 text-lg'>
                  <span>قیمت</span>
                  <span className='text-center'>ارزش</span>
                  <span className='text-end'>باقی‌مانده</span>
                </div>
                <div className='flex flex-col gap-2'>
                  {sellData?.orders.slice(0, 10).map((i) => (
                    <div className='flex gap-2 justify-between   [&>span]:w-1/3 '>
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
