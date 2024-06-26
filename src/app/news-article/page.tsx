import { readNewsDetailsFromUrl } from '@/services/news-service';
import { NextPageProps } from '@/types';
import { parseJsonSafely } from '@/utils';
import { Box, HStack, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export default async function NewsDetailsPage({ searchParams }: NextPageProps) {
  const newsDetails = parseJsonSafely(searchParams?.article);

  if (!newsDetails) return null;

  const article = await readNewsDetailsFromUrl(newsDetails.url);

  const backUrl = `/?${new URLSearchParams({
    q: searchParams?.q ?? '',
    source: searchParams?.source ?? '',
    category: searchParams?.category ?? '',
    page: searchParams?.page ?? '',
  })}`;

  return (
    <div className='page max-h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar sm:pt-8 lg:px-[8%]'>
      <Link href={backUrl}>
        <HStack className='text-base font-medium mb-5 text-primary hover:text-white'>
          <IoMdArrowBack />
          <Text>back to Latest News</Text>
        </HStack>
      </Link>
      <Heading variant='2xl'>{newsDetails.title}</Heading>
      <Box
        mb={6}
        className='flex flex-col text-primary md:flex-row md:justify-between'
      >
        <Text mb={2}>
          {newsDetails.author ? `by ${newsDetails.author}, ` : ''}
          {newsDetails.source?.name}
        </Text>
        <Text minW={200}>
          {new Date(newsDetails.publishedAt).toLocaleString()}
        </Text>
      </Box>
      <div>
        <Image
          mx='auto'
          src={newsDetails.urlToImage ?? '/images/fallback_image.png'}
          className='max-h-80 mb-5 lg:float-right lg:ml-5'
          alt='news-image '
        />
        <Text mb={20} wordBreak='break-all'>
          {article}
        </Text>
      </div>
    </div>
  );
}
