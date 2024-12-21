import { toFixedSeparated } from '@/shared/lib/';

import { DateTime } from 'luxon';

import clsx from 'clsx';

import { TransactionsResponse } from '../api/dto';
import strings from '../strings.json';

type TransactionsListProps = {
  matchData: TransactionsResponse;
};
function TransactionsList({ matchData }: TransactionsListProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between gap-2 text-sm font-bold text-muted-foreground [&>span]:w-1/3'>
        <span>{strings.price}</span>
        <span className='text-center'>{strings.transactionAmount}</span>
        <span className='text-end'>{strings.time}</span>
      </div>
      {matchData?.map((item, index) => (
        <div
          key={index}
          className={clsx([
            'flex justify-between [&>span]:w-1/3',
            item.type === 'buy' ? 'text-green-500' : 'text-red-500',
          ])}
        >
          <span>{toFixedSeparated(item.price)}</span>
          <span className='text-center'>{toFixedSeparated(item.match_amount)}</span>
          <span className='text-end'>
            {DateTime.fromSeconds(item.time).setLocale('fa').toLocaleString(DateTime.DATETIME_MED)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
