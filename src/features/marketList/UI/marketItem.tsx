import clsx from 'clsx';
import type { Market } from '../types/marketListApi';
import { Button } from '@/shared/UI/button';

type MarketItemProps = {
  marketData: Market;
};
function MarketItem({ marketData }: MarketItemProps) {
  return (
    <div className='flex justify-between w-full'>
      <div className='flex gap-2 items-center w-1/3 shrink-0'>
        <img
          style={{ background: `#${marketData.currency1.color}` }}
          src={marketData.currency1.image}
          className='w-10 h-10 rounded-full'
          loading='lazy'
        />
        <div className='flex flex-col gap-0.5'>
          <span className='text-lg font-extrabold'>
            {marketData.currency1.title_fa}
          </span>
          <span className='text-xs font-semibold text-neutral-500'>
            {marketData.code.replace('_', '/')}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-0.5 w-1/4'>
        <span className='text-lg font-extrabold'>
          {/* {new Decimal(marketData.price).toFixed(
            marketData.currency2.code === 'IRT'
              ? marketData.currency1.decimal_irt
              : marketData.currency1.decimal
          )} */}
          {Number(marketData.price).toLocaleString(undefined, {
            minimumFractionDigits:
              marketData.currency2.code === 'IRT'
                ? marketData.currency1.decimal_irt
                : marketData.currency1.decimal,
          })}
        </span>
        <span className='text-xs font-semibold text-neutral-500'>
          {marketData.currency2.title_fa}
        </span>
      </div>

      <div
        className={clsx([
          'w-1/4 font-semibold',
          marketData?.price_info.change > 0 ? 'text-green-500' : 'text-red-500',
        ])}
        dir='ltr'
      >
        {marketData?.price_info.change > 0 && '+'}
        {marketData?.price_info.change?.toLocaleString()}%
      </div>
      <a href={`/${marketData.id}`}>
        <Button>معامله درصدی</Button>
      </a>
    </div>
  );
}

export default MarketItem;
