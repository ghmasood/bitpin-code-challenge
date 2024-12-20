import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Header from './components/header';

import FallBackPage from '../fallbackPage';

function Layout() {
  return (
    <Suspense fallback={<FallBackPage />}>
      <Header />
      <main className='mt-[4.25rem] min-h-[calc(100vh_-_4.25rem)] px-4 py-4 lg:px-12'>
        <Outlet />
      </main>
    </Suspense>
  );
}

export default Layout;
