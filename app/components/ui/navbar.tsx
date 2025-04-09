'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';

import DarkLogo from '../../../public/images/logo.svg';
import LightLogo from '../../../public/images/logo_black.svg';

import Link from 'next/link';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOnTop, setIsOnTop] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = !mounted
    ? DarkLogo
    : resolvedTheme === 'light'
    ? LightLogo
    : DarkLogo;

  const logoSize = isOnTop
    ? 'min-w-16 min-h-12 w-full h-full object-contain '
    : 'min-w-8 min-h-6 w-full h-full object-contain ';

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;

    const handleLogoSize = () => {
      if (window.scrollY > 1) {
        setIsOnTop(true);
      }
    };

    window.addEventListener('scroll', handleLogoSize, { signal });
    return () => {
      ac.abort();
    };
  }, []);

  console.log('isOnTop', isOnTop);
  console.log('logoSize', logoSize);

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
