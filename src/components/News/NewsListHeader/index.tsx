'use client';

import Loading from '@/app/loading';
import { SearchData } from '@/services/types';
import useNewsStore from '@/store/News';
import { Box, Heading } from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH_DATA);

  const isFetchingNews = useNewsStore((state) => state.isFetchingNews);

  const handleChangeSearchData = (data: Partial<SearchData>) => {
    const params = new URLSearchParams({ ...searchData, ...data });
    router.replace(`${pathName}?${params.toString()}`);
  };

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
      {isFetchingNews && <Loading />}
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
