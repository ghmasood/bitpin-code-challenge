import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

import { useRequest } from '@/shared/api';

import { fetchMarketBuy, fetchMarketMatch, fetchMarketSell } from '../api/marketDetailApi';
import strings from '../strings.json';

export const useMarketDetail = () => {
  const [searchParams] = useSearchParams();
  const { marketId } = useParams();
  const pair = searchParams.get('pair')?.replace('_', '/') ?? '/';

  const [tab, setTab] = useState<'orderBuy' | 'orderSell' | 'match'>('orderBuy');
  const [side, setSide] = useState<'sell' | 'buy'>('buy');
  const [percent, setPercent] = useState(0);

  const { data: sellData } = useRequest(['MarketSell', marketId ?? 0], () => fetchMarketSell(+(marketId ?? 0)));
  const { data: buyData } = useRequest(['MarketBuy', marketId ?? 0], () => fetchMarketBuy(+(marketId ?? 0)));
  const { data: matchData } = useRequest(['MarketMatch', marketId ?? 0], () => fetchMarketMatch(+(marketId ?? 0)));

  const sideHandler = (e: string) => setSide(e as 'sell' | 'buy');
  const inputPercentHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    +e.target.value > 100 ? setPercent(100) : setPercent(+e.target.value);
  const toastMock = () =>
    toast.promise(
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (percent > 0) resolve(1);
          else reject(0);
        }, 3000)
      ),
      {
        pending: strings.ordering,
        success: strings.orderAccepted,
        error: strings.orderRejected,
      },
      { theme: 'colored' }
    );
  const sellList = sellData?.orders.slice(0, 10) ?? [];
  const buyList = buyData?.orders.slice(0, 10) ?? [];
  const matchList = matchData?.slice(0, 10) ?? [];

  const sellTotalValue = sellList?.reduce((acc, current) => acc + +current.value, 0);
  const sellTotalRemain = sellList?.reduce((acc, current) => acc + +current.remain, 0);
  const sellWAvgPrice = sellList?.reduce((acc, current) => acc + +current.remain * +current.price, 0) / sellTotalRemain;

  const buyTotalValue = buyList?.reduce((acc, current) => acc + +current.value, 0);
  const buyTotalRemain = buyList?.reduce((acc, current) => acc + +current.remain, 0);
  const buyWAvgPrice = buyList?.reduce((acc, current) => acc + +current.remain * +current.price, 0) / buyTotalRemain;

  return {
    tab,
    setTab,
    side,
    setSide,
    percent,
    setPercent,
    sellList,
    sideHandler,
    inputPercentHandler,
    buyList,
    toastMock,
    matchList,
    pair,
    sellTotalRemain,
    sellTotalValue,
    sellWAvgPrice,
    buyTotalValue,
    buyTotalRemain,
    buyWAvgPrice,
  };
};
