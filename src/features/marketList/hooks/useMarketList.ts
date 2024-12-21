import { useState } from 'react';

import { useRequest } from '@/shared/api';

import { fetchMarketList } from '../api/marketListApi';

export const useMarketList = () => {
  const [tab, setTab] = useState<'IRT' | 'USDT'>('USDT');
  const [USDTPage, setUSDTPage] = useState(1);
  const [IRTPage, setIRTPage] = useState(1);

  const { data, isLoading, isError } = useRequest(['MarketList'], () => fetchMarketList());
  const USDTMarket = data?.results.filter((market) => market.currency2.code === 'USDT') ?? [];
  const IRTMarket = data?.results.filter((market) => market.currency2.code === 'IRT') ?? [];

  const pageSize = 10;
  const marketList = tab === 'USDT' ? USDTMarket : IRTMarket;
  const totalLength = marketList.length;
  const totalPage = Math.ceil(totalLength / pageSize);

  const slicedList =
    tab === 'IRT'
      ? marketList.slice((IRTPage - 1) * pageSize, IRTPage * pageSize - 1)
      : marketList.slice((USDTPage - 1) * pageSize, USDTPage * pageSize - 1);

  const swipeLeftHandler = () => setTab('USDT');
  const swipeRightHandler = () => setTab('IRT');

  return {
    tab,
    setTab,
    USDTPage,
    totalPage,
    setUSDTPage,
    IRTPage,
    setIRTPage,
    USDTMarket,
    IRTMarket,
    isLoading,
    isError,
    slicedList,
    swipeLeftHandler,
    swipeRightHandler,
  };
};
