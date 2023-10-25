'use client';

import { News } from '@/services/types';
import useNewsStore from '@/store/News';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

type ReadMoreButtonProps = {
  news: News;
};

export default function ReadMoreButton({ news }: ReadMoreButtonProps) {
  const addToWatchList = useNewsStore((state) => state.addToWatchList);

  const onClickReadMore = async () => {
    addToWatchList(news);
  };

  return (
    <Link
      href={{
        pathname: '/news',
        query: { data: JSON.stringify(news) },
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
