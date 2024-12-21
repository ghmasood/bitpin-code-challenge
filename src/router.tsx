import { createBrowserRouter } from 'react-router';

import { MarketDetailPage } from '@/features/marketDetail';
import { MarketListPage } from '@/features/marketList';
import { Layout } from '@/shared/UI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <MarketListPage /> },
      { path: '/:marketId', element: <MarketDetailPage /> },
    ],
  },
]);

export default router;
