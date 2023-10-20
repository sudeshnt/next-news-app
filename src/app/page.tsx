import NewsGrid from "@/components/News/NewsGrid/NewsGrid";
import NewsListHeader from "@/components/News/NewsListHeader/NewsListHeader";
import { fetchNews, fetchNewsSources } from "@/services/news-service";
import { SearchData } from "@/services/types";
import { NextPageProps } from "@/types";
import { Box } from "@chakra-ui/react";

export default async function Home({ searchParams }: NextPageProps) {
  const newsSources = await fetchNewsSources();
  const news = await fetchNews(searchParams as Partial<SearchData>);

  return (
    <Box className="page max-h-[calc(100vh-80px)]">
      <NewsListHeader newsSources={newsSources} />
      <NewsGrid newsList={news} />
    </Box>
  );
}
