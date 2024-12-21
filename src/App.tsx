import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';

import router from '@/router';

import { QueryProvider, ThemeProvider } from './shared/providers';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <ToastContainer position='bottom-right' />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
