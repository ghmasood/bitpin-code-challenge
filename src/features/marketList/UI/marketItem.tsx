import { Button } from '@/shared/UI';
import { toFixedSeparated } from '@/shared/lib/';

import clsx from 'clsx';

import { Market } from '../api/dto';
import strings from '../strings.json';

type MarketItemProps = {
  marketData?: Market;
  loading?: boolean;
};
function MarketItem({ marketData, loading = false }: MarketItemProps) {
  return (
    <div className='flex w-full items-center border-b py-1'>
      <div className='flex w-1/2 shrink-0 grow items-center gap-1'>
        {loading ? (
          <div className='skeleton h-10 w-10 !rounded-full' />
        ) : (
          <img
            style={{ background: `#${marketData?.currency1.color}` }}
            src={marketData?.currency1.image}
            className='h-8 w-8 !rounded-full'
            loading='lazy'
          />
        )}
        <div className='flex flex-col items-start gap-0.5'>
          <span
            className={clsx(['min-w-16 max-w-32 truncate text-sm font-extrabold sm:max-w-none', loading && 'skeleton'])}
          >
            {marketData?.currency1.title_fa ?? '-'}
          </span>
          <span className={clsx(['min-w-10 text-xs font-semibold text-neutral-500', loading && 'skeleton'])}>
            {marketData?.code.replace('_', '/') ?? '-'}
          </span>
        </div>
      </div>

      <div className='flex w-1/3 grow flex-col justify-between text-sm md:flex-row md:items-center'>
        <div className='flex flex-col items-start gap-0.5'>
          <span className={clsx(['min-w-16 font-extrabold', loading && 'skeleton'])}>
            {toFixedSeparated(
              marketData?.price ?? 0,
              marketData?.currency2.code === 'IRT'
                ? (marketData?.currency1.decimal_irt ?? 0)
                : (marketData?.currency1.decimal ?? 0)
            )}
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
        <Button size='sm' className='w-fit px-1'>
          {strings.percentOrder}
        </Button>
      </a>
    </div>
  );
}

export default MarketItem;
