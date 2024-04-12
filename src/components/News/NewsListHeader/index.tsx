'use client';

import Loading from '@/app/news/loading';
import { SearchData } from '@/services/types';
import { Box, Heading } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import NewsCategories from './NewsCategories';
import NewsSearchInput from './NewsSearchInput';
import Pagination from './Pagination';

const DEFAULT_SEARCH_DATA: SearchData = {
  q: '',
  source: '',
  category: '',
  page: '1',
};

export default function NewsListHeader({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH_DATA);

  const handleChangeSearchData = useCallback(
    (data: Partial<SearchData>) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams);
      Object.entries(data).forEach(([key, value]) => {
        params.set(key, value);
      });
      router.replace(`${pathName}?${params.toString()}`);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    },
    [searchParams],
  );

  useEffect(() => {
    setSearchData({
      q: searchParams.get('q') ?? '',
      source: searchParams.get('source') ?? '',
      category: searchParams.get('category') ?? '',
      page: searchParams.get('page') ?? '1',
    });
  }, [searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      <Heading className='mb-4' variant='2xl'>
        Latest News
      </Heading>
      <NewsCategories
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
      <Box className='flex justify-end mb-5'>
        <NewsSearchInput
          searchData={searchData}
          onChangeSearchData={handleChangeSearchData}
        />
      </Box>
      <Pagination
        pages={totalPages}
        searchData={searchData}
        onChangeSearchData={handleChangeSearchData}
      />
    </>
  );
}
