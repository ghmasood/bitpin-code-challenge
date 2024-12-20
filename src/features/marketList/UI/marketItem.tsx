import { Button } from '@/shared/UI/button';

import clsx from 'clsx';

import type { Market } from '../types/marketListApi';

type MarketItemProps = {
  marketData?: Market;
  loading?: boolean;
};
function MarketItem({ marketData, loading = false }: MarketItemProps) {
  return (
    <div className='flex w-full items-center border-b py-2'>
      <div className='flex w-2/5 shrink-0 grow items-center gap-2'>
        {loading ? (
          <div className='skeleton h-10 w-10 !rounded-full' />
        ) : (
          <img
            style={{ background: `#${marketData?.currency1.color}` }}
            src={marketData?.currency1.image}
            className='h-10 w-10 !rounded-full'
            loading='lazy'
          />
        )}
        <div className='flex flex-col items-start gap-0.5'>
          <span className={clsx(['min-w-20 truncate font-extrabold', loading && 'skeleton'])}>
            {marketData?.currency1.title_fa ?? '-'}
          </span>
          <span className={clsx(['min-w-10 text-xs font-semibold text-neutral-500', loading && 'skeleton'])}>
            {marketData?.code.replace('_', '/') ?? '-'}
          </span>
        </div>
      </div>

      <div className='flex w-2/5 grow flex-col justify-between md:flex-row md:items-center'>
        <div className='flex flex-col items-start gap-0.5'>
          <span className={clsx(['min-w-20 text-lg font-extrabold', loading && 'skeleton'])}>
            {/* {new Decimal(marketData.price).toFixed(
            marketData.currency2.code === 'IRT'
              ? marketData.currency1.decimal_irt
              : marketData.currency1.decimal
          )} */}
            {Number(marketData?.price).toLocaleString(undefined, {
              minimumFractionDigits:
                marketData?.currency2.code === 'IRT'
                  ? marketData?.currency1.decimal_irt
                  : marketData?.currency1.decimal,
            })}
          </span>
          <span className={clsx(['min-w-10 text-xs font-semibold text-neutral-500', loading && 'skeleton'])}>
            {marketData?.currency2.title_fa ?? '-'}
          </span>
        </div>

        <div
          className={clsx([
            'text-end font-semibold md:w-1/3',
            (marketData?.price_info?.change ?? 0) > 0 ? 'text-green-500' : 'text-red-500',
            loading && 'skeleton ms-8',
          ])}
          dir='ltr'
        >
          {(marketData?.price_info?.change ?? 0) > 0 && '+'}
          {marketData?.price_info.change?.toLocaleString()}%
        </div>
      </div>
      <a
        className={clsx(['min-w-[15%] text-center', loading && 'skeleton'])}
        href={`/${marketData?.id}/?pair=${marketData?.code}`}
      >
        <Button>معامله درصدی</Button>
      </a>
    </div>
  );
}

export default MarketItem;
