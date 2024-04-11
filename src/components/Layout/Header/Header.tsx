'use client';

import WatchedHistory from '@/components/News/WatchedHistory';
import { HStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='absolute z-30 w-full flex px-[10%]'>
      <div className='flex w-full justify-between items-center xl:flex-row'>
        <Link href='/'>
          <Image
            className='ml-[-26px]'
            src='/images/logo.png'
            width={320}
            height={48}
            alt=''
            priority
          />
        </Link>
        <HStack>
          <WatchedHistory />
          {/* <ErrorAPIButton /> */}
        </HStack>
      </div>
    </header>
  );
}

export default Header;
