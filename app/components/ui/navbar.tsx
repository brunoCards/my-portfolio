'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ModeToggle } from './mode-toggle';
import DarkLogo from '@/public/images/logo.svg';
import LightLogo from '@/public/images/logo_black.svg';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOnTop, setIsOnTop] = useState(false);
  const { resolvedTheme } = useTheme();

  const currentLogo = !mounted
    ? DarkLogo
    : resolvedTheme === 'light'
    ? LightLogo
    : DarkLogo;

  const logoSize = isOnTop
    ? 'max-w-12 max-h-8 w-full h-full object-contain transition-all duration-1000 ease-in-out'
    : 'max-w-16 max-h-12 w-full h-full object-contain transition-all duration-1000 ease-in-out';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;

    const handleLogoSize = () => {
      setIsOnTop(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleLogoSize, { signal });

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <header className='w-full h-32 px-[10vw] fixed z-10 bg-background flex items-center border border-b-primary shadow shadow-4xl'>
      <nav className='w-full flex items-center justify-between relative'>
        <div className='w-full flex items-center '>
          <Link href='/'>
            <Image
              src={currentLogo}
              alt='Bruno Cardoso Dev'
              priority
              className={logoSize}
            />
          </Link>
        </div>

        <ul className='w-full flex justify-end items-center gap-4 font-bold text-base'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href=''>Tools</Link>
          </li>
          <li>
            <Link href=''>Resume</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
