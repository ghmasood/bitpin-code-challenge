import type { FC } from 'react';
import { useMarketList } from './hooks/useMarketList';

const MarketList: FC = () => {
  const { marketList, isError, isLoading } = useMarketList();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user data</p>;

  return (
    <div className='flex flex-col gap-4'>
      {marketList?.results?.map((i) => (
        <div key={i?.id}>{i.code}</div>
      ))}
    </div>
  );
};

export { MarketList };
