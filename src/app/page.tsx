import NewsGrid from '@/components/News/NewsGrid';
import NewsListHeader from '@/components/News/NewsListHeader';
import { Box } from '@chakra-ui/react';

export default async function Home() {
  return (
    <Box className='page max-h-[calc(100vh-60px)] md:pt-6'>
      <NewsListHeader />
      <NewsGrid />
    </Box>
  );
}
