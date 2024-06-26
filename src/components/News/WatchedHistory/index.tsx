'use client';

import {
  Button,
  Card,
  CardBody,
  HStack,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';

import useNewsStore from '@/store/News';
import { useSearchParams } from 'next/navigation';
import { IoMdClose } from 'react-icons/io';
import { SlEye } from 'react-icons/sl';

export default function WatchedHistory() {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useBoolean();

  const watchList = useNewsStore((state) => state.watchList);
  const populateWatchList = useNewsStore((state) => state.populateWatchList);
  const removeFromWatchList = useNewsStore(
    (state) => state.removeFromWatchList,
  );

  useEffect(() => {
    populateWatchList();
  }, [populateWatchList]);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={setIsOpen.on}
      onClose={setIsOpen.off}
      isLazy
      lazyBehavior='keepMounted'
    >
      <HStack className='text-primary hover:text-white transition-all'>
        <PopoverTrigger>
          <Button leftIcon={<SlEye />} aria-label='eye-icon'>
            <Text>Watch List</Text>
          </Button>
        </PopoverTrigger>
      </HStack>

      <PopoverContent
        borderRadius={10}
        bgColor='white'
        p={10}
        w='full'
        maxH={500}
        overflow='scroll'
        className='mr-[10vw] hide-scrollbar max-w-[330px] sm:max-w-[400px]'
      >
        <PopoverBody className='text-secondary/80 text-sm'>
          {watchList.length ? (
            watchList.map((news) => (
              <Link
                key={news.title}
                href={{
                  pathname: '/news-article',
                  query: {
                    q: searchParams.get('q') ?? '',
                    source: searchParams.get('source') ?? '',
                    category: searchParams.get('category') ?? '',
                    page: searchParams.get('page') ?? '',
                    article: JSON.stringify(news),
                  },
                }}
                onClick={setIsOpen.off}
              >
                <Card
                  p={5}
                  mb={5}
                  className='cursor-pointe  shadow rounded-lg'
                  direction={{ base: 'column', sm: 'row' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    width={80}
                    height={80}
                    className='rounded-lg'
                    objectFit='cover'
                    src={news.urlToImage ?? '/images/fallback_image.png'}
                    alt='news-image'
                  />
                  <CardBody display='flex' alignItems='center' pl={10}>
                    <Text pr={20}>{news.title}</Text>
                  </CardBody>
                  <IconButton
                    size='sm'
                    aria-label='Remove'
                    icon={<IoMdClose />}
                    className='absolute top-2 right-2 text-primary'
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWatchList(news.title);
                    }}
                  />
                </Card>
              </Link>
            ))
          ) : (
            <Text minW={200} align='center'>
              No Items on Watch List
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
