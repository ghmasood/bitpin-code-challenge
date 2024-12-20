import DarkLogo from '@/shared/assets/logos/logo-dark.svg?react';
import LightLogo from '@/shared/assets/logos/logo-light.svg?react';
import { useTheme } from '@/shared/providers/theme-provider';
import { ThemeToggle } from './themeToggle';

function Header() {
  const { theme } = useTheme();
  return (
    <header className='fixed top-0 z-[999] w-full bg-background py-4 px-12 flex items-center shadow-lg justify-between'>
      <a href='/'>
        {theme === 'dark' ? (
          <DarkLogo className='h-8 w-auto' />
        ) : (
          <LightLogo className='h-8 w-auto' />
        )}
      </a>
      <ThemeToggle />
    </header>
  );
}

export default Header;
