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
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = !mounted
    ? DarkLogo
    : resolvedTheme === 'light'
    ? LightLogo
    : DarkLogo;

  return (
    <header className='w-full'>
      <nav className='w-full flex items-center justify-between'>
        <div className='w-full flex items-center '>
          <Link href='/'>
            <Image
              src={currentLogo}
              alt='Bruno Cardoso Dev'
              priority
              className='min-w-16 min-h-12 object-contain'
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
