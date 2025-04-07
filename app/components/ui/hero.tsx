'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '../../../public/images/hero.png';
import { PiBagSimple, PiMapPinSimple } from 'react-icons/pi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Hero() {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='flex items-center gap-4'>
          <span className='flex items-center gap-2 text-sm'>
            <PiBagSimple className='text-base text-yellow-800' />
            Fullstack Developer
          </span>

          <span className='flex items-center gap-2 text-sm'>
            <PiMapPinSimple className='text-base text-red-400' />
            São João del Rei - MG
          </span>
        </div>

        <div className='flex items-start justify-center gap-4'>
          <Link
            href='https://www.linkedin.com/in/-bruno-cardoso-/'
            className='flex flex-row items-center gap-x-3 rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'
          >
            <span className='flex items-center gap-2 text-sm'>
              <FaLinkedin className='text-base text-blue-400' />
              Connect on LinkedIn
            </span>
          </Link>

          <Link
            href='https://github.com/brunoCards'
            className='flex flex-row items-center gap-x-3 rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'
          >
            <span className='flex items-center gap-2 text-sm'>
              <FaGithub className='text-base' />
              Github
            </span>
          </Link>
        </div>
      </div>

      <Image
        src={HeroImage}
        alt='Bruno Cardoso com uma doguinha'
        className='max-h-52 min-h-52 w-full object-contain'
        priority
      />

      <p className='text-center text-xl font-bold'>
        Hi, I am <span className='text-primary'>Bruno</span>
      </p>

      <Link
        href='https://www.linkedin.com/in/-bruno-cardoso-/'
        className='flex flex-row items-center gap-x-3 rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'
      >
        <span className='relative flex items-center justify-center'>
          <span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-primary bg-primary opacity-75'></span>
          <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
        </span>
        <p className='font-medium'>Open to work</p>
      </Link>
    </div>
  );
}
