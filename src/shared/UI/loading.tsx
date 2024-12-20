import DarkLogo from '@/shared/assets/logos/logo-dark.svg?react';
import LightLogo from '@/shared/assets/logos/logo-light.svg?react';
import { useTheme } from '@/shared/providers/theme-provider';

function Loading() {
  const { theme } = useTheme();
  return (
    <div className='flex h-[calc(100vh_-_10rem)] w-full items-center justify-center'>
      {theme === 'dark' ? <DarkLogo className='w-auto' /> : <LightLogo className='w-auto' />}
    </div>
  );
}

export default Loading;
