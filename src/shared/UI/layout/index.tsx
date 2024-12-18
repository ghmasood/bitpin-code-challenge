import { Suspense } from 'react';
import Header from './components/header';
import { Outlet } from 'react-router';
import FallBackPage from '../fallbackPage';

function Layout() {
  return (
    <Suspense fallback={<FallBackPage />}>
      <Header />
      <main className='relative top-24 px-12'>
        <Outlet />
      </main>
    </Suspense>
  );
}

export default Layout;
