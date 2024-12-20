import { useState, type FC } from 'react';
import { useMarketList } from './hooks/useMarketList';
import { Tabs, TabsList, TabsTrigger } from '@/shared/UI/tabs';
import MarketItem from './UI/marketItem';
import Pagination from '@/shared/UI/pagination';

const MarketListPage: FC = () => {
  // hook to get market data
  const { USDTMarket, IRTMarket, isError, isLoading } = useMarketList();

  // state for pagination and market selection
  const [tab, setTab] = useState<'IRT' | 'USDT'>('USDT');
  const [USDTPage, setUSDTPage] = useState(1);
  const [IRTPage, setIRTPage] = useState(1);

  /// pagination logic
  const pageSize = 10;
  const marketList = tab === 'USDT' ? USDTMarket : IRTMarket;
  const totalLength = marketList.length;
  const totalPage = Math.ceil(totalLength / pageSize);

  const slicedList =
    tab === 'IRT'
      ? marketList.slice((IRTPage - 1) * pageSize, IRTPage * pageSize - 1)
      : marketList.slice((USDTPage - 1) * pageSize, USDTPage * pageSize - 1);

  if (isError) return <p>Error loading data</p>;

  return (
    <div className='flex flex-col gap-8 items-center h-full'>
      <div className='w-full flex justify-center'>
        <Tabs
          value={tab}
          onValueChange={(e) => setTab(e as 'IRT' | 'USDT')}
          className='w-1/2'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='IRT'>بازار پایه تومانی</TabsTrigger>
            <TabsTrigger value='USDT'>بازار پایه تتری</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className='flex flex-col gap-3 w-full'>
        {isLoading
          ? [...new Array(10)].map((_, index) => (
              <MarketItem key={index} loading />
            ))
          : slicedList.map((market) => (
              <MarketItem key={market.id} marketData={market} />
            ))}
      </div>
      <Pagination
        page={tab === 'IRT' ? IRTPage : USDTPage}
        setPage={tab === 'IRT' ? setIRTPage : setUSDTPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export { MarketListPage };
