import Logo from '@/shared/assets/logo.svg?react';
import { useTheme } from '@/shared/providers/ThemeProvider';

import clsx from 'clsx';

import { ThemeToggle } from './ThemeToggle';

function Header() {
  const { theme } = useTheme();
  return (
    <header className='fixed end-0 start-0 top-0 z-[999] flex w-full items-center justify-between border-b border-input/50 bg-background px-4 py-4 shadow-lg lg:px-12'>
      <a href='/'>
        <Logo className={clsx('h-8 w-auto', theme === 'dark' ? 'text-[#d3d3d3]' : 'text-[#333]')} />
      </a>
      <ThemeToggle />
    </header>
  );
}

export default Header;
