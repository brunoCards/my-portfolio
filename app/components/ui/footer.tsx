'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaRegFilePdf, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export function Footer() {
  return (
    <footer className='w-full flex flex-col justify-center items-center gap-16'>
      <div className='flex flex-col justify-center'>
        <Link
          href=''
          className='flex flex-row items-center gap-x-3 rounded-md border border-input px-4 py-2 text-sm shadow-sm transition-all hover:shadow-md'
        >
          <span className='relative flex items-center justify-center'>
            <FaRegFilePdf className='absolute inline-flex animate-ping border text-red-500 opacity-75' />
            <FaRegFilePdf className='relative inline-flex text-red-500' />
          </span>
          <span className='font-bold'>Download Resume</span>
        </Link>
      </div>

      <div className='w-full py-8 flex flex-col gap-8 border-t border-input justify-center items-center'>
        <span>© 2025 Bruno Cardoso. All rights reserved.</span>

        <div className='flex gap-4 text-lg'>
          <Link
            href='https://www.linkedin.com/in/-bruno-cardoso-/'
            className=''
          >
            <FaLinkedin />
          </Link>

          <Link href='https://github.com/brunoCards' className=''>
            <FaGithub />
          </Link>

          <Link href='' className=''>
            <FaWhatsapp />
          </Link>

          <Link href='' className=''>
            <MdEmail />
          </Link>
        </div>
      </div>
    </footer>
  );
}
