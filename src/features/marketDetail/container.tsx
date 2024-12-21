import { type FC } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/shared/UI';

import { useMarketDetail } from './hooks/useMarketDetails';

import OrderForm from './UI/orderForm';
import OrdersList from './UI/ordersList';
import TransactionsList from './UI/transactionsList';
import strings from './strings.json';

const MarketDetailPage: FC = () => {
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
    tab,
    setTab,
  } = useMarketDetail();

  return (
    <div className='flex flex-col gap-4'>
      <span className='p-3 text-center text-xl font-bold'>{pair}</span>
      <div className='flex w-full flex-col items-start gap-8 xl:flex-row'>
        <OrderForm />
        <div className='flex h-full w-full flex-col items-center gap-8 rounded-xl bg-neutral-100 p-4 shadow dark:bg-neutral-800 xl:w-2/3'>
          <div className='flex w-full justify-center'>
            <Tabs value={tab} onValueChange={(e) => setTab(e as 'orderSell' | 'match' | 'orderBuy')} className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='match'>{strings.transactionsList}</TabsTrigger>
                <TabsTrigger value='orderSell'>{strings.ordersListSell}</TabsTrigger>
                <TabsTrigger value='orderBuy'>{strings.ordersListBuy}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className='flex w-full flex-col gap-3'>
            {tab === 'match' ? (
              <TransactionsList matchData={matchList} />
            ) : tab === 'orderSell' ? (
              <OrdersList
                orders={sellList}
                orderType='sell'
                pair={pair}
                totalValue={sellTotalValue}
                totalRemain={sellTotalRemain}
                wAvgPrice={sellWAvgPrice}
              />
            ) : (
              <OrdersList
                orders={buyList}
                orderType='buy'
                pair={pair}
                totalValue={buyTotalValue}
                totalRemain={buyTotalRemain}
                wAvgPrice={buyWAvgPrice}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketDetailPage };
