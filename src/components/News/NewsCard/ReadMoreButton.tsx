'use client';

import { News } from '@/services/types';
import useNewsStore from '@/store/News';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type ReadMoreButtonProps = {
  news: News;
};

export default function ReadMoreButton({ news }: ReadMoreButtonProps) {
  const searchParams = useSearchParams();
  const addToWatchList = useNewsStore((state) => state.addToWatchList);

  const onClickReadMore = async () => {
    addToWatchList(news);
  };

  return (
    <Link
      href={{
        pathname: '/news',
        query: {
          q: searchParams.get('q') ?? '',
          source: searchParams.get('source') ?? '',
          category: searchParams.get('category') ?? '',
          page: searchParams.get('page') ?? '',
          article: JSON.stringify(news),
        },
      }}
    >
      <Button
        borderWidth={2}
        className='rounded-full capitalize border-width-2 text-white hover:text-secondary'
        onClick={onClickReadMore}
      >
        Read More
      </Button>
    </Link>
  );
}
