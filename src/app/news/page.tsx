import NewsGrid from '@/components/News/NewsGrid';
import NewsListHeader from '@/components/News/NewsListHeader';
import { fetchNews } from '@/services/news-service';
import { PAGE_SIZE } from '@/services/types';
import { Box } from '@chakra-ui/react';

type HomePageProps = {
  searchParams: {
    q?: string;
    category?: string;
    source?: string;
    page?: string;
  };
};

export default async function Home({ searchParams }: HomePageProps) {
  const searchData = {
    q: searchParams?.q ?? '',
    page: searchParams?.page ?? '1',
    pageSize: PAGE_SIZE.toString(),
    ...(searchParams?.source
      ? { sources: searchParams?.source }
      : { category: searchParams?.category ?? '', language: 'en' }),
    apiKey: process.env.API_KEY ?? '',
  };

  const { articles, totalResults } = await fetchNews(searchData);
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <Box className='page max-h-[calc(100vh-60px)] md:pt-6'>
      <NewsListHeader totalPages={totalPages} />
      <NewsGrid articles={articles} />
    </Box>
  );
}
