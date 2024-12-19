import { Suspense } from 'react';
import Header from './components/header';
import { Outlet } from 'react-router';
import FallBackPage from '../fallbackPage';

function Layout() {
  return (
    <Suspense fallback={<FallBackPage />}>
      <Header />
      <main className='mt-[4.25rem] min-h-[calc(100vh_-_4.25rem)] px-12 py-4 '>
        <Outlet />
      </main>
    </Suspense>
  );
}

export default Layout;
