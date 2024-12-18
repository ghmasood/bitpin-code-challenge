import { useState, type FC } from 'react';
import { useMarketList } from './hooks/useMarketList';
import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';
import MarketItem from './UI/marketItem';

const MarketList: FC = () => {
  const { marketList, isError, isLoading } = useMarketList();

  const [tab, setTab] = useState('IRT');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data</p>;

  return (
    <div className='relative flex flex-col gap-4 items-center px-8'>
      <div className='fixed top-16 w-full pt-5 flex justify-center bg-background'>
        <Tabs value={tab} onValueChange={(e) => setTab(e)} className='w-1/2'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='IRT'>بازار پایه تومانی</TabsTrigger>
            <TabsTrigger value='USDT'>بازار پایه تتری</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className='flex flex-col gap-2 mt-8 w-full'>
        {marketList?.results
          ?.filter((item) => item.currency2.code === tab)
          .map((market) => (
            <MarketItem key={market.id} marketData={market} />
          ))}
      </div>
    </div>
  );
};

export { MarketList };
