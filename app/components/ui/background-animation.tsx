'use client';

import { Vortex } from '@/components/ui/vortex';
import { ReactNode } from 'react';

interface BackgroundAnimationProps {
  children: ReactNode;
}

export function BackgroundAnimation({ children }: BackgroundAnimationProps) {
  return (
    <div className='relative w-full min-h-screen'>
      <div className='fixed inset-0 -z-50 pointer-events-none'>
        <Vortex
          backgroundColor='transparent'
          particleCount={100}
          className='w-full h-full'
        />
      </div>
      {children}
    </div>
  );
}
