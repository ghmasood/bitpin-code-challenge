import { Button, Input, Tabs, TabsList, TabsTrigger } from '@/shared/UI';
import { toFixedSeparated } from '@/shared/lib/';

import clsx from 'clsx';

import { useMarketDetail } from '../hooks/useMarketDetails';

import strings from '../strings.json';

function OrderForm() {
  const {
    pair,
    buyTotalRemain,
    buyWAvgPrice,
    sellTotalRemain,
    sellWAvgPrice,
    percent,
    inputPercentHandler,
    sideHandler,
    toastMock,
    side,
  } = useMarketDetail();
  return (
    <div className='flex w-full flex-col gap-4 rounded-xl bg-neutral-100 p-4 shadow dark:bg-neutral-800 xl:w-1/3'>
      <Tabs value={side} onValueChange={sideHandler} className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger className='data-[state=active]:bg-red-500 data-[state=active]:text-white' value='sell'>
            {strings.sell}
          </TabsTrigger>
          <TabsTrigger className='data-[state=active]:bg-green-500 data-[state=active]:text-white' value='buy'>
            {strings.buy}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <label className='relative mt-4'>
        <span className='absolute -top-3 start-2 bg-neutral-100 px-1 text-sm font-medium text-ring dark:bg-neutral-800'>
          {strings.orderValue}
        </span>
        <Input type='number' min={0} max={100} step={0.01} value={percent} onChange={inputPercentHandler} />
      </label>

      <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
        <span>
          {strings.orderAmount} ({pair.split('/')[0]}) :
        </span>
        <span>
          {toFixedSeparated(side === 'buy' ? (percent * buyTotalRemain) / 100 : (percent * sellTotalRemain) / 100)}
        </span>
      </div>

      <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
        <span>
          {strings.avgPrice} ({pair.split('/')[1]}) :
        </span>
        <span>{toFixedSeparated(side === 'buy' ? buyWAvgPrice : sellWAvgPrice)}</span>
      </div>

      <div className='flex items-center justify-between text-sm font-medium text-muted-foreground'>
        <span>
          {strings.priceAccumulated} ({pair.split('/')[1]}) :
        </span>
        <span>
          {toFixedSeparated(
            side === 'buy'
              ? (buyWAvgPrice * (percent * buyTotalRemain)) / 100
              : (sellWAvgPrice * (percent * sellTotalRemain)) / 100
          )}
        </span>
      </div>

      <Button
        className={clsx([side === 'buy' ? 'bg-green-500' : 'bg-red-500', 'text-lg font-black text-white'])}
        onClick={toastMock}
      >
        {strings.order}
      </Button>
    </div>
  );
}

export default OrderForm;
