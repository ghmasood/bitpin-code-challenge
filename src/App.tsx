import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import router from '@/router';
import { ThemeProvider } from '@/shared/providers/theme-provider';

import { QueryProvider } from './shared/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right' style={{ fontFamily: 'vazir !important' }} />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
