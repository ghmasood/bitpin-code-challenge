import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/features/home/container';
import { DetailsPage } from '@/features/details/container';

const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/:pair', Component: DetailsPage },
]);

export default router;
