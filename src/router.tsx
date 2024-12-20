import { MarketListPage } from '@/features/marketList';
import { MarketDetailPage } from '@/features/marketDetail';
import Layout from '@/shared/UI/layout';
import { createBrowserRouter } from 'react-router';
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
