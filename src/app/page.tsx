import NewsGrid from "@/components/News/NewsGrid/NewsGrid";
import NewsListHeader from "@/components/News/NewsListHeader/NewsListHeader";
import { fetchNews } from "@/services/news-service";
import { PAGE_SIZE, SearchData } from "@/services/types";
import { NextPageProps } from "@/types";
import { Box } from "@chakra-ui/react";

export default async function Home({ searchParams }: NextPageProps) {
  const { totalResults, articles } = await fetchNews(
    searchParams as Partial<SearchData>
  );
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <Box className="page max-h-[calc(100vh-60px)] pt-6">
      <NewsListHeader pages={totalPages} />
      <NewsGrid newsList={articles} />
    </Box>
  );
}
