import { createBrowserRouter } from 'react-router';
import { MarketList } from '@/features/marketList/container';
import { DetailsPage } from '@/features/details/container';

const router = createBrowserRouter([
  { path: '/', Component: MarketList },
  { path: '/:pair', Component: DetailsPage },
]);

export default router;
