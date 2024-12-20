import clsx from 'clsx';
import type { Market } from '../types/marketListApi';
import { Button } from '@/shared/UI/button';

type MarketItemProps = {
  marketData?: Market;
  loading?: boolean;
};
function MarketItem({ marketData, loading = false }: MarketItemProps) {
  return (
    <div className='flex w-full border-b items-center py-2'>
      <div className='flex gap-2 items-center grow shrink-0 w-2/5'>
        {loading ? (
          <div className='w-10 h-10 skeleton !rounded-full' />
        ) : (
          <img
            style={{ background: `#${marketData?.currency1.color}` }}
            src={marketData?.currency1.image}
            className='w-10 h-10 !rounded-full'
            loading='lazy'
          />
        )}
        <div className='flex flex-col gap-0.5 items-start'>
          <span
            className={clsx([
              'font-extrabold truncate min-w-20',
              loading && 'skeleton',
            ])}
          >
            {marketData?.currency1.title_fa ?? '-'}
          </span>
          <span
            className={clsx([
              'text-xs font-semibold text-neutral-500 min-w-10',
              loading && 'skeleton',
            ])}
          >
            {marketData?.code.replace('_', '/') ?? '-'}
          </span>
        </div>
      </div>

      <div className='flex flex-col md:items-center md:flex-row w-2/5 grow justify-between'>
        <div className='flex flex-col gap-0.5 items-start'>
          <span
            className={clsx([
              'text-lg font-extrabold min-w-20',
              loading && 'skeleton',
            ])}
          >
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
          <span
            className={clsx([
              'text-xs font-semibold text-neutral-500 min-w-10',
              loading && 'skeleton',
            ])}
          >
            {marketData?.currency2.title_fa ?? '-'}
          </span>
        </div>

        <div
          className={clsx([
            'md:w-1/3 font-semibold text-end',
            (marketData?.price_info?.change ?? 0) > 0
              ? 'text-green-500'
              : 'text-red-500',
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
        href={`/${marketData?.id}`}
      >
        <Button>معامله درصدی</Button>
      </a>
    </div>
  );
}

export default MarketItem;
