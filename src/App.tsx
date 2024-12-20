import { RouterProvider } from 'react-router';

import router from '@/router';
import { ThemeProvider } from '@/shared/providers/theme-provider';

import { QueryProvider } from './shared/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;
