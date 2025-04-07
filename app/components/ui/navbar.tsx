import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import Logo from '../../../public/images/logo.svg';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className='w-full'>
      <nav className='w-full flex items-center justify-between'>
        <div className='w-full flex items-center '>
          <Link href='/'>
            <Image
              src={Logo}
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
