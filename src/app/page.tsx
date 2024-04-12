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
  const { articles, totalResults } = await fetchNews(searchParams);
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <Box className='page max-h-[calc(100vh-60px)] md:pt-6'>
      <NewsListHeader totalPages={totalPages} />
      <NewsGrid articles={articles} />
    </Box>
  );
}
