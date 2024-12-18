import { MarketList } from '@/features/marketList/container';
import { DetailsPage } from '@/features/details/container';
import Layout from '@/shared/UI/layout';
import { createBrowserRouter } from 'react-router';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', Component: MarketList },
      { path: '/:pair', Component: DetailsPage },
    ],
  },
]);

export default router;
