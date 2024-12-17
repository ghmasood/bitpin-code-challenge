import { RouterProvider } from 'react-router';
import router from '@/router';
import { ThemeProvider } from '@/shared/providers/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
