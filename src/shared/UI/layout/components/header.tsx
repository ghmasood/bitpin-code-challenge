import DarkLogo from '@/shared/assets/logos/logo-dark.svg?react';
import LightLogo from '@/shared/assets/logos/logo-light.svg?react';
import { useTheme } from '@/shared/providers/theme-provider';

import { ThemeToggle } from './themeToggle';

function Header() {
  const { theme } = useTheme();
  return (
    <header className='fixed end-0 start-0 top-0 z-[999] flex w-full items-center justify-between border-b border-input/50 bg-background px-4 py-4 shadow-lg lg:px-12'>
      <a href='/'>{theme === 'dark' ? <DarkLogo className='h-8 w-auto' /> : <LightLogo className='h-8 w-auto' />}</a>
      <ThemeToggle />
    </header>
  );
}

export default Header;
