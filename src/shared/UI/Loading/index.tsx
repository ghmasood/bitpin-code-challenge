import Logo from '@/shared/assets/logo.svg?react';
import { useTheme } from '@/shared/providers';

import clsx from 'clsx';

function Loading() {
  const { theme } = useTheme();
  return (
    <div className='flex h-[calc(100vh_-_10rem)] w-full items-center justify-center'>
      <Logo className={clsx('w-auto', theme === 'dark' ? 'text-[#d3d3d3]' : 'text-[#333]')} />
    </div>
  );
}

export default Loading;
