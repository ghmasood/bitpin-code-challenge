import { type FC } from 'react';

import { Pagination, SwipeDetector, Tabs, TabsList, TabsTrigger } from '@/shared/UI';

import { useMarketList } from './hooks/useMarketList';

import MarketItem from './UI/marketItem';
import strings from './strings.json';

const MarketListPage: FC = () => {
  const {
    isError,
    isLoading,
    IRTPage,
    setIRTPage,
    USDTPage,
    setUSDTPage,
    totalPage,
    swipeLeftHandler,
    swipeRightHandler,
    tab,
    setTab,
    slicedList,
  } = useMarketList();

  if (isError) return <p>Error loading data</p>;

  return (
    <SwipeDetector onSwipeLeft={swipeLeftHandler} onSwipeRight={swipeRightHandler}>
      <div className='flex h-full flex-col items-center gap-8'>
        <div className='flex w-full justify-center'>
          <Tabs className='w-2/3' value={tab} onValueChange={(e) => setTab(e as 'IRT' | 'USDT')}>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='IRT'>{strings.irtMarket}</TabsTrigger>
              <TabsTrigger value='USDT'>{strings.usdtMarket}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='flex w-full flex-col gap-1'>
          {isLoading
            ? [...new Array(10)].map((_, index) => <MarketItem key={index} loading />)
            : slicedList.map((market) => <MarketItem key={market.id} marketData={market} />)}
        </div>
        <Pagination
          page={tab === 'IRT' ? IRTPage : USDTPage}
          setPage={tab === 'IRT' ? setIRTPage : setUSDTPage}
          totalPage={totalPage}
        />
      </div>
    </SwipeDetector>
  );
};

export { MarketListPage };
